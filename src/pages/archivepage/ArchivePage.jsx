import { useData } from "../../context/dataContext"
import { AsideBar } from "../../components/Aside/AsideBar";
import {NoteInput} from "../../pages/homepage/NoteInput/NoteInput"
import { ArchiveCard } from "./ArchiveCard";

export const ArchivePage = () => {
  const { state,dispatch } = useData();
  const {archivedNotes} = state 

  return (
    <>
    <AsideBar/>
    <NoteInput />
    <div  onClick={()=>dispatch({type: "VIEW_INPUT_MODAL"})} className={`note-input-master-wrapper ${state.displayInputModal ? "viewModal" : null}`}>   </div>

    <section className="allnotes-container">
      <div className="allNotes-content-wrapper">
      {archivedNotes?.length > 0 ? (
          <h3 className="allnotes-container-info-text">
            Archived Notes: {archivedNotes?.length}
          </h3>
        ) : (
          <h3 className="no-notes-alert">No Archived Notes!</h3>
        )}
        <div className="allnotes-container-content">
          {archivedNotes?.map((el) => {
            return (
                <ArchiveCard key={el._id} data={el} />
            );
          })}
        </div>
      </div>
    </section>
    </>

  );
};
