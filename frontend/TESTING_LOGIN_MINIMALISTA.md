# Guía de Testing - Login Minimalista

## Testing Manual Recomendado

### 1. Verificar Login (Navegador Web)

```bash
# En el directorio frontend
npm run dev
```

**Pruebas a realizar:**
1. ✅ Abrir `http://localhost:5173/login`
2. ✅ Verificar que el formulario se ve limpio
3. ✅ Probar acceso rápido con botón "Peleador"
4. ✅ Probar acceso rápido con botón "Admin"
5. ✅ Verificar que no hay superposiciones
6. ✅ Probar login manual con:
   - Email: `carlos.atleta@test.com`
   - Password: `test123`

### 2. Verificar Registro

1. ✅ Ir a `/register`
2. ✅ Llenar todos los campos
3. ✅ Seleccionar un rol
4. ✅ Verificar el estilo consistente con Login
5. ✅ Crear cuenta de prueba

### 3. Verificar Home

1. ✅ Ir a `/home`
2. ✅ Verificar que las cards no tienen animaciones exageradas
3. ✅ Confirmar que el hero section es limpio
4. ✅ Probar botones de navegación

### 4. Responsive Testing

**Desktop (1920x1080):**
- ✅ Login centrado correctamente
- ✅ Botones no se estiran excesivamente
- ✅ Espaciado apropiado

**Tablet (768x1024):**
- ✅ Login sigue centrado
- ✅ Botones de demo en horizontal
- ✅ Cards en Home en grid

**Móvil (375x667):**
- ✅ Login se adapta al ancho
- ✅ Botones de demo en vertical
- ✅ Logo y textos escalados
- ✅ Inputs tienen 52px de alto (touch friendly)

### 5. Compilar APK (Opcional)

Si quieres probar en Android [[memory:10134215]]:

```bash
# En frontend/
npm run build
npm exec cap copy android
cd android
.\gradlew clean
.\gradlew assembleDebug --rerun-tasks
```

APK estará en: `android/app/build/outputs/apk/debug/app-debug.apk`

## Checklist Visual

### Login Page
- [ ] Logo 🥊 se muestra correctamente
- [ ] Título "Bienvenido" es prominente
- [ ] Inputs tienen iconos a la izquierda
- [ ] Botón "Iniciar Sesión" con gradiente
- [ ] Sección demo tiene 2 botones (Peleador, Admin)
- [ ] Link "Regístrate" visible al final
- [ ] No hay elementos superpuestos

### Register Page
- [ ] Misma apariencia que Login
- [ ] 4 campos: Nombre, Email, Password, Rol
- [ ] Botón "Crear Cuenta" con gradiente
- [ ] Link "Inicia sesión" al final

### Home Page
- [ ] Título con gradiente en el texto
- [ ] 3 cards con iconos
- [ ] Cards con hover sutil
- [ ] 2 botones al final
- [ ] Sin animaciones excesivas

## Problemas Conocidos Resueltos

✅ **Superposición de elementos en Login** - RESUELTO
- Se eliminaron 2 botones de demo innecesarios
- Se simplificó el diseño

✅ **CSS demasiado complejo** - RESUELTO
- Reducidas animaciones
- Simplificados efectos hover
- Eliminadas capas innecesarias

✅ **Responsive inconsistente** - RESUELTO
- Mejor uso de flexbox
- Media queries optimizadas
- Touch targets de 52px

## Usuarios de Prueba

### Peleador
- Email: `carlos.atleta@test.com`
- Password: `test123`

### Manager
- Email: `ana.manager@test.com`
- Password: `test123`

### Promotor
- Email: `juan.promotor@test.com`
- Password: `test123`

### Admin
- Email: `admin@test.com`
- Password: `test123`

## Notas

- Los cambios son compatibles con la compilación de APK existente
- No se modificó ninguna lógica de negocio
- Solo cambios visuales y de CSS
- Mantiene compatibilidad con tema dark/light




