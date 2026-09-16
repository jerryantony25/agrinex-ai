from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse, ChatMessageSchema, ConversationSchema
from app.models.chat import Conversation, ChatMessage
from app.models.farmer import Farm
from app.models.crop import Crop
from app.models.soil import SoilData
from app.ai.ai_service import ai_service
import uuid

router = APIRouter(prefix="/chat", tags=["AI Chatbot"])

@router.post("", response_model=ChatResponse)
async def chat_with_agrinex(req: ChatRequest, db: Session = Depends(get_db)):
    farmer_id = req.farmer_id or "default-farmer"
    
    # 1. Fetch active farm context to ground the AI
    farm = db.query(Farm).filter(Farm.farmer_id == farmer_id).first()
    farm_context = {}
    if farm:
        farm_context = {
            "name": farm.name,
            "location": farm.location,
            "primary_crop": farm.primary_crop,
            "soil_type": farm.soil_type,
            "irrigation_type": farm.irrigation_type,
            "size_hectares": farm.size_hectares,
        }
        
        # Pull active crop stage if present
        primary_crop = db.query(Crop).filter(Crop.farm_id == farm.id, Crop.name.ilike(f"%{farm.primary_crop}%")).first()
        if primary_crop:
            farm_context["growth_stage"] = primary_crop.growth_stage
            farm_context["health_status"] = primary_crop.health_status

        # Pull latest soil telemetry
        latest_soil = db.query(SoilData).filter(SoilData.farm_id == farm.id).order_by(SoilData.created_at.desc()).first()
        if latest_soil:
            farm_context["soil_moisture"] = latest_soil.moisture
            farm_context["temperature"] = latest_soil.temperature
            farm_context["ph"] = latest_soil.ph

    # Override with manual context if passed in request
    if req.farm_context:
        farm_context.update(req.farm_context)

    # 2. Get or create conversation thread
    conv_id = req.conversation_id
    conversation = None
    if conv_id:
        conversation = db.query(Conversation).filter(Conversation.id == conv_id).first()

    if not conversation:
        conversation = Conversation(
            id=conv_id or str(uuid.uuid4()),
            farmer_id=farmer_id,
            title=req.message[:40] + ("..." if len(req.message) > 40 else "")
        )
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

    # 3. Store User message
    user_msg = ChatMessage(
        id=str(uuid.uuid4()),
        conversation_id=conversation.id,
        sender="user",
        content=req.message,
        is_grounded=True
    )
    db.add(user_msg)
    db.commit()

    # 4. Fetch recent history
    prev_messages = db.query(ChatMessage).filter(
        ChatMessage.conversation_id == conversation.id
    ).order_by(ChatMessage.created_at.desc()).limit(6).all()
    
    history = [{"role": "user" if m.sender == "user" else "assistant", "content": m.content} for m in reversed(prev_messages)]

    # 5. Call AI Service
    response_obj = await ai_service.generate_response(
        message=req.message,
        farmer_id=farmer_id,
        conversation_id=conversation.id,
        farm_context=farm_context,
        history=history
    )

    # 6. Store AI response in database
    ai_msg = ChatMessage(
        id=str(uuid.uuid4()),
        conversation_id=conversation.id,
        sender="ai",
        content=response_obj.response,
        structured_data=response_obj.structured_card.model_dump() if response_obj.structured_card else None,
        is_grounded=True
    )
    db.add(ai_msg)
    db.commit()

    return response_obj

@router.get("/history/{farmer_id}")
def get_chat_history(farmer_id: str, db: Session = Depends(get_db)):
    conversations = db.query(Conversation).filter(
        Conversation.farmer_id == farmer_id
    ).order_by(Conversation.updated_at.desc()).all()

    result = []
    for conv in conversations:
        msgs = db.query(ChatMessage).filter(ChatMessage.conversation_id == conv.id).order_by(ChatMessage.created_at.asc()).all()
        result.append({
            "id": conv.id,
            "title": conv.title,
            "created_at": conv.created_at,
            "messages": [
                {
                    "id": m.id,
                    "sender": m.sender,
                    "content": m.content,
                    "structured_data": m.structured_data,
                    "created_at": m.created_at
                }
                for m in msgs
            ]
        })
    return result
