# 👥 Usuarios de Prueba

## 🔐 Contraseña Universal
**Todos los usuarios usan la misma contraseña:** `test123`

---

## 🥊 ATLETAS (Peleadores)

### 1. Carlos Martínez "El Toro"
```
Email: carlos.atleta@test.com
Password: test123
Rol: ATLETA
```
**Perfil:**
- Puntuación Elo: 1850
- Récord: 25-3-1 (18 KOs)
- Peso: 75kg (Clase A)
- Ciudad: Madrid, España

---

### 2. Laura García "La Reina"
```
Email: laura.atleta@test.com
Password: test123
Rol: ATLETA
```
**Perfil:**
- Puntuación Elo: 1780
- Récord: 20-2-0 (12 KOs)
- Peso: 58kg (Clase B)
- Ciudad: Barcelona, España

---

### 3. Miguel Silva "Thunder"
```
Email: miguel.atleta@test.com
Password: test123
Rol: ATLETA
```
**Perfil:**
- Puntuación Elo: 1720
- Récord: 15-5-2 (8 KOs)
- Peso: 68kg (Clase B)
- Ciudad: Lisboa, Portugal

---

## 👔 MANAGERS (Representantes)

### 4. Ana Rodríguez
```
Email: ana.manager@test.com
Password: test123
Rol: MANAGER
```
**Gestiona:**
- Cartera de 5-8 peleadores
- Negociación de contratos
- Gestión de ofertas

---

### 5. Pedro Sánchez
```
Email: pedro.manager@test.com
Password: test123
Rol: MANAGER
```
**Gestiona:**
- Especializado en peleadores novatos
- Búsqueda de patrocinadores
- Planificación de carreras

---

### 6. Sofía Martín
```
Email: sofia.manager@test.com
Password: test123
Rol: MANAGER
```
**Gestiona:**
- Managers de élite
- Peleadores top 10
- Eventos internacionales

---

## 🎪 PROMOTORES (Organizadores)

### 7. Juan García
```
Email: juan.promotor@test.com
Password: test123
Rol: PROMOTOR
```
**Organiza:**
- Fight Night Madrid
- Eventos en España
- 12-16 combates por evento

---

### 8. María López
```
Email: maria.promotor@test.com
Password: test123
Rol: PROMOTOR
```
**Organiza:**
- European Championship
- Eventos internacionales
- 20+ combates por evento

---

### 9. David Fernández
```
Email: david.promotor@test.com
Password: test123
Rol: PROMOTOR
```
**Organiza:**
- Regional Fight League
- Eventos locales
- Descubrimiento de talento

---

## 🎯 Funcionalidades por Rol

### ATLETA puede:
- ✅ Ver su dashboard personal
- ✅ Ver estadísticas y récord
- ✅ Recibir y gestionar ofertas de combate
- ✅ Ver rankings (su posición)
- ✅ Buscar otros peleadores
- ✅ Ver eventos disponibles
- ✅ Actualizar disponibilidad

### MANAGER puede:
- ✅ Ver dashboard de gestión
- ✅ Gestionar múltiples peleadores
- ✅ Negociar ofertas en nombre de atletas
- ✅ Ver estadísticas de su cartera
- ✅ Buscar oportunidades
- ✅ Contactar promotores

### PROMOTOR puede:
- ✅ Ver dashboard de organización
- ✅ Crear y gestionar eventos
- ✅ Enviar ofertas a peleadores
- ✅ Ver rankings para emparejamientos
- ✅ Buscar peleadores disponibles
- ✅ Gestionar cartelera de eventos
- ✅ Ver estadísticas de eventos

---

## 🧪 Flujo de Testing Recomendado

### 1. Como Atleta (Carlos)
```
1. Login: carlos.atleta@test.com / test123
2. Ver dashboard con estadísticas personales
3. Revisar ofertas pendientes
4. Ver posición en rankings
5. Buscar otros peleadores
6. Actualizar disponibilidad
```

### 2. Como Manager (Ana)
```
1. Login: ana.manager@test.com / test123
2. Ver dashboard de gestión
3. Revisar peleadores gestionados
4. Negociar ofertas
5. Buscar oportunidades
6. Ver estadísticas de cartera
```

### 3. Como Promotor (Juan)
```
1. Login: juan.promotor@test.com / test123
2. Ver dashboard de eventos
3. Crear nuevo evento
4. Buscar peleadores disponibles
5. Enviar ofertas de combate
6. Gestionar cartelera
7. Ver estadísticas de evento
```

---

## 📱 Testing Multi-Usuario

### Escenario 1: Oferta de Combate
```
1. Login como Promotor (Juan)
2. Crear oferta para Carlos Martínez
3. Logout
4. Login como Atleta (Carlos)
5. Ver notificación de nueva oferta
6. Aceptar/Rechazar oferta
```

### Escenario 2: Búsqueda de Talento
```
1. Login como Manager (Ana)
2. Buscar peleadores disponibles
3. Filtrar por clase de peso y récord
4. Ver detalles de peleadores prometedores
5. Contactar para representación
```

### Escenario 3: Organización de Evento
```
1. Login como Promotor (María)
2. Crear evento "European Championship"
3. Buscar peleadores top 10
4. Crear emparejamientos balanceados
5. Enviar múltiples ofertas
6. Gestionar respuestas
```

---

## 💾 Datos Persistentes

**Nota:** Los datos se almacenan en localStorage del navegador.

Para **resetear datos:**
```javascript
// En la consola del navegador (F12):
localStorage.clear();
location.reload();
```

---

## 🔄 Cambiar de Usuario

1. Click en el botón de cerrar sesión
2. Ingresar credenciales del nuevo usuario
3. Explorar funcionalidades del nuevo rol

---

## 📊 Datos de Prueba Incluidos

- **15 Peleadores** con datos completos
- **9 Usuarios** (3 atletas, 3 managers, 3 promotores)
- **8 Ofertas** de combate
- **4 Eventos** programados
- **4 Highlights** recientes
- **5 Noticias** actuales
- **Rankings** completos con tendencias

---

**¡Todo listo para testing completo de la aplicación!** 🚀








