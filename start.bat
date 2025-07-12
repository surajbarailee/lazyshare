@echo off
echo ========================================
echo           LazyShare Server
echo ========================================
echo.

if "%1"=="" (
    echo Usage: start.bat "folder-path"
    echo Example: start.bat "C:\Users\YourName\Pictures"
    echo.
    echo Please provide a folder path to share.
    pause
    exit /b 1
)

echo Starting LazyShare server...
echo Shared folder: %1
echo.
echo Server will be available at:
echo - Local: http://localhost:3000
echo - LAN: http://[YOUR_IP]:3000
echo.
echo Press Ctrl+C to stop the server
echo.

node server.js %1 