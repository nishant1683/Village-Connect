@echo off
powershell -NoExit -Command "$env:Path = [System.Environment]::GetEnvironmentVariable('Path','User') + ';' + [System.Environment]::GetEnvironmentVariable('Path','Machine'); Set-Location 'D:\VillageConnect\client'; npm run dev"
