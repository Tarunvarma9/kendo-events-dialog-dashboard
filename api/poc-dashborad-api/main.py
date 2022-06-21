from fastapi import FastAPI,APIRouter
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import uvicorn
from datetime import datetime, timedelta 
from jose import jwt
import os
from dotenv import load_dotenv
import logging
from pydantic import BaseModel
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


class EndpointFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        return record.args and len(record.args) >= 3 and record.args[2] != "/health"


logging.getLogger("uvicorn.access").addFilter(EndpointFilter())

class LoginRequest(BaseModel):
    username: str
    password: str




def create_access_token():
    to_encode = {}
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire,"code":'U2FsdGVkX19ozJjzO4hIzz4Ff1PG8sbBlHJP/2Az+caYDY/Ks6no4XL4Ad31YjxI5ygaOhla9JBjYwvw66zfIPoOL1n580ZrAoK8tY3cbKByTXh5+SKP0TT8xWSJC8Ym'})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY)
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

    values = [["Above 1 cr Cons", resultList[0][0]]  ,["Below 1 cr Cons",  resultList[1][0]],["Above 1cr Non Cons",   resultList[2][0]],["Below 1cr Non Cons", resultList[3][0]]]   
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

app.include_router(
    prefix_router,
    prefix="/effigo/api/dashboard"
) 

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
