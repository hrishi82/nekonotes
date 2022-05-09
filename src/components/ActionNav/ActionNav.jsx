import { useData } from "../../context/dataContext";
import "./actionnav.css";
import {useState} from "react"

export const ActionNav = () => {
  const { state, dispatch } = useData();

  const [viewSortOprtion, setViewSortOprtion] = useState(false)

  const addNoteHandler = () => {
    dispatch({ type: "VIEW_INPUT_MODAL" });
  };


  const sortHandlerFunc = (e) =>{
    if(e.target.innerText==="By Latest"){
      dispatch({type:"FILTER_BY_SORT", payload:"SORT_BY_LATEST"})
      setViewSortOprtion(false)
    }else if(e.target.innerText==="By Oldest"){
      dispatch({type:"FILTER_BY_SORT", payload:"SORT_BY_OLDEST"})
      setViewSortOprtion(false)
    }
  }
  

  return (
    <div className="actions-nav-container">
      <div className="actions-nav-buttons-container-right relative">
        <button className="btn btn-secondary-outline sort-btn" onClick={()=>setViewSortOprtion(!viewSortOprtion)}>Sort by</button>
{     viewSortOprtion &&   <div className="sort-by-option-wrapper">
          <p className="sort-by-options" onClick={(e)=>sortHandlerFunc(e)}>By Latest</p>
          <p className="sort-by-options" onClick={(e)=>sortHandlerFunc(e)}> By Oldest</p>
        </div>}
      </div>
      <div className="actions-nav-buttons-container-right">
        <button
          className="btn btn-primary add-note-btn"
          onClick={addNoteHandler}
        >
          Add Note
        </button>
      </div>
    </div>
  );
};
