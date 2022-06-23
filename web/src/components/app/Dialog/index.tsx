import React, { useContext } from "react";
import GraphsContext from "../../../context";
import "./index.css";

function Dialog() {
 
  const { localList,submitButtonStatus,changeView, graphsList, addGraph, removeGraph, dropdownList, hiddenview, handleSubmitButton } = useContext(GraphsContext)
  const namesList = dropdownList.map((o:any) => o.graph_name)
  const onSubmitButtonClick = () => {
    hiddenview()
    handleSubmitButton()

  }
  
  return (
    <div className="main-btn-div">
      <h5 style={{ textAlign: "center", fontWeight: '800' }}>Graphs</h5>
      {dropdownList.map((name: any) =>{
        const addButtonClassname = localList.includes(name) ? "add-btn disabled-btn" : "add-btn "
        const delButtonClassname = localList.includes(name) ? "del-btn " : "del-btn disabled-btn"

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
        {submitButtonStatus ? <button    className="action-btn-submit" onClick={onSubmitButtonClick}>Submit.</button>:<button   className="action-btn-submit" onClick={onSubmitButtonClick}>Submit</button>}
    
        <button className="action-btn-close" onClick={changeView}>Close</button>
      </div>
    </div>
  );
}

export default Dialog;
