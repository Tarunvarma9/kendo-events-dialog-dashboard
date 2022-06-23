import * as React from 'react';
import { Chart, ChartSeries, ChartSeriesItem, ChartTitle, ChartCategoryAxis,
    ChartCategoryAxisItem,  ChartLegend,SeriesClickEvent
    } from '@progress/kendo-react-charts';
import 'hammerjs';
import { Loader } from "@progress/kendo-react-indicators";
import { MdZoomOutMap } from "react-icons/md";

import { AiOutlineClose } from "react-icons/ai";

import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import ClassificationPopup from '../ClassificationPopup';
import MsmeChartPopup from '../MsmePopup';
const MsmeChart = () =>{
   const [msmedata,Setmsmedata]=React.useState<any[]>([])
   const [msmevalue,Setmsmevalue]=React.useState<any[]>([])
   const [loading, setLoading] = React.useState(true)  
   const [largeView, setLargeView] = React.useState(true);

   const toggleDialog = () => {
     setLargeView(!largeView);
   };
   React.useEffect(() => {
        const headers = {method: "GET",
        headers: {
          "access-control-allow-origin" : "*",
          "Content-type": "application/json; charset=UTF-8"
        }}
        const url ="http://127.0.0.1:8000/effigo/api/dashboard/MSME"
        const fetchData = async () => {
          const data = await fetch(url, headers);
          const json = await data.json();
          let data1 = []
          let data2:string[] = []
          for (let li of json){
                data1.push(li[0])
                data2.push(li[1])
          }
          Setmsmedata(data1)
          Setmsmevalue(data2)
          setLoading(false)
        }
        fetchData()
        
          
      },[]);

return(
  <>
  {loading ? (<><div className="loader-container">
            <Loader  size="large" type={"infinite-spinner"} />
            </div></>):(<><div className="k-card">
  <span className="chart-heading-section"><p>{" "}</p><p style={{ margin: 0 , color: '#000',fontWeight: 'bold'}} >MSME </p><button className="zoom-button" onClick={toggleDialog}><MdZoomOutMap /></button></span>

<Chart style={{height:'300px',width:'500px' }} onSeriesClick={(event: SeriesClickEvent) => toggleDialog()}>

<ChartLegend position="bottom" orientation="horizontal" />
    <ChartSeries>
    <ChartCategoryAxis style={{border:"1px solid black"}}>
              <ChartCategoryAxisItem categories={msmedata} startAngle={0}/>
            </ChartCategoryAxis>
      <ChartSeriesItem type="bar"  data={msmevalue} tooltip={{ visible: true }} />
    </ChartSeries>
  </Chart>
  </div>
  {largeView ? null : (
      <Dialog onClose={toggleDialog}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <AiOutlineClose onClick={toggleDialog} />
        </div>
        <MsmeChartPopup/>
      </Dialog>
    )}
  </>)}
  </>);
}
  export default MsmeChart