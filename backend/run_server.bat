# backend\run_server.bat
@echo off
echo [FastAPI 서버 시작 중...]
echo.
cd /d %~dp0
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
pause

