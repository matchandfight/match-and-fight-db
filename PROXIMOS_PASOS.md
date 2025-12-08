# 🎯 Próximos Pasos - Match and Fight con Supabase

## ✅ Lo que ya está hecho:

1. ✅ Proyecto de Supabase creado: `ptmalgtkllfowdrdcage`
2. ✅ URL configurada: `https://ptmalgtkllfowdrdcage.supabase.co`
3. ✅ Store de autenticación actualizado con integración de Supabase
4. ✅ Backup del store anterior guardado en `authStore.backup.ts`
5. ✅ Scripts SQL listos para ejecutar

---

## 📋 Lo que TÚ debes hacer ahora:

### ⚠️ PASO 1: Obtener tu API Key (2 minutos)

1. Ve a tu proyecto: https://supabase.com/dashboard/project/ptmalgtkllfowdrdcage
2. Haz clic en **Settings** (⚙️) en el menú lateral izquierdo
3. Selecciona **API**
4. En la sección **Project API keys**, copia la clave **"anon public"**
   - Empieza con `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Es una cadena MUY larga (más de 100 caracteres)

### ⚠️ PASO 2: Actualizar la configuración (1 minuto)

Abre el archivo: `frontend/src/config/app.config.ts`

Busca esta línea:
```typescript
supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'TU_ANON_KEY_AQUI',
```

Reemplaza `'TU_ANON_KEY_AQUI'` con tu clave:
```typescript
supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
```

**IMPORTANTE:** Pega la clave completa entre las comillas simples.

### ⚠️ PASO 3: Crear las tablas en Supabase (3 minutos)

#### 3.1. Ejecutar SETUP (crear tablas)

1. Ve a tu proyecto: https://supabase.com/dashboard/project/ptmalgtkllfowdrdcage
2. Haz clic en **SQL Editor** (⚡) en el menú lateral
3. Haz clic en **New Query**
4. Abre el archivo `SUPABASE_SETUP.sql` en tu editor de código
5. **Copia TODO el contenido** (Ctrl+A, Ctrl+C)
6. Pégalo en el SQL Editor de Supabase
7. Haz clic en **Run** (botón verde) o presiona `Ctrl+Enter`
8. Deberías ver: ✅ **"Success. No rows returned"**

#### 3.2. Ejecutar SEED (insertar datos)

1. Haz clic en **New Query** nuevamente
2. Abre el archivo `SUPABASE_SEED.sql`
3. **Copia TODO el contenido**
4. Pégalo en el SQL Editor
5. Haz clic en **Run**
6. Al final deberías ver:
   ```
   Usuarios insertados: 11
   Peleadores insertados: 8
   Eventos insertados: 3
   Inscripciones insertadas: 3
   Ofertas insertadas: 3
   ```

#### 3.3. Verificar

1. Haz clic en **Table Editor** (📊) en el menú lateral
2. Deberías ver 6 tablas:
   - ✅ usuarios
   - ✅ peleadores
   - ✅ eventos
   - ✅ inscripciones
   - ✅ combates
   - ✅ ofertas
3. Haz clic en **usuarios** y deberás ver 11 registros

---

## 🧪 PASO 4: Probar la conexión (5 minutos)

### 4.1. Probar en Navegador (RECOMENDADO PRIMERO)

```bash
cd frontend
npm run dev
```

1. Abre http://localhost:5173
2. Intenta hacer login con:
   - **Email:** `carlos.atleta@test.com`
   - **Password:** `test123`
3. Abre la consola del navegador (F12)
4. Deberías ver:
   ```
   ✅ Login exitoso (Supabase): {id: '...', email: '...', ...}
   ```

### 4.2. Si hay errores

Si ves:
```
❌ Error en login con Supabase
🔄 Intentando con datos mock...
✅ Login exitoso (Mock)
```

Significa que:
- **La app funciona** (usa datos mock como fallback)
- **Pero Supabase NO está conectado**

Revisa:
1. ¿Copiaste la anon key correctamente en `app.config.ts`?
2. ¿Ejecutaste los scripts SQL en Supabase?
3. ¿Hay datos en la tabla usuarios?

---

## 🚀 PASO 5: Compilar la APK

Una vez que el login funcione en el navegador:

```bash
# Asegúrate de estar en frontend/
cd frontend

# Compilar
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

La APK estará en:
```
frontend/android/app/build/outputs/apk/debug/MatchAndFight-v2.0-[fecha]-debug.apk
```

---

## 🎮 Usuarios de Prueba

Después de ejecutar los scripts SQL, puedes hacer login con:

### Atletas
- `carlos.atleta@test.com` / `test123`
- `laura.atleta@test.com` / `test123`
- `miguel.atleta@test.com` / `test123`

### Managers
- `ana.manager@test.com` / `test123`
- `pedro.manager@test.com` / `test123`
- `sofia.manager@test.com` / `test123`

### Promotores
- `juan.promotor@test.com` / `test123`
- `maria.promotor@test.com` / `test123`
- `david.promotor@test.com` / `test123`

### Admins
- `admin@test.com` / `test123`
- `superadmin@test.com` / `test123`

---

## 🔧 Configuración Avanzada (Opcional)

### Alternar entre Supabase y Mock

Si quieres testear sin conexión, puedes desactivar Supabase temporalmente:

```typescript
// En cualquier componente
import { useAuthStore } from '@/store/authStore';

// Usar Supabase (por defecto)
useAuthStore.getState().setUseSupabase(true);

// Usar datos mock (sin internet)
useAuthStore.getState().setUseSupabase(false);
```

### Variables de Entorno (Recomendado para producción)

En lugar de hardcodear la anon key, puedes crear un archivo `.env`:

```env
VITE_SUPABASE_URL=https://ptmalgtkllfowdrdcage.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJ...tu-clave-completa
```

---

## 📊 Resumen de Tu Proyecto

**Project ID:** `ptmalgtkllfowdrdcage`
**URL:** `https://ptmalgtkllfowdrdcage.supabase.co`
**Dashboard:** https://supabase.com/dashboard/project/ptmalgtkllfowdrdcage

**Base de Datos:**
- 6 tablas principales
- Sistema de ranking ELO
- Gestión de eventos y combates
- Inscripciones y matchmaking
- Usuarios multi-rol

---

## ✅ Checklist

- [ ] API Key copiada desde Supabase
- [ ] `app.config.ts` actualizado con la anon key
- [ ] Script `SUPABASE_SETUP.sql` ejecutado
- [ ] Script `SUPABASE_SEED.sql` ejecutado
- [ ] 6 tablas visibles en Table Editor
- [ ] 11 usuarios visibles en la tabla usuarios
- [ ] Login probado en navegador
- [ ] Consola muestra "✅ Login exitoso (Supabase)"
- [ ] APK compilada
- [ ] App instalada en móvil
- [ ] Todo funciona en el dispositivo

---

## 🆘 Problemas Comunes

### Error: "Invalid API key"
- Verifica que copiaste la clave **completa**
- Debe empezar con `eyJhbGciOiJ`
- Asegúrate de no tener espacios al inicio/final

### Error: "relation 'usuarios' does not exist"
- No ejecutaste `SUPABASE_SETUP.sql`
- Ejecuta el script en SQL Editor

### No hay datos
- No ejecutaste `SUPABASE_SEED.sql`
- Verifica en Table Editor > usuarios

### La app usa Mock en lugar de Supabase
- Revisa la consola: ¿qué error muestra?
- Verifica la anon key en `app.config.ts`
- Asegúrate de que el proyecto de Supabase esté activo

---

## 📞 Siguientes Pasos Después de Conectar

Una vez que todo funcione:

1. **Implementar Supabase en otros stores:**
   - `peleadoresStore` para CRUD de peleadores
   - `eventosStore` para gestión de eventos
   - `ofertasStore` para ofertas de combate

2. **Configurar Supabase Auth:**
   - Autenticación real con passwords
   - Reset de contraseñas
   - Verificación de email

3. **Agregar Real-time:**
   - Notificaciones en tiempo real
   - Actualizaciones de eventos en vivo
   - Chat entre usuarios

4. **Storage para imágenes:**
   - Subir fotos de perfil
   - Imágenes de eventos
   - Galería de combates

---

**¡Estás a solo 3 pasos de tener tu app conectada a la nube!** 🚀

1. Copiar la anon key
2. Ejecutar los 2 scripts SQL
3. Probar en el navegador

¡A testear! 🥊


