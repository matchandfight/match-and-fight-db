# Script de compilación de APK
$ErrorActionPreference = "Continue"
$ProgressPreference = "SilentlyContinue"

Write-Host "=== COMPILACION DE APK ===" -ForegroundColor Cyan
Write-Host ""

# Paso 1: Compilar proyecto web
Write-Host "1/3 Compilando proyecto web..." -ForegroundColor Yellow
Set-Location -Path $PSScriptRoot
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Fallo al compilar el proyecto web" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Proyecto web compilado" -ForegroundColor Green
Write-Host ""

# Paso 2: Copiar archivos a Android
Write-Host "2/3 Copiando archivos a Android..." -ForegroundColor Yellow
npm exec cap copy android
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Fallo al copiar archivos" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Archivos copiados" -ForegroundColor Green
Write-Host ""

# Paso 3: Compilar APK
Write-Host "3/3 Compilando APK..." -ForegroundColor Yellow
Set-Location -Path "android"
.\gradlew clean
.\gradlew assembleDebug --rerun-tasks
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Fallo al compilar APK" -ForegroundColor Red
    exit 1
}
Write-Host "✓ APK compilado exitosamente" -ForegroundColor Green
Write-Host ""

# Mostrar ubicación del APK
$apkPath = "app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $apkPath) {
    $apkSize = (Get-Item $apkPath).Length / 1MB
    Write-Host "=== APK GENERADO ===" -ForegroundColor Cyan
    Write-Host "Ubicación: android\$apkPath" -ForegroundColor White
    Write-Host "Tamaño: $([math]::Round($apkSize, 2)) MB" -ForegroundColor White
} else {
    Write-Host "ADVERTENCIA: No se encontró el APK en la ubicación esperada" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Presiona cualquier tecla para salir..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")








