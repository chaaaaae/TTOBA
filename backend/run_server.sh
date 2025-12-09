# backend\run_server.sh
#!/bin/bash
echo "[FastAPI 서버 시작 중...]"
echo ""
cd "$(dirname "$0")"
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

