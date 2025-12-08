@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   COMPILACION MANUAL PASO A PASO
echo ========================================
echo.

cd /d "D:\1TB\Nueva carpeta\Proyectos\Ranking App\frontend"

REM Paso 1: Matar procesos Java
echo [1/6] Matando procesos Java...
taskkill /F /IM java.exe >nul 2>&1
taskkill /F /IM javaw.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo ✅ Procesos terminados

REM Paso 2: Limpiar directorios
echo.
echo [2/6] Limpiando directorios...
rd /s /q "android\app\build" >nul 2>&1
rd /s /q "android\app\src\main\assets" >nul 2>&1
timeout /t 1 /nobreak >nul
echo ✅ Directorios limpiados

REM Paso 3: Crear directorios
echo.
echo [3/6] Creando directorios assets...
mkdir "android\app\src\main\assets" >nul 2>&1
mkdir "android\app\src\main\assets\public" >nul 2>&1
echo ✅ Directorios creados

REM Paso 4: Copiar archivos dist
echo.
echo [4/6] Copiando archivos web...
xcopy /E /I /Y "dist\*" "android\app\src\main\assets\public\" >nul
if exist "dist\index.html" (
    echo ✅ Archivos web copiados
) else (
    echo ❌ ERROR: No se encontró dist/index.html
    echo Por favor ejecuta: npm run build
    pause
    exit /b 1
)

REM Paso 5: Detener Gradle daemon
echo.
echo [5/6] Deteniendo Gradle daemon...
cd android
call gradlew --stop >nul 2>&1
timeout /t 2 /nobreak >nul
echo ✅ Daemon detenido

REM Paso 6: Compilar APK
echo.
echo [6/6] Compilando APK (esto puede tardar 2-3 minutos)...
echo.
call gradlew assembleDebug --no-daemon --rerun-tasks
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Compilación falló
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo   ✅ COMPILACION EXITOSA
echo ========================================
echo.

REM Verificar APK
if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
    for %%A in ("android\app\build\outputs\apk\debug\app-debug.apk") do (
        set /a "size=%%~zA / 1048576"
        echo 📱 APK: app-debug.apk
        echo 📦 Tamaño: !size! MB
        echo 📂 Ubicación: android\app\build\outputs\apk\debug\
        echo.
    )
) else (
    echo ⚠️  ADVERTENCIA: APK no encontrado
)

pause








