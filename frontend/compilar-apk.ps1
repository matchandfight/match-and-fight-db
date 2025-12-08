# Script de Compilación de APK para Match and Fight
Write-Host "=== COMPILANDO MATCH AND FIGHT APK ===" -ForegroundColor Cyan

# Paso 1: Compilar proyecto
Write-Host "`n[1/4] Compilando proyecto web..." -ForegroundColor Yellow
npm.cmd run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error en la compilación" -ForegroundColor Red
    exit 1
}

# Paso 2: Copiar archivos a Android
Write-Host "`n[2/4] Copiando archivos a Android..." -ForegroundColor Yellow
npm.cmd exec cap sync android
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al copiar archivos" -ForegroundColor Red
    exit 1
}

# Paso 3: Limpiar Gradle
Write-Host "`n[3/4] Limpiando proyecto Android..." -ForegroundColor Yellow
Set-Location android
.\gradlew clean
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al limpiar" -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Paso 4: Compilar APK
Write-Host "`n[4/4] Compilando APK..." -ForegroundColor Yellow
.\gradlew assembleDebug --rerun-tasks
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al compilar APK" -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Volver al directorio anterior
Set-Location ..

# Mostrar resultado
Write-Host "`n=== COMPILACIÓN EXITOSA ===" -ForegroundColor Green
Write-Host "`nAPK generada en:" -ForegroundColor Cyan
Write-Host "android\app\build\outputs\apk\debug\" -ForegroundColor White

# Listar APKs
Get-ChildItem "android\app\build\outputs\apk\debug\*.apk" | ForEach-Object {
    Write-Host "`n  $_" -ForegroundColor Green
    $size = [math]::Round($_.Length / 1MB, 2)
    Write-Host "  Tamaño: $size MB" -ForegroundColor Gray
}

Write-Host "`n=== LISTO PARA INSTALAR ===" -ForegroundColor Cyan


