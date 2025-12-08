@echo off
chcp 65001 >nul
cls
color 0A

echo.
echo ════════════════════════════════════════
echo    MATCH AND FIGHT - COMPILADOR APK
echo ════════════════════════════════════════
echo.

cd /d "%~dp0"

echo [PASO 1/4] Compilando proyecto web...
echo.
call npm.cmd run build
if errorlevel 1 goto error

echo.
echo [PASO 2/4] Sincronizando archivos con Android...
echo.
call npx cap sync android
if errorlevel 1 goto error

echo.
echo [PASO 3/4] Limpiando compilación anterior...
echo.
cd android
call gradlew.bat clean
if errorlevel 1 (
    cd ..
    goto error
)

echo.
echo [PASO 4/4] Compilando APK (esto toma 1-2 minutos)...
echo.
call gradlew.bat assembleDebug
if errorlevel 1 (
    cd ..
    goto error
)

cd ..

echo.
echo ════════════════════════════════════════
echo    ✓ COMPILACIÓN EXITOSA
echo ════════════════════════════════════════
echo.
echo APK generada en:
echo android\app\build\outputs\apk\debug\
echo.

for %%F in (android\app\build\outputs\apk\debug\*.apk) do (
    echo    ✓ %%~nxF
    set size=%%~zF
    set /a sizeMB=!size! / 1048576
    echo      Tamaño: !sizeMB! MB
)

echo.
echo ════════════════════════════════════════
echo    LISTO PARA INSTALAR EN TU MÓVIL
echo ════════════════════════════════════════
echo.
echo Presiona cualquier tecla para salir...
pause >nul
exit /b 0

:error
color 0C
echo.
echo ════════════════════════════════════════
echo    ✗ ERROR EN LA COMPILACIÓN
echo ════════════════════════════════════════
echo.
echo Revisa los mensajes de error arriba.
echo.
pause
exit /b 1


