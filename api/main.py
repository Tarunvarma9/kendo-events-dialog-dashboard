from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI, HTTPException, status,APIRouter
import psycopg2
import uvicorn
from datetime import datetime, timedelta 
from jose import jwt
import os
from dotenv import load_dotenv
import logging
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import and_, null
from sharedlibrary import models,schemas
from datetime import datetime, timedelta 
from sharedlibrary.database import SessionLocal, engine
from passlib.context import CryptContext
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer,OAuth2PasswordBearer, OAuth2PasswordRequestForm

models.Base.metadata.create_all(bind=engine)

load_dotenv()
prefix_router = APIRouter()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)  




SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('TOKEN_ACCESS_EXPIRE_MINUTES'))

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

pwd_context= CryptContext(schemes=["bcrypt"],deprecated='auto')
security = HTTPBearer()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class EndpointFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        return record.args and len(record.args) >= 3 and record.args[2] != "/health"


logging.getLogger("uvicorn.access").addFilter(EndpointFilter())

class LoginRequest(BaseModel):
    username: str
    password: str




def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def UATdb(query): 
    global result
    args = {'dbname':os.getenv('POSTGRES_DB'), 'user':os.getenv('POSTGRES_USER'), 'host':os.getenv('POSTGRES_HOST'), 'password':os.getenv('POSTGRES_PASSWORD'), 'port':'5432'}
    connection = psycopg2.connect(**args)
    cursor = connection.cursor()
    cursor.execute(query)
    result = cursor.fetchall()
    cursor.close()
    connection.close()
    return result



@prefix_router.get('/health')
def health():
    return {"statusCode":"OK", "message":"server is up and running"}




@prefix_router.get('/MSME')
def get_MSME():
    quries = ['SELECT count(vcbi.company_id)  as count25  FROM "supplier".v_company_basic_information vcbi   JOIN "supplier".v_company_business_information vcda ON vcda.company_id = vcbi.company_id   JOIN "supplier".master_user mu on mu.vendor_id=vcbi.company_id and mu.admin_user=true  where vcda.msme_registered=1  and vcbi.contract_vendor=1','SELECT count(vcbi.company_id)  as count26 FROM "supplier".v_company_basic_information vcbi JOIN "supplier".v_company_business_information vcda ON vcda.company_id = vcbi.company_id	JOIN "supplier".master_user mu on mu.vendor_id=vcbi.company_id and mu.admin_user=true where vcda.msme_registered=0  and vcbi.contract_vendor=1;','SELECT count(vcbi.company_id)  as count37	 FROM "supplier".v_company_basic_information vcbi JOIN "supplier".v_company_business_information vcda ON vcda.company_id = vcbi.company_id  JOIN "supplier".master_user mu on mu.vendor_id=vcbi.company_id and mu.admin_user=true  where vcda.msme_registered=1  and vcbi.contract_vendor=2;','SELECT count(vcbi.company_id)  as count38  FROM "supplier".v_company_basic_information vcbi    JOIN "supplier".v_company_business_information vcda ON vcda.company_id = vcbi.company_id   JOIN "supplier".master_user mu on mu.vendor_id=vcbi.company_id and mu.admin_user=true  where vcda.msme_registered=0  and vcbi.contract_vendor=2;']
    resultList = []
    for i in quries:
        v = UATdb(i)
        resultList.append(*v)
    values =[ ["MSME Construction", resultList[0][0]],["Non-MSME Construction",  resultList[1][0]],["MSME Non-Con",   resultList[2][0]],["NON MSME Non Con", resultList[3][0]] ]
    return values



@prefix_router.get('/Classification')
def get_Classification():
    quries = ["SELECT count(vcbi.company_id)  as count27 FROM supplier.v_company_basic_information vcbi   JOIN supplier.master_user mu on mu.vendor_id=vcbi.company_id and mu.admin_user=true  where vcbi.classification_id='1' and vcbi.contract_vendor=1;","SELECT count(vcbi.company_id)  as count28 FROM supplier.v_company_basic_information vcbi   JOIN supplier.master_user mu on mu.vendor_id=vcbi.company_id and mu.admin_user=true  where vcbi.classification_id='2' and vcbi.contract_vendor=1;","SELECT count(vcbi.company_id)  as count39  FROM supplier.v_company_basic_information vcbi   JOIN supplier.master_user mu on mu.vendor_id=vcbi.company_id and mu.admin_user=true  where vcbi.classification_id='1' and vcbi.contract_vendor=2;","SELECT count(vcbi.company_id)  as count40  FROM supplier.v_company_basic_information vcbi   JOIN supplier.master_user mu on mu.vendor_id=vcbi.company_id and mu.admin_user=true  where vcbi.classification_id='2' and vcbi.contract_vendor=1;"]
    resultList = []
    for i in quries:
        v = UATdb(i)
        resultList.append(*v)

    values = [["Above 1 cr Cons", resultList[0][0]]  ,["Below 1 cr Cons",  resultList[1][0]],["Above 1cr Non Cons",  resultList[2][0]],["Below 1cr Non Cons", resultList[3][0]]]   
    return values   

@prefix_router.get('/Category')
def get_Category():
    query = "select  tvgc.category_name,count(ssic.company_id) as count	from  masters.tata_vendor_group_categories tvgc	left join masters.master_item_vendor_category  mivc  on tvgc.tata_cat_id=mivc.tata_cat_id	left join supplier.supplier_selected_item_category ssic  on mivc.item_vendor_category_id=ssic.item_category_id	group by tvgc.category_name order by category_name;"
    resultList = UATdb(query)
    return resultList 

@prefix_router.get('/Region')
def get_Region():
    query = "select  CASE WHEN mr.region_id='5' then 'Others'   WHEN mr.region_id='6' then 'Others' 	else mr.region_name END as region_name,count(vcbi.company_id) as count 	from  masters.master_region mr 	left join upeg.vendor_locations vl on vl.location_id=mr.region_id 	left join supplier.v_company_basic_information  vcbi  on vcbi.company_id=vl.vendor_id 	group by mr.region_name,mr.region_id order by region_name;"
    resultList = UATdb(query)
    return resultList 


@prefix_router.post('/login/')
def login(request:LoginRequest,db:Session= Depends(get_db)):
    
    current_user=db.query(models.User).filter(models.User.username == request.username).first()
    print(current_user.username,current_user.id)
    if(current_user==None):
        return "user not found"
    else:
        returnData = {"user_name": current_user.username}
        access_token = create_access_token(data={"user_id": current_user.id, "user_name": current_user.username}) 
        return{"access_token":access_token, "token_type":"bearer", "user_data": returnData}   
       

@prefix_router.get('/graphsdetails/')
def graphs(db:Session = Depends(get_db)):
    data=db.query(models.Graphs).all()
    return data


@prefix_router.post("/selectedGraph/")
def insert(request:schemas.SelectedGraph ,db:Session=Depends(get_db)):
    for graphId in request.graphIdList:
        add_graph= models.SelectedGraphs(user_id=request.userId,graph_id=graphId)
        db.add(add_graph)
        db.commit()
        db.refresh(add_graph)

    return add_graph



@prefix_router.delete('/user/graph/delete/')
def del_graph(request: schemas.DeleteGraph ,db:Session=Depends(get_db)):
    for graphId in request.graphIdList:
        db.query(models.SelectedGraphs).filter(and_(models.SelectedGraphs.graph_id == graphId, models.SelectedGraphs.user_id == request.userId)).delete(synchronize_session=False)
        db.commit()
    
    return "done"


app.include_router(
    prefix_router,
    prefix="/effigo/api/dashboard"
) 




if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
