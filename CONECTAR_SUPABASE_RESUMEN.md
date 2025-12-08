# 🎯 Resumen: Conectar Match and Fight con Supabase

## 📦 Archivos Creados

Ya he preparado todo lo necesario para conectar tu app con Supabase:

### 1. Scripts SQL
- ✅ `SUPABASE_SETUP.sql` - Crea todas las tablas y estructura
- ✅ `SUPABASE_SEED.sql` - Inserta datos de prueba

### 2. Servicios y Configuración
- ✅ `frontend/src/services/supabase.ts` - Cliente de Supabase configurado
- ✅ `frontend/src/store/authStoreSupabase.ts` - Store de autenticación con Supabase

### 3. Documentación
- ✅ `SUPABASE_INSTRUCCIONES.md` - Guía paso a paso completa
- ✅ Este archivo - Resumen ejecutivo

---

## 🚀 Pasos para Empezar (5 minutos)

### Paso 1: Crear Cuenta en Supabase
1. Ve a https://supabase.com
2. Regístrate (gratis)
3. Crea un nuevo proyecto llamado `match-and-fight`

### Paso 2: Configurar Base de Datos
1. En Supabase, ve a **SQL Editor**
2. Copia y pega el contenido de `SUPABASE_SETUP.sql`
3. Haz clic en **Run**
4. Crea una nueva query
5. Copia y pega el contenido de `SUPABASE_SEED.sql`
6. Haz clic en **Run**

### Paso 3: Copiar Credenciales
1. Ve a **Settings > API** en Supabase
2. Copia:
   - **Project URL** (ej: `https://xxxxx.supabase.co`)
   - **anon public key** (es una cadena muy larga que empieza con `eyJ...`)

### Paso 4: Configurar la App
Abre `frontend/src/config/app.config.ts` y reemplaza:

```typescript
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // 👇 REEMPLAZA ESTOS VALORES
  supabaseUrl: 'https://xxxxx.supabase.co', // TU PROJECT URL AQUÍ
  supabaseAnonKey: 'eyJhbGciOiJ...', // TU ANON KEY AQUÍ (completa)
  
  appName: 'Match and Fight',
  appVersion: '2.0.0',
};
```

### Paso 5: Activar el Store de Supabase

**Opción A: Reemplazar el store actual (recomendado)**

```bash
cd frontend/src/store
# Hacer backup del store actual
cp authStore.ts authStore.backup.ts
# Reemplazar con la versión de Supabase
cp authStoreSupabase.ts authStore.ts
```

**Opción B: Usar directamente el nuevo store**

En los archivos que importan `authStore`, cambiar:
```typescript
// Antes
import { useAuthStore } from '@/store/authStore';

// Después
import { useAuthStore } from '@/store/authStoreSupabase';
```

### Paso 6: Compilar y Probar
```bash
cd frontend
npm.cmd run build
npm.cmd exec cap copy android
cd android
.\gradlew clean
.\gradlew assembleDebug --rerun-tasks
```

---

## 🧪 Probar la Conexión

### Usuarios de Prueba

Después de ejecutar los scripts SQL, tendrás estos usuarios de prueba:

| Rol | Email | Password |
|-----|-------|----------|
| **Atleta** | carlos.atleta@test.com | test123 |
| **Atleta** | laura.atleta@test.com | test123 |
| **Manager** | ana.manager@test.com | test123 |
| **Manager** | pedro.manager@test.com | test123 |
| **Promotor** | juan.promotor@test.com | test123 |
| **Promotor** | maria.promotor@test.com | test123 |
| **Admin** | admin@test.com | test123 |

### Verificar en Navegador (antes de compilar APK)

```bash
npm run dev
```

1. Abre http://localhost:5173
2. Intenta hacer login con alguno de los usuarios de prueba
3. Abre la consola del navegador (F12)
4. Deberías ver: `Login exitoso (Supabase):` seguido de los datos del usuario

---

## 🎛️ Configuración Avanzada

### Toggle entre Supabase y Datos Mock

El nuevo `authStoreSupabase` incluye una opción para alternar entre Supabase y datos mock:

```typescript
// En cualquier componente
import { useAuthStore } from '@/store/authStoreSupabase';

function MiComponente() {
  const setUseSupabase = useAuthStore(state => state.setUseSupabase);
  
  // Usar Supabase
  setUseSupabase(true);
  
  // Usar datos mock (sin internet)
  setUseSupabase(false);
}
```

Por defecto está configurado para usar Supabase (`useSupabase: true`).

### Variables de Entorno (Opcional)

Si no quieres hardcodear las credenciales, crea un archivo `.env` en `frontend/`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJ...
```

Luego en `app.config.ts`:
```typescript
supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://dummy.supabase.co',
supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy_key',
```

---

## 📊 Qué Está Incluido en la Base de Datos

### Tablas Creadas
- ✅ **usuarios** - Atletas, Managers, Promotores, Admins
- ✅ **peleadores** - Información de peleadores (record, ELO, etc.)
- ✅ **eventos** - Eventos y competencias
- ✅ **inscripciones** - Inscripciones de peleadores a eventos
- ✅ **combates** - Combates individuales con resultados
- ✅ **ofertas** - Ofertas de combate a peleadores

### Datos de Prueba
- 11 usuarios (diferentes roles)
- 8 peleadores con estadísticas completas
- 3 eventos (con diferentes estados)
- 3 inscripciones a eventos
- 3 ofertas de combate

### Funcionalidades
- ✅ Sistema de ranking ELO
- ✅ Gestión de eventos por categorías
- ✅ Inscripciones y matchmaking
- ✅ Historial de combates
- ✅ Índices para consultas rápidas
- ✅ Triggers para timestamps automáticos
- ✅ Row Level Security (RLS) habilitado

---

## 🔄 Próximos Pasos

### Funcionalidades Adicionales a Implementar

1. **Autenticación Completa con Supabase Auth**
   - Usar `supabase.auth.signInWithPassword()`
   - Configurar reset de password
   - Configurar verificación de email

2. **Real-time con Supabase**
   - Suscripciones a cambios en eventos
   - Notificaciones en tiempo real
   - Chat entre managers y promotores

3. **Storage para Imágenes**
   - Subir fotos de perfil
   - Subir imágenes de eventos
   - Gestión de multimedia

4. **Actualizar Otros Stores**
   - `peleadoresStore` con Supabase
   - `eventosStore` con Supabase
   - `ofertasStore` con Supabase

---

## 🆘 Solución de Problemas

### La app no conecta con Supabase
1. Verifica que las credenciales sean correctas
2. Asegúrate de que el proyecto de Supabase esté activo
3. Revisa la consola del navegador para errores
4. Prueba la conexión manual:
   ```javascript
   const { data, error } = await supabase.from('usuarios').select('count');
   console.log(data, error);
   ```

### No aparecen los datos
1. Verifica que ejecutaste ambos scripts SQL
2. Ve a Supabase > Table Editor y confirma que hay datos
3. Revisa que RLS esté configurado (ya incluido en el script)

### Error de CORS
- Supabase ya maneja CORS automáticamente
- Si tienes problemas, ve a Supabase > Settings > API > CORS

---

## 📚 Documentación

- **Guía Completa:** Ver `SUPABASE_INSTRUCCIONES.md`
- **Supabase Docs:** https://supabase.com/docs
- **JavaScript Client:** https://supabase.com/docs/reference/javascript/introduction

---

## ✅ Checklist Final

Antes de compilar la APK, asegúrate de:

- [ ] Cuenta de Supabase creada
- [ ] Proyecto creado
- [ ] Scripts SQL ejecutados (SETUP + SEED)
- [ ] Credenciales copiadas
- [ ] `app.config.ts` actualizado
- [ ] Store de Supabase activado
- [ ] Probado en navegador
- [ ] Login funciona correctamente
- [ ] Datos visibles en la app
- [ ] APK compilada
- [ ] Instalada en móvil
- [ ] Todo funciona en el dispositivo

---

**¡Ya estás listo para empezar a trabajar con datos reales en la nube!** 🚀

La base de datos está completamente configurada con:
- Sistema de usuarios multi-rol
- Gestión completa de peleadores y eventos
- Sistema ELO para rankings
- Inscripciones y matchmaking
- Y mucho más...

**¡A testear!** 🥊


