# 🚀 Configuración de GitHub Pages

## ✅ Preparación Completada

- ✅ Repositorio Git inicializado
- ✅ `.gitignore` configurado
- ✅ Build del frontend verificado y funcionando
- ✅ GitHub Actions workflow creado
- ✅ Vite configurado para GitHub Pages

## 📝 Próximos Pasos

### 1. Crear el Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `Ranking-App` (o el nombre que prefieras)
3. NO inicialices con README, .gitignore ni LICENSE (ya los tenemos)
4. Crea el repositorio

### 2. Conectar y Subir el Código

Ejecuta estos comandos en tu terminal:

```bash
# Configurar tu identidad Git (si no lo has hecho)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Ranking App con frontend y backend"

# Conectar con GitHub (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/Ranking-App.git

# Subir el código
git push -u origin main
```

### 3. Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (⚙️)
3. En el menú lateral, click en **Pages**
4. En **Source**, selecciona **GitHub Actions**
5. Guarda los cambios

### 4. El Deploy Automático

- El workflow se ejecutará automáticamente al hacer push a `main`
- Puedes ver el progreso en la pestaña **Actions** de tu repositorio
- Una vez completado, tu app estará disponible en:
  ```
  https://TU_USUARIO.github.io/Ranking-App/
  ```

## 🔧 Configuración Actual

### Vite Config
El `base` path está configurado como `/Ranking-App/` para producción.

**⚠️ IMPORTANTE:** Si cambias el nombre del repositorio, debes actualizar:
- `frontend/vite.config.ts` - la propiedad `base`

### Estructura del Proyecto

```
Ranking App/
├── .github/
│   └── workflows/
│       └── deploy.yml       # ⬅️ GitHub Actions para deploy automático
├── frontend/
│   ├── dist/                # ⬅️ Build que se deployará
│   ├── src/
│   ├── package.json
│   └── vite.config.ts       # ⬅️ Configurado para GitHub Pages
├── backend/
│   └── ...
└── .gitignore               # ⬅️ Configurado correctamente
```

## 🔄 Workflow de Desarrollo

### Para hacer cambios y actualizar la app:

```bash
# 1. Hacer cambios en el código
# 2. Probar localmente
cd frontend
npm run dev

# 3. Commit y push
git add .
git commit -m "Descripción de cambios"
git push

# 4. GitHub Pages se actualizará automáticamente (toma 1-2 minutos)
```

## 🧪 Testing Local antes de Deploy

```bash
cd frontend
npm run build
npm run preview
```

Esto te mostrará cómo se verá en GitHub Pages.

## 📊 Monitoreo

- **Ver estado del deploy:** Pestaña "Actions" en GitHub
- **Ver la app:** https://TU_USUARIO.github.io/Ranking-App/
- **Ver logs:** Click en cualquier workflow en Actions

## ⚠️ Notas Importantes

1. **Backend:** GitHub Pages solo sirve archivos estáticos (frontend). Tu backend debe estar desplegado en otro lugar (Vercel, Railway, etc.)

2. **Variables de Entorno:** Asegúrate de que tu frontend apunte al backend correcto en producción.

3. **CORS:** El backend debe permitir peticiones desde tu dominio de GitHub Pages.

4. **Primera vez:** El primer deploy puede tardar 5-10 minutos. Los siguientes son más rápidos.

## 🔗 Siguiente Paso

Si ya tienes tu cuenta de GitHub lista, corre estos comandos para conectar:

```bash
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
git add .
git commit -m "Initial commit: Ranking App"
git remote add origin https://github.com/TU_USUARIO/Ranking-App.git
git push -u origin main
```

¡Y listo! Tu app estará online en GitHub Pages. 🎉

