import * as React from 'react';
import { Chart, ChartSeries, ChartSeriesItem, ChartTitle, ChartCategoryAxis,
    ChartCategoryAxisItem,  ChartLegend,
    } from '@progress/kendo-react-charts';
import 'hammerjs';
import { Loader } from "@progress/kendo-react-indicators";

const MsmeChartPopup = () =>{
   const [msmedata,Setmsmedata]=React.useState<any[]>([])
   const [msmevalue,Setmsmevalue]=React.useState<any[]>([])
   const [loading, setLoading] = React.useState(true)  

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
    <div className="col-12" style={{ width: "600px", height: "450px" }}>
  {loading ? (<><Loader size="large" type={"infinite-spinner"} /></>):(<><div className="k-card">
<Chart>
<ChartTitle text="MSME" />
<ChartLegend position="bottom" orientation="horizontal" />
    <ChartSeries>
    <ChartCategoryAxis style={{border:"1px solid black"}}>
              <ChartCategoryAxisItem categories={msmedata} startAngle={0}/>
            </ChartCategoryAxis>
      <ChartSeriesItem type="bar"  data={msmevalue} tooltip={{ visible: true }} />
    </ChartSeries>
  </Chart>
  </div></>)}
  </div>);
}
  export default MsmeChartPopup