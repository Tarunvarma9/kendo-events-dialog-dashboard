import React from "react";
import "./index.css";

import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartLegend,
  ChartSeriesLabels,
  ChartTitle,
} from "@progress/kendo-react-charts";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { AiOutlineClose } from "react-icons/ai";
import { MdZoomOutMap } from "react-icons/md";
import DonutChartPopup from "../DonutChartPopup";

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
  const [largeView, setLargeView] = React.useState(true);

  const toggleDialog = () => {
    setLargeView(!largeView);
  };

  return (
    <>
      <div className="col-4">
        <div className="k-card">
        <span className="chart-heading-section"><p>{" "}</p><p style={{ margin: 0 , color: '#000',fontWeight: 'bold'}} className="heading-text">Catalog Vs. Non-Catalog Savings </p><button className="zoom-button" onClick={toggleDialog}><MdZoomOutMap /></button></span>
          <Chart style={{height:'300px',width:'450px'}}>
            {/* <ChartTitle text={ `Catalog Vs. Non-Catalog Savings ` }/> */}
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
              </ChartSeriesItem>
            </ChartSeries>
          </Chart>
        </div>
      </div>
      {largeView ? null : (
        <Dialog onClose={toggleDialog}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <AiOutlineClose onClick={toggleDialog} />
          </div>
          <DonutChartPopup />
        </Dialog>
      )}
    </>
  );
}

export default DonutChart;
