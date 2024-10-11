# app/main.py

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Importa el middleware de CORS
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User as UserModel
from app.schemas import UserCreate, User
from app.crud import create_user, get_user, update_user, delete_user

app = FastAPI()

# Middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las orígenes. Cambia "*" por tus dominios si lo prefieres.
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

# Endpoints de la API
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
