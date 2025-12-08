# 🚀 Instrucciones para Configurar Supabase en Match and Fight

## 📋 Índice
1. [Crear Cuenta en Supabase](#1-crear-cuenta-en-supabase)
2. [Crear Proyecto](#2-crear-proyecto)
3. [Configurar Base de Datos](#3-configurar-base-de-datos)
4. [Obtener Credenciales](#4-obtener-credenciales)
5. [Configurar la App](#5-configurar-la-app)
6. [Probar la Conexión](#6-probar-la-conexión)
7. [Compilar APK](#7-compilar-apk)

---

## 1. Crear Cuenta en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en **"Start your project"** o **"Sign Up"**
3. Puedes registrarte con:
   - GitHub (recomendado)
   - Google
   - Email

---

## 2. Crear Proyecto

1. Una vez logueado, haz clic en **"New Project"**
2. Completa los siguientes datos:
   - **Name:** `match-and-fight` (o el nombre que prefieras)
   - **Database Password:** Genera una contraseña segura (¡GUÁRDALA!)
   - **Region:** Selecciona la región más cercana (ej: `Europe West (Ireland)` para España)
   - **Pricing Plan:** Selecciona **Free** (suficiente para testing)
3. Haz clic en **"Create new project"**
4. **Espera 2-3 minutos** mientras Supabase crea tu base de datos

---

## 3. Configurar Base de Datos

### 3.1. Acceder al SQL Editor

1. En el sidebar izquierdo, haz clic en el ícono **"SQL Editor"** (⚡)
2. Haz clic en **"New Query"**

### 3.2. Crear las Tablas

1. Abre el archivo `SUPABASE_SETUP.sql` (en la raíz del proyecto)
2. **Copia TODO el contenido** del archivo
3. Pégalo en el SQL Editor de Supabase
4. Haz clic en **"Run"** (o presiona `Ctrl+Enter`)
5. Deberías ver un mensaje de éxito: ✅ **"Success. No rows returned"**

### 3.3. Insertar Datos de Prueba

1. Haz clic en **"New Query"** nuevamente
2. Abre el archivo `SUPABASE_SEED.sql`
3. **Copia TODO el contenido** del archivo
4. Pégalo en el SQL Editor
5. Haz clic en **"Run"** (o presiona `Ctrl+Enter`)
6. Deberías ver mensajes indicando cuántos registros se insertaron:
   ```
   Usuarios insertados: 11
   Peleadores insertados: 8
   Eventos insertados: 3
   Inscripciones insertadas: 3
   Ofertas insertadas: 3
   ```

### 3.4. Verificar las Tablas

1. En el sidebar, haz clic en **"Table Editor"** (📊)
2. Deberías ver todas las tablas creadas:
   - ✅ usuarios
   - ✅ peleadores
   - ✅ eventos
   - ✅ inscripciones
   - ✅ combates
   - ✅ ofertas
3. Haz clic en cada tabla para ver los datos insertados

---

## 4. Obtener Credenciales

### 4.1. Ir a Project Settings

1. En el sidebar, haz clic en el ícono de **"Settings"** (⚙️)
2. Selecciona **"API"** en el menú de configuración

### 4.2. Copiar las Credenciales

Verás dos valores importantes:

#### Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```

#### anon public (API Key)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJz...
```

**¡COPIA AMBOS VALORES!** Los necesitarás en el siguiente paso.

---

## 5. Configurar la App

### 5.1. Actualizar el Archivo de Configuración

Abre el archivo `frontend/src/config/app.config.ts` y actualiza con tus credenciales:

```typescript
// Configuración de la aplicación
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // ⬇️ REEMPLAZA ESTOS VALORES CON TUS CREDENCIALES DE SUPABASE
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://TU_PROJECT_ID.supabase.co',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'TU_ANON_KEY_AQUI',
  
  appName: import.meta.env.VITE_APP_NAME || 'Match and Fight',
  appVersion: import.meta.env.VITE_APP_VERSION || '2.0.0',
};
```

### 5.2. (Opcional) Usar Variables de Entorno

Si prefieres no hardcodear las credenciales, crea archivos `.env`:

**`.env`** (para desarrollo local):
```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**`.env.production`** (para compilar la APK):
```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Nota:** Estos archivos están en `.gitignore` y no se subirán al repositorio.

---

## 6. Probar la Conexión

### 6.1. Modo Desarrollo (Navegador)

```bash
cd frontend
npm run dev
```

1. Abre el navegador en `http://localhost:5173`
2. Abre la consola del navegador (`F12`)
3. Deberías ver logs de conexión a Supabase
4. Intenta hacer login con las credenciales de prueba:
   - **Email:** `carlos.atleta@test.com`
   - **Password:** `test123` (para datos mock)

### 6.2. Verificar Conexión desde Consola

Abre la consola del navegador y ejecuta:

```javascript
// Probar conexión
const { data, error } = await supabase.from('usuarios').select('*').limit(5);
console.log('Usuarios:', data);
console.log('Error:', error);
```

Si ves los usuarios, ¡la conexión funciona! ✅

---

## 7. Compilar APK

Una vez que hayas verificado que todo funciona:

### 7.1. Compilar el Proyecto

```bash
# Asegúrate de estar en el directorio frontend
cd frontend

# Compilar para producción
npm.cmd run build

# Copiar a Android
npm.cmd exec cap copy android

# Ir a Android
cd android

# Limpiar
.\gradlew clean

# Compilar APK
.\gradlew assembleDebug --rerun-tasks
```

### 7.2. Ubicación de la APK

```
frontend/android/app/build/outputs/apk/debug/MatchAndFight-v2.0-[fecha]-debug.apk
```

### 7.3. Instalar en Móvil

1. Conecta tu móvil por USB o copia la APK al dispositivo
2. Habilita "Instalación de fuentes desconocidas"
3. Instala la APK
4. ¡Abre la app y prueba!

---

## 🎯 Credenciales de Prueba

La base de datos viene con usuarios de prueba:

### Atletas
- **Email:** `carlos.atleta@test.com` | **Password:** `test123`
- **Email:** `laura.atleta@test.com` | **Password:** `test123`
- **Email:** `miguel.atleta@test.com` | **Password:** `test123`

### Managers
- **Email:** `ana.manager@test.com` | **Password:** `test123`
- **Email:** `pedro.manager@test.com` | **Password:** `test123`
- **Email:** `sofia.manager@test.com` | **Password:** `test123`

### Promotores
- **Email:** `juan.promotor@test.com` | **Password:** `test123`
- **Email:** `maria.promotor@test.com` | **Password:** `test123`
- **Email:** `david.promotor@test.com` | **Password:** `test123`

### Super Admins
- **Email:** `admin@test.com` | **Password:** `test123`
- **Email:** `superadmin@test.com` | **Password:** `test123`

---

## 🔒 Configuración de Autenticación (Próximo Paso)

Actualmente, la app usa datos mock para autenticación. Para usar autenticación real de Supabase:

1. En Supabase, ve a **Authentication > Settings**
2. Configura el **Site URL** (URL de tu app en producción)
3. Actualiza el store `authStore.ts` para usar `supabase.auth`

(Las instrucciones detalladas se proporcionarán después de probar la conexión básica)

---

## 🐛 Solución de Problemas

### Error: "Failed to fetch"
- Verifica que las credenciales sean correctas
- Asegúrate de tener conexión a internet
- Revisa que el proyecto de Supabase esté activo

### Error: "Invalid API key"
- Verifica que copiaste la clave completa (es muy larga)
- Asegúrate de usar la clave `anon public`, no la `service_role`

### Error: "relation does not exist"
- Asegúrate de haber ejecutado `SUPABASE_SETUP.sql`
- Verifica en el Table Editor que las tablas existan

### Los datos no aparecen
- Verifica que ejecutaste `SUPABASE_SEED.sql`
- Revisa en el Table Editor que haya datos

---

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## ✅ Checklist

- [ ] Cuenta de Supabase creada
- [ ] Proyecto creado y activo
- [ ] Script `SUPABASE_SETUP.sql` ejecutado
- [ ] Script `SUPABASE_SEED.sql` ejecutado
- [ ] Tablas visibles en Table Editor
- [ ] Credenciales copiadas
- [ ] `app.config.ts` actualizado con credenciales
- [ ] Conexión probada en navegador
- [ ] APK compilada
- [ ] App instalada y funcionando en móvil

---

**¡Listo para comenzar a testear con datos reales en la nube!** 🚀

Si tienes problemas, revisa la sección de solución de problemas o contacta con el equipo de desarrollo.


