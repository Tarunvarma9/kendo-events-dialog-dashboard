import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
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
import {AiOutlineClose} from 'react-icons/ai'

const data = [20, 170, 245, 215, 195, 110];
const categories = ["May", "Apr", "Mar", "Feb", "Jan", "Dec"];

function PoSummary() {
  const [visible, setVisible] = React.useState<boolean>(true);

  const [poData, setPoData] = React.useState<number[]>([]);
  const [poCategory, setPoCategory] = React.useState<string[]>([]);

  useEffect(() => {
    const headers = {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8"
      }
    }
    const url = "http://localhost:8000/effigo/api/dashboard/MonthlyPO"
    const fetchData = async () => {
      const data = await fetch(url, headers);
      const json = await data.json();

    }
    fetchData()

  }, []);

  const popupView = (event: SeriesClickEvent) => {
    setVisible(!visible);
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className="col-4">
        <div className="k-card">
          <Chart
            style={{ height: "250px" }}
            onSeriesClick={(event: SeriesClickEvent) => popupView(event)}
          >
            <ChartTitle text="Monthly PO Summary" />
            <ChartLegend position="bottom" orientation="horizontal" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={categories} startAngle={45}  />
            </ChartCategoryAxis>
            <ChartSeries>
              <ChartSeriesItem data={data} name="PO Count"  tooltip={{ visible: true }} />
            </ChartSeries>
          </Chart>
        </div>
      </div>
      {visible ? null : (
        <Dialog onClose={toggleDialog}>
          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <AiOutlineClose onClick={toggleDialog}/>
          </div>
          <LineChart />
        </Dialog>
      )}
    </>
  );
}

export default PoSummary;
