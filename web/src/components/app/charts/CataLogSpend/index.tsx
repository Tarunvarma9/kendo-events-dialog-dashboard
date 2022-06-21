import * as React from "react";
import * as ReactDOM from "react-dom";
import { Loader } from "@progress/kendo-react-indicators";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartTitle,
  ChartLegendTitle,
  ChartLegendItem
} from "@progress/kendo-react-charts";

import "hammerjs";

const pieData = [
  { category: "STEEL", value: 26 },
  { category: "FLOORING MATERIAL", value: 25 },
  { category: "CEMENT", value: 20 },
  { category: "HARDWARE MATERIAL", value: 13 },
  { category: "ELECTRICAL MATERIAL", value: 9 },
  { category: "METAL", value: 7 },
];
function CatalogSpend() {
    const [loading, setLoading] = React.useState(true)
    const [catalogSpendData, setCatalogSpendData] = React.useState<any[]>([])

    React.useEffect(() => {
        const headers = {method: "GET",
        headers: {
          "access-control-allow-origin" : "*",
          "Content-type": "application/json; charset=UTF-8"
        }}
        const url ="http://localhost:8000/effigo/api/dashboard/PoSpend"
        const fetchData = async () => {
          const data = await fetch(url, headers);
          const json = await data.json();
          let pieData:any[] = []
          for (let li of json){
              let objectData:any = {"category": li[0], "value":li[2]}
              pieData.push(objectData)
          }
          setCatalogSpendData(pieData)
          setLoading(false)
    
          
        }
        fetchData()
        
          
      },[]);


  return (
    <div className="col-4">
        {loading ? <><Loader size="large" type={"infinite-spinner"} /></>:<><div className="k-card">
        <Chart style={{ height: "250px" }}>
          <ChartTitle text="Catalog Vs. Non-Catalog Spend" />
          <ChartLegend position="right" >
          <ChartLegendItem />
          </ChartLegend>
          <ChartSeries>
            <ChartSeriesItem
              type="pie"
              data={catalogSpendData}
              field="value"
              categoryField="category"
              tooltip={{ visible: true }}
            />
          </ChartSeries>
        </Chart>
      </div></>}
      
    </div>
  );
}

export default CatalogSpend;
