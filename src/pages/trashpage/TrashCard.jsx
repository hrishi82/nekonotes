import { useState } from "react";
import { useData } from "../../../src/context/dataContext";
import { useAuth } from "../../../src/context/authContext";
import { useNavigate } from "react-router-dom";
import {
  restoreTrashedNoteServiceHandler,
  deleteTrashedNoteServiceHandler,
} from "../../../src/services/services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TrashCard = ({ data }) => {

  const navigate = useNavigate();

  const { state, dispatch } = useData();

  const { token } = useAuth();

  const { title, content, label, color, createdOn, pinned } = data;

  const restoreHandler = async () => {
    if (!token) {
      navigate("/loginpage");
    }

    let restoreResp = await restoreTrashedNoteServiceHandler({
      encodedToken: token,
      id: data._id,
    });

    try {
      if (restoreResp.status === 200 || restoreResp.status === 201) {
        dispatch({
          type: "SET_DELETED_NOTES",
          payload: restoreResp.data.trash,
        });
        dispatch({ type: "SET_ALL_NOTES", payload: restoreResp.data.notes });
        toast.success("Note restored!", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHandler = async () => {
    if (!token) {
      navigate("/loginpage");
    }

    let trashResp = await deleteTrashedNoteServiceHandler({
      encodedToken: token,
      id: data._id,
    });
    
    try {
      if (trashResp.status === 200 || trashResp.status === 201) {
        dispatch({
          type: "SET_DELETED_NOTES",
          payload: trashResp.data.trash,
        });
        toast.error("Note Deleted!", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (err) {
      console.log(err);
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
            <button className="card-footer-icon" onClick={restoreHandler}>
            <i className="fa-solid fa-share"></i>
            </button>
            <button className="card-footer-icon" onClick={deleteHandler}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
};
