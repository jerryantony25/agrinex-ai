from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class FarmBase(BaseModel):
    name: str = Field(..., example="Green Valley Agro Farm")
    location: str = Field(..., example="Coimbatore, Tamil Nadu")
    size_hectares: float = Field(2.5, ge=0.1, example=2.5)
    primary_crop: str = Field("Tomato", example="Tomato")
    soil_type: str = Field("Loamy", example="Red Loamy")
    irrigation_type: str = Field("Drip Irrigation", example="Drip Irrigation")
    water_source: Optional[str] = Field("Borewell", example="Borewell / Canal")
    notes: Optional[str] = None

class FarmCreate(FarmBase):
    farmer_id: Optional[str] = None

class FarmUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    size_hectares: Optional[float] = None
    primary_crop: Optional[str] = None
    soil_type: Optional[str] = None
    irrigation_type: Optional[str] = None
    water_source: Optional[str] = None
    notes: Optional[str] = None

class FarmResponse(FarmBase):
    id: str
    farmer_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class FarmerBase(BaseModel):
    name: str = Field(..., example="Ramesh Kumar")
    email: Optional[str] = Field(None, example="ramesh.farmer@agrinex.ai")
    phone: Optional[str] = Field(None, example="+91 98765 43210")
    preferred_language: str = Field("English", example="English")

class FarmerCreate(FarmerBase):
    pass

class FarmerResponse(FarmerBase):
    id: str
    created_at: datetime
    farms: List[FarmResponse] = []

    class Config:
        from_attributes = True
