# 🥊 Ranking App - Plataforma de Matchmaking y Combates

Una plataforma moderna para gestionar rankings, matchmaking y combates entre atletas.

## 🌐 Demo en Vivo

🚀 **[Ver Demo](https://TU_USUARIO.github.io/Ranking-App/)** *(Actualiza con tu URL después del deploy)*

## ✨ Características

- 🔐 **Autenticación segura** con Supabase
- 📊 **Sistema de rankings** dinámicos
- 🥋 **Matchmaking inteligente** entre atletas
- 📱 **Diseño responsive** - funciona en móvil y escritorio
- ⚡ **Interfaz moderna** inspirada en Strava
- 🎨 **UI/UX optimizada** con Ionic React

## 🛠️ Tecnologías

### Frontend
- ⚛️ React 18 + TypeScript
- 🎨 Ionic React
- 🔄 Zustand (gestión de estado)
- 📡 Axios
- 🎯 React Hook Form + Zod
- ⚡ Vite

### Backend
- 🟢 Node.js + Express
- 🗄️ Supabase (PostgreSQL)
- 🔐 JWT Authentication
- 📝 Prisma ORM
- 🚀 Vercel (serverless)

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Cuenta de Supabase (gratis)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/TU_USUARIO/Ranking-App.git
cd Ranking-App
```

2. **Configurar Frontend**
```bash
cd frontend
npm install
```

3. **Configurar Backend**
```bash
cd ../backend
npm install
```

4. **Variables de Entorno**

Crea un archivo `.env` en la carpeta `backend`:

```env
DATABASE_URL="tu_url_de_supabase"
SUPABASE_URL="tu_url_de_supabase"
SUPABASE_KEY="tu_key_de_supabase"
JWT_SECRET="tu_secreto_jwt"
PORT=3000
```

5. **Inicializar Base de Datos**

Ejecuta los scripts SQL en tu proyecto de Supabase:
- `SUPABASE_SETUP.sql` - Crea las tablas
- `SUPABASE_SEED.sql` - Datos de ejemplo

6. **Ejecutar en Desarrollo**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Abre http://localhost:8100 en tu navegador 🎉

## 📱 Compilar APK (Android)

La app también puede compilarse como APK nativa. Ver [[memory:10134215]] para instrucciones detalladas.

```bash
cd frontend
npm run build
npm exec cap copy android
cd android
.\gradlew assembleDebug
```

## 🌐 Deploy

### GitHub Pages (Frontend)

El proyecto está configurado para deploy automático en GitHub Pages. Ver `GITHUB_PAGES_SETUP.md` para instrucciones completas.

```bash
git push origin main
# GitHub Actions se encarga del resto
```

### Vercel (Backend)

El backend está listo para deploy en Vercel:

1. Conecta tu repo en [vercel.com](https://vercel.com)
2. Selecciona la carpeta `backend` como directorio raíz
3. Configura las variables de entorno
4. Deploy 🚀

## 👥 Usuarios de Prueba

```
Email: admin@test.com
Password: admin123

Email: fighter@test.com
Password: fighter123
```

## 📁 Estructura del Proyecto

```
Ranking-App/
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD para GitHub Pages
├── frontend/                 # React + Ionic
│   ├── src/
│   │   ├── pages/           # Páginas de la app
│   │   ├── services/        # API calls
│   │   ├── store/           # Zustand stores
│   │   └── theme/           # Estilos CSS
│   ├── dist/                # Build de producción
│   └── android/             # Proyecto Android nativo
├── backend/                  # Node.js + Express
│   ├── src/
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── routes/          # Endpoints API
│   │   ├── middleware/      # Auth, validación
│   │   └── models/          # Modelos de datos
│   └── api/
│       └── index.ts         # Entry point Vercel
└── docs/                     # Documentación adicional
```

## 🔧 Scripts Útiles

### Frontend
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linter
```

### Backend
```bash
npm run dev          # Servidor con nodemon
npm start            # Servidor producción
npm run build        # Compilar TypeScript
```

## 📚 Documentación

- `GITHUB_PAGES_SETUP.md` - Guía de deploy en GitHub Pages
- `ARQUITECTURA.md` - Arquitectura del sistema
- `DESIGN_GUIDE.md` - Guía de diseño UI/UX
- `GUIA_COMPILACION_APK.md` - Compilar APK Android
- `SUPABASE_INSTRUCCIONES.md` - Configuración de Supabase

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🐛 Reporte de Bugs

¿Encontraste un bug? [Abre un issue](https://github.com/TU_USUARIO/Ranking-App/issues)

## 💬 Soporte

Si tienes preguntas o necesitas ayuda:
- 📧 Email: tu@email.com
- 💬 Issues: [GitHub Issues](https://github.com/TU_USUARIO/Ranking-App/issues)

---

Hecho con ❤️ por [Tu Nombre]
