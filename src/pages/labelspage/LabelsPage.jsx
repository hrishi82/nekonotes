import { useData } from "../../context/dataContext";
import { NoteCard } from "../homepage/NoteCard/NoteCard";

export const LabelsPage = () => {
  const { state } = useData();
  const { allNotes } = state;

  let allLabels = allNotes.reduce((acc, curr) => {
    let labelExist = acc?.includes(curr.label);
    if (!labelExist) {
      acc.push(curr.label);
    }
    return acc;
  }, []);

  return (
    <section className="allnotes-container">
      <div className="allNotes-content-wrapper">
        {allLabels.map((labelName) => {
          return (
            <>
              <h3 className="allnotes-container-info-text">{labelName}</h3>

              <>
                {allNotes.map((el) =>
                  el.label === labelName ? (
                    <NoteCard key={el._id} data={el} />
                  ) : (
                    ""
                  )
                )}
              </>
            </>
          );
        })}
      </div>
    </section>
  );
};
