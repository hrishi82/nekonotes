import { useState } from "react";
import { useData } from "../../../context/dataContext";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  postEditedNoteServiceHandler,
  postNotesToArchiveServiceHandler,
  restoreNotesFromArchiveServiceHandler,
  deleteNoteServiceHandler,
  deleteNotesFromArchiveServiceHandler,
} from "../../../services/services";

export const NoteCard = ({ data }) => {
  const navigate = useNavigate();

  const { setFormData, state, dispatch } = useData();

  const { token } = useAuth();

  const { title, content, label, color, createdOn, pinned } = data;

  const editCardHandler = () => {
    setFormData(data);
  };

  const pinHandlerFunc = async () => {
    if (!token) {
      navigate("/loginpage");
    }

    let indexID = state?.allNotes?.findIndex((el) => el._id === data._id);
    let newData = { ...data, pinned: !data.pinned };

    let postResponse;

    if (indexID !== -1) {
      postResponse = await postEditedNoteServiceHandler({
        encodedToken: token,
        note: newData,
        id: data._id,
      });
    }

    try {
      if (postResponse.status === 200 || postResponse.status === 201) {
        dispatch({ type: "SET_ALL_NOTES", payload: postResponse.data.notes });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const archiveHandler = async () => {
    if (!token) {
      navigate("/loginpage");
    }

    let indexID = state?.allNotes?.findIndex((el) => el._id === data._id);
    let newData = { ...data, archived: !data.archived };

    let postResponse;

    if (indexID !== -1) {
      postResponse = await postNotesToArchiveServiceHandler({
        encodedToken: token,
        note: newData,
        id: data._id,
      });
    } else {
      postResponse = await restoreNotesFromArchiveServiceHandler({
        encodedToken: token,
        note: newData,
        id: data._id,
      });
    }

    try {
      if (postResponse.status === 200 || postResponse.status === 201) {
        dispatch({
          type: "SET_ALL_ARCHIVED_NOTES",
          payload: postResponse.data.archives,
        });
        dispatch({ type: "SET_ALL_NOTES", payload: postResponse.data.notes });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async () => {
    if (!token) {
      navigate("/loginpage");
    }

    let archiveIndexID = state?.archivedNotes?.findIndex(
      (el) => el._id === data._id
    );

    let deleteResp;

    if (archiveIndexID !== -1) {
      deleteResp = await deleteNotesFromArchiveServiceHandler({
        encodedToken: token,
        note: data,
        id: data._id,
      });
      try {
        if (deleteResp.status === 200 || deleteResp.status === 201) {
          dispatch({
            type: "SET_ALL_ARCHIVED_NOTES",
            payload: deleteResp.data.archives,
          });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      deleteResp = await deleteNoteServiceHandler({
        encodedToken: token,
        note: data,
        id: data._id,
      });
      try {
        if (deleteResp.status === 200 || deleteResp.status === 201) {
          dispatch({ type: "SET_ALL_NOTES", payload: deleteResp.data.notes });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="notecard-container relative">
      <div
        className="card display-card relative"
        style={{ backgroundColor: `${color}` }}
      >
        <section className="card-body-container">
          <section className="card-header-container">
            <section className="card-topic-subtopic-container">
              <h4 className="card-main-topic">{title}</h4>
            </section>
            <div className="card-thumbtack-container absolute">
              <i
                className={`fa-solid fa-thumbtack ${
                  pinned ? "thumbtack-active" : null
                }`}
                onClick={pinHandlerFunc}
              ></i>
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
            <button className="card-footer-icon" onClick={editCardHandler}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button className="card-footer-icon" onClick={archiveHandler}>
              <i className="fa-solid fa-box-open"></i>
            </button>
            <button className="card-footer-icon" onClick={deleteHandler}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
