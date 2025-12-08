@echo off
echo COMPILANDO APK...
npm.cmd run build
npx cap sync android
cd android
call gradlew.bat clean assembleDebug
cd ..
echo.
echo APK en: android\app\build\outputs\apk\debug\
dir android\app\build\outputs\apk\debug\*.apk /b
pause


