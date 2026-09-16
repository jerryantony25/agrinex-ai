from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base

class SoilData(Base):
    __tablename__ = "soil_records"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    farm_id = Column(String(36), ForeignKey("farms.id"), nullable=True)
    field_name = Column(String(100), default="Main Field")
    ph = Column(Float, nullable=False)
    nitrogen = Column(Float, nullable=False)      # mg/kg or kg/ha
    phosphorus = Column(Float, nullable=False)    # mg/kg or kg/ha
    potassium = Column(Float, nullable=False)     # mg/kg or kg/ha
    moisture = Column(Float, nullable=False)      # percentage %
    temperature = Column(Float, nullable=False)   # Celsius °C
    organic_matter = Column(Float, nullable=True) # percentage %
    electrical_conductivity = Column(Float, nullable=True) # dS/m
    soil_type = Column(String(50), default="Loamy")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    farm = relationship("Farm", back_populates="soil_records")
