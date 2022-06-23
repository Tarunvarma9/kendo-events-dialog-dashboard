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

import DummyGrid from "../DummyGrid";
import {AiOutlineClose} from 'react-icons/ai'
import { MdZoomOutMap } from "react-icons/md";
import BarChartPopup from "../BarChartPopup";
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
  const [largeView, setLargeView] = React.useState(true);

  const toggleLargeView = () => {
    setLargeView(!largeView);
  };


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
        <span className="chart-heading-section"><p>{" "}</p><p style={{ margin: 0 , color: '#000',fontWeight: 'bold'}} className="heading-text">BU Spend In Month </p><button className="zoom-button" onClick={toggleLargeView}><MdZoomOutMap /></button></span>

          <Chart
           style={{height:'300px',width:'450px'}}
            onSeriesClick={(event: SeriesClickEvent) => popupView(event)}
            pannable={true}
            zoomable={true}
          >
            <ChartArea  margin={30} />
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
      {visible ? null : (
        <Dialog onClose={toggleDialog}>
         <div style={{display:'flex',justifyContent:'flex-end'}}>
            <AiOutlineClose onClick={toggleDialog}/>
         </div>
          <DummyGrid/>
        </Dialog>
      )}
      {largeView ? null : (
      <Dialog onClose={toggleLargeView}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <AiOutlineClose onClick={toggleLargeView} />
        </div>
        <BarChartPopup />
      </Dialog>
    )}
    </>
    
  );
}

export default BarChart;
