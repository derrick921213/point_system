from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import  OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from schemas import UserCreate, UserLogin
from dependencies import get_db
from core.security import create_access_token, verify_password,pwd_context
from models import User

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login/")
async def login_for_access_token(form_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username,"user_id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register/")
def register_user(Userdata: UserCreate, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(Userdata.password)
    user = User(username=Userdata.username, email=Userdata.email, hashed_password=hashed_password)
    db.add(user)
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    return {"message": "User created successfully."}
