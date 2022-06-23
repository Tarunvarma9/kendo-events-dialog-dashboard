import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { Loader } from "@progress/kendo-react-indicators";
import '../../../../custom/custom.css'
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartLegend,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  SeriesClickEvent,
} from "@progress/kendo-react-charts";

function CategoryPopup() {
  const [visible, setVisible] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState(true)

  const [poData, setPoData] = React.useState<any[]>([]);
  const [poCategory, setPoCategory] = React.useState<any[]>([]);

  useEffect(() => {
    const headers = {method: "GET",
    headers: {
      "access-control-allow-origin" : "*",
      "Content-type": "application/json; charset=UTF-8"
    }}
    const url ="http://127.0.0.1:8000/effigo/api/dashboard/Category"
    const fetchData = async () => {
      const data = await fetch(url, headers);
      const json = await data.json();
      let data1 = []
      let data2:string[] = []
      for (let li of json){
            data1.push(li[0])
            data2.push(li[1])
      }
      setPoCategory(data1)
      setPoData(data2)
      setLoading(false)
      
    }
    fetchData()
    
      
  },[]);

  const popupView = (event: SeriesClickEvent) => {
    setVisible(!visible);
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };


  return (
    <>
     <div className="col-12" style={{ width: "600px", height: "450px" }}>
          {loading ? (<><Loader size="large" type={"infinite-spinner"} /></>):(<><div className="k-card">
          <Chart
            
          >
            <ChartTitle text="Category" />
            <ChartLegend position="bottom" orientation="horizontal" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={poCategory} startAngle={0} labels={{ rotation: -35}} />
            </ChartCategoryAxis>
            <ChartSeries>
              <ChartSeriesItem data={poData} tooltip={{ visible: true }}  />
            </ChartSeries>
          </Chart>
        </div></>)}
      </div>
    </>
  );
}

export default CategoryPopup;
