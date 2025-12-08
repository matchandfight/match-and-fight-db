# 🔍 Cómo Obtener Logs del Crash de la APK

## Tu APK actual está en:
```
frontend/android/app/build/outputs/apk/debug/MatchAndFight-v2.0-20251205-1847-debug.apk
```

---

## 🚨 MÉTODO RÁPIDO - ADB Logcat

### Paso 1: Abrir PowerShell en Windows

Presiona `Win + X` y selecciona "Windows PowerShell"

### Paso 2: Conectar el Móvil

1. Conecta tu móvil por USB
2. En el móvil:
   - Ve a **Configuración > Acerca del teléfono**
   - Toca 7 veces en **"Número de compilación"**
   - Verás: "Ahora eres un desarrollador"
   - Vuelve atrás > **Opciones de desarrollador**
   - Activa **"Depuración USB"**
3. Autoriza la computadora cuando aparezca el mensaje en el móvil

### Paso 3: Verificar Conexión

En PowerShell, ejecuta:
```powershell
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" devices
```

Deberías ver algo como:
```
List of devices attached
1234567890ABCDEF    device
```

### Paso 4: Limpiar Logs Antiguos

```powershell
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" logcat -c
```

### Paso 5: Capturar Logs del Crash

```powershell
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" logcat > crash_logs.txt
```

Este comando quedará corriendo. **DÉJALO ASÍ**.

### Paso 6: Reproducir el Crash

1. En tu móvil, abre la app "Match and Fight"
2. Espera a que crashee
3. Vuelve a la PowerShell
4. Presiona **Ctrl + C** para detener la captura de logs

### Paso 7: Ver los Logs

Abre el archivo `crash_logs.txt` que se creó en tu directorio actual.

Busca líneas con:
- **`FATAL EXCEPTION`** ← ¡ESTE ES EL ERROR!
- `AndroidRuntime`
- `Process: com.matchandfight.app`

Copia toda la sección del error (unas 20-30 líneas) y compártela.

---

## 📱 MÉTODO ALTERNATIVO - Chrome DevTools

### Paso 1: Preparar
1. Conecta el móvil por USB
2. Habilita "Depuración USB" (ver arriba)
3. Abre Chrome en tu PC

### Paso 2: Abrir DevTools
1. En Chrome, ve a: `chrome://inspect`
2. Espera unos segundos
3. Deberías ver tu dispositivo Android

### Paso 3: Abrir la App
1. Abre "Match and Fight" en tu móvil
2. En Chrome, busca "Match and Fight" en la lista
3. Haz clic en **"inspect"** debajo de la app

### Paso 4: Ver Errores
- Si la app no crashea inmediatamente, verás la consola
- Errores en rojo mostrarán qué está fallando
- Tab "Console" → Errores de JavaScript
- Tab "Network" → Peticiones fallidas

---

## 🎯 Qué Hacer con los Logs

Una vez que tengas los logs del crash:

1. **Busca la línea con `FATAL EXCEPTION`**
2. **Copia el stack trace completo** (siguiente 20-30 líneas)
3. **Búscame y muéstrame el error**
4. **Lo arreglaré inmediatamente**

---

## 📋 Ejemplo de Log de Crash

Busca algo como esto:

```
12-05 18:50:15.843 12345 12345 E AndroidRuntime: FATAL EXCEPTION: main
12-05 18:50:15.843 12345 12345 E AndroidRuntime: Process: com.matchandfight.app, PID: 12345
12-05 18:50:15.843 12345 12345 E AndroidRuntime: java.lang.RuntimeException: Unable to start activity
12-05 18:50:15.843 12345 12345 E AndroidRuntime:     at android.app.ActivityThread.performLaunchActivity
12-05 18:50:15.843 12345 12345 E AndroidRuntime:     at android.app.ActivityThread.handleLaunchActivity
12-05 18:50:15.843 12345 12345 E AndroidRuntime: Caused by: java.lang.ClassNotFoundException: 
com.rankingapp.muaythai.MainActivity
...
```

**Copia desde "FATAL EXCEPTION" hasta el final del stack trace.**

---

## 💡 Posibles Causas del Crash

Basándome en los cambios que hicimos:

### Más Probable:
1. **Package name incorrecto** - Cambió de `com.rankingapp.muaythai` a `com.matchandfight.app`
   - MainActivity puede no estar en el lugar correcto
   - build.gradle puede tener el namespace antiguo

2. **Archivos no sincronizados** - cap sync no se ejecutó correctamente

3. **Permisos faltantes** - Aunque ya los agregamos

---

## 🔧 Comandos de Emergencia

### Reinstalar Completamente:
```powershell
# Desinstalar del móvil
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" uninstall com.matchandfight.app

# Instalar de nuevo
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" install -r "android\app\build\outputs\apk\debug\MatchAndFight-v2.0-20251205-1847-debug.apk"
```

### Ver Log en Tiempo Real (Filtrado):
```powershell
& "C:\Users\Slayer\AppData\Local\Android\Sdk\platform-tools\adb.exe" logcat | Select-String -Pattern "matchandfight|AndroidRuntime|FATAL"
```

---

## ✅ Pasos Resumidos

```
1. Conectar móvil por USB
2. Habilitar Depuración USB en el móvil
3. Ejecutar: adb devices (verificar conexión)
4. Ejecutar: adb logcat > crash_logs.txt
5. Abrir la app (dejar que crashee)
6. Ctrl+C para detener
7. Abrir crash_logs.txt
8. Buscar "FATAL EXCEPTION"
9. Copiar el error completo
10. Compartir el error
```

---

**¡Con los logs puedo arreglar el problema en 5 minutos!** 🎯

¿Puedes ejecutar el ADB y compartirme los logs del crash?


