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
  ChartArea,
} from "@progress/kendo-react-charts";


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

function BarChartPopup() {
  
  return (
    <>
      <div className="col-12" style={{width: "600px"}}>
        <div className="k-card">
          <Chart
            style={{ height: "400px" }}
          >
            <ChartArea  margin={30} />
            <ChartTitle labels={{ color: "red" }} text="BU Spend In Month" />
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
      
    </>
  );
}

export default BarChartPopup;
