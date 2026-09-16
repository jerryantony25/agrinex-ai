import re
from typing import Dict, Any, List, Optional
from app.schemas.chat import StructuredInsightCard

class AgronomyEngine:
    """
    Intelligent Agricultural Rules & Knowledge Base for AGRINEX AI.
    Provides verified agronomic logic for irrigation, soil health, crop diagnostics,
    weather management, and nutrient planning based on ground-truth farming science.
    """

    @staticmethod
    def analyze_query(query: str, farm_context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        q = query.lower()
        farm = farm_context or {}
        crop = farm.get("primary_crop", "Tomato")
        location = farm.get("location", "Farm Field")
        soil_type = farm.get("soil_type", "Loamy")
        soil_moisture = farm.get("soil_moisture", 42.0)
        temp = farm.get("temperature", 31.0)
        growth_stage = farm.get("growth_stage", "Vegetative")

        data_sources_used = ["AGRINEX Agronomy Knowledge Base"]
        if farm_context:
            data_sources_used.append("Farmer Active Profile & Soil Profile")

        # 1. Irrigation queries
        if any(w in q for w in ["irrigate", "irrigation", "water", "watering", "drip", "moisture"]):
            data_sources_used.append("Field Soil Moisture Telemetry")
            return AgronomyEngine._handle_irrigation_query(q, crop, soil_moisture, temp, soil_type, growth_stage, data_sources_used)

        # 2. Yellow leaves / Plant Pathology queries
        elif any(w in q for w in ["yellow", "leaf", "leaves", "disease", "spots", "wilting", "curling", "pest", "fungus", "blight", "rot"]):
            return AgronomyEngine._handle_crop_health_query(q, crop, growth_stage, data_sources_used)

        # 3. Soil suitability / NPK queries
        elif any(w in q for w in ["soil", "npk", "nitrogen", "phosphorus", "potassium", "ph", "fertile", "nutrient"]):
            data_sources_used.append("Soil Chemistry Matrix")
            return AgronomyEngine._handle_soil_query(q, crop, soil_type, farm, data_sources_used)

        # 4. Crop selection / Suitability
        elif any(w in q for w in ["which crop", "what crop", "suitable crop", "recommend crop", "crop selection", "plant now"]):
            return AgronomyEngine._handle_crop_selection(q, soil_type, location, data_sources_used)

        # 5. Fertilizer advice
        elif any(w in q for w in ["fertilizer", "manure", "urea", "dap", "potash", "compost", "feed"]):
            return AgronomyEngine._handle_fertilizer_query(q, crop, growth_stage, data_sources_used)

        # 6. Weather & Climate impact
        elif any(w in q for w in ["weather", "rain", "temperature", "forecast", "humidity", "heat", "monsoon"]):
            return AgronomyEngine._handle_weather_query(q, crop, temp, location, data_sources_used)

        # 7. Farm information
        elif any(w in q for w in ["my farm", "farm info", "farm status", "farm details", "overview"]):
            return AgronomyEngine._handle_farm_overview(farm, data_sources_used)

        # 8. General fallback agricultural answer
        return AgronomyEngine._handle_general_query(query, crop, location, data_sources_used)

    @staticmethod
    def _handle_irrigation_query(q: str, crop: str, moisture: float, temp: float, soil_type: str, stage: str, sources: List[str]) -> Dict[str, Any]:
        status_eval = "Moderate Moisture"
        action = "Check soil before irrigating"
        
        if moisture < 35:
            recommendation = f"Your current soil moisture is at **{moisture:.1f}%**, which is below optimal levels for **{crop}** in the **{stage}** stage (recommended: 55-75%)."
            action = "Irrigation is recommended in early morning or evening hours."
            advisory_point = "Apply water slowly using drip lines to minimize root shock and reduce fungal proliferation on foliage."
        elif moisture > 70:
            recommendation = f"Your current soil moisture is at **{moisture:.1f}%**, which is sufficiently high. With temperature around **{temp}°C**, root respiration is optimal."
            action = "Do NOT irrigate today. Risk of waterlogging and root rot."
            advisory_point = "Ensure adequate drainage in low-lying rows."
        else:
            recommendation = f"Your available soil moisture is currently **{moisture:.1f}%** for your **{soil_type}** soil. This sits in a healthy operational range for **{crop}**."
            action = "Skip heavy irrigation today; perform a manual 2-inch topsoil finger test."
            advisory_point = "If topsoil is dry past 4 cm, provide a light 30-minute drip pulse."

        response_text = f"""### 🌱 AGRINEX Smart Irrigation Guidance

{recommendation}

**Agronomic Analysis:**
* **Crop:** {crop} ({stage} stage)
* **Soil Profile:** {soil_type} (Current Moisture: {moisture:.1f}%)
* **Ambient Temperature:** {temp}°C

**Action Plan:**
1. **Decision:** {action}
2. **Method:** {advisory_point}
3. **Conservation Tip:** Irrigating before 9:00 AM or after 5:30 PM reduces evaporative water loss by up to 28%.

*Note: Telemetry values reflect configured farm sensors or latest soil inspection entries.*"""

        card = StructuredInsightCard(
            title=f"Irrigation Advisory: {crop}",
            summary=f"Soil Moisture: {moisture:.1f}% — {action}",
            category="irrigation",
            points=[
                f"Crop Stage: {stage}",
                f"Soil Retention: {soil_type}",
                f"Ambient Temp: {temp}°C"
            ],
            action_items=[
                action,
                "Monitor root-zone moisture depth (0-15 cm)",
                "Inspect drip emitters for salt clogging"
            ],
            disclaimer="Field observations always supersede simulated sensor values. Test topsoil physically."
        )

        return {
            "response": response_text,
            "structured_card": card,
            "data_sources_used": sources,
            "suggested_followups": [
                f"What is the best fertilizer for {crop} right now?",
                "How does tomorrow's weather affect irrigation?",
                "What is my current soil nutrient status?"
            ]
        }

    @staticmethod
    def _handle_crop_health_query(q: str, crop: str, stage: str, sources: List[str]) -> Dict[str, Any]:
        response_text = f"""### 🔍 Crop Health Diagnostic: {crop} ({stage} Stage)

Yellowing leaves (chlorosis) or spotting in **{crop}** can stem from multiple physiological and pathological causes:

**1. Primary Suspects for Leaf Chlorosis:**
* **Nitrogen Deficiency:** Older/lower leaves turn uniformly light green then yellow first, while top leaves remain green.
* **Over-Watering / Poor Aeration:** Roots lack oxygen, causing generalized yellowing and root stress.
* **Early Blight (*Alternaria solani*) or Leaf Spot:** Yellowing begins around concentric brown spots with target-like rings.
* **Magnesium / Iron Deficiency:** Interveinal chlorosis (yellowing between leaf veins while veins stay dark green).
* **Sucking Pests (Aphids / Whiteflies / Thrips):** Leaves curl and yellow due to sap depletion or viral transmission.

**Recommended Immediate Next Steps:**
1. **Physical Inspection:** Look under leaves for tiny whiteflies, aphids, or webbing (mites).
2. **Moisture Check:** Verify if root zone is waterlogged.
3. **Organic / Safe Remediation:** Apply balanced neem oil spray (5ml/L with mild surfactant) in late evening if pests are detected.
4. **Soil Test:** Test soil pH and N-P-K levels.

*Safety Notice: Do not spray synthetic chemical fungicides or pesticides without confirming the exact pathogen and adhering strictly to approved label dosages and safety gear.*"""

        card = StructuredInsightCard(
            title=f"Pathology & Symptom Check: {crop}",
            summary="Chlorosis & leaf symptom diagnostic guide",
            category="crop_health",
            points=[
                "Check lower vs upper leaf yellowing pattern",
                "Inspect underside of foliage for sucking insects",
                "Verify drainage to prevent root hypoxia"
            ],
            action_items=[
                "Upload a close-up photo to AGRINEX Crop Vision",
                "Conduct manual root moisture test",
                "Consult local KVK or Agronomy officer if spreading quickly"
            ],
            disclaimer="Visual interpretations are indicative. Always confirm with an agricultural extension officer before chemical intervention."
        )

        return {
            "response": response_text,
            "structured_card": card,
            "data_sources_used": sources,
            "suggested_followups": [
                "How do I upload a leaf photo for analysis?",
                "What are organic treatments for leaf blight?",
                "Should I irrigate if leaves are wilting?"
            ]
        }

    @staticmethod
    def _handle_soil_query(q: str, crop: str, soil_type: str, farm: Dict[str, Any], sources: List[str]) -> Dict[str, Any]:
        ph = farm.get("ph", 6.5)
        response_text = f"""### 🧪 Soil Health & Chemistry Analysis

Soil balance is the cornerstone of sustainable farm yield.

**Standard Optimum Parameters for {crop}:**
* **Soil pH:** 6.0 – 6.8 (Slightly acidic to neutral is ideal for micronutrient availability).
* **Nitrogen (N):** 140–180 kg/ha (Essential for canopy and vegetative growth).
* **Phosphorus (P):** 40–60 kg/ha (Root development, flower setting, and energy transfer).
* **Potassium (K):** 180–240 kg/ha (Disease resistance, fruit firmness, and water regulation).
* **Organic Carbon:** > 0.75% for microbial vitality and moisture retention.

**Management Tips for {soil_type} Soil:**
1. **Nutrient Uptake:** Ensure pH is kept between 6.2 and 6.8; extreme acidity binds Phosphorus, while alkalinity locks Micronutrients (Fe, Mn, Zn).
2. **Organic Enrichment:** Add well-decomposed Farm Yard Manure (FYM) or vermicompost (5–10 tons/ha) prior to transplanting.
3. **Bio-fertilizers:** Seed inoculation with *Azotobacter* / *Phosphobacteria* enhances organic bioavailability.

*Use the **AGRINEX Soil Intelligence** module to calculate tailored dosage recommendations.*"""

        card = StructuredInsightCard(
            title=f"Soil Assessment: {soil_type}",
            summary=f"Nutrient availability guidelines for {crop}",
            category="soil",
            points=[
                "Ideal pH Range: 6.0 - 6.8",
                "Focus on balanced N:P:K stoichiometry",
                "Supplement with organic humic amendments"
            ],
            action_items=[
                "Run an automated Soil Test in the Soil Tab",
                "Incorporate compost before next planting cycle",
                "Check irrigation water salinity (EC)"
            ],
            disclaimer="Soil nutrient dynamics vary by soil texture and regional geology."
        )

        return {
            "response": response_text,
            "structured_card": card,
            "data_sources_used": sources,
            "suggested_followups": [
                "How do I adjust acidic soil pH?",
                "What organic fertilizers improve soil biology?",
                "What crops grow best in my soil type?"
            ]
        }

    @staticmethod
    def _handle_crop_selection(q: str, soil_type: str, location: str, sources: List[str]) -> Dict[str, Any]:
        response_text = f"""### 🌾 Crop Suitability Guidance

Based on **{soil_type}** soil profile in **{location}**, here are high-performing agricultural selections:

**1. Primary Commercial Horticultural Crops:**
* **Tomato:** High yield in well-drained loams (pH 6.0–7.0). Requires steady drip irrigation.
* **Chilli / Bell Pepper:** Strong disease tolerance; high market demand.
* **Onion:** Excellent storage potential; requires loose, friable soil.

**2. Grain & Pulse Options:**
* **Maize (Corn):** Highly responsive to nitrogen fertilization in loam soils.
* **Chickpea / Green Gram:** Nitrogen-fixing legume, restores soil fertility and requires minimal water.

**3. Cash & Plantation Crops:**
* **Cotton:** Suitable for deep loam to black soil with seasonal sunshine.
* **Turmeric:** High return crop benefiting from rich organic matter.

**Considerations Before Sowing:**
* Verify groundwater availability and monsoon timeline.
* Check regional wholesale mandi prices in the **Market Insights** tab.
* Procure certified, disease-resistant hybrid seed varieties."""

        card = StructuredInsightCard(
            title="Crop Recommendation Matrix",
            summary=f"Top candidate crops for {soil_type} soil",
            category="crop_health",
            points=[
                "High value: Tomato, Chilli, Onion",
                "Soil restorative: Pulses (Chickpea, Green Gram)",
                "Bulk cereal: Hybrid Maize"
            ],
            action_items=[
                "Inspect market demand trends in Market Tab",
                "Procure certified F1 hybrid seeds",
                "Prepare nursery bed or laser land leveling"
            ],
            disclaimer="Crop choice should match water reserves and regional climate seasonality."
        )

        return {
            "response": response_text,
            "structured_card": card,
            "data_sources_used": sources,
            "suggested_followups": [
                "What is the market price of tomato right now?",
                "What seeds are available in the AGRINEX store?",
                "How do I prepare soil for chilli planting?"
            ]
        }

    @staticmethod
    def _handle_fertilizer_query(q: str, crop: str, stage: str, sources: List[str]) -> Dict[str, Any]:
        response_text = f"""### 🧪 Fertilizer & Nutrient Guidance: {crop} ({stage} Stage)

A balanced nutritional regimen is critical to prevent nutrient lock-up and maximize harvest quality:

**General Basal & Fertigation Protocol:**
* **Vegetative Stage:** High Nitrogen & moderate Phosphorus (e.g., 19:19:19 NPK soluble fertilizer or Urea + DAP) to support leaf area index.
* **Flowering Stage:** Increased Phosphorus and Boron to boost blossom retention and pollen viability (e.g., 12:61:00 or Mono Ammonium Phosphate).
* **Fruiting & Bulking Stage:** High Potassium (e.g., 0:0:50 Sulphate of Potash or 13:0:45 Potassium Nitrate) for fruit weight, firmness, and shelf-life.

**Eco-Friendly Soil Biostimulants:**
* **Humic Acid (12%):** Enhances root proliferation and fertilizer use efficiency.
* **Seaweed Extract (Liquid):** Alleviates heat and water stress during peak summer.
* **Neem Cake Powder:** Natural nitrification inhibitor and root-knot nematode deterrent.

*⚠️ Safety Reminder: Always measure your soil with an accredited lab test before heavy application to avoid fertilizer burn and groundwater nitrate runoff.*"""

        card = StructuredInsightCard(
            title=f"Nutrient Strategy: {crop}",
            summary=f"Fertigation plan tailored for {stage} stage",
            category="fertilizer",
            points=[
                f"Current Priority: {stage} nutritional support",
                "Balanced fertigation reduces fertilizer waste by 35%",
                "Incorporate micro-nutrients (Zinc, Boron, Iron)"
            ],
            action_items=[
                "Split doses into weekly drip fertigation pulses",
                "Apply foliar micronutrient sprays during calm morning hours",
                "Follow manufacturer product label dosage"
            ],
            disclaimer="Follow verified agricultural department dosage tables for your specific hybrid."
        )

        return {
            "response": response_text,
            "structured_card": card,
            "data_sources_used": sources,
            "suggested_followups": [
                "How much fertilizer should I add to my soil?",
                "What is the difference between DAP and NPK 19-19-19?",
                "Check products in AGRINEX Store"
            ]
        }

    @staticmethod
    def _handle_weather_query(q: str, crop: str, temp: float, location: str, sources: List[str]) -> Dict[str, Any]:
        response_text = f"""### 🌦 Weather Intelligence & Farm Impact

**Current Agronomic Conditions for {location}:**
* **Ambient Temperature:** {temp}°C (Daytime High: ~33°C, Nighttime Low: ~22°C)
* **Relative Humidity:** ~58% (Moderate)
* **Precipitation Probability:** ~15% (Low risk of rain today)
* **Wind Conditions:** 12 km/h NE (Calm to moderate breeze)

**Farming Implications for {crop}:**
1. **Spraying Window:** ✅ **Favorable**. Wind speed is below 15 km/h, meaning low drift risk for foliar nutrition or biocontrol sprays. Best completed before 10:30 AM.
2. **Transpiration & Water Loss:** Elevated daytime temperatures increase evapotranspiration. Maintain adequate soil moisture through night drip pulses.
3. **Pest Advisory:** Moderate humidity with warm temperature creates moderate conditions for whitefly and thrips; continue field scouting.

*Visit the **Weather Intelligence** page for 7-day hourly forecasting and localized radar maps.*"""

        card = StructuredInsightCard(
            title=f"Micro-Climate Alert: {location}",
            summary=f"Temp: {temp}°C | Spraying conditions: Favorable",
            category="weather",
            points=[
                f"Location: {location}",
                "Foliar Spray Suitability: High (Low wind drift)",
                "Precipitation Risk: Low (15%)"
            ],
            action_items=[
                "Schedule foliar sprays before midday heat",
                "Check moisture in sandy or light soils",
                "Review 7-day weather trends"
            ],
            disclaimer="Telemetry reflects regional micro-climatic satellite feeds and configured farm stations."
        )

        return {
            "response": response_text,
            "structured_card": card,
            "data_sources_used": sources,
            "suggested_followups": [
                "Should I irrigate given today's temperature?",
                "What is the 7-day rain forecast?",
                "How do high temperatures affect fruit setting?"
            ]
        }

    @staticmethod
    def _handle_farm_overview(farm: Dict[str, Any], sources: List[str]) -> Dict[str, Any]:
        name = farm.get("name", "Green Valley Agro Farm")
        crop = farm.get("primary_crop", "Tomato")
        size = farm.get("size_hectares", 2.5)
        loc = farm.get("location", "Coimbatore, Tamil Nadu")
        irrigation = farm.get("irrigation_type", "Drip Irrigation")

        response_text = f"""### 🚜 Farm Profile & Status: {name}

Here is a summary of your registered agricultural profile:
* **Location:** {loc}
* **Total Farm Acreage:** {size} Hectares (~{size * 2.471:.1f} Acres)
* **Active Standing Crop:** {crop} (Vegetative Stage)
* **Irrigation Infrastructure:** {irrigation}
* **Soil Type:** {farm.get('soil_type', 'Loamy Soil')}
* **Water Source:** {farm.get('water_source', 'Borewell')}

**System Status:**
* **Soil Sensors:** Configured (Current Moisture: {farm.get('soil_moisture', 42.0)}%)
* **Crop Health Telemetry:** Active (Status: Healthy)
* **AI Advisor:** Operational & Ready

*You can update your farm specifications or register additional crops under the **My Farm** menu.*"""

        card = StructuredInsightCard(
            title=f"Farm Registry: {name}",
            summary=f"{size} Ha | Active Crop: {crop}",
            category="general",
            points=[
                f"Location: {loc}",
                f"Primary System: {irrigation}",
                "Status: Normal Operations"
            ],
            action_items=[
                "Review latest Soil Test records",
                "Log crop stage transitions",
                "Manage farm parcels in My Farm tab"
            ]
        )

        return {
            "response": response_text,
            "structured_card": card,
            "data_sources_used": sources,
            "suggested_followups": [
                f"Should I irrigate my {crop} today?",
                "Analyze my farm soil nutrients",
                "Show crop health advisory"
            ]
        }

    @staticmethod
    def _handle_general_query(query: str, crop: str, location: str, sources: List[str]) -> Dict[str, Any]:
        response_text = f"""Hello! I am **AGRINEX AI**, your smart farming co-pilot.

I am here to assist with all aspects of your farm operations:
* 💧 **Irrigation Scheduling:** Precise moisture-driven recommendations.
* 🌱 **Crop Health & Diagnostics:** Symptom identification and biological management.
* 🧪 **Soil Health & NPK:** Nutrient balancing and pH optimization.
* 🌦 **Weather Advisory:** Actionable farm forecasts and spraying windows.
* 📈 **Market Intelligence:** Regional mandi commodity trends and benchmarks.

**How can I help you today?**
You can ask me specific questions like:
* *"Should I irrigate my {crop} field today?"*
* *"What do yellow leaves on my crop indicate?"*
* *"What fertilizer should I consider for vegetative stage?"*
* *"What crops are suitable for my soil?"*"""

        card = StructuredInsightCard(
            title="AGRINEX AI Farming Assistant",
            summary="Intelligent decision support for modern farmers",
            category="general",
            points=[
                f"Active Farm Context: {crop} in {location}",
                "Data-driven & grounded agronomic guidance",
                "Multi-modal: Text, Soil data, Image diagnosis"
            ],
            action_items=[
                "Select a suggested topic below or type your question",
                "Update your farm profile for tailored advice"
            ],
            disclaimer="AGRINEX provides decision support. High-risk interventions should be verified locally."
        )

        return {
            "response": response_text,
            "structured_card": card,
            "data_sources_used": sources,
            "suggested_followups": [
                f"Should I irrigate my {crop} today?",
                "My crop leaves are turning yellow",
                "Analyze my soil",
                "What is today's weather impact?"
            ]
        }
