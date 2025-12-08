# 🐛 Guía de Debugging para APK que Crashea

## ❌ Problema Actual:
- ✅ La app funciona en navegador (localhost:8100)
- ❌ La APK se cierra inmediatamente al abrirla en móvil

---

## 🔍 Cómo Ver los Logs del Crash

### Opción 1: Android Debug Bridge (ADB) - MÁS EFECTIVA

#### Paso 1: Instalar ADB
Si no lo tienes:
- **Windows:** Viene con Android Studio
- **Ubicación:** `C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe`

#### Paso 2: Conectar tu Móvil
1. Conecta el móvil por USB
2. Habilita **"Depuración USB"** en el móvil:
   - Ajustes > Acerca del teléfono
   - Toca 7 veces en "Número de compilación"
   - Vuelve atrás > Opciones de desarrollador
   - Activa "Depuración USB"
3. Autoriza la computadora en el móvil

#### Paso 3: Verificar Conexión
```bash
# En PowerShell:
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" devices

# Deberías ver:
# List of devices attached
# ABC123XYZ    device
```

#### Paso 4: Ver Logs en Tiempo Real
```bash
# Limpiar logs antiguos
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" logcat -c

# Ver logs de la app
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" logcat | Select-String "matchandfight"

# O ver todos los errores:
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" logcat *:E

# O guardar en un archivo:
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" logcat > logs_apk.txt
```

#### Paso 5: Reproducir el Crash
1. Abre la app en el móvil
2. Espera a que crashee
3. Los logs mostrarán EXACTAMENTE qué falló

#### Qué Buscar en los Logs:
- `FATAL EXCEPTION` → Error crítico que causa el crash
- `AndroidRuntime` → Error de Java/Kotlin
- `chromium` → Error de WebView
- `Capacitor` → Error de Capacitor
- Stack trace con el archivo/línea exacta del error

---

### Opción 2: Chrome DevTools (Si el móvil se mantiene conectado)

#### Paso 1: Conectar por USB
1. Conecta el móvil
2. Habilita "Depuración USB"
3. Abre Chrome en tu PC

#### Paso 2: Inspeccionar
1. Ve a: `chrome://inspect`
2. Espera unos segundos
3. Deberías ver tu dispositivo
4. Busca "Match and Fight"
5. Haz clic en **"inspect"**

#### Paso 3: Ver Errores
- Verás la consola de JavaScript
- Errores en rojo mostrarán qué está fallando
- Network tab mostrará si fallan peticiones

---

## 🛠️ Soluciones Comunes

### Problema 1: Error "net::ERR_CLEARTEXT_NOT_PERMITTED"
**Causa:** Android bloquea HTTP

**Ya corregido en la app:**
- ✅ `android:usesCleartextTraffic="true"` en AndroidManifest.xml
- ✅ `network_security_config.xml` creado

### Problema 2: Error "Failed to load resource"
**Causa:** Archivos no encontrados o CSP bloqueando

**Solución:**
- Asegurar que `cap sync android` se ejecutó
- Verificar que dist/index.html existe

### Problema 3: Error "Cannot find module"
**Causa:** Build de producción diferente al dev

**Solución:**
- Verificar que todas las imports usen rutas correctas
- Usar `@/` alias en lugar de rutas relativas

### Problema 4: White Screen / Pantalla Blanca
**Causa:** Error de JavaScript no capturado

**Solución:**
- Ver logs con ADB
- Agregar error boundaries en React

### Problema 5: Crash inmediato sin mostrar nada
**Causa:** Error en MainActivity o configuración de Android

**Ya corregido:**
- ✅ MainActivity.java creado con package correcto
- ✅ WebView debugging habilitado

---

## 🔧 Comandos de Debugging Útiles

### Ver Información del Dispositivo:
```bash
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" shell getprop ro.build.version.release
```

### Instalar APK via ADB:
```bash
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" install -r "android\app\build\outputs\apk\debug\MatchAndFight-v2.0-20251205-1847-debug.apk"
```

### Desinstalar App:
```bash
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" uninstall com.matchandfight.app
```

### Ver Logs Filtrados por App:
```bash
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" logcat --pid=$(& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" shell pidof -s com.matchandfight.app)
```

---

## 📋 Checklist de Debugging

- [ ] Conectar móvil por USB
- [ ] Habilitar depuración USB
- [ ] Verificar dispositivo con `adb devices`
- [ ] Limpiar logs con `adb logcat -c`
- [ ] Abrir la app en el móvil
- [ ] Ver logs mientras crashea
- [ ] Identificar el error FATAL EXCEPTION
- [ ] Copiar el stack trace completo

---

## 🎯 Próximos Pasos

Una vez que tengas los logs:

1. **Busca la línea con `FATAL EXCEPTION`**
2. **Copia todo el stack trace** (20-30 líneas después)
3. **Compárteme el error** y lo arreglaré específicamente

---

## 💡 Errores Comunes y sus Soluciones

| Error en Logs | Causa | Solución |
|---------------|-------|----------|
| `ClassNotFoundException` | MainActivity no encontrada | Verificar package name |
| `SecurityException` | Permisos faltantes | Agregar al AndroidManifest |
| `WebResourceError` | Archivos no encontrados | Ejecutar cap sync |
| `ReferenceError` | Error de JavaScript | Revisar código |
| `ENOENT` | Archivo no existe | Verificar build |

---

## 🚀 Script de Compilación Corregida

He creado `compilar-apk.ps1` que hace todo automáticamente.

Para ejecutarlo:
```powershell
cd frontend
PowerShell -ExecutionPolicy Bypass -File compilar-apk.ps1
```

---

**IMPORTANTE:** Necesitamos ver los logs de ADB para saber exactamente qué está fallando.

Sin los logs, estamos adivinando. Con los logs, podemos arreglar el problema en 5 minutos.

---

## 📞 Siguiente Acción

**Opción A:** Conseguir los logs de ADB (Recomendado)
```bash
# Conectar móvil
# Ejecutar:
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" logcat > crash_logs.txt

# Abrir app (dejar que crashee)
# Ctrl+C para detener
# Abrir crash_logs.txt y buscar "FATAL"
```

**Opción B:** Usar Chrome Inspect (Si el crash no es inmediato)
```bash
# Abrir Chrome
# chrome://inspect
# Abrir app
# Hacer clic en "inspect" cuando aparezca
```

---

¿Puedes ejecutar el comando de ADB y compartirme los logs del crash? 🔍


