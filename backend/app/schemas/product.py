from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class ProductResponse(BaseModel):
    id: str
    name: str
    category: str
    description: str
    price: float
    currency: str = "USD"
    rating: float = 4.8
    in_stock: bool = True
    stock_count: int = 50
    image_url: Optional[str] = None
    is_demo: bool = True
    created_at: datetime

    class Config:
        from_attributes = True

class OrderItemSchema(BaseModel):
    product_id: str
    product_name: str
    quantity: int
    unit_price: float

class OrderCreate(BaseModel):
    farmer_id: str
    shipping_address: str
    items: List[OrderItemSchema]
    total_amount: float

class OrderResponse(BaseModel):
    id: str
    farmer_id: str
    total_amount: float
    status: str
    shipping_address: Optional[str] = None
    items: List[OrderItemSchema] = []
    is_demo: bool = True
    created_at: datetime

    class Config:
        from_attributes = True
