@echo off
REM Script de compilación completa APK
REM Optimizado para el login minimalista

echo.
echo ========================================
echo  COMPILANDO APK CON LOGIN MINIMALISTA
echo ========================================
echo.

cd /d "D:\1TB\Nueva carpeta\Proyectos\Ranking App\frontend"

echo Paso 1/4: Compilando con Vite...
call npm.cmd run build
if errorlevel 1 (
    echo ERROR: Fallo en npm build
    goto error
)
echo [OK] Vite build completado
echo.

echo Paso 2/4: Copiando archivos a Android...
call npm.cmd exec cap copy android
if errorlevel 1 (
    echo ERROR: Fallo en capacitor copy
    goto error
)
echo [OK] Archivos copiados a Android
echo.

echo Paso 3/4: Limpiando build Android anterior...
cd android
call gradlew.bat clean
echo [OK] Clean completado
echo.

echo Paso 4/4: Compilando APK (puede tardar 2-3 minutos)...
call gradlew.bat assembleDebug --rerun-tasks
if errorlevel 1 (
    echo ERROR: Fallo en assembleDebug
    cd ..
    goto error
)
cd ..

echo.
echo ========================================
echo  COMPILACION EXITOSA!
echo ========================================
echo.
echo APK ubicado en:
echo android\app\build\outputs\apk\debug\app-debug.apk
echo.

dir android\app\build\outputs\apk\debug\*.apk

echo.
echo Presiona cualquier tecla para salir...
pause >nul
exit /b 0

:error
echo.
echo ========================================
echo  ERROR EN LA COMPILACION
echo ========================================
echo.
echo Revisa los mensajes de error arriba
echo.
pause
exit /b 1



