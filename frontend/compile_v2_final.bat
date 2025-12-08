@echo off
setlocal EnableDelayedExpansion

echo ========================================
echo   COMPILING RANKING APP v2.0
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Compiling web project...
call npm run build
if !errorlevel! neq 0 (
    echo.
    echo ERROR: Web build failed
    echo Check TypeScript errors above
    pause
    exit /b 1
)
echo SUCCESS: Web build completed
echo.

echo [2/4] Copying files to Android...
call npm exec cap copy android
if !errorlevel! neq 0 (
    echo ERROR: Failed to copy files
    pause
    exit /b 1
)
echo SUCCESS: Files copied
echo.

echo [3/4] Cleaning Android project...
cd android
call gradlew clean
echo SUCCESS: Clean completed
echo.

echo [4/4] Building APK v2.0...
call gradlew assembleDebug --rerun-tasks
if !errorlevel! neq 0 (
    echo ERROR: APK build failed
    cd ..
    pause
    exit /b 1
)
cd ..
echo.

echo ========================================
echo   APK v2.0 COMPILED SUCCESSFULLY
echo ========================================
echo.

for /f "tokens=*" %%F in ('dir /b /s android\app\build\outputs\apk\debug\*.apk 2^>nul') do (
    echo APK File: %%~nxF
    echo Location: %%F
    set /a size=%%~zF/1048576
    echo Size: !size! MB
    echo.
)

pause








