from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.weather import WeatherResponse
from app.services.weather_service import weather_service
from app.models.farmer import Farm

router = APIRouter(prefix="/weather", tags=["Weather Intelligence"])

@router.get("/{farmer_id}", response_model=WeatherResponse)
def get_farm_weather(farmer_id: str, db: Session = Depends(get_db)):
    location = "Coimbatore, Tamil Nadu"
    farm = db.query(Farm).filter(Farm.farmer_id == farmer_id).first()
    if farm and farm.location:
        location = farm.location
    return weather_service.get_weather_for_farm(location=location)

@router.get("", response_model=WeatherResponse)
def get_default_weather():
    return weather_service.get_weather_for_farm()
