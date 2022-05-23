import { useData } from "../../../context/dataContext";
import { useEffect } from "react";
import { NoteCard } from "../NoteCard/NoteCard";
import { NoteInput } from "../NoteInput/NoteInput";
import { ActionNav } from "../../../components/ActionNav/ActionNav";
import {useFilterHook} from "../../../hooks/useFilterHook"

export const NotesMain = () => {
  const { state, formData, dispatch } = useData();

  const { filteredData } = useFilterHook()


  let pinnedNotesArr = filteredData
    ?.filter((el) => el.pinned)
    .filter((el) => !el.archived);
  let unpinnedNotesArr = filteredData
    ?.filter((el) => !el.pinned)
    .filter((el) => !el.archived);
    
  return (
    <>
      <ActionNav/>
      <NoteInput />
    <div  onClick={()=>dispatch({type: "VIEW_INPUT_MODAL"})} className={`note-input-master-wrapper ${state.displayInputModal ? "viewModal" : null}`}>   </div>
    
    <section className="allnotes-container">
      {pinnedNotesArr?.length > 0 && (
        <div className="allNotes-content-wrapper">
          <h3 className="allnotes-container-info-text">
            Pinned Notes: {pinnedNotesArr?.length}
          </h3>
          <div className="allnotes-container-content">
            {pinnedNotesArr?.map((el) => {
              return (
                <>
                  <NoteCard key={el._id + "pinned"} data={el} />
                </>
              );
            })}
          </div>
        </div>
      )}

      <div className="allNotes-content-wrapper">
        {unpinnedNotesArr?.length > 0 ? (
          <h3 className="allnotes-container-info-text">
            Notes: {unpinnedNotesArr?.length}
          </h3>
        ) : (
          <h3 className="no-notes-alert">No Notes!</h3>
        )}
        <div className="allnotes-container-content">
          {unpinnedNotesArr?.map((el) => {
            return <NoteCard key={el._id} data={el} />;
          })}
        </div>
      </div>
    </section>
 
    
    </>

  );
};
