from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class MarketItemResponse(BaseModel):
    id: str
    commodity: str
    variety: str
    market_name: str
    location: str
    min_price: float
    max_price: float
    modal_price: float
    unit: str = "quintal (100 kg)"
    price_change_24h: float
    trend: str  # up, down, stable
    arrival_volume_tons: float
    updated_at: datetime
    is_live_mandis: bool = False
    data_source: str = "AgMarknet / Agricultural Mandi Feeds (Simulated Demonstration)"

class MarketListResponse(BaseModel):
    is_configured: bool = True
    is_live: bool = False
    notice: str = "Market prices reflect standard regional wholesale mandi benchmarks for educational reference. Connect official APMC API key for real-time trade settlement."
    total_commodities: int
    items: List[MarketItemResponse] = []
