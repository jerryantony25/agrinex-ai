from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.schemas.product import ProductResponse, OrderCreate, OrderResponse
from app.services.product_service import product_service

router = APIRouter(prefix="/products", tags=["Agricultural Store"])

@router.get("", response_model=List[ProductResponse])
def get_products(
    category: Optional[str] = Query(None, description="Category filter (Seeds, Fertilizers, Organic, Irrigation, Tools)"),
    db: Session = Depends(get_db)
):
    products = product_service.get_products(db, category)
    return products

@router.post("/orders", response_model=OrderResponse)
def place_order(order_in: OrderCreate, db: Session = Depends(get_db)):
    order = product_service.create_order(db, order_in)
    return order
