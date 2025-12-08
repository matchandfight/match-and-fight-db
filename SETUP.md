# 📦 Guía de Instalación - Ranking App

## 🚀 Inicio Rápido

### 1. Instalar Backend

```bash
cd backend
npm install
```

Crea archivo `.env` en `backend/`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ranking-app
JWT_SECRET=ranking_app_secret_key_2024_muaythai_k1_españa
NODE_ENV=development
```

Iniciar backend:
```bash
npm run dev
```

El backend estará corriendo en `http://localhost:3000`

---

### 2. Instalar Frontend

```bash
cd frontend
npm install
```

Crea archivo `.env` en `frontend/`:
```env
VITE_API_URL=http://localhost:3000/api
```

Iniciar frontend:
```bash
npm start
```

La app estará corriendo en `http://localhost:8100`

---

## 📱 Compilación para Android

### Requisitos

- **Java JDK 17** (NO 21)
- **Android SDK** en: `C:\Users\Slayer\AppData\Local\Android\Sdk`
- **Gradle 8.9**

### Pasos

1. **Build del frontend**:
```bash
cd frontend
npm run build
```

2. **Copiar archivos a Android**:
```bash
npm exec cap copy android
```

3. **Configurar archivos de Android** (IMPORTANTE):

Editar `frontend/android/gradle/wrapper/gradle-wrapper.properties`:
```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.9-bin.zip
```

Editar los siguientes archivos para usar `JavaVersion.VERSION_17`:
- `frontend/android/app/capacitor.build.gradle`
- `frontend/android/capacitor-cordova-android-plugins/build.gradle`
- `frontend/node_modules/@capacitor/android/capacitor/build.gradle`
- `frontend/node_modules/@capacitor/camera/android/build.gradle`

4. **Compilar APK**:
```bash
cd android
.\gradlew clean
.\gradlew assembleDebug --rerun-tasks
```

5. **APK generado en**:
```
frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🗄️ Base de Datos

### MongoDB Local

Instala MongoDB Community Edition:
- Windows: https://www.mongodb.com/try/download/community
- Inicia el servicio MongoDB
- La BD se creará automáticamente al iniciar el backend

### MongoDB Atlas (Recomendado para producción)

1. Crea cuenta en https://www.mongodb.com/cloud/atlas
2. Crea un cluster gratuito
3. Obtén la URI de conexión
4. Actualiza `MONGODB_URI` en `.env`

---

## 🧪 Datos de Prueba

### Usuario Atleta
```
Email: atleta@test.com
Password: 123456
```

### Usuario Manager
```
Email: manager@test.com
Password: 123456
```

### Usuario Promotor
```
Email: promotor@test.com
Password: 123456
```

Para crear estos usuarios, usa el endpoint de registro o insértalos directamente en MongoDB.

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to MongoDB"
- Verifica que MongoDB esté corriendo
- Verifica la URI en `.env`

### Error: "Port 3000 already in use"
- Cambia el puerto en `.env`: `PORT=3001`
- Actualiza también en frontend `.env`: `VITE_API_URL=http://localhost:3001/api`

### Error de compilación Android: "Java version"
- Asegúrate de usar Java 17
- Ejecuta: `java -version` (debe mostrar version 17)
- Verifica que todos los `build.gradle` usen `VERSION_17`

### Error: "Gradle version"
- Usa Gradle 8.9 (NO 9.0)
- Verifica `gradle-wrapper.properties`

---

## 📚 Documentación API

Una vez el backend esté corriendo, visita:
```
http://localhost:3000
```

Verás la lista de endpoints disponibles.

### Endpoints Principales

**Autenticación:**
- `POST /api/auth/registro` - Crear cuenta
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/perfil` - Obtener perfil (requiere token)

**Peleadores:**
- `GET /api/peleadores` - Listar peleadores (con filtros)
- `GET /api/peleadores/:id` - Detalle de peleador
- `POST /api/peleadores` - Crear peleador (requiere auth)

**Rankings:**
- `GET /api/rankings/global` - Ranking global
- `GET /api/rankings/pais/:pais` - Ranking por país
- `GET /api/rankings/region/:region` - Ranking regional

**Eventos:**
- `GET /api/eventos` - Listar eventos
- `GET /api/eventos/proximos` - Eventos próximos
- `POST /api/eventos` - Crear evento (requiere auth)

**Ofertas:**
- `GET /api/ofertas` - Listar ofertas
- `POST /api/ofertas` - Crear oferta (requiere auth)
- `PUT /api/ofertas/:id/responder` - Responder oferta

---

## 🔐 Autenticación

Todas las rutas protegidas requieren un token JWT en el header:

```
Authorization: Bearer <tu_token>
```

El token se obtiene al hacer login y se guarda automáticamente en `localStorage` en el frontend.

---

## 🎨 Personalización

### Colores del Tema

Edita `frontend/src/theme/variables.css` para cambiar los colores:

```css
:root {
  --ion-color-primary: #d32f2f;  /* Rojo principal */
  --ion-color-secondary: #212121; /* Negro/Gris oscuro */
  --ion-color-tertiary: #ffa726;  /* Naranja */
}
```

---

## 📞 Soporte

Para problemas o preguntas, revisa:
- README.md - Descripción general del proyecto
- Logs del backend en la consola
- Logs de la app en Chrome DevTools (F12)

---

## ✅ Checklist de Instalación

- [ ] Node.js instalado
- [ ] MongoDB instalado y corriendo
- [ ] Backend configurado (.env creado)
- [ ] Backend iniciado (`npm run dev`)
- [ ] Frontend configurado (.env creado)
- [ ] Frontend iniciado (`npm start`)
- [ ] Puedes acceder a http://localhost:8100
- [ ] Puedes crear una cuenta y hacer login

Para Android:
- [ ] Java JDK 17 instalado
- [ ] Android SDK configurado
- [ ] Gradle 8.9 configurado
- [ ] APK compilado exitosamente

