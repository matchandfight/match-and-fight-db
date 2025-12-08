@echo off
echo ================================================
echo  COMPILANDO RANKING APP v2.0
echo  Nombre: RankingApp-v2.0-TIMESTAMP
echo ================================================
echo.

cd /d "%~dp0"

echo [1/4] Compilando proyecto web...
call npm run build
if errorlevel 1 (
    echo ERROR en build
    pause
    exit /b 1
)
echo OK: Build completado
echo.

echo [2/4] Copiando a Android...
call npm exec cap copy android
if errorlevel 1 (
    echo ERROR en copy
    pause
    exit /b 1
)
echo OK: Archivos copiados
echo.

echo [3/4] Limpiando Android...
cd android
call gradlew clean
echo OK: Limpieza completada
echo.

echo [4/4] Compilando APK v2.0...
call gradlew assembleDebug --rerun-tasks
if errorlevel 1 (
    echo ERROR al compilar APK
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo ================================================
echo  APK v2.0 COMPILADO EXITOSAMENTE
echo ================================================
echo.

for /f "tokens=*" %%F in ('dir /b /s android\app\build\outputs\apk\debug\*.apk 2^>nul') do (
    echo APK: %%~nxF
    echo Ubicacion: %%F
    echo Tamaño: %%~zF bytes
    echo.
)

pause








