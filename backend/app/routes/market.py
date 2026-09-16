from fastapi import APIRouter
from app.schemas.market import MarketListResponse
from app.services.market_service import market_service

router = APIRouter(prefix="/market", tags=["Market Information"])

@router.get("", response_model=MarketListResponse)
def get_market_insights():
    return market_service.get_market_insights()
