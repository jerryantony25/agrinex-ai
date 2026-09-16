from fastapi import APIRouter
from app.routes.health import router as health_router
from app.routes.chat import router as chat_router
from app.routes.farm import router as farm_router
from app.routes.soil import router as soil_router
from app.routes.crops import router as crops_router
from app.routes.weather import router as weather_router
from app.routes.market import router as market_router
from app.routes.products import router as products_router

api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(chat_router)
api_router.include_router(farm_router)
api_router.include_router(soil_router)
api_router.include_router(crops_router)
api_router.include_router(weather_router)
api_router.include_router(market_router)
api_router.include_router(products_router)

__all__ = ["api_router"]
