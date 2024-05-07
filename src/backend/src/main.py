# from fastapi import FastAPI
# from config import Config
# from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String
# from databases import Database

# app = FastAPI()
# database = Database(Config.db_url)
# metadata = MetaData()
# async def connect_to_db():
#     await database.connect()
# async def disconnect_from_db():
#     await database.disconnect()
# @app.router.lifespan.on_startup
# async def startup():
#     await connect_to_db()
# @app.router.lifespan.on_shutdown
# async def shutdown():
#     await disconnect_from_db()
# @app.get("/")
# async def read_root():
#     return {"Database host": f"{Config.db_user}"}

from fastapi import FastAPI
from api.router import router as api_router
from database import init_db
app = FastAPI(title='My FastAPI Project')
init_db()
app.include_router(api_router)
