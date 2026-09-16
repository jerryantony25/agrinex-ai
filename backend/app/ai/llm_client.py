import httpx
import json
import logging
from typing import Dict, Any, List, Optional
from app.config import settings
from app.ai.system_prompt import AGRINEX_SYSTEM_PROMPT

logger = logging.getLogger(__name__)

class LLMClient:
    """
    Adapter for OpenAI / OpenRouter / Gemini compatible REST endpoints.
    Allows easy plug-and-play LLM integrations via standard OpenAI-compatible format.
    """
    
    def __init__(self):
        self.api_key = settings.AI_API_KEY
        self.model = settings.AI_MODEL
        self.api_base = settings.AI_API_BASE.rstrip("/")
        
    @property
    def is_configured(self) -> bool:
        return bool(self.api_key and len(self.api_key.strip()) > 5)

    async def generate_response(
        self, 
        user_message: str, 
        history: Optional[List[Dict[str, str]]] = None,
        farm_context: Optional[Dict[str, Any]] = None
    ) -> Optional[str]:
        if not self.is_configured:
            return None

        # Build context prefix
        context_str = ""
        if farm_context:
            context_str = f"""
AVAILABLE FARM CONTEXT:
- Farm Name: {farm_context.get('name', 'N/A')}
- Location: {farm_context.get('location', 'N/A')}
- Primary Crop: {farm_context.get('primary_crop', 'N/A')} (Stage: {farm_context.get('growth_stage', 'N/A')})
- Soil Type: {farm_context.get('soil_type', 'N/A')} (Moisture: {farm_context.get('soil_moisture', 'N/A')}%)
- Current Weather Temp: {farm_context.get('temperature', 'N/A')}°C
- Irrigation System: {farm_context.get('irrigation_type', 'N/A')}
"""

        messages = [
            {"role": "system", "content": AGRINEX_SYSTEM_PROMPT + context_str}
        ]

        if history:
            for msg in history[-6:]:  # include last few messages
                messages.append({"role": msg.get("role", "user"), "content": msg.get("content", "")})

        messages.append({"role": "user", "content": user_message})

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                headers = {
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json"
                }
                
                # Check for OpenRouter referer header
                if "openrouter.ai" in self.api_base:
                    headers["HTTP-Referer"] = "https://agrinex.ai"
                    headers["X-Title"] = "AGRINEX AI"

                payload = {
                    "model": self.model,
                    "messages": messages,
                    "temperature": 0.3,
                    "max_tokens": 1200
                }

                url = f"{self.api_base}/chat/completions"
                response = await client.post(url, headers=headers, json=payload)
                
                if response.status_code == 200:
                    data = response.json()
                    return data["choices"][0]["message"]["content"]
                else:
                    logger.warning(f"LLM API returned status {response.status_code}: {response.text}")
                    return None
        except Exception as e:
            logger.error(f"Error calling LLM provider: {e}")
            return None
