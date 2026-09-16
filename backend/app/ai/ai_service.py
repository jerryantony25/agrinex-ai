from typing import Dict, Any, List, Optional
from app.ai.llm_client import LLMClient
from app.ai.agronomy_engine import AgronomyEngine
from app.schemas.chat import ChatResponse, StructuredInsightCard
import uuid

class AIService:
    """
    Central AI orchestration service for AGRINEX AI.
    Routes queries through external LLM when configured, or uses the rich
    Agronomy Knowledge Engine for reliable, fast, grounded responses.
    """
    def __init__(self):
        self.llm_client = LLMClient()
        self.agronomy_engine = AgronomyEngine()

    async def generate_response(
        self,
        message: str,
        farmer_id: str = "default-farmer",
        conversation_id: Optional[str] = None,
        farm_context: Optional[Dict[str, Any]] = None,
        history: Optional[List[Dict[str, str]]] = None
    ) -> ChatResponse:
        conv_id = conversation_id or str(uuid.uuid4())
        
        # 1. First run query through Agronomy Engine for structured cards and baseline intelligence
        local_result = self.agronomy_engine.analyze_query(message, farm_context)
        
        # 2. If external LLM is configured, try getting high-level generative text
        llm_response = None
        data_sources = local_result.get("data_sources_used", ["AGRINEX Agronomy Knowledge Base"])
        
        if self.llm_client.is_configured:
            llm_response = await self.llm_client.generate_response(message, history, farm_context)
            if llm_response:
                data_sources.append(f"LLM Model ({self.llm_client.model})")

        final_text = llm_response if llm_response else local_result["response"]
        structured_card = local_result.get("structured_card")
        followups = local_result.get("suggested_followups", [])

        return ChatResponse(
            response=final_text,
            structured_card=structured_card,
            conversation_id=conv_id,
            farmer_id=farmer_id,
            data_sources_used=data_sources,
            suggested_followups=followups
        )

ai_service = AIService()
