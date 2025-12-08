# 🌐 Testing en Localhost

## ✅ Servidor Activo

**URL Local:** http://localhost:8100/
**URL Red:** http://192.168.1.131:8100/ (para probar en tu móvil)

---

## 👤 Credenciales de Prueba

### Usuario Atleta (Ver todo el dashboard)
```
Email: carlos.test@gmail.com
Password: password123
```

### Usuario Manager
```
Email: juan.manager@gmail.com
Password: password123
```

### Usuario Promotor
```
Email: maria.promoter@gmail.com
Password: password123
```

---

## 🧪 Flujo de Testing Recomendado

### 1. Página de Inicio
- ✅ Ver hero section
- ✅ Verificar cards de características
- ✅ Probar botones de Login/Registro

### 2. Login
- ✅ Ingresar con credenciales de prueba
- ✅ Verificar redirección al Dashboard

### 3. Dashboard (Como Atleta)
- ✅ Ver header con avatar y badges
- ✅ Verificar estadísticas visuales (Elo, Victorias, Derrotas, Combates)
- ✅ Ver barra de progreso del récord
- ✅ Revisar ofertas recientes en el feed
- ✅ Probar pull-to-refresh
- ✅ Click en sección "Explorar"

### 4. Rankings (Tab inferior)
- ✅ Ver podio animado Top 3
  - Corona flotante en 1er lugar
  - Avatares con bordes oro/plata/bronce
  - Plataformas de diferentes alturas
- ✅ Scroll por la lista de rankings
- ✅ Ver badges de tendencia (↑↓-)
- ✅ Probar filtros (Global/Nacional/Regional)
- ✅ Filtrar por clase de peso y género
- ✅ Click en una card para ver detalle

### 5. Peleadores (Tab inferior)
- ✅ Ver grid de cards con imágenes grandes
- ✅ Verificar badges flotantes (Elo, Verificado)
- ✅ Hover sobre cards para ver efecto zoom
- ✅ Usar búsqueda por nombre/alias/ciudad
- ✅ Abrir filtros con FAB (botón flotante)
- ✅ Filtrar por modalidad, clase, país
- ✅ Click en peleador para ver perfil completo

### 6. Perfil de Peleador
- ✅ Ver header animado con imagen
- ✅ Estadísticas en cards
- ✅ Información detallada
- ✅ Récord de combates

### 7. Eventos (Tab inferior)
- ✅ Ver lista de eventos
- ✅ Filtrar por fecha
- ✅ Ver detalles de evento

### 8. Ofertas/Perfil (Tab inferior)
- ✅ Ver ofertas pendientes
- ✅ Cambiar entre pestañas (Pendientes/Aceptadas/Rechazadas)
- ✅ Ver detalles de cada oferta

### 9. Navegación
- ✅ Probar todos los tabs inferiores
- ✅ Verificar animaciones de transición
- ✅ Verificar color activo (naranja Strava)

---

## 📱 Testing Mobile Responsive

### Abrir DevTools
1. Presiona `F12` en Chrome/Edge
2. Click en el ícono de móvil (Toggle device toolbar)
3. Selecciona diferentes dispositivos:
   - iPhone 12/13/14
   - Samsung Galaxy S20
   - iPad
   - Pixel 5

### Verificar
- ✅ Tabs inferiores siempre visibles
- ✅ Imágenes se adaptan al ancho
- ✅ Cards se apilan en móvil
- ✅ Touch targets suficientemente grandes
- ✅ Texto legible en pantallas pequeñas

---

## 🎨 Elementos de Diseño a Verificar

### Glassmorphism
- ✅ Fondos semi-transparentes con blur
- ✅ Bordes sutiles blancos
- ✅ Efecto de vidrio en cards

### Gradientes
- ✅ Badges de estadísticas con degradados
- ✅ Botones principales con gradiente naranja
- ✅ Overlays en imágenes de peleadores
- ✅ Plataformas del podio con gradientes

### Animaciones
- ✅ Corona flotante (float animation)
- ✅ Hover en cards (translateY + shadow)
- ✅ Zoom en imágenes al hover
- ✅ Transiciones suaves entre páginas
- ✅ Fade in al cargar contenido

### Colores Strava
- ✅ Naranja principal: #fc5200
- ✅ Verde éxito: #10b981
- ✅ Rojo peligro: #ef4444
- ✅ Dorado para 1er lugar
- ✅ Plateado para 2do lugar
- ✅ Bronce para 3er lugar

---

## 🔧 Comandos Útiles

### Detener servidor
```bash
Ctrl + C en la terminal donde corre npm run dev
```

### Reiniciar servidor
```bash
cd "D:\1TB\Nueva carpeta\Proyectos\Ranking App\frontend"
npm run dev
```

### Limpiar caché
```bash
npm run build
```

---

## 📝 Notas

- Los datos son **mock data** (datos de prueba)
- No hay conexión real a backend
- Los cambios de estado son temporales (se pierden al recargar)
- Para probar en tu móvil, usa la URL de red: http://192.168.1.131:8100/

---

## 🐛 Si Encuentras Problemas

1. **La página no carga:**
   - Verifica que el servidor esté corriendo
   - Revisa la consola del navegador (F12 > Console)

2. **Los estilos no se ven bien:**
   - Recarga con Ctrl + Shift + R (limpia caché)
   - Verifica que estés usando Chrome/Edge actualizado

3. **Las imágenes no cargan:**
   - Son URLs de ejemplo, algunas pueden no funcionar
   - Esto es normal con mock data

4. **Error de autenticación:**
   - Usa las credenciales exactas de arriba
   - Los datos se almacenan en localStorage

---

**¡Disfruta testeando tu nueva app con diseño Strava!** 🎨🚀








