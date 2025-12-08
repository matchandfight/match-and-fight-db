@echo off
echo ========================================
echo   COMPILANDO MATCH AND FIGHT APK
echo ========================================

echo.
echo [1/4] Compilando proyecto web...
call npm.cmd run build
if errorlevel 1 (
    echo Error en la compilacion
    pause
    exit /b 1
)

echo.
echo [2/4] Sincronizando con Android...
call npx cap sync android
if errorlevel 1 (
    echo Error al sincronizar
    pause
    exit /b 1
)

echo.
echo [3/4] Limpiando proyecto Android...
cd android
call gradlew.bat clean
if errorlevel 1 (
    echo Error al limpiar
    cd ..
    pause
    exit /b 1
)

echo.
echo [4/4] Compilando APK Debug...
call gradlew.bat assembleDebug --rerun-tasks
if errorlevel 1 (
    echo Error al compilar APK
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo   COMPILACION EXITOSA
echo ========================================
echo.
echo APK generada en:
echo android\app\build\outputs\apk\debug\
echo.

dir android\app\build\outputs\apk\debug\*.apk

echo.
echo ========================================
echo   LISTO PARA INSTALAR
echo ========================================
pause


