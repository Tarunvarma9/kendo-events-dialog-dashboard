import React from "react";

import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartLegend,
  ChartSeriesLabels,
  ChartTitle,
} from "@progress/kendo-react-charts";

const data = [
  {
    kind: "Catalog",
    share: 51,
  },
  {
    kind: "Non-Catalog",
    share: 49,
  },
];

function DonutChart() {
  return (
    <div className="col-4">
      <div className="k-card">
        <Chart style={{ height: "250px" }}>
          <ChartTitle text="Catalog Vs. Non-Catalog Savings" />
          <ChartLegend position="bottom" orientation="horizontal" />
          <ChartSeries>
            <ChartSeriesItem
              type="donut"
              data={data}
              categoryField="kind"
              field="share"
              tooltip={{ visible: true }} 
            >
              <ChartSeriesLabels color="#fff" background="none" />
            </ChartSeriesItem >
          </ChartSeries>
        </Chart>
      </div>
    </div>
  );
}

export default DonutChart;
