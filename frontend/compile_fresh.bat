@echo off
echo ========================================
echo   COMPILACION FRESCA (sin cache)
echo ========================================
echo.

cd /d "D:\1TB\Nueva carpeta\Proyectos\Ranking App\frontend\android"

echo [1/2] Limpiando todo...
call gradlew clean --no-build-cache --no-daemon
if %errorlevel% neq 0 (
    echo Limpieza tuvo errores, continuando...
)

echo.
echo [2/2] Compilando APK desde cero...
call gradlew assembleDebug --no-build-cache --no-daemon --no-configuration-cache --rerun-tasks
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Compilación falló
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo   ✅ APK COMPILADO
echo ========================================
echo.
pause








