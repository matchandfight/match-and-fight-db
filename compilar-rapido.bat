@echo off
echo [1/4] Build...
cd frontend
call npm.cmd run build

echo [2/4] Sync...
call npx cap sync android

echo [3/4] Compile APK...
cd android
call gradlew.bat assembleDebug

echo DONE!
dir app\build\outputs\apk\debug\*.apk


