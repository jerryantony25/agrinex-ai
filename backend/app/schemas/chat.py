from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class StructuredInsightCard(BaseModel):
    title: str
    summary: str
    category: str = "general"  # irrigation, soil, crop_health, weather, fertilizer
    points: List[str] = []
    action_items: List[str] = []
    disclaimer: Optional[str] = None

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, example="Should I irrigate my tomato field today?")
    farmer_id: Optional[str] = Field("default-farmer", example="default-farmer")
    conversation_id: Optional[str] = None
    crop_context: Optional[str] = None
    farm_context: Optional[Dict[str, Any]] = None

class ChatMessageSchema(BaseModel):
    id: str
    sender: str
    content: str
    structured_data: Optional[Dict[str, Any]] = None
    is_grounded: bool = True
    created_at: datetime

    class Config:
        from_attributes = True

class ChatResponse(BaseModel):
    response: str
    structured_card: Optional[StructuredInsightCard] = None
    conversation_id: str
    farmer_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    data_sources_used: List[str] = []
    suggested_followups: List[str] = []

class ConversationSchema(BaseModel):
    id: str
    farmer_id: str
    title: str
    created_at: datetime
    updated_at: datetime
    messages: List[ChatMessageSchema] = []

    class Config:
        from_attributes = True
