# 🎯 Instrucciones Rápidas para GitHub Pages

## ✅ Estado Actual - TODO LISTO

- ✅ Repositorio Git inicializado
- ✅ Archivos preparados y en staging
- ✅ Build del frontend verificado (funciona correctamente)
- ✅ GitHub Actions configurado (`.github/workflows/deploy.yml`)
- ✅ Vite configurado para GitHub Pages (`base: '/Ranking-App/'`)
- ✅ `.gitignore` configurado correctamente

## 🚀 PRÓXIMOS PASOS (En orden)

### Paso 1: Configurar Git (Primera vez)

```bash
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
```

### Paso 2: Hacer el Primer Commit

```bash
git commit -m "Initial commit: Ranking App con GitHub Pages configurado"
```

### Paso 3: Crear Repositorio en GitHub

1. Ve a: https://github.com/new
2. **Nombre:** `Ranking-App` (o el que prefieras)
3. **Visibilidad:** Público (necesario para GitHub Pages gratis)
4. ❌ NO marques:
   - "Add a README file"
   - "Add .gitignore"
   - "Choose a license"
5. Click en **"Create repository"**

### Paso 4: Conectar y Subir

GitHub te mostrará comandos. Usa estos (reemplaza TU_USUARIO):

```bash
# Cambiar de 'master' a 'main' (si es necesario)
git branch -M main

# Conectar con GitHub
git remote add origin https://github.com/TU_USUARIO/Ranking-App.git

# Subir el código
git push -u origin main
```

**NOTA:** Te pedirá autenticarte:
- **Opción 1:** Usa GitHub CLI (`gh auth login`)
- **Opción 2:** Usa un Personal Access Token (Settings → Developer settings → Personal access tokens)

### Paso 5: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **"Settings"** (⚙️)
3. En el menú lateral izquierdo, busca **"Pages"**
4. En **"Build and deployment"**:
   - **Source:** Selecciona **"GitHub Actions"**
5. ¡Listo! No necesitas guardar nada más

### Paso 6: Ver tu App Online

1. Ve a la pestaña **"Actions"** en tu repo
2. Verás el workflow **"Deploy to GitHub Pages"** ejecutándose
3. Espera 2-3 minutos a que termine (✅ verde)
4. Tu app estará en:
   ```
   https://TU_USUARIO.github.io/Ranking-App/
   ```

## 📝 Comandos Completos (Copia y Pega)

```bash
# 1. Configurar Git (solo primera vez)
git config user.name "Tu Nombre"
git config user.email "tu@email.com"

# 2. Commit inicial
git commit -m "Initial commit: Ranking App con GitHub Pages"

# 3. Conectar con GitHub (reemplaza TU_USUARIO)
git branch -M main
git remote add origin https://github.com/TU_USUARIO/Ranking-App.git

# 4. Subir el código
git push -u origin main
```

## 🔄 Para Actualizar la App Después

Cada vez que hagas cambios:

```bash
cd frontend
npm run build          # Compilar cambios
cd ..
git add .
git commit -m "Descripción de tus cambios"
git push
```

GitHub Pages se actualizará automáticamente en 1-2 minutos.

## ⚠️ IMPORTANTE: Cambiar URL del Backend

Actualmente el frontend apunta al backend local. Necesitas:

1. **Deployar el backend** en Vercel u otro servicio
2. **Actualizar la URL** en `frontend/src/config/api.ts` o donde esté configurada
3. **Hacer commit y push** de los cambios

## 🎨 Si Cambias el Nombre del Repo

Si decides usar otro nombre que NO sea "Ranking-App":

1. Edita `frontend/vite.config.ts`:
```typescript
base: process.env.NODE_ENV === 'production' ? '/TU-NUEVO-NOMBRE/' : '/',
```

2. Recompila:
```bash
cd frontend
npm run build
```

3. Commit y push:
```bash
git add .
git commit -m "Update base path"
git push
```

## 🆘 Troubleshooting

### El workflow falla
- Revisa la pestaña "Actions" para ver el error
- Asegúrate de que GitHub Pages esté configurado como "GitHub Actions"

### La página muestra 404
- Verifica que el nombre del repo coincida con el `base` en `vite.config.ts`
- Asegúrate de que el workflow terminó exitosamente (✅ verde)

### Los estilos no cargan
- Problema del `base` path. Verifica `vite.config.ts`
- Recompila: `npm run build` y push

### Backend no responde
- El backend debe estar desplegado separadamente
- Actualiza la URL del API en el frontend
- Configura CORS en el backend para permitir tu dominio de GitHub Pages

## 📚 Archivos Importantes

- `.github/workflows/deploy.yml` - Configuración del deploy automático
- `frontend/vite.config.ts` - Configuración de Vite con base path
- `.gitignore` - Archivos a ignorar (excluye node_modules, etc.)
- `frontend/dist/` - Build que se sube a GitHub Pages

## ✅ Checklist Final

Antes de hacer push, verifica:

- [ ] Git configurado (user.name y user.email)
- [ ] Repositorio creado en GitHub
- [ ] Nombre del repo coincide con el `base` en vite.config.ts
- [ ] Build del frontend funciona (`npm run build`)
- [ ] Backend desplegado en otro lugar (opcional para testing)

---

**¿Listo para empezar?** Ejecuta los comandos del **Paso 1** ⬆️

