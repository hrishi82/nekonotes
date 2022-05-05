import { useData } from "../../../context/dataContext";
import { useEffect } from "react";
import { NoteCard } from "../NoteCard/NoteCard";
import { NoteInput } from "../NoteInput/NoteInput";

export const NotesMain = () => {
  const { state, formData } = useData();

  let pinnedNotesArr = state?.allNotes?.filter(el=>el.pinned).filter(el=>!el.archived)
  let unpinnedNotesArr = state?.allNotes?.filter(el=>!el.pinned).filter(el=>!el.archived)
  return (
    <section className="allnotes-container">
      <NoteInput />
{ pinnedNotesArr?.length > 0 && <div className="allNotes-content-wrapper">
        <h3 className="allnotes-container-info-text">Pinned Notes: {pinnedNotesArr?.length}</h3>
        <div className="allnotes-container-content">
          {pinnedNotesArr?.map((el) => {
            return (
              <>
                <NoteCard key={el._id + "pinned"} data={el} />
              </>
            );
          })}
        </div>
      </div>}


      <div className="allNotes-content-wrapper">
        <h3 className="allnotes-container-info-text">Notes: {unpinnedNotesArr?.length}</h3>
        <div className="allnotes-container-content">
          {unpinnedNotesArr?.map((el) => {
            return (
                <NoteCard key={el._id} data={el} />
            );
          })}
        </div>
      </div>
    </section>
  );
};
