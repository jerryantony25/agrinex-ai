from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.farmer import FarmCreate, FarmResponse, FarmerResponse
from app.services.farm_service import farm_service
from app.models.farmer import Farm, Farmer

router = APIRouter(prefix="/farm", tags=["Farm Management"])

@router.get("/{farmer_id}", response_model=FarmResponse)
def get_farmer_farm(farmer_id: str, db: Session = Depends(get_db)):
    # Initialize default farmer if needed
    farm_service.get_or_create_default_farmer(db)
    
    farm = farm_service.get_farm_by_farmer(db, farmer_id)
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found for this farmer.")
    return farm

@router.post("", response_model=FarmResponse)
def save_farm_details(farm_in: FarmCreate, db: Session = Depends(get_db)):
    farm = farm_service.save_or_update_farm(db, farm_in)
    return farm

@router.get("/profile/{farmer_id}", response_model=FarmerResponse)
def get_farmer_profile(farmer_id: str, db: Session = Depends(get_db)):
    farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
    if not farmer:
        farmer = farm_service.get_or_create_default_farmer(db)
    return farmer
