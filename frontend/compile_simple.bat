@echo off
echo ======================================== > compile_log.txt
echo   COMPILACION INICIADA >> compile_log.txt
echo   Fecha: %DATE% %TIME% >> compile_log.txt
echo ======================================== >> compile_log.txt
echo. >> compile_log.txt

cd /d "%~dp0"

echo [1/4] npm run build... >> compile_log.txt
call npm run build >> compile_log.txt 2>&1
if %errorlevel% neq 0 (
    echo ERROR en build >> compile_log.txt
    exit /b 1
)
echo SUCCESS build >> compile_log.txt

echo [2/4] cap copy android... >> compile_log.txt
call npm exec cap copy android >> compile_log.txt 2>&1
echo SUCCESS copy >> compile_log.txt

echo [3/4] gradlew clean... >> compile_log.txt
cd android
call gradlew clean >> ..\compile_log.txt 2>&1
echo SUCCESS clean >> ..\compile_log.txt

echo [4/4] gradlew assembleDebug... >> ..\compile_log.txt
call gradlew assembleDebug --rerun-tasks >> ..\compile_log.txt 2>&1
if %errorlevel% neq 0 (
    echo ERROR en assembleDebug >> ..\compile_log.txt
    cd ..
    exit /b 1
)
cd ..

echo ======================================== >> compile_log.txt
echo   COMPILACION COMPLETADA >> compile_log.txt
echo   APK: android\app\build\outputs\apk\debug\app-debug.apk >> compile_log.txt
echo ======================================== >> compile_log.txt

for /f %%F in ('dir /b android\app\build\outputs\apk\debug\*.apk 2^>nul') do (
    echo APK: %%F >> compile_log.txt
)

echo DONE >> compile_log.txt








