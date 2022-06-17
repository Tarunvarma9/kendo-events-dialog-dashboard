import React, { useState } from "react";
import './index.css';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
  SeriesClickEvent,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartArea,
} from "@progress/kendo-react-charts";
import Dialog from "../Dialog";

const categories = [];
const series = [
  {
    name: "May",
    data: 360000000,
  },
  {
    name: "Apr",
    data: 210000000,
  },
  {
    name: "Mar",
    data: 300000000,
  },
  {
    name: "Feb",
    data: 125000000,
  },
  {
    name: "Jan",
    data: 175000000,
  },
  {
    name: "Dec",
    data: 210000000,
  },
];

function AllCharts() {
  const [visible, setVisible] = React.useState<boolean>(true);
  const [popupCatagory, setPopupCategory] = React.useState<string>("");
  const [popupDataItem, setPopupDataItem] = React.useState<string>("");
  const [hidden, setHidden] = useState(true);

  const popupView = (event: SeriesClickEvent) => {
    setPopupCategory(event.category);
    setPopupDataItem(event.dataItem);
    setVisible(!visible);
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };
  return (
    <div className='allcharts-container'>
      <div className="col-4">
        <div className="k-card">
          <Chart
            style={{ height: "250px" }}
            onSeriesClick={(event: SeriesClickEvent) => popupView(event)}
            pannable={true}
            zoomable={true}
          >
            <ChartArea background="#fff" margin={30} />
            <ChartTitle labels={{ color: "red" }} text="BU Spend" />
            <ChartLegend position="bottom" orientation="horizontal" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem />
            </ChartCategoryAxis>
            <ChartSeries>
              <ChartSeriesItem
                data={series}
                type="column"
                tooltip={{ visible: true }}
                field={"data"}
                categoryField={"name"}
              />
            </ChartSeries>
          </Chart>
        </div>
      </div>

      {/* <div><h1>Graphs</h1><button onClick={() => setHidden(s => !s)}>close</button></div> */}

      <div>{hidden ? null : <Dialog/>}
 {hidden? <button onClick={() => setHidden(s => !s)}>
 Dialog box
 </button> : null}</div>
   
    </div>
  );
}

export default AllCharts;
