from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.soil import SoilInput, SoilAnalysisResponse
from app.services.soil_service import soil_service
from app.models.soil import SoilData
from app.models.farmer import Farm
import uuid

router = APIRouter(prefix="/soil", tags=["Soil Intelligence"])

@router.post("/analyze", response_model=SoilAnalysisResponse)
def analyze_soil_data(data: SoilInput, db: Session = Depends(get_db)):
    # 1. Run scientific rule-evaluation
    result = soil_service.analyze_soil(data)
    
    # 2. Persist record to database if farm exists
    farm = None
    if data.farm_id:
        farm = db.query(Farm).filter(Farm.id == data.farm_id).first()
    if not farm:
        farm = db.query(Farm).first()

    soil_record = SoilData(
        id=str(uuid.uuid4()),
        farm_id=farm.id if farm else None,
        field_name="Sensor / Test Input",
        ph=data.ph,
        nitrogen=data.nitrogen,
        phosphorus=data.phosphorus,
        potassium=data.potassium,
        moisture=data.moisture,
        temperature=data.temperature,
        organic_matter=data.organic_matter,
        soil_type=data.soil_type or "Loamy",
        notes=result.soil_summary
    )
    db.add(soil_record)
    db.commit()
    
    result.id = soil_record.id
    return result

@router.get("/latest/{farmer_id}")
def get_latest_soil_record(farmer_id: str, db: Session = Depends(get_db)):
    farm = db.query(Farm).filter(Farm.farmer_id == farmer_id).first()
    if not farm:
        farm = db.query(Farm).first()
    if not farm:
        return None
    latest = db.query(SoilData).filter(SoilData.farm_id == farm.id).order_by(SoilData.created_at.desc()).first()
    return latest
