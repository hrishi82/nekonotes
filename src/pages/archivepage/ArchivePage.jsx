import { useData } from "../../context/dataContext"
import { NoteCard } from "../homepage/NoteCard/NoteCard";

export const ArchivePage = () => {
  const { state } = useData();
  const {archivedNotes} = state 

  return (
    <section className="allnotes-container">
      <div className="allNotes-content-wrapper">
        <h3 className="allnotes-container-info-text">Archived Notes: {archivedNotes?.length}</h3>
        <div className="allnotes-container-content">
          {archivedNotes?.map((el) => {
            return (
                <NoteCard key={el._id} data={el} />
            );
          })}
        </div>
      </div>
    </section>
  );
};
