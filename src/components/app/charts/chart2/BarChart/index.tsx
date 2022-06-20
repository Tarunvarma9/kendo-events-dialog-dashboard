import React from "react";
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
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import BuSpend from "../BuSpend";
import DummyGrid from "../DummyGrid";
import {AiOutlineClose} from 'react-icons/ai'
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

function BarChart() {
  const [visible, setVisible] = React.useState<boolean>(true);
  const [popupCatagory, setPopupCategory] = React.useState<string>("");
  const [popupDataItem, setPopupDataItem] = React.useState<string>("");

  const popupView = (event: SeriesClickEvent) => {
    setPopupCategory(event.category);
    setPopupDataItem(event.dataItem);
    setVisible(!visible);
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };
  return (
    <>
      <div className="col-4 mb-2">
        <div className="k-card">
          <Chart
            style={{ height: "250px" }}
            onSeriesClick={(event: SeriesClickEvent) => popupView(event)}
            pannable={true}
            zoomable={true}
          >
            <ChartArea background="#eee" margin={30} />
            <ChartTitle labels={{ color: "red" }} text="BU Spend" />
            <ChartLegend position="bottom" orientation="horizontal" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem />
            </ChartCategoryAxis>
            {/* <ChartValueAxis>
              <ChartValueAxisItem
                labels={{ rotation: 0, color: "red", format: '#.0' }}
                max={10}
              />
            </ChartValueAxis> */}
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
      {visible ? null : (
        <Dialog onClose={toggleDialog}>
         <div style={{display:'flex',justifyContent:'flex-end'}}>
            <AiOutlineClose onClick={toggleDialog}/>
         </div>
          <DummyGrid/>
        </Dialog>
      )}
    </>
  );
}

export default BarChart;
