from pydantic import BaseModel, Field
from typing import Optional
from datetime import date, datetime

class CropBase(BaseModel):
    name: str = Field(..., example="Tomato")
    variety: Optional[str] = Field("Arka Rakshak", example="Arka Rakshak")
    growth_stage: str = Field("Vegetative", example="Vegetative")  # Germination, Vegetative, Flowering, Fruiting, Harvesting
    planting_date: Optional[date] = Field(default_factory=date.today)
    expected_harvest_date: Optional[date] = None
    health_status: str = Field("Healthy", example="Healthy")  # Healthy, Attention Needed, Critical
    area_hectares: float = Field(1.0, ge=0.01, example=1.0)
    irrigation_schedule: Optional[str] = Field("Every 2 Days (Drip)", example="Every 2 Days (Drip)")
    notes: Optional[str] = None
    image_url: Optional[str] = None

class CropCreate(CropBase):
    farm_id: Optional[str] = None

class CropUpdate(BaseModel):
    name: Optional[str] = None
    variety: Optional[str] = None
    growth_stage: Optional[str] = None
    planting_date: Optional[date] = None
    expected_harvest_date: Optional[date] = None
    health_status: Optional[str] = None
    area_hectares: Optional[float] = None
    irrigation_schedule: Optional[str] = None
    notes: Optional[str] = None
    image_url: Optional[str] = None

class CropResponse(CropBase):
    id: str
    farm_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class CropImageAnalysisResponse(BaseModel):
    crop: str = "Unknown"
    possible_condition: str = "Analysis in progress"
    confidence: float = 0.0
    status: str = "prepared"
    ai_explanation: str
    suggested_next_step: str
    disclaimer: str = "Computer vision models provide supportive indications and are not definitive diagnoses. Always cross-examine physically with an agricultural extension officer."
