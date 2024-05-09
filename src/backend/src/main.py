from fastapi import FastAPI
from api.router import router as api_router
from config import Config
from database import init_db
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title='My FastAPI Project')
app.add_middleware(
    CORSMiddleware,
    allow_origins=Config.allow_origins,  # 允许的域名列表
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
init_db()
app.include_router(api_router)
