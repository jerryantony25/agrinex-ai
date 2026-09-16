from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base

class Farmer(Base):
    __tablename__ = "farmers"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=True)
    phone = Column(String(20), nullable=True)
    preferred_language = Column(String(20), default="English")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    farms = relationship("Farm", back_populates="farmer", cascade="all, delete-orphan")
    conversations = relationship("Conversation", back_populates="farmer", cascade="all, delete-orphan")

class Farm(Base):
    __tablename__ = "farms"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    farmer_id = Column(String(36), ForeignKey("farmers.id"), nullable=False)
    name = Column(String(100), nullable=False)
    location = Column(String(200), nullable=False)
    size_hectares = Column(Float, default=2.5)
    primary_crop = Column(String(100), default="Tomato")
    soil_type = Column(String(100), default="Loamy")
    irrigation_type = Column(String(100), default="Drip Irrigation")
    water_source = Column(String(100), default="Borewell")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    farmer = relationship("Farmer", back_populates="farms")
    crops = relationship("Crop", back_populates="farm", cascade="all, delete-orphan")
    soil_records = relationship("SoilData", back_populates="farm", cascade="all, delete-orphan")
    devices = relationship("IoTDevice", back_populates="farm", cascade="all, delete-orphan")
