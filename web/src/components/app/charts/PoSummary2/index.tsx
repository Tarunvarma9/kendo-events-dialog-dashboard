import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { Loader } from "@progress/kendo-react-indicators";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
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
import LineChart from "../LinearChart";
// const data = [20, 170, 245, 215, 195, 110];
// const categories = ["May", "Apr", "Mar", "Feb", "Jan", "Dec"];

function PoSummary2() {
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


 console.log(poCategory, poData)
  return (
    <>
      <div className="col-4" >
          {loading ? (<><Loader size="large" type={"infinite-spinner"} /></>):(<><div className="k-card">
          <Chart
            style={{ height: "300px",width:'450px'}}
            // onSeriesClick={(event: SeriesClickEvent) => popupView(event)}
          >
            <ChartTitle text="Category" />
            <ChartLegend position="bottom" orientation="horizontal" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={poCategory} startAngle={0} labels={{ rotation: -35}}/>
            </ChartCategoryAxis>
            <ChartSeries>
              <ChartSeriesItem data={poData}  />
            </ChartSeries>
          </Chart>
        </div></>)}
        
      </div>
      {/* {visible ? null : (
        <Dialog onClose={toggleDialog}>
          <LineChart />

          <DialogActionsBar>
            <button
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              onClick={toggleDialog}
            >
              close
            </button>
          </DialogActionsBar>
        </Dialog>
      )} */}
    </>
  );
}

export default PoSummary2;
