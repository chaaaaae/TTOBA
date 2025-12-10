# backend\app\main.py
import sys
from pathlib import Path

# backend 디렉토리를 Python 경로에 추가
backend_dir = Path(__file__).parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import stt as stt_router
from app.routers import answer_analysis_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "https://ttoba.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ping")
def ping():
    return {"message": "pong from backend"}


# 라우터 붙이기
app.include_router(stt_router.router)
app.include_router(answer_analysis_router.router)


# 직접 실행 시 uvicorn으로 서버 시작
if __name__ == "__main__":
    import uvicorn
    print("\n🚀 FastAPI 서버 시작 중...")
    print("📡 서버 주소: http://localhost:8000")
    print("📚 API 문서: http://localhost:8000/docs")
    print("🔧 대화형 API: http://localhost:8000/redoc")
    print("\n⚠️  종료하려면 Ctrl+C를 누르세요.\n")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )