from datetime import datetime
from typing import List
from app.schemas.market import MarketListResponse, MarketItemResponse

class MarketService:
    @staticmethod
    def get_market_insights() -> MarketListResponse:
        """
        Returns agricultural market commodities with prices, trends, and transparent disclaimer.
        """
        items = [
            MarketItemResponse(
                id="comm-1",
                commodity="Tomato (Hybrid / Local)",
                variety="Arka Rakshak / Shivam",
                market_name="Coimbatore Wholesale Mandi",
                location="Tamil Nadu",
                min_price=2200.0,
                max_price=2800.0,
                modal_price=2550.0,
                unit="quintal (100 kg)",
                price_change_24h=3.5,
                trend="up",
                arrival_volume_tons=45.0,
                updated_at=datetime.utcnow()
            ),
            MarketItemResponse(
                id="comm-2",
                commodity="Green Chilli (G4 / Teja)",
                variety="G4 Hybrid",
                market_name="Guntur Agricultural Market",
                location="Andhra Pradesh",
                min_price=4800.0,
                max_price=5600.0,
                modal_price=5200.0,
                unit="quintal (100 kg)",
                price_change_24h=-1.8,
                trend="down",
                arrival_volume_tons=120.0,
                updated_at=datetime.utcnow()
            ),
            MarketItemResponse(
                id="comm-3",
                commodity="Onion (Nashik Red)",
                variety="Garwa Red",
                market_name="Lasalgaon APMC Mandi",
                location="Maharashtra",
                min_price=1800.0,
                max_price=2400.0,
                modal_price=2150.0,
                unit="quintal (100 kg)",
                price_change_24h=0.0,
                trend="stable",
                arrival_volume_tons=280.0,
                updated_at=datetime.utcnow()
            ),
            MarketItemResponse(
                id="comm-4",
                commodity="Maize / Corn (Feed Grade)",
                variety="Yellow Dent",
                market_name="Davanagere Market Yard",
                location="Karnataka",
                min_price=2100.0,
                max_price=2350.0,
                modal_price=2250.0,
                unit="quintal (100 kg)",
                price_change_24h=1.2,
                trend="up",
                arrival_volume_tons=95.0,
                updated_at=datetime.utcnow()
            ),
            MarketItemResponse(
                id="comm-5",
                commodity="Cotton (Medium Staple)",
                variety="Bunny BT",
                market_name="Rajkot APMC",
                location="Gujarat",
                min_price=6800.0,
                max_price=7400.0,
                modal_price=7150.0,
                unit="quintal (100 kg)",
                price_change_24h=2.1,
                trend="up",
                arrival_volume_tons=60.0,
                updated_at=datetime.utcnow()
            ),
            MarketItemResponse(
                id="comm-6",
                commodity="Soybean (Yellow)",
                variety="JS 335",
                market_name="Indore Mandi",
                location="Madhya Pradesh",
                min_price=4200.0,
                max_price=4650.0,
                modal_price=4480.0,
                unit="quintal (100 kg)",
                price_change_24h=-0.9,
                trend="down",
                arrival_volume_tons=150.0,
                updated_at=datetime.utcnow()
            )
        ]

        return MarketListResponse(
            is_configured=True,
            is_live=False,  # Honest indication
            notice="Regional mandi benchmark prices for market awareness. Connect official APMC / AgMarknet API for live transaction quotes.",
            total_commodities=len(items),
            items=items
        )

market_service = MarketService()
