from models.objectid import PyObjectId
from bson import ObjectId
from typing import Optional
from typing_extensions import Annotated
from pydantic import BaseModel, Field, StringConstraints
from datetime import datetime


class CategoryRequest(BaseModel):
    name: Annotated[str, StringConstraints(max_length=50)]
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        from_attributes = True  # Use from_attributes instead of orm_mode


class CategoryModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: Annotated[str, StringConstraints(max_length=50)]
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        from_attributes = True  # Use from_attributes instead of orm_mode


# Helper function to convert MongoDB ObjectId to string
def category_helper(category) -> dict:
    category["_id"] = str(category["_id"])
    return category
