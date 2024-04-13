from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .models import models
from .models.models import Base, User
from .schemas import schemas
from .dependencies import pwd_context
from .schemas.schemas import UserCreate, User as UserSchema, Token, UserLogin
from .dependencies import get_password_hash, create_access_token, get_current_user, SessionLocal
from .database import get_db

app = FastAPI()

@app.post("/register/", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    password_hash = get_password_hash(user.password)
    db_user = models.User(email=user.email, password_hash=password_hash, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.post("/token", response_model=Token)
def login_for_access_token(form_data: UserLogin, db: Session = Depends(lambda: SessionLocal())):
    user = db.query(User).filter(User.email == form_data.email).first()
    if not user or not pwd_context.verify(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me/", response_model=UserSchema)
def read_users_me(current_user: UserSchema = Depends(get_current_user)):
    return current_user