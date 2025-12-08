@echo off
cd /d "%~dp0"
echo === Compilando proyecto web ===
call npm run build
if errorlevel 1 (
    echo Error al compilar el proyecto web
    exit /b 1
)

echo === Copiando archivos a Android ===
call npm exec cap copy android
if errorlevel 1 (
    echo Error al copiar archivos
    exit /b 1
)

echo === Compilando APK ===
cd android
call gradlew clean
call gradlew assembleDebug --rerun-tasks
if errorlevel 1 (
    echo Error al compilar APK
    exit /b 1
)

echo === APK compilado exitosamente ===
echo Ubicacion: android\app\build\outputs\apk\debug\app-debug.apk
pause








