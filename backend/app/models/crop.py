from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Text, Date
from sqlalchemy.orm import relationship
from datetime import datetime, date
import uuid
from app.database import Base

class Crop(Base):
    __tablename__ = "crops"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    farm_id = Column(String(36), ForeignKey("farms.id"), nullable=False)
    name = Column(String(100), nullable=False)
    variety = Column(String(100), nullable=True)
    growth_stage = Column(String(50), default="Vegetative")  # Germination, Vegetative, Flowering, Fruiting, Harvesting
    planting_date = Column(Date, default=date.today)
    expected_harvest_date = Column(Date, nullable=True)
    health_status = Column(String(50), default="Healthy")  # Healthy, Attention Needed, Critical, Under Observation
    area_hectares = Column(Float, default=1.0)
    irrigation_schedule = Column(String(100), default="Every 2 Days (Drip)")
    notes = Column(Text, nullable=True)
    image_url = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    farm = relationship("Farm", back_populates="crops")
