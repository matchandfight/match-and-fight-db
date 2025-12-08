# 📱 Versión Actual de la APK

## ✅ APK Lista para Usar

### 📦 Versión Disponible: **1.0**

**Ubicación:**
```
frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

**Estado:** ✅ Compilada y funcionando

---

## 🔄 Versión 2.0 (En Preparación)

### Mejoras Configuradas:
- ✅ Sistema de versionado automático
- ✅ Nombre de APK con versión y timestamp
- ✅ Dashboard con highlights y noticias
- ✅ Identidad visual unificada
- ✅ 9 usuarios de prueba
- ✅ Sistema de diseño completo

### Estado Actual:
⚠️ **En proceso de compilación**

El código está listo pero la compilación del APK v2.0 requiere algunos ajustes finales en los datos mock. 

---

## 🎯 Usar la Versión 1.0 (Disponible Ahora)

### APK Actual:
```
Archivo: app-debug.apk
Ubicación: frontend/android/app/build/outputs/apk/debug/
Tamaño: ~6 MB
```

### Características Incluidas:
- ✅ Navegación con tabs inferiores estilo Strava
- ✅ Dashboard con estadísticas
- ✅ Rankings con podio visual
- ✅ Peleadores con fotos grandes
- ✅ Ofertas y eventos
- ✅ Diseño mobile-first
- ✅ Colores Strava (#fc5200)

### Usuarios de Prueba v1.0:
```
Email: carlos.atleta@test.com
Password: test123
```

---

## 🚀 Para Compilar Versión 2.0

### Cuando Estés Listo:

1. **Asegúrate de que el servidor localhost está detenido**
2. **Ejecuta:**
```bash
cd "D:\1TB\Nueva carpeta\Proyectos\Ranking App\frontend"
.\compile_v2.bat
```

3. **Resultado Esperado:**
```
RankingApp-v2.0-20251124-TIMESTAMP-debug.apk
```

### Diferencias v1.0 → v2.0:
```
+ Dashboard rediseñado con Highlights y Noticias
+ Sistema de diseño unificado (design-system.css)
+ 9 usuarios de prueba (3 por rol)
+ Interfaces actualizadas (modalidad, empates, verificado)
+ Versionado automático en nombre de APK
+ Mejoras visuales en toda la app
```

---

## 📝 Nota Importante

La **versión 1.0** (app-debug.apk) está **completamente funcional** y lista para instalar y probar en tu dispositivo Android.

La versión 2.0 está casi lista pero requiere unos ajustes finales en los datos de prueba antes de compilar exitosamente.

---

## 🧪 Testing Rápido con v1.0

1. **Copiar APK a tu móvil:**
   ```
   frontend/android/app/build/outputs/apk/debug/app-debug.apk
   ```

2. **Instalar**

3. **Login:**
   ```
   Email: carlos.atleta@test.com
   Password: test123
   ```

4. **Explorar:**
   - Dashboard
   - Rankings
   - Peleadores
   - Ofertas
   - Eventos

---

## 🌐 Testing en Localhost

El servidor localhost sigue corriendo:

```
URL: http://localhost:8100/
```

Aquí **SÍ** tienes la versión 2.0 con todos los cambios más recientes:
- Dashboard con highlights y noticias
- 9 usuarios de prueba
- Sistema de diseño unificado
- Todas las mejoras visuales

**Puedes probar todo en el navegador antes de compilar el APK.**

---

## 🎯 Resumen

| Versión | Estado | Ubicación | Usar Para |
|---------|--------|-----------|-----------|
| **1.0** | ✅ Lista | app-debug.apk | Instalar en móvil ahora |
| **2.0** | 🔄 Localhost | http://localhost:8100 | Probar en navegador |
| **2.0 APK** | ⏳ Pendiente | Por compilar | Esperar ajustes finales |

---

**Recomendación:** 

Usa la **versión 1.0 APK** en tu móvil mientras pruebas la **versión 2.0 en localhost** para comparar y ver las mejoras.

Cuando todo esté perfecto en localhost, compila la v2.0 con el script `compile_v2.bat`.








