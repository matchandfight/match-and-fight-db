Write-Host "=== COMPILANDO MATCH AND FIGHT APK CORREGIDA ===" -ForegroundColor Cyan
Write-Host ""

$ErrorActionPreference = "Continue"

# Paso 1: Build
Write-Host "[1/4] Compilando proyecto web..." -ForegroundColor Yellow
npm.cmd run build
if ($LASTEXITCODE -ne 0) { 
    Write-Host "ERROR en build" -ForegroundColor Red
    exit 1 
}

# Paso 2: Sync
Write-Host "`n[2/4] Sincronizando con Android..." -ForegroundColor Yellow
npx cap sync android
if ($LASTEXITCODE -ne 0) { 
    Write-Host "ERROR en sync" -ForegroundColor Red
    exit 1 
}

# Paso 3: Clean
Write-Host "`n[3/4] Limpiando proyecto Android..." -ForegroundColor Yellow
Push-Location android
.\gradlew.bat clean
if ($LASTEXITCODE -ne 0) { 
    Pop-Location
    Write-Host "ERROR en clean" -ForegroundColor Red
    exit 1 
}

# Paso 4: Build APK
Write-Host "`n[4/4] Compilando APK..." -ForegroundColor Yellow
.\gradlew.bat assembleDebug --rerun-tasks --stacktrace
$buildSuccess = $LASTEXITCODE -eq 0
Pop-Location

if ($buildSuccess) {
    Write-Host "`n=== COMPILACION EXITOSA ===" -ForegroundColor Green
    Write-Host "`nAPK generada en:" -ForegroundColor Cyan
    Write-Host "android\app\build\outputs\apk\debug\" -ForegroundColor White
    Write-Host ""
    Get-ChildItem "android\app\build\outputs\apk\debug\*.apk" | ForEach-Object {
        Write-Host "  $($_.Name)" -ForegroundColor Green
        $sizeMB = [math]::Round($_.Length / 1MB, 2)
        Write-Host "  Tamaño: $sizeMB MB" -ForegroundColor Gray
        Write-Host "  Modificado: $($_.LastWriteTime)" -ForegroundColor Gray
    }
} else {
    Write-Host "`n=== ERROR EN COMPILACION ===" -ForegroundColor Red
    exit 1
}


