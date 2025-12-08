@echo off
echo ====================================
echo  COMPILACION APK OPTIMIZADO
echo ====================================
echo.

cd /d "%~dp0"

echo [1/4] Compilando proyecto web...
call npm run build
if errorlevel 1 (
    echo ERROR: Fallo en npm run build
    pause
    exit /b 1
)
echo OK: Proyecto web compilado
echo.

echo [2/4] Copiando archivos a Android...
call npm exec cap copy android
if errorlevel 1 (
    echo ERROR: Fallo al copiar archivos
    pause
    exit /b 1
)
echo OK: Archivos copiados
echo.

echo [3/4] Limpiando proyecto Android...
cd android
call gradlew clean
echo OK: Proyecto limpiado
echo.

echo [4/4] Compilando APK...
call gradlew assembleDebug --rerun-tasks
if errorlevel 1 (
    echo ERROR: Fallo al compilar APK
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo ====================================
echo  APK COMPILADO EXITOSAMENTE
echo ====================================
echo.
echo Ubicacion: android\app\build\outputs\apk\debug\app-debug.apk
echo.

for %%F in (android\app\build\outputs\apk\debug\app-debug.apk) do (
    echo Tamaño: %%~zF bytes
    echo Fecha: %%~tF
)

echo.
pause








