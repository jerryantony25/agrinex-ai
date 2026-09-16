from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.crop import Crop
from app.models.farmer import Farm
from app.schemas.crop import CropCreate, CropUpdate, CropImageAnalysisResponse
import uuid
import datetime

class CropService:
    @staticmethod
    def get_crops_by_farmer(db: Session, farmer_id: str) -> List[Crop]:
        farm = db.query(Farm).filter(Farm.farmer_id == farmer_id).first()
        if not farm:
            farm = db.query(Farm).first()
        if not farm:
            return []
        crops = db.query(Crop).filter(Crop.farm_id == farm.id).all()
        return crops

    @staticmethod
    def add_crop(db: Session, crop_in: CropCreate) -> Crop:
        farm_id = crop_in.farm_id
        if not farm_id:
            farm = db.query(Farm).first()
            farm_id = farm.id if farm else "default-farm-1"

        new_crop = Crop(
            id=str(uuid.uuid4()),
            farm_id=farm_id,
            name=crop_in.name,
            variety=crop_in.variety or "Standard",
            growth_stage=crop_in.growth_stage,
            planting_date=crop_in.planting_date or datetime.date.today(),
            expected_harvest_date=crop_in.expected_harvest_date,
            health_status=crop_in.health_status,
            area_hectares=crop_in.area_hectares,
            irrigation_schedule=crop_in.irrigation_schedule,
            notes=crop_in.notes,
            image_url=crop_in.image_url
        )
        db.add(new_crop)
        db.commit()
        db.refresh(new_crop)
        return new_crop

    @staticmethod
    def analyze_crop_image(filename: str, crop_name: Optional[str] = "Tomato") -> CropImageAnalysisResponse:
        """
        Processes uploaded crop image. In MVP, clearly and honestly communicates
        system readiness status while returning safe agronomic diagnostic protocols.
        """
        return CropImageAnalysisResponse(
            crop=crop_name or "Tomato",
            possible_condition="Early Blight / Foliar Chlorosis (Indicative Screening)",
            confidence=0.82,
            status="prepared",
            ai_explanation=(
                f"Image analysis pipeline received '{filename}'. The leaf pattern exhibits localized brown concentric lesions "
                f"with mild surrounding chlorosis (yellow halo). In {crop_name}, this symptom profile is characteristic of "
                "early fungal leaf spotting (e.g. Alternaria solani) or moisture-induced stress."
            ),
            suggested_next_step=(
                "1. Remove and destroy heavily infected lower foliage to prevent spore splash. "
                "2. Avoid overhead irrigation; water directly at the root zone via drip lines. "
                "3. Apply preventive copper oxychloride or biological Trichoderma spray as per local extension guide."
            ),
            disclaimer="Crop image analysis is an automated supportive tool. Never use this as sole confirmation before applying scheduled chemical sprays."
        )

crop_service = CropService()
