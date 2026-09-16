from sqlalchemy.orm import Session
from app.models.farmer import Farmer, Farm
from app.models.crop import Crop
from app.models.product import Product
from app.models.soil import SoilData
import datetime
import uuid

def seed_database(db: Session):
    # 1. Farmer & Farm
    farmer = db.query(Farmer).filter(Farmer.id == "default-farmer").first()
    if not farmer:
        farmer = Farmer(
            id="default-farmer",
            name="Ramesh Kumar",
            email="ramesh.farmer@agrinex.ai",
            phone="+91 98765 43210",
            preferred_language="English"
        )
        db.add(farmer)
        db.flush()

        farm = Farm(
            id="default-farm-1",
            farmer_id=farmer.id,
            name="Green Valley Agro Farm",
            location="Coimbatore, Tamil Nadu",
            size_hectares=2.5,
            primary_crop="Tomato",
            soil_type="Loamy Soil",
            irrigation_type="Drip Irrigation",
            water_source="Borewell + Rain Catchment",
            notes="Field equipped with inline drip system and automated filtration."
        )
        db.add(farm)
        db.flush()

        # Initial Crops
        crop1 = Crop(
            id="crop-1",
            farm_id=farm.id,
            name="Tomato",
            variety="Arka Rakshak F1",
            growth_stage="Vegetative",
            planting_date=datetime.date.today() - datetime.timedelta(days=28),
            expected_harvest_date=datetime.date.today() + datetime.timedelta(days=50),
            health_status="Healthy",
            area_hectares=1.5,
            irrigation_schedule="Every 2 Days (Drip, 45 min)",
            notes="Vigorous branching observed. First flower trusses initiating."
        )
        crop2 = Crop(
            id="crop-2",
            farm_id=farm.id,
            name="Green Chilli",
            variety="G4 Hot Pepper",
            growth_stage="Flowering",
            planting_date=datetime.date.today() - datetime.timedelta(days=45),
            expected_harvest_date=datetime.date.today() + datetime.timedelta(days=30),
            health_status="Healthy",
            area_hectares=0.75,
            irrigation_schedule="Every 3 Days (Drip, 30 min)",
            notes="Good blossom set; regular scouting for thrips ongoing."
        )
        crop3 = Crop(
            id="crop-3",
            farm_id=farm.id,
            name="Maize",
            variety="Hybrid Sweet Corn",
            growth_stage="Germination",
            planting_date=datetime.date.today() - datetime.timedelta(days=7),
            expected_harvest_date=datetime.date.today() + datetime.timedelta(days=80),
            health_status="Healthy",
            area_hectares=0.25,
            irrigation_schedule="Every 4 Days (Sprinkler)",
            notes="Uniform emergence across all rows."
        )
        db.add_all([crop1, crop2, crop3])

        # Initial Soil Baseline
        soil = SoilData(
            id="soil-1",
            farm_id=farm.id,
            field_name="North Parcel (Tomato)",
            ph=6.5,
            nitrogen=142.0,
            phosphorus=48.0,
            potassium=215.0,
            moisture=42.0,
            temperature=28.5,
            organic_matter=2.4,
            electrical_conductivity=0.65,
            soil_type="Loamy Soil",
            notes="Optimal balanced soil condition logged from baseline sensor."
        )
        db.add(soil)

    # 2. Agricultural Products
    if db.query(Product).count() == 0:
        products = [
            Product(
                id="prod-1",
                name="Arka Rakshak F1 Tomato Seeds (50g)",
                category="Seeds",
                description="High yielding, triple-disease resistant hybrid tomato seed with exceptional firmness and deep red fruit color.",
                price=18.50,
                currency="USD",
                rating=4.9,
                in_stock=True,
                stock_count=120,
                image_url="https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80",
                is_demo=True
            ),
            Product(
                id="prod-2",
                name="Premium Soluble NPK 19:19:19 (5 kg)",
                category="Fertilizers",
                description="100% water-soluble balanced fertigation grade fertilizer. Accelerates root expansion and vegetative vigor.",
                price=24.00,
                currency="USD",
                rating=4.8,
                in_stock=True,
                stock_count=85,
                image_url="https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80",
                is_demo=True
            ),
            Product(
                id="prod-3",
                name="Cold-Pressed Neem Oil Biopesticide (1 Litre)",
                category="Organic",
                description="Pure Azadirachtin organic bio-formulation. Effective deterrent for aphids, whiteflies, mites, and leaf miners.",
                price=14.50,
                currency="USD",
                rating=4.7,
                in_stock=True,
                stock_count=60,
                image_url="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
                is_demo=True
            ),
            Product(
                id="prod-4",
                name="Smart Drip Irrigation Starter Kit (0.5 Acre)",
                category="Irrigation",
                description="Complete gravity and pump compatible drip line system with pressure-compensating emitters, filter, and fittings.",
                price=145.00,
                currency="USD",
                rating=4.9,
                in_stock=True,
                stock_count=25,
                image_url="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80",
                is_demo=True
            ),
            Product(
                id="prod-5",
                name="Soil pH & NPK Multi-Parameter Digital Probe",
                category="Tools",
                description="Instant capacitive field tester for measuring soil pH, moisture, ambient soil temperature, and EC index.",
                price=49.99,
                currency="USD",
                rating=4.6,
                in_stock=True,
                stock_count=40,
                image_url="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
                is_demo=True
            ),
            Product(
                id="prod-6",
                name="Bio-Enriched Humic Acid Granules (10 kg)",
                category="Organic",
                description="Concentrated potassium humate derived from natural leonardite. Enhances soil cation exchange capacity (CEC).",
                price=22.00,
                currency="USD",
                rating=4.8,
                in_stock=True,
                stock_count=90,
                image_url="https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=600&q=80",
                is_demo=True
            )
        ]
        db.add_all(products)

    db.commit()
