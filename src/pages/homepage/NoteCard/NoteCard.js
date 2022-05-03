import { useData } from "../../../context/dataContext";

export const NoteCard = ({ data }) => {

  const {setFormData} = useData()

  const { title, content, label, color, createdOn } = data;

  const editCardHandler = () =>{
    setFormData(data)
  }

  return (
    <div className="notecard-container relative">
      <div
        className="card display-card"
        style={{ backgroundColor: `${color}` }}
        onClick = {editCardHandler}
      >
        <section className="card-body-container">
          <section className="card-header-container">
            <section className="card-topic-subtopic-container">
              <h4 className="card-main-topic">{title}</h4>
            </section>
            <div className="card-thumbtack-container">
              <i className="fa-solid fa-thumbtack"></i>
            </div>
          </section>

          <p className="card-topic-summary">{content}</p>

          <div className="card-label-tag-container">
            {label && <span className="card-label-tag">{label}</span>}
          </div>
        </section>

        <section className="card-footer-container">
          <div className="footer-btn-wrapper">
            <p>{new Date(createdOn).toLocaleString()}</p>
          </div>

          <div className="footer-icon-btn-wrapper">
            <button className="card-footer-icon">
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button className="card-footer-icon">
              <i className="fa-solid fa-box-open"></i>
            </button>
            <button className="card-footer-icon">
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
