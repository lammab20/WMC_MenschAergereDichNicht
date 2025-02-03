@echo off

REM Starte das Express Backend

REM Starte das Express Backend in einem neuen Befehlsfenster
start cmd /k "cd server_showtime_ws &&  npm start"

REM Starte das Vite Frontend
cd client_showtime_vite
npm run dev
cd ..

REM Warte einen Moment, um sicherzustellen, dass das Frontend gestartet wurde, bevor das Backend gestartet wird
timeout /t 5 /nobreak



REM Halte das Skript offen, damit beide Prozesse ausgeführt werden können
pause
