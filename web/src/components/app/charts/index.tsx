import React, { useContext, useState } from "react";
import Dialog from "../Dialog";
import "./index.css";
import GraphsContext from "../../../context";
import PoSummary2 from "./PoSummary2";
import CategorySpend2 from "./CategorySpend2";
import MsmeChart from "./Msme";
import ClassificationChart from "./Classification";
import "../../../custom-event/custom-event.css";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";

function ChartBoard() {
  const { hidden, changeView, graphsList,localList,hiddenview } = useContext(GraphsContext);
  return (
    <>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {hidden ? (
            <button className="dialog-btn" onClick={hiddenview}>
              Edit
            </button>
          ) : null}
        </div>

        <div className="graph-row" style={{ padding: "20px 0px" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              justifyContent: "center",
            }}
          >
            {localList.includes("Category") && <PoSummary2 />}
            {localList.includes("MSME") && <MsmeChart />}
            {localList.includes("Classification") && <ClassificationChart />}
            {localList.includes("CategorySpend") && <CategorySpend2 />}
            {localList.includes("Cat vs Non-cat") && <DonutChart />}
            {localList.includes("Bu spend") && <BarChart />}
          </div>
          <div>{hidden ? null : <Dialog />}</div>
        </div>

        <br />
      </div>
    </>
  );
}

export default ChartBoard;
