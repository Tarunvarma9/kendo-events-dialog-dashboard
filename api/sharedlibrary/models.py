# from typing import Text
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import true
# from sqlalchemy.sql.sqltypes import TEXT

from sharedlibrary.database import Base



class User(Base):
    __tablename__ = "user_detail"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)
    graphs = relationship('SelectedGraphs', back_populates='user')

class Graphs(Base):
    __tablename__ = "graphs_details"
    id=Column(Integer, primary_key=True, index=True)
    graph_name = Column(String)
    users = relationship('SelectedGraphs', back_populates='graph')


class SelectedGraphs(Base):
    __tablename__ = "selected_graphs_details"
    id=Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user_detail.id'))
    graph_id = Column(Integer, ForeignKey("graphs_details.id"), nullable=False)
    user = relationship("User", back_populates="graphs")
    graph = relationship("Graphs", back_populates="users")

