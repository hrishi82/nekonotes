import { useData } from "../../context/dataContext";
import { NoteCard } from "../homepage/NoteCard/NoteCard";
import { AsideBar } from "../../components/Aside/AsideBar";
import {NoteInput} from "../../pages/homepage/NoteInput/NoteInput"

export const LabelsPage = () => {
  const { state,dispatch } = useData();
  const { allNotes } = state;

  let allLabels = allNotes?.reduce((acc, curr) => {
    let labelExist = acc?.includes(curr.label);
    if (!labelExist) {
      acc.push(curr.label);
    }
    return acc;
  }, []);


  return (
    <>
     <AsideBar/>
     <NoteInput/>
     <div  onClick={()=>dispatch({type: "VIEW_INPUT_MODAL"})} className={`note-input-master-wrapper ${state.displayInputModal ? "viewModal" : null}`}>   </div>
      <section className="allnotes-container">

      <div className="allNotes-content-wrapper">
          
        {allLabels.map((labelName) => {
          return (
            <div>
              <h3 className="allnotes-container-info-text">{labelName ? labelName : "Un-labeled"}</h3>

              
                {allNotes.map((el) =>
                  el.label === labelName ? (
                    <NoteCard key={el._id} data={el} />
                  ) : (
                    ""
                  )
                )}
              
            </div>
          );
        })}
      </div>
    </section>
    
    </>

  );
};
