@echo off
echo ========================================
echo   RANKING APP - INICIO RAPIDO
echo ========================================
echo.

echo [1/4] Verificando requisitos...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no esta instalado
    echo Descargalo de: https://nodejs.org/
    pause
    exit /b 1
)

echo [2/4] Instalando dependencias del backend...
cd backend
if not exist node_modules (
    npm install
)

echo [3/4] Instalando dependencias del frontend...
cd ..\frontend
if not exist node_modules (
    npm install
)

echo.
echo ========================================
echo   CONFIGURACION
echo ========================================
echo.
echo IMPORTANTE: Crea los archivos .env antes de continuar:
echo.
echo backend\.env con:
echo   PORT=3000
echo   MONGODB_URI=mongodb://localhost:27017/ranking-app
echo   JWT_SECRET=ranking_app_secret_key_2024
echo.
echo frontend\.env con:
echo   VITE_API_URL=http://localhost:3000/api
echo.
pause

echo.
echo [4/4] Iniciando servidores...
echo.
echo Abriendo terminal para BACKEND...
start cmd /k "cd backend && npm run dev"

timeout /t 3 >nul

echo Abriendo terminal para FRONTEND...
start cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo   RANKING APP INICIADO
echo ========================================
echo.
echo Backend: http://localhost:3000
echo Frontend: http://localhost:8100
echo.
echo Presiona cualquier tecla para cerrar...
pause >nul

