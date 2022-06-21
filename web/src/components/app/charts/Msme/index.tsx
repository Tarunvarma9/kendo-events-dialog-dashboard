import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Chart, ChartSeries, ChartSeriesItem, ChartTitle, ChartCategoryAxis,
    ChartCategoryAxisItem,  ChartLegendTitle,ChartLegend,
    ChartLegendItem} from '@progress/kendo-react-charts';
import 'hammerjs';
const [firstSeries, secondSeries] = [[1, 2, 3, 5], [1, 2, 3, 5]];

const MsmeChart = () =>{
   const [msmedata,Setmsmedata]=React.useState<any[]>([])
   const [msmevalue,Setmsmevalue]=React.useState<any[]>([])  

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
          console.log(json,"msme")
          let data1 = []
          let data2:string[] = []
          for (let li of json){
              console.log(li)
              console.log(li[0])
                data1.push(li[0])
                data2.push(li[1])
          }
          Setmsmedata(data1)
          Setmsmevalue(data2)
        console.log(data,"category ****data")
          
        }
        fetchData()
        
          
      },[]);

return(
<Chart style={{height:'300px',width:'60%',padding:'0px 1%'}}>
<ChartTitle text="MSME" />
<ChartLegend position="bottom" orientation="horizontal" />
    <ChartSeries>
    <ChartCategoryAxis style={{border:"1px solid black"}}>
              <ChartCategoryAxisItem categories={msmedata} startAngle={0}/>
            </ChartCategoryAxis>
      <ChartSeriesItem type="bar"  data={msmevalue} tooltip={{ visible: true }} />
      {/* <ChartSeriesItem type="bar" data={msmevalue}  tooltip={{ visible: true }} /> */}
    </ChartSeries>
  </Chart>);
}
  export default MsmeChart