from typing import List, Optional, Text
from pydantic import BaseModel
from sqlalchemy.sql.sqltypes import TEXT,INTEGER


class GraphsData(BaseModel):
    graph_name: str
    class Config:
        orm_mode = True
class SelectedGraph(BaseModel):
    graphIdList: list
    userId: int     
class DeleteGraph(BaseModel):
    graphIdList: list
    userId: int         