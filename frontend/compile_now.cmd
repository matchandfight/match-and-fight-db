@echo off
cd /d "%~dp0"
echo Iniciando compilacion... > compile_log.txt
echo. >> compile_log.txt

echo === PASO 1: Build Web === >> compile_log.txt
call npm run build >> compile_log.txt 2>&1
if errorlevel 1 (
    echo ERROR en build web >> compile_log.txt
    type compile_log.txt
    exit /b 1
)
echo Build web completado >> compile_log.txt
echo. >> compile_log.txt

echo === PASO 2: Copy Android === >> compile_log.txt
call npm exec cap copy android >> compile_log.txt 2>&1
if errorlevel 1 (
    echo ERROR en copy android >> compile_log.txt
    type compile_log.txt
    exit /b 1
)
echo Copy android completado >> compile_log.txt
echo. >> compile_log.txt

echo === PASO 3: Gradle Clean === >> compile_log.txt
cd android
call gradlew clean >> ..\compile_log.txt 2>&1
echo Gradle clean completado >> ..\compile_log.txt
echo. >> ..\compile_log.txt

echo === PASO 4: Gradle AssembleDebug === >> ..\compile_log.txt
call gradlew assembleDebug --rerun-tasks >> ..\compile_log.txt 2>&1
if errorlevel 1 (
    echo ERROR en gradle assembleDebug >> ..\compile_log.txt
    cd ..
    type compile_log.txt
    exit /b 1
)
cd ..
echo APK compilado exitosamente >> compile_log.txt
echo. >> compile_log.txt
echo Ubicacion: android\app\build\outputs\apk\debug\app-debug.apk >> compile_log.txt
type compile_log.txt








