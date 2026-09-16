from sqlalchemy.orm import Session
from typing import Optional, List
from app.models.farmer import Farmer, Farm
from app.schemas.farmer import FarmCreate, FarmUpdate
import uuid

class FarmService:
    @staticmethod
    def get_or_create_default_farmer(db: Session) -> Farmer:
        farmer = db.query(Farmer).filter(Farmer.id == "default-farmer").first()
        if not farmer:
            farmer = Farmer(
                id="default-farmer",
                name="Ramesh Kumar",
                email="ramesh.farmer@agrinex.ai",
                phone="+91 98765 43210",
                preferred_language="English"
            )
            db.add(farmer)
            db.commit()
            db.refresh(farmer)

            # Create default farm
            farm = Farm(
                id="default-farm-1",
                farmer_id=farmer.id,
                name="Green Valley Agro Farm",
                location="Coimbatore, Tamil Nadu",
                size_hectares=2.5,
                primary_crop="Tomato",
                soil_type="Loamy Soil",
                irrigation_type="Drip Irrigation",
                water_source="Borewell + Rain Catchment",
                notes="Parcel A has red loamy soil with subsurface drip lines installed in 2024."
            )
            db.add(farm)
            db.commit()
            db.refresh(farmer)
        return farmer

    @staticmethod
    def get_farm_by_farmer(db: Session, farmer_id: str) -> Optional[Farm]:
        farm = db.query(Farm).filter(Farm.farmer_id == farmer_id).first()
        if not farm:
            # Fallback to default farm
            return db.query(Farm).first()
        return farm

    @staticmethod
    def save_or_update_farm(db: Session, farm_in: FarmCreate) -> Farm:
        farmer_id = farm_in.farmer_id or "default-farmer"
        
        # Ensure farmer exists
        farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()
        if not farmer:
            farmer = Farmer(id=farmer_id, name="Default Farmer")
            db.add(farmer)
            db.commit()

        farm = db.query(Farm).filter(Farm.farmer_id == farmer_id).first()
        if farm:
            farm.name = farm_in.name
            farm.location = farm_in.location
            farm.size_hectares = farm_in.size_hectares
            farm.primary_crop = farm_in.primary_crop
            farm.soil_type = farm_in.soil_type
            farm.irrigation_type = farm_in.irrigation_type
            farm.water_source = farm_in.water_source or farm.water_source
            farm.notes = farm_in.notes
        else:
            farm = Farm(
                id=str(uuid.uuid4()),
                farmer_id=farmer_id,
                name=farm_in.name,
                location=farm_in.location,
                size_hectares=farm_in.size_hectares,
                primary_crop=farm_in.primary_crop,
                soil_type=farm_in.soil_type,
                irrigation_type=farm_in.irrigation_type,
                water_source=farm_in.water_source,
                notes=farm_in.notes
            )
            db.add(farm)

        db.commit()
        db.refresh(farm)
        return farm

farm_service = FarmService()
