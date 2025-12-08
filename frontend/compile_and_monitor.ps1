Set-Location "D:\1TB\Nueva carpeta\Proyectos\Ranking App\frontend"

# Eliminar log anterior
Remove-Item compile_log.txt -ErrorAction SilentlyContinue

# Iniciar compilación en background
$job = Start-Job -ScriptBlock {
    Set-Location "D:\1TB\Nueva carpeta\Proyectos\Ranking App\frontend"
    cmd /c compile_simple.bat
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  COMPILACION INICIADA - Job ID: $($job.Id)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Monitorear progreso
$lastSize = 0
$dots = 0
while ($job.State -eq 'Running') {
    Start-Sleep -Seconds 3
    
    if (Test-Path compile_log.txt) {
        $currentSize = (Get-Item compile_log.txt).Length
        if ($currentSize -ne $lastSize) {
            $content = Get-Content compile_log.txt -Tail 5
            Clear-Host
            Write-Host "========================================" -ForegroundColor Cyan
            Write-Host "  COMPILACION EN PROGRESO..." -ForegroundColor Cyan
            Write-Host "========================================" -ForegroundColor Cyan
            Write-Host ""
            Write-Host "Ultimas lineas del log:" -ForegroundColor Yellow
            $content | ForEach-Object { Write-Host $_ }
            Write-Host ""
            $lastSize = $currentSize
        } else {
            Write-Host "." -NoNewline -ForegroundColor Gray
            $dots++
            if ($dots -gt 10) {
                Write-Host ""
                $dots = 0
            }
        }
    }
}

# Esperar a que termine
Wait-Job $job
$result = Receive-Job $job
Remove-Job $job

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  COMPILACION COMPLETADA" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Mostrar resultado
if (Test-Path compile_log.txt) {
    $log = Get-Content compile_log.txt
    if ($log -match "ERROR") {
        Write-Host "ERRORES ENCONTRADOS:" -ForegroundColor Red
        $log | Select-String -Pattern "ERROR" | ForEach-Object { Write-Host $_ -ForegroundColor Red }
    } else {
        Write-Host "EXITO: Compilacion completada sin errores" -ForegroundColor Green
    }
}

# Mostrar info del APK
if (Test-Path "android\app\build\outputs\apk\debug\app-debug.apk") {
    $apk = Get-Item "android\app\build\outputs\apk\debug\app-debug.apk"
    Write-Host ""
    Write-Host "APK GENERADO:" -ForegroundColor Cyan
    Write-Host "  Archivo: app-debug.apk" -ForegroundColor White
    Write-Host "  Ubicacion: android\app\build\outputs\apk\debug\" -ForegroundColor White
    Write-Host "  Tamano: $([math]::Round($apk.Length/1MB, 2)) MB" -ForegroundColor White
    Write-Host "  Fecha: $($apk.LastWriteTime)" -ForegroundColor White
}

Write-Host ""
Read-Host "Presiona Enter para salir"








