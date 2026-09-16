from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class SoilInput(BaseModel):
    ph: float = Field(..., ge=0.0, le=14.0, example=6.5, description="Soil pH level (0-14)")
    nitrogen: float = Field(..., ge=0.0, example=140.0, description="Nitrogen content (N) in kg/ha or mg/kg")
    phosphorus: float = Field(..., ge=0.0, example=45.0, description="Phosphorus content (P) in kg/ha or mg/kg")
    potassium: float = Field(..., ge=0.0, example=210.0, description="Potassium content (K) in kg/ha or mg/kg")
    moisture: float = Field(..., ge=0.0, le=100.0, example=42.0, description="Moisture percentage (0-100%)")
    temperature: float = Field(..., ge=-10.0, le=60.0, example=28.5, description="Soil temperature in °C")
    organic_matter: Optional[float] = Field(None, ge=0.0, le=100.0, example=2.1, description="Organic matter %")
    soil_type: Optional[str] = Field("Loamy", example="Loamy")
    farm_id: Optional[str] = None
    crop_interest: Optional[str] = Field(None, example="Tomato")

class NutrientAssessment(BaseModel):
    level: str  # Low, Optimal, High, Critical
    status_text: str
    optimal_range: str
    recommendation: str

class CropSuitability(BaseModel):
    crop_name: str
    suitability_score: int  # 0-100%
    category: str  # Highly Suitable, Moderately Suitable, Needs Amendment, Unsuitable
    reason: str

class SoilAnalysisResponse(BaseModel):
    id: Optional[str] = None
    ph_assessment: NutrientAssessment
    nitrogen_assessment: NutrientAssessment
    phosphorus_assessment: NutrientAssessment
    potassium_assessment: NutrientAssessment
    moisture_assessment: NutrientAssessment
    soil_summary: str
    crop_suitabilities: List[CropSuitability]
    irrigation_insight: str
    fertilizer_guidance: str
    caution_note: str = "This soil evaluation is an educational agronomic interpretation based on standardized chemical ranges. For precise soil remediation, please test samples at an accredited government agricultural laboratory."
    analyzed_at: datetime = Field(default_factory=datetime.utcnow)
