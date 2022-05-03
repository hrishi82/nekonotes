import { useData } from "../../../context/dataContext";
import { useEffect } from "react";
import { NoteCard } from "../NoteCard/NoteCard";
import { NoteInput } from "../NoteInput/NoteInput";

export const NotesMain = () => {
  const { state, formData } = useData();
  return (
    <section className="allnotes-container">
      <button onClick={()=>console.log(formData)}>check</button>
      <NoteInput />
      <div className="allNotes-content-wrapper">
        <h3 className="allnotes-container-info-text">Pinned Notes</h3>
        {/* <div className="allnotes-container-content">
          {state.allNotes.map((el) => {
            return (
              <>
                <NoteCard key={el._id} data={el} />
              </>
            );
          })}
        </div> */}
      </div>
      <div className="allNotes-content-wrapper">
        <h3 className="allnotes-container-info-text">Notes: {state?.allNotes?.length}</h3>
        <div className="allnotes-container-content">
          {state.allNotes.map((el) => {
            return (
                <NoteCard key={el._id} data={el} />
            );
          })}
        </div>
      </div>
    </section>
  );
};
