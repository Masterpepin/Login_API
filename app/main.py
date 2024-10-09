# app/main.py

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User as UserModel  # Importa el modelo de SQLAlchemy
from app.schemas import UserCreate, User  # Importa los esquemas de Pydantic
from app.crud import create_user, get_user, update_user, delete_user

app = FastAPI()

@app.post("/users/", response_model=User)
def create_user_endpoint(user: UserCreate, db: Session = Depends(get_db)):
    user_model = UserModel(**user.dict())  # Convierte el esquema a un modelo de SQLAlchemy
    return create_user(db=db, user=user_model)

@app.get("/users/{user_id}", response_model=User)
def get_user_endpoint(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.put("/users/{user_id}", response_model=User)
def update_user_endpoint(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    user_model = UserModel(**user.dict())  # Convierte el esquema a un modelo de SQLAlchemy
    updated_user = update_user(db=db, user_id=user_id, user=user_model)
    if updated_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

@app.delete("/users/{user_id}", response_model=dict)
def delete_user_endpoint(user_id: int, db: Session = Depends(get_db)):
    success = delete_user(db=db, user_id=user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted"}
