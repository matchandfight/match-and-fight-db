# 🏗️ Arquitectura del Sistema - Ranking App

## 📐 Visión General

```
┌─────────────────────────────────────────────────┐
│              FRONTEND (Ionic React)              │
│  - Vite + TypeScript + Ionic Components         │
│  - Capacitor para funcionalidades nativas        │
└───────────────────┬─────────────────────────────┘
                    │ HTTP/REST
                    │ (Axios)
┌───────────────────▼─────────────────────────────┐
│           BACKEND (Node.js + Express)            │
│  - API REST                                      │
│  - JWT Authentication                            │
│  - Mongoose ODM                                  │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────┐
│              BASE DE DATOS (MongoDB)             │
│  - Colecciones NoSQL                             │
│  - Índices optimizados                           │
└─────────────────────────────────────────────────┘
```

---

## 🗂️ Estructura de Carpetas Detallada

### Backend (`/backend`)

```
backend/
├── src/
│   ├── config/
│   │   └── database.js           # Configuración MongoDB
│   │
│   ├── models/                   # Esquemas Mongoose
│   │   ├── User.model.js         # Usuario (auth)
│   │   ├── Peleador.model.js     # Perfil peleador
│   │   ├── Manager.model.js      # Perfil manager
│   │   ├── Promotor.model.js     # Perfil promotor
│   │   ├── Evento.model.js       # Eventos
│   │   ├── OfertaCombate.model.js # Ofertas
│   │   └── ResultadoCombate.model.js # Resultados
│   │
│   ├── routes/                   # Definición de rutas
│   │   ├── auth.routes.js
│   │   ├── peleador.routes.js
│   │   ├── manager.routes.js
│   │   ├── promotor.routes.js
│   │   ├── evento.routes.js
│   │   ├── oferta.routes.js
│   │   ├── resultado.routes.js
│   │   └── ranking.routes.js
│   │
│   ├── controllers/              # Lógica de negocio
│   │   ├── auth.controller.js
│   │   ├── peleador.controller.js
│   │   ├── manager.controller.js
│   │   ├── promotor.controller.js
│   │   ├── evento.controller.js
│   │   ├── oferta.controller.js
│   │   ├── resultado.controller.js
│   │   └── ranking.controller.js
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js    # JWT verification
│   │
│   ├── services/                 # (Futuro)
│   │   ├── elo.service.js        # Cálculo Elo
│   │   ├── email.service.js      # Envío emails
│   │   └── notification.service.js # Push notifications
│   │
│   └── index.js                  # Entry point
│
├── package.json
└── .env.example
```

### Frontend (`/frontend`)

```
frontend/
├── src/
│   ├── pages/                    # Páginas de la app
│   │   ├── Home.tsx
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── Rankings/
│   │   │   └── Rankings.tsx
│   │   ├── Peleadores/
│   │   │   ├── Peleadores.tsx
│   │   │   └── PeleadorDetalle.tsx
│   │   ├── Eventos/
│   │   │   ├── Eventos.tsx
│   │   │   └── EventoDetalle.tsx
│   │   └── Perfil/
│   │       └── Perfil.tsx
│   │
│   ├── components/               # Componentes reutilizables
│   │   └── (por crear)
│   │
│   ├── services/
│   │   └── api.ts                # Cliente API + servicios
│   │
│   ├── theme/
│   │   └── variables.css         # Tema Ionic
│   │
│   ├── App.tsx                   # Router principal
│   └── main.tsx                  # Entry point
│
├── android/                      # Proyecto Android (Capacitor)
├── public/                       # Assets estáticos
├── index.html
├── vite.config.ts
├── capacitor.config.json
├── package.json
└── tsconfig.json
```

---

## 🔄 Flujo de Datos

### 1. Autenticación

```
[Usuario] → Login Form (Frontend)
    ↓
API Call → POST /api/auth/login (Backend)
    ↓
Verificar credenciales → MongoDB
    ↓
Generar JWT → bcrypt + jsonwebtoken
    ↓
Return Token → Frontend
    ↓
Guardar en localStorage → Usar en requests
```

### 2. Consulta de Rankings

```
[Usuario] → Rankings Page
    ↓
API Call → GET /api/rankings/global?clase=A&genero=Masculino
    ↓
Query MongoDB → Peleador.find().sort('-puntuacion_elo')
    ↓
Return JSON → Frontend
    ↓
Renderizar Lista → Ionic Components
```

### 3. Crear Oferta de Combate

```
[Promotor] → Crear Oferta Form
    ↓
API Call + JWT → POST /api/ofertas
    ↓
Middleware → Verificar JWT + rol='promotor'
    ↓
Controller → OfertaCombate.create()
    ↓
MongoDB → Guardar oferta
    ↓
(Futuro) → Enviar notificación al peleador
    ↓
Return success → Frontend → Redirect
```

### 4. Validar Resultado y Actualizar Elo

```
[Admin] → Validar resultado
    ↓
API Call → PUT /api/resultados/:id/validar
    ↓
Obtener peleadores → Peleador.findById()
    ↓
Calcular Elo → peleador.actualizarElo(resultado, eloRival, K)
    ↓
Actualizar récord → ganador.record.ganados++
    ↓
Guardar cambios → MongoDB
    ↓
Return updated → Frontend
```

---

## 🔐 Sistema de Autenticación

### JWT (JSON Web Token)

```javascript
// 1. Login exitoso
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { 
  expiresIn: '30d' 
});

// 2. Frontend guarda token
localStorage.setItem('token', token);

// 3. Requests incluyen token
headers: { 
  'Authorization': `Bearer ${token}` 
}

// 4. Backend verifica token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id);
```

### Roles y Permisos

```javascript
// Middleware de autorización
autorizarRoles('promotor', 'admin')

// Roles disponibles:
- atleta: Ver rankings, gestionar perfil, recibir ofertas
- manager: Gestionar peleadores, responder ofertas
- promotor: Crear eventos, enviar ofertas
- admin: Validar resultados, gestionar todo
```

---

## 📊 Modelos de Datos

### Usuario (User)
```javascript
{
  email: String (unique),
  password: String (hashed),
  rol: ['atleta', 'manager', 'promotor', 'admin'],
  nombre_completo: String,
  suscripcion: {
    tipo: ['gratuita', 'basica', 'profesional', 'premium'],
    activa: Boolean
  }
}
```

### Peleador
```javascript
{
  nombre: String,
  alias: String,
  clase: ['N', 'C', 'B', 'A'],
  peso: Number,
  puntuacion_elo: Number (default: 1000),
  record: {
    combates_totales: Number,
    ganados: Number,
    perdidos: Number,
    ko_realizados: Number
  },
  disponibilidad: [{ fecha_inicio, fecha_fin, disponible }],
  bolsa_minima: Number (privado)
}
```

### Resultado Combate
```javascript
{
  evento_id: ObjectId,
  peleador_ganador_id: ObjectId,
  peleador_perdedor_id: ObjectId,
  metodo: ['KO', 'TKO', 'Decision', ...],
  cambio_elo_ganador: Number,
  cambio_elo_perdedor: Number,
  validado: Boolean,
  desacuerdo: Boolean
}
```

---

## 🧮 Algoritmo Elo

### Fórmula Implementada

```javascript
// Expectativa de resultado
E = 1 / (1 + 10^((Elo_Rival - Elo_Propio) / 400))

// Nueva puntuación
Nuevo_Elo = Elo_Actual + K × (Resultado - E)

// Donde:
// K = 32 (factor de ajuste)
// Resultado = 1 (victoria), 0 (derrota), 0.5 (empate)
```

### Ejemplo

```
Peleador A: 1200 Elo
Peleador B: 1000 Elo

Si A gana:
E_A = 1 / (1 + 10^((1000-1200)/400)) = 0.76
Nuevo_Elo_A = 1200 + 32 × (1 - 0.76) = 1208 (+8)

Si A pierde:
Nuevo_Elo_A = 1200 + 32 × (0 - 0.76) = 1176 (-24)
```

### Penalización por Inactividad

```javascript
días_sin_pelear >= 180 && < 365: -10 puntos
días_sin_pelear >= 365 && < 730: -30 puntos
días_sin_pelear >= 730: -60 puntos
```

---

## 🔌 API Endpoints Principales

### Autenticación
- `POST /api/auth/registro` - Crear cuenta
- `POST /api/auth/login` - Login
- `GET /api/auth/perfil` 🔒 - Mi perfil

### Peleadores
- `GET /api/peleadores` - Listar (con filtros)
- `GET /api/peleadores/:id` - Detalle
- `POST /api/peleadores` 🔒 - Crear
- `PUT /api/peleadores/:id` 🔒 - Actualizar

### Rankings
- `GET /api/rankings/global` - Global
- `GET /api/rankings/pais/:pais` - Por país
- `GET /api/rankings/region/:region` - Regional
- `GET /api/rankings/historial/:id` - Historial peleador

### Eventos
- `GET /api/eventos` - Listar
- `GET /api/eventos/proximos` - Próximos
- `POST /api/eventos` 🔒🔑 - Crear (promotor)

### Ofertas
- `POST /api/ofertas` 🔒🔑 - Crear (promotor)
- `PUT /api/ofertas/:id/responder` 🔒 - Responder

### Resultados
- `POST /api/resultados` 🔒 - Reportar
- `POST /api/resultados/:id/desacuerdo` 🔒 - Desacuerdo
- `PUT /api/resultados/:id/validar` 🔒👑 - Validar (admin)

🔒 = Requiere autenticación  
🔑 = Requiere rol específico  
👑 = Solo admin

---

## 📱 Funcionalidades Nativas (Capacitor)

### Implementadas
- App Status Bar (color)
- Splash Screen
- Network Detection

### Por Implementar
- Camera (para fotos de perfil)
- Push Notifications
- Geolocation (para aeropuerto cercano)
- File System (para documentos)

---

## 🚀 Optimizaciones y Escalabilidad

### Base de Datos
- **Índices** en campos frecuentes (puntuacion_elo, pais, clase)
- **Paginación** en listados (limite, skip)
- **Proyección** para excluir campos privados

### API
- **Cache** con Redis (futuro)
- **Rate limiting** para prevenir abuso
- **Compresión** de respuestas (gzip)

### Frontend
- **Lazy loading** de páginas
- **Infinite scroll** en listados
- **Optimistic UI** updates
- **Service Worker** (PWA)

---

## 🔮 Roadmap Técnico

### Fase 1 (Actual - MVP)
- ✅ Autenticación básica
- ✅ CRUD de peleadores
- ✅ Sistema de rankings
- ✅ Eventos y ofertas básicas

### Fase 2
- [ ] Upload de imágenes (Cloudinary)
- [ ] Sistema de chat/mensajería
- [ ] Notificaciones push
- [ ] Panel de admin completo

### Fase 3
- [ ] Pasarela de pagos (Stripe)
- [ ] Sistema de suscripciones
- [ ] Analytics avanzado
- [ ] Verificación de identidad

### Fase 4
- [ ] WebSockets para tiempo real
- [ ] Streaming de eventos
- [ ] Machine learning para matchmaking
- [ ] App iOS

---

## 📞 Integración con Servicios Externos

### Cloudinary (Imágenes/Videos)
```javascript
// Configuración en .env
CLOUDINARY_CLOUD_NAME=tu_cloud
CLOUDINARY_API_KEY=tu_key
CLOUDINARY_API_SECRET=tu_secret

// Uso
const result = await cloudinary.uploader.upload(file);
```

### Nodemailer (Emails)
```javascript
// Configuración
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=tu_email@gmail.com

// Uso: Notificaciones, recuperación contraseña
```

### Firebase (Notificaciones Push)
```javascript
// Configuración
FIREBASE_SERVER_KEY=tu_key

// Uso: Push notifications a dispositivos móviles
```

---

## 🧪 Testing (Futuro)

### Backend
```bash
npm test
```
- Unit tests (Jest)
- Integration tests (Supertest)

### Frontend
```bash
npm test
```
- Component tests (Vitest)
- E2E tests (Cypress)

---

## 📈 Monitoreo (Producción)

### Logs
- Winston para logging estructurado
- PM2 para gestión de procesos

### Métricas
- New Relic / DataDog
- MongoDB Atlas monitoring

### Errores
- Sentry para tracking de errores
- Alertas por email/Slack

