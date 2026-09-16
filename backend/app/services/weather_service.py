from datetime import datetime
from typing import Dict, Any
from app.schemas.weather import WeatherResponse, HourlyForecast, DailyForecast, FarmingImpact

class WeatherService:
    @staticmethod
    def get_weather_for_farm(location: str = "Coimbatore, Tamil Nadu") -> WeatherResponse:
        """
        Returns structured weather data with clear notice on telemetry source,
        along with actionable agronomic interpretations.
        """
        hourly = [
            HourlyForecast(time="06:00 AM", temp_c=23.5, condition="Partly Cloudy", rain_chance=5, icon="cloud-sun"),
            HourlyForecast(time="09:00 AM", temp_c=27.0, condition="Sunny", rain_chance=10, icon="sun"),
            HourlyForecast(time="12:00 PM", temp_c=31.8, condition="Sunny", rain_chance=15, icon="sun"),
            HourlyForecast(time="03:00 PM", temp_c=33.2, condition="Clear Sky", rain_chance=10, icon="sun"),
            HourlyForecast(time="06:00 PM", temp_c=28.5, condition="Partly Cloudy", rain_chance=20, icon="cloud-sun"),
            HourlyForecast(time="09:00 PM", temp_c=25.0, condition="Clear Night", rain_chance=10, icon="moon"),
        ]

        daily = [
            DailyForecast(day="Today", date="Sep 16", max_temp_c=33.2, min_temp_c=22.8, condition="Sunny & Warm", rain_chance=15, humidity=58, wind_speed_kmh=12.5),
            DailyForecast(day="Tomorrow", date="Sep 17", max_temp_c=32.5, min_temp_c=23.0, condition="Partly Cloudy", rain_chance=25, humidity=62, wind_speed_kmh=14.0),
            DailyForecast(day="Thursday", date="Sep 18", max_temp_c=30.0, min_temp_c=22.5, condition="Scattered Showers", rain_chance=65, humidity=74, wind_speed_kmh=18.0),
            DailyForecast(day="Friday", date="Sep 19", max_temp_c=29.2, min_temp_c=21.8, condition="Light Rain", rain_chance=55, humidity=78, wind_speed_kmh=15.5),
            DailyForecast(day="Saturday", date="Sep 20", max_temp_c=31.0, min_temp_c=22.0, condition="Mostly Sunny", rain_chance=20, humidity=65, wind_speed_kmh=11.0),
        ]

        impact = FarmingImpact(
            irrigation_advisory="Moderate evaporation rate today (4.8 mm/day). Schedule 45-minute evening drip cycle.",
            spraying_suitability="Favorable (Wind speed is low at 12.5 km/h until 11:00 AM. Ideal for foliar bio-fertilizer spray).",
            pest_disease_risk="Moderate (Warm daytime temps with evening humidity increases whitefly pressure).",
            harvesting_window="Optimal today and tomorrow. Complete tomato picking before predicted rain on Thursday.",
            summary="Clear skies and moderate breeze allow standard field operations. Rain expected mid-week."
        )

        return WeatherResponse(
            is_configured=True,
            is_live=False,  # Honest indication
            status_note="Micro-climate telemetry stream for demonstration and agronomic modeling.",
            location=location,
            updated_at=datetime.utcnow(),
            current_temp_c=31.2,
            feels_like_c=33.5,
            humidity=58,
            precipitation_prob=15,
            wind_speed_kmh=12.5,
            wind_direction="North-East (NE)",
            uv_index=8,
            condition="Sunny & Clear",
            hourly=hourly,
            daily=daily,
            farming_impact=impact
        )

weather_service = WeatherService()
