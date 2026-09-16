from typing import List, Dict, Any
from app.schemas.soil import SoilInput, SoilAnalysisResponse, NutrientAssessment, CropSuitability

class SoilService:
    @staticmethod
    def analyze_soil(data: SoilInput) -> SoilAnalysisResponse:
        # pH Evaluation
        if data.ph < 5.5:
            ph_eval = NutrientAssessment(
                level="Critical Acidic",
                status_text=f"pH {data.ph:.1f} is Strongly Acidic",
                optimal_range="6.0 - 7.0",
                recommendation="Apply agricultural lime (calcium carbonate) or dolomite at 2.5 tons/ha to raise pH and unlock phosphorus binding."
            )
        elif data.ph < 6.0:
            ph_eval = NutrientAssessment(
                level="Moderately Acidic",
                status_text=f"pH {data.ph:.1f} is Moderately Acidic",
                optimal_range="6.0 - 7.0",
                recommendation="Apply light agricultural lime (1.0 ton/ha) and incorporate well-aerated organic compost to buffer acidity."
            )
        elif data.ph <= 7.5:
            ph_eval = NutrientAssessment(
                level="Optimal",
                status_text=f"pH {data.ph:.1f} is in the Ideal Agronomic Range",
                optimal_range="6.0 - 7.5",
                recommendation="Maintain current soil organic matter levels. Nutrient bioavailability is optimal."
            )
        elif data.ph <= 8.5:
            ph_eval = NutrientAssessment(
                level="Moderately Alkaline",
                status_text=f"pH {data.ph:.1f} is Moderately Alkaline",
                optimal_range="6.0 - 7.5",
                recommendation="Apply agricultural gypsum (calcium sulfate) or elemental sulfur. Use ammonium-based fertilizers to gently reduce pH."
            )
        else:
            ph_eval = NutrientAssessment(
                level="Critically Alkaline",
                status_text=f"pH {data.ph:.1f} is Strongly Alkaline / Sodic",
                optimal_range="6.0 - 7.5",
                recommendation="Heavy gypsum amendment required. Ensure deep drainage to leach excess sodium salts."
            )

        # Nitrogen (N) Evaluation (Standard kg/ha)
        if data.nitrogen < 100:
            n_eval = NutrientAssessment(
                level="Low",
                status_text=f"Nitrogen ({data.nitrogen:.0f} kg/ha) is Deficient",
                optimal_range="140 - 200 kg/ha",
                recommendation="Apply split doses of urea or organic blood meal/neem cake. Seed inoculation with Rhizobium or Azotobacter recommended."
            )
        elif data.nitrogen <= 220:
            n_eval = NutrientAssessment(
                level="Optimal",
                status_text=f"Nitrogen ({data.nitrogen:.0f} kg/ha) is in Adequate Balance",
                optimal_range="140 - 200 kg/ha",
                recommendation="Maintain steady vegetative feeding schedule through drip fertigation."
            )
        else:
            n_eval = NutrientAssessment(
                level="High",
                status_text=f"Nitrogen ({data.nitrogen:.0f} kg/ha) is Excessively High",
                optimal_range="140 - 200 kg/ha",
                recommendation="Cease nitrogen inputs to prevent rank vegetative growth, delayed flowering, and increased susceptibility to sucking pests."
            )

        # Phosphorus (P) Evaluation
        if data.phosphorus < 30:
            p_eval = NutrientAssessment(
                level="Low",
                status_text=f"Phosphorus ({data.phosphorus:.0f} kg/ha) is Low",
                optimal_range="40 - 65 kg/ha",
                recommendation="Incorporate Single Super Phosphate (SSP) or DAP banded close to the root zone with organic compost."
            )
        elif data.phosphorus <= 70:
            p_eval = NutrientAssessment(
                level="Optimal",
                status_text=f"Phosphorus ({data.phosphorus:.0f} kg/ha) is in Healthy Range",
                optimal_range="40 - 65 kg/ha",
                recommendation="Adequate for root architecture and flowering induction."
            )
        else:
            p_eval = NutrientAssessment(
                level="High",
                status_text=f"Phosphorus ({data.phosphorus:.0f} kg/ha) is High",
                optimal_range="40 - 65 kg/ha",
                recommendation="Avoid P additions; excess phosphorus can induce Zinc and Iron deficiencies."
            )

        # Potassium (K) Evaluation
        if data.potassium < 140:
            k_eval = NutrientAssessment(
                level="Low",
                status_text=f"Potassium ({data.potassium:.0f} kg/ha) is Low",
                optimal_range="180 - 260 kg/ha",
                recommendation="Apply Muriate of Potash (MOP) or Sulphate of Potash (SOP) to improve drought tolerance and fruit firmness."
            )
        elif data.potassium <= 280:
            k_eval = NutrientAssessment(
                level="Optimal",
                status_text=f"Potassium ({data.potassium:.0f} kg/ha) is Balanced",
                optimal_range="180 - 260 kg/ha",
                recommendation="Good cell turgor and pest resistance balance."
            )
        else:
            k_eval = NutrientAssessment(
                level="High",
                status_text=f"Potassium ({data.potassium:.0f} kg/ha) is Elevated",
                optimal_range="180 - 260 kg/ha",
                recommendation="Monitor magnesium uptake as excess K can suppress Mg absorption."
            )

        # Moisture Assessment
        if data.moisture < 30:
            m_eval = NutrientAssessment(
                level="Low Moisture",
                status_text=f"Moisture is {data.moisture:.1f}% (Water Deficit)",
                optimal_range="50% - 75%",
                recommendation="Immediate irrigation cycle required. Use mulch or drip lines to minimize surface evaporation."
            )
        elif data.moisture <= 75:
            m_eval = NutrientAssessment(
                level="Optimal Moisture",
                status_text=f"Moisture is {data.moisture:.1f}% (Field Capacity)",
                optimal_range="50% - 75%",
                recommendation="Soil is at ideal field capacity for root respiration and nutrient uptake."
            )
        else:
            m_eval = NutrientAssessment(
                level="Saturated",
                status_text=f"Moisture is {data.moisture:.1f}% (Waterlogged)",
                optimal_range="50% - 75%",
                recommendation="Halt all irrigation. Open surface drainage channels to prevent root hypoxia and damping-off."
            )

        # Crop Suitability Matching
        suitabilities: List[CropSuitability] = []
        
        # Tomato calculation
        t_score = 90
        if data.ph < 6.0 or data.ph > 7.2: t_score -= 15
        if data.nitrogen < 120: t_score -= 10
        if data.potassium < 160: t_score -= 10
        if data.moisture < 35: t_score -= 10
        suitabilities.append(CropSuitability(
            crop_name="Tomato (Solanum lycopersicum)",
            suitability_score=max(30, min(98, t_score)),
            category="Highly Suitable" if t_score >= 80 else ("Moderately Suitable" if t_score >= 60 else "Needs Amendment"),
            reason="Thrives in well-drained loamy soils with balanced NPK and pH 6.0-7.0."
        ))

        # Chilli / Pepper
        c_score = 88
        if data.ph < 6.2 or data.ph > 7.5: c_score -= 15
        if data.moisture > 75: c_score -= 20
        suitabilities.append(CropSuitability(
            crop_name="Chilli / Bell Pepper (Capsicum annuum)",
            suitability_score=max(25, min(95, c_score)),
            category="Highly Suitable" if c_score >= 80 else ("Moderately Suitable" if c_score >= 60 else "Needs Amendment"),
            reason="High warmth tolerance; sensitive to waterlogging."
        ))

        # Maize / Corn
        m_score = 85
        if data.nitrogen < 140: m_score -= 15
        if data.ph < 5.8: m_score -= 10
        suitabilities.append(CropSuitability(
            crop_name="Maize / Corn (Zea mays)",
            suitability_score=max(30, min(96, m_score)),
            category="Highly Suitable" if m_score >= 80 else "Moderately Suitable",
            reason="Heavy nitrogen feeder, adapts well across varied soil textures."
        ))

        # Chickpea / Legume
        l_score = 82
        if data.nitrogen > 200: l_score -= 20  # Legumes don't like excess N
        if data.moisture > 65: l_score -= 15
        suitabilities.append(CropSuitability(
            crop_name="Chickpea / Gram (Cicer arietinum)",
            suitability_score=max(35, min(94, l_score)),
            category="Highly Suitable" if l_score >= 80 else "Moderately Suitable",
            reason="Fixes atmospheric nitrogen; requires light to medium moisture."
        ))

        # Generate soil summary
        summary = (
            f"Soil sample exhibits a pH of {data.ph:.1f} ({ph_eval.level}) with "
            f"N-P-K levels of {data.nitrogen:.0f}-{data.phosphorus:.0f}-{data.potassium:.0f} kg/ha. "
            f"Moisture is currently measured at {data.moisture:.1f}%."
        )

        irrigation_insight = (
            f"Given the current moisture level ({data.moisture:.1f}%) and soil temperature ({data.temperature:.1f}°C), "
            + ("irrigate promptly using drip emitters." if data.moisture < 40 else "soil water status is favorable. No immediate irrigation required.")
        )

        fertilizer_guidance = (
            f"Priority 1: Address {ph_eval.level} status with appropriate soil conditioner. "
            f"Priority 2: Apply basal NPK aligned with {data.crop_interest or 'active crop'} targets."
        )

        return SoilAnalysisResponse(
            ph_assessment=ph_eval,
            nitrogen_assessment=n_eval,
            phosphorus_assessment=p_eval,
            potassium_assessment=k_eval,
            moisture_assessment=m_eval,
            soil_summary=summary,
            crop_suitabilities=suitabilities,
            irrigation_insight=irrigation_insight,
            fertilizer_guidance=fertilizer_guidance
        )

soil_service = SoilService()
