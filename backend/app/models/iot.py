from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base

class IoTDevice(Base):
    __tablename__ = "iot_devices"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    farm_id = Column(String(36), ForeignKey("farms.id"), nullable=False)
    device_name = Column(String(100), default="ESP32 Soil Node 01")
    device_type = Column(String(50), default="Soil & Weather Node")
    mac_address = Column(String(50), unique=True, nullable=True)
    is_active = Column(Boolean, default=False)
    last_ping = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    farm = relationship("Farm", back_populates="devices")
    readings = relationship("SensorReading", back_populates="device", cascade="all, delete-orphan")

class SensorReading(Base):
    __tablename__ = "sensor_readings"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    device_id = Column(String(36), ForeignKey("iot_devices.id"), nullable=False)
    soil_moisture = Column(Float, nullable=True)
    soil_temp = Column(Float, nullable=True)
    air_temp = Column(Float, nullable=True)
    humidity = Column(Float, nullable=True)
    battery_level = Column(Float, nullable=True)
    recorded_at = Column(DateTime, default=datetime.utcnow)
    
    device = relationship("IoTDevice", back_populates="readings")
