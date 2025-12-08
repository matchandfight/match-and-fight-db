@echo off
echo ========================================
echo   COMPILANDO SIN CLEAN
echo ========================================

cd /d "D:\1TB\Nueva carpeta\Proyectos\Ranking App\frontend"

echo.
echo [1/3] npm exec cap copy android...
call npm exec cap copy android
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  ADVERTENCIA: cap copy tuvo errores
    echo Continuando de todas formas...
)
echo.

echo [2/3] Recreando directorio assets...
if not exist "android\app\src\main\assets" mkdir "android\app\src\main\assets"
if not exist "android\app\src\main\assets\public" mkdir "android\app\src\main\assets\public"
xcopy /E /I /Y "dist\*" "android\app\src\main\assets\public\"
echo ✅ Assets copiados manualmente
echo.

echo [3/3] gradlew assembleDebug...
cd android
call gradlew assembleDebug --rerun-tasks --no-daemon
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR en assembleDebug
    cd ..
    pause
    exit /b 1
)

cd ..
echo.
echo ========================================
echo   ✅ APK COMPILADO EXITOSAMENTE
echo ========================================
echo.
echo 📱 APK: android\app\build\outputs\apk\debug\app-debug.apk
echo.
pause








