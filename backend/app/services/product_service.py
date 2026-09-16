from sqlalchemy.orm import Session
from typing import List
from app.models.product import Product, Order
from app.schemas.product import OrderCreate
import uuid
import json

class ProductService:
    @staticmethod
    def get_products(db: Session, category: str = None) -> List[Product]:
        query = db.query(Product)
        if category and category.lower() != "all":
            query = query.filter(Product.category == category)
        return query.all()

    @staticmethod
    def create_order(db: Session, order_in: OrderCreate) -> Order:
        items_data = [item.model_dump() for item in order_in.items]
        order = Order(
            id=str(uuid.uuid4()),
            farmer_id=order_in.farmer_id,
            total_amount=order_in.total_amount,
            status="Confirmed (Demo)",
            shipping_address=order_in.shipping_address,
            items_json=json.dumps(items_data),
            is_demo=True
        )
        db.add(order)
        db.commit()
        db.refresh(order)
        return order

product_service = ProductService()
