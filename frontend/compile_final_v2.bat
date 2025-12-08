@echo off
echo ========================================
echo   INICIANDO COMPILACION
echo ========================================

cd /d "D:\1TB\Nueva carpeta\Proyectos\Ranking App\frontend"

echo.
echo [1/4] npm run build...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR en npm run build
    exit /b 1
)
echo SUCCESS: Build completado

echo.
echo [2/4] cap copy android...
call npm exec cap copy android
if %errorlevel% neq 0 (
    echo ERROR en cap copy
    exit /b 1
)
echo SUCCESS: Copy completado

echo.
echo [3/4] gradlew clean...
cd android
call gradlew clean
echo SUCCESS: Clean completado

echo.
echo [4/4] gradlew assembleDebug...
call gradlew assembleDebug --rerun-tasks
if %errorlevel% neq 0 (
    echo ERROR en assembleDebug
    cd ..
    exit /b 1
)

cd ..
echo.
echo ========================================
echo   APK COMPILADO CON EXITO
echo ========================================
echo.
echo Ubicacion: android\app\build\outputs\apk\debug\app-debug.apk
echo.








