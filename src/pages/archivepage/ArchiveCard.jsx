import { useState } from "react";
import { useData } from "../../../src/context/dataContext";
import { useAuth } from "../../../src/context/authContext";
import { useNavigate } from "react-router-dom";
import {
  restoreNotesFromArchiveServiceHandler,
  deleteNotesFromArchiveServiceHandler,
  postTrashedNoteServiceHandler
} from "../../../src/services/services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ArchiveCard = ({ data }) => {
  const navigate = useNavigate();

  const { state, dispatch } = useData();

  const { token } = useAuth();

  const { title, content, label, color, createdOn } = data;

  const unArchiveHandler = async () => {
    if (!token) {
      navigate("/loginpage");
    }

    const postResponse = await restoreNotesFromArchiveServiceHandler({
      encodedToken: token,
      note: data,
      id: data._id,
    });

    try {
      if (postResponse.status === 200 || postResponse.status === 201) {
        dispatch({
          type: "SET_ALL_ARCHIVED_NOTES",
          payload: postResponse.data.archives,
        });
        dispatch({ type: "SET_ALL_NOTES", payload: postResponse.data.notes });
        toast.success("Note unarchived!", {
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

    const archiveDeleteResp = await deleteNotesFromArchiveServiceHandler({
        encodedToken: token,
        note: data,
        id: data._id,
      });

      try {
        if (archiveDeleteResp.status === 200 || archiveDeleteResp.status === 201) {
          dispatch({
            type: "SET_ALL_ARCHIVED_NOTES",
            payload: archiveDeleteResp.data.archives,
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
            <button className="card-footer-icon" onClick={unArchiveHandler}>
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
