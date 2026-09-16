from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Integer, Text, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base

class Product(Base):
    __tablename__ = "products"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(150), nullable=False)
    category = Column(String(50), nullable=False)  # Seeds, Fertilizers, Organic, Irrigation, Tools
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    currency = Column(String(10), default="USD")
    rating = Column(Float, default=4.8)
    in_stock = Column(Boolean, default=True)
    stock_count = Column(Integer, default=50)
    image_url = Column(String(255), nullable=True)
    is_demo = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    farmer_id = Column(String(36), ForeignKey("farmers.id"), nullable=False)
    total_amount = Column(Float, nullable=False)
    status = Column(String(50), default="Pending")  # Pending, Confirmed, Shipped, Delivered
    shipping_address = Column(Text, nullable=True)
    items_json = Column(Text, nullable=False)  # JSON serialized items
    is_demo = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
