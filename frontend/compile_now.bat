@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   COMPILANDO RANKING APP v2.0
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Build web...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Build falló
    pause
    exit /b 1
)
echo ✅ Build completado
echo.

echo [2/4] Copiando a Android...
call npm exec cap copy android
echo ✅ Archivos copiados
echo.

echo [3/4] Limpiando proyecto Android...
cd android
call gradlew clean >nul 2>&1
echo ✅ Limpieza completada
echo.

echo [4/4] Compilando APK...
call gradlew assembleDebug --rerun-tasks
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Compilación APK falló
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

for /f "tokens=*" %%F in ('dir /b android\app\build\outputs\apk\debug\*.apk 2^>nul') do (
    set "apkFile=%%F"
    echo 📱 APK: %%F
    for %%A in ("android\app\build\outputs\apk\debug\%%F") do (
        set /a "size=%%~zA / 1048576"
        echo 📦 Tamaño: !size! MB
    )
    echo 📂 Ubicación: android\app\build\outputs\apk\debug\
)

echo.
pause








