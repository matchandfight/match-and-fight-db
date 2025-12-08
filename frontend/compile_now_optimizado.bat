@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   COMPILANDO APK - LOGIN MINIMALISTA
echo   Fecha: %DATE% %TIME%
echo ========================================
echo.

cd /d "%~dp0"

REM Paso 1: Build
echo [1/4] Compilando React con Vite...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Fallo en npm run build
    pause
    exit /b 1
)
echo [OK] Build completado
echo.

REM Paso 2: Copy
echo [2/4] Copiando archivos a Android...
call npm exec cap copy android
if %errorlevel% neq 0 (
    echo [ERROR] Fallo en capacitor copy
    pause
    exit /b 1
)
echo [OK] Archivos copiados
echo.

REM Paso 3: Clean
echo [3/4] Limpiando build anterior...
cd android
call gradlew clean
echo [OK] Clean completado
echo.

REM Paso 4: Build APK
echo [4/4] Compilando APK (esto puede tardar varios minutos)...
call gradlew assembleDebug --rerun-tasks
if %errorlevel% neq 0 (
    echo [ERROR] Fallo en assembleDebug
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo   COMPILACION COMPLETADA EXITOSAMENTE
echo ========================================
echo.
echo APK generado en:
echo android\app\build\outputs\apk\debug\app-debug.apk
echo.

REM Mostrar tamaño del APK
for %%F in (android\app\build\outputs\apk\debug\app-debug.apk) do (
    echo Tamaño: %%~zF bytes
)

echo.
pause



