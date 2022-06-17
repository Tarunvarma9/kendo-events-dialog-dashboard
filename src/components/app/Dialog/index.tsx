import React from "react";
import "./index.css";
function Dialog() {
  return (
    <div className="main-btn-div">
      <div className="btn-div">
        <h6 className="heading">Graph1</h6>
        &nbsp;
        <div className="btn-sub-div">
          <button className="add-btn">Add</button>
          &nbsp;
          <button className="del-btn">Delete</button>
          &nbsp;
        </div>
      </div>

      <div className="btn-div">
        <h6 className="heading"> Graph2</h6>
        &nbsp;
        <div className="btn-sub-div">
          <button className="add-btn">Add</button>
          &nbsp;
          <button className="del-btn">Delete</button>
          &nbsp;
        </div>
      </div>

      <div className="btn-div">
        <h6 className="heading">Graph3</h6>
        &nbsp;
        <div className="btn-sub-div">
          <button className="add-btn">Add</button>
          &nbsp;
          <button className="del-btn">Delete</button>
          &nbsp;
        </div>
      </div>

      <div className="btn-div">
        <h6 className="heading">Graph4</h6>
        &nbsp;
        <div className="btn-sub-div">
          <button className="add-btn">Add</button>
          &nbsp;
          <button className="del-btn">Delete</button>
          &nbsp;
        </div>
      </div>
      <div className="btn-div">
        <h6 className="heading">Graph5</h6>
        &nbsp;
        <div className="btn-sub-div">
          <button className="add-btn" style={{opacity:'0.5'}}>Add</button>
          &nbsp;
          <button className="del-btn">Delete</button>
          &nbsp;
        </div>
      </div>
      <div className="btn-div">
        <h6 className="heading">Graph6</h6>
        &nbsp;
        <div className="btn-sub-div">
          <button className="add-btn" style={{opacity:'0.5'}}>Add</button>
          &nbsp;
          <button className="del-btn">Delete</button>
          &nbsp;
        </div>
      </div>
      <br />
      <div className="action-div">
        <button className="action-btn-submit">Submit</button>
        <button className="action-btn-close">Close</button>
      </div>
    </div>
  );
}

export default Dialog;
