import React, { useContext, useState } from "react";
import Dialog from "../Dialog";
import "./index.css";
import GraphsContext from "../../../context";
import PoSummary2 from "./PoSummary2";
import CategorySpend2 from "./CategorySpend2";
import MsmeChart from "./Msme";
import ClassificationChart from "./Classification";
import "../../../custom-event/custom-event.css";

function ChartBoard() {
  const { hidden, changeView, graphsList } = useContext(GraphsContext);
  console.log(graphsList);

  return (
    <>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {hidden ? (
            <button className="dialog-btn" onClick={changeView}>
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
            {graphsList.includes("Category") && <PoSummary2 />}
            {graphsList.includes("MSME") && <MsmeChart />}
            {graphsList.includes("Classification") && <ClassificationChart />}
            {graphsList.includes("CategorySpend") && <CategorySpend2 />}
          </div>
          <div>{hidden ? null : <Dialog />}</div>
        </div>

        <br />
      </div>
    </>
  );
}

export default ChartBoard;
