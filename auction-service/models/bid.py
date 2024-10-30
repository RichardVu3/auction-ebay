from pydantic import BaseModel, Field
from typing_extensions import Annotated
from decimal import Decimal
from datetime import datetime
from bson import ObjectId
from models.objectid import PyObjectId


class BidModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    item_id: PyObjectId
    user_id: PyObjectId
    amount: Annotated[Decimal, Field(gt=0, max_digits=10, decimal_places=2)]
    timestamp: datetime = Field(default_factory=datetime.now)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        from_attributes = True  # Use from_attributes instead of orm_mode
