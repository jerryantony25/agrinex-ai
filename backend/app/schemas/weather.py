from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class HourlyForecast(BaseModel):
    time: str
    temp_c: float
    condition: str
    rain_chance: int
    icon: str

class DailyForecast(BaseModel):
    day: str
    date: str
    max_temp_c: float
    min_temp_c: float
    condition: str
    rain_chance: int
    humidity: int
    wind_speed_kmh: float

class FarmingImpact(BaseModel):
    irrigation_advisory: str
    spraying_suitability: str  # Favorable, Moderate, Unfavorable
    pest_disease_risk: str
    harvesting_window: str
    summary: str

class WeatherResponse(BaseModel):
    is_configured: bool = True
    is_live: bool = False
    status_note: str = "Weather telemetry provided via local agronomic micro-climate simulation."
    location: str
    updated_at: datetime
    current_temp_c: float
    feels_like_c: float
    humidity: int
    precipitation_prob: int
    wind_speed_kmh: float
    wind_direction: str
    uv_index: int
    condition: str
    hourly: List[HourlyForecast] = []
    daily: List[DailyForecast] = []
    farming_impact: FarmingImpact
