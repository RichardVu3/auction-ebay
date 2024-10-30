from objectid import PyObjectId
from bson import ObjectId
from typing import Optional
from typing_extensions import Annotated
from pydantic import BaseModel, Field, StringConstraints
from datetime import datetime


class CategoryModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: Annotated[str, StringConstraints(max_length=50)]
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
