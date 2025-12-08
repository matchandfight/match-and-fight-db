# Ranking App - Guía de Inicio Rápido

## 🚀 Pasos para Empezar

### 1️⃣ Configurar Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Ve a **Settings** → **API** y copia:
   - `Project URL`
   - `anon/public key`
   - `service_role key` (¡Mantenerlo secreto!)
4. Ve a **Settings** → **Database** y copia la **Connection String** (cambia `[YOUR-PASSWORD]` por tu contraseña)

### 2️⃣ Instalar Dependencias del Backend

```bash
cd backend
npm install
```

### 3️⃣ Configurar Variables de Entorno (Backend)

Crea el archivo `backend/.env`:

```env
PORT=5000
NODE_ENV=development

# Supabase
DATABASE_URL="postgresql://postgres:[TU-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# JWT
JWT_SECRET=cambia_esto_por_algo_super_secreto_y_largo
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:8100

# Elo System
ELO_K_FACTOR=32
INACTIVITY_PENALTY_DAYS=90
INACTIVITY_PENALTY_POINTS=10
```

### 4️⃣ Crear Base de Datos con Prisma

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### 5️⃣ Iniciar Backend

```bash
npm run dev
```

✅ Backend corriendo en http://localhost:5000

### 6️⃣ Instalar Dependencias del Frontend

```bash
cd frontend
npm install
```

### 7️⃣ Configurar Variables de Entorno (Frontend)

Crea el archivo `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=https://[PROJECT-REF].supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
VITE_APP_NAME=Ranking App
VITE_APP_VERSION=1.0.0
```

### 8️⃣ Iniciar Frontend

```bash
npm run dev
```

✅ Frontend corriendo en http://localhost:8100

---

## 📱 Para compilar APK (Android)

### Requisitos
- Java JDK 17 instalado
- Android SDK instalado
- Variables de entorno configuradas (ANDROID_HOME)

### Pasos

```bash
cd frontend

# Build de producción
npm run build

# Sincronizar con Capacitor
npx cap sync android

# Compilar APK
cd android
./gradlew assembleDebug
```

El APK estará en: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🌐 Deploy en Vercel (Backend)

1. Push tu código a GitHub
2. Importa el repositorio en [vercel.com](https://vercel.com)
3. Configura el **Root Directory** como `backend`
4. Añade las variables de entorno:
   - `DATABASE_URL`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET`
   - `FRONTEND_URL` (URL de tu frontend en producción)
5. Deploy automático ✅

---

## 🛠️ Comandos Útiles

### Backend
```bash
npm run dev              # Desarrollo
npm run build           # Compilar a JavaScript
npm run prisma:studio   # Ver base de datos visualmente
npm run prisma:migrate  # Crear migración
```

### Frontend
```bash
npm run dev             # Desarrollo
npm run build          # Build de producción
npm run preview        # Preview del build
```

---

## 📚 Documentación Completa

Ver [README.md](README.md) para la documentación completa.









