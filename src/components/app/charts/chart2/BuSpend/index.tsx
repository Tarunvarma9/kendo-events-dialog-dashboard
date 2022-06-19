import * as React from "react";
import * as ReactDOM from "react-dom";

import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartLegend,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
} from "@progress/kendo-react-charts";

const data = [360000000, 170000000, 300000000, 250000000, 280000000, 350000000];
const categories = ["VRePL ", "Woxen", "WTC", "Karka", "Chaitanya", "BEEN"];

const BuSpend = () => (
  <div className="col-4">
    <div className="k-card">
      <Chart style={{ height: "250px" }}>
        <ChartTitle text="BU Spend" />
        <ChartLegend position="bottom" orientation="horizontal" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories} startAngle={45}  labels={{ rotation: -45}}/>
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem data={data} name="BU Spend" tooltip={{ visible: true }} />
        </ChartSeries>
      </Chart>
    </div>
  </div>
);

export default BuSpend;
