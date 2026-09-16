from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.schemas.crop import CropCreate, CropResponse, CropImageAnalysisResponse
from app.services.crop_service import crop_service
from app.models.crop import Crop

router = APIRouter(prefix="/crops", tags=["Crop Management"])

@router.get("/{farmer_id}", response_model=List[CropResponse])
def get_farmer_crops(farmer_id: str, db: Session = Depends(get_db)):
    crops = crop_service.get_crops_by_farmer(db, farmer_id)
    return crops

@router.post("", response_model=CropResponse)
def add_new_crop(crop_in: CropCreate, db: Session = Depends(get_db)):
    crop = crop_service.add_crop(db, crop_in)
    return crop

@router.post("/upload-image", response_model=CropImageAnalysisResponse)
async def upload_crop_image(
    file: UploadFile = File(...),
    crop_name: Optional[str] = Form("Tomato")
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File uploaded must be an image (JPEG, PNG, WebP).")
    
    # Read file content safely
    contents = await file.read()
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image size exceeds 10MB limit.")

    result = crop_service.analyze_crop_image(file.filename, crop_name)
    return result
