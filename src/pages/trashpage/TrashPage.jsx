
import { useData } from "../../context/dataContext"
import { TrashCard } from "./TrashCard";
import { AsideBar } from "../../components/Aside/AsideBar";
import {NoteInput} from "../../pages/homepage/NoteInput/NoteInput"

export const TrashPage = () => {
  const { state,dispatch } = useData();
  const {deletedNotes} = state 

  return (
    <>
    <AsideBar/>
  
    <section className="allnotes-container">
      <div className="allNotes-content-wrapper">
      {deletedNotes?.length > 0 ? (
          <h3 className="allnotes-container-info-text">
            Deleted Notes: {deletedNotes?.length}
          </h3>
        ) : (
          <h3 className="no-notes-alert">No deleted notes!</h3>
        )}
        <div className="allnotes-container-content">
          {deletedNotes?.map((el) => {
            return (
                <TrashCard key={el._id} data={el} />
            );
          })}
        </div>
      </div>
    </section>
    </>

  );
};
