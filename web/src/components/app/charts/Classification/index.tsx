import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Chart, ChartSeries, ChartSeriesItem, ChartTitle, ChartCategoryAxis,
    ChartCategoryAxisItem,  ChartLegendTitle,ChartLegend,
    ChartLegendItem} from '@progress/kendo-react-charts';
import 'hammerjs';

const ClassificationChart = () =>{
   const [classificationdata,Setclassificationdata]=React.useState<any[]>([])
   const [classificationvalue,Setclassificationvalue]=React.useState<any[]>([])  

   React.useEffect(() => {
        const headers = {method: "GET",
        headers: {
          "access-control-allow-origin" : "*",
          "Content-type": "application/json; charset=UTF-8"
        }}
        const url ="http://127.0.0.1:8000/effigo/api/dashboard/Classification"
        const fetchData = async () => {
          const data = await fetch(url, headers);
          const json = await data.json();
          console.log(json,"classification")
          let data1 = []
          let data2:string[] = []
          for (let li of json){
                data1.push(li[0])
                data2.push(li[1])
          }
          Setclassificationdata(data1)
          Setclassificationvalue(data2)
          
        }
        fetchData()
        
          
      },[]);

return(
<Chart style={{height:'300px',width:'60%',padding:'0px 1%'}}>
<ChartTitle text="classification" />
<ChartLegend position="bottom" orientation="horizontal" />
    <ChartSeries>
    <ChartCategoryAxis >
              <ChartCategoryAxisItem categories={classificationdata} startAngle={0} />
            </ChartCategoryAxis>
      <ChartSeriesItem type="bar"  data={classificationvalue} tooltip={{ visible: true }} />
      {/* <ChartSeriesItem type="bar" data={msmevalue}  tooltip={{ visible: true }} /> */
      console.log(classificationdata, "class")
      }
    </ChartSeries>
  </Chart>);
}
  export default ClassificationChart