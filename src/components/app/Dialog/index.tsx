import React, { useContext } from "react";
import GraphsContext from "../../../context";
import "./index.css";
function Dialog() {
  const { changeView, graphsList, addGraph, removeGraph, dropdownList } = useContext(GraphsContext)
  return (
    <div className="main-btn-div">
      <h5 style={{ textAlign: "center", fontWeight: '800' }}>Graphs</h5>
      {dropdownList.map((name: any) =>{
        const addButtonClassname = graphsList.includes(name) ? "add-btn disabled-btn" : "add-btn "
        const delButtonClassname = graphsList.includes(name) ? "del-btn " : "del-btn disabled-btn"

        return(
        <div className="btn-div" key={name}>
          <h6 className="heading">{name}</h6>
          &nbsp;
          <div className="btn-sub-div">
            <button className={addButtonClassname}  onClick={() => addGraph(name)}>Add</button>
            &nbsp;
            <button className={delButtonClassname}  onClick={() => removeGraph(name)}>Delete</button>
            &nbsp;
          </div>
        </div>
        )}
      )}

      <br />
      <div className="action-div">
        <button className="action-btn-submit">Submit</button>
        <button className="action-btn-close" onClick={changeView}>Close</button>
      </div>
    </div>
  );
}

export default Dialog;
