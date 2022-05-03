import {useState, useEffect} from "react"
import {useData} from "../../../context/dataContext"
import {useAuth} from "../../../context/authContext"
import {postNoteServiceHandler, postEditedNoteServiceHandler} from "../../../services/services"
import { useNavigate } from "react-router-dom";


export const NoteInput = () => {

  const {state, dispatch, formData, setFormData, initialFormData} = useData()
  const {token} = useAuth()
  const navigate = useNavigate()

  const formSubmitHandler = async (e) =>{
    e.preventDefault();

    if (!token){
      navigate("/loginpage")
    }

    let indexID = state.allNotes.findIndex(el=> el._id === formData._id)
    let postResponse;

    if (indexID !== -1){
      postResponse = await postEditedNoteServiceHandler({encodedToken: token, note: formData, id: formData._id})
    }else{
      postResponse = await postNoteServiceHandler({encodedToken: token, note: formData})
    }

    try{
      if (postResponse.status === 200 || postResponse.status === 201){
        dispatch({type: "SET_ALL_NOTES", payload: postResponse.data.notes})
        setFormData(initialFormData)
      }
    }catch(err){
      console.log(err)
    }

  }

  const handleFormData = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  return (
    <div className="note-input-container">
      <form onSubmit = {e=>formSubmitHandler(e)}>

      <div className="card">
        <section className="card-body-container">
          
          <section className="card-header-container">
            <section className="card-topic-subtopic-container">
              <h4 className="card-main-topic">
                <input type="text" className="card-main-topic-input" placeholder="Title..." name="title" value={formData.title} onChange = {e=>handleFormData(e)}/>
              </h4>
            </section>
          </section>

          <p className="card-topic-summary">
            <textarea className="card-topic-summary-input" placeholder="Text here..." name="content" value={formData.content} onChange = {e=>handleFormData(e)}/>
          </p>

        </section>

        <section className="card-footer-container">
          <div className="footer-btn-wrapper">
            <button className="card-footer-icon">
              <input type="color" name="color" value={formData.color} onChange = {e=>handleFormData(e)}/>
              {/* <i class="fa-solid fa-palette"></i> */}
            </button>
            <input type="text" className="card-label-input" placeholder="Label..." name="label" value={formData.label} onChange = {e=>handleFormData(e)}/>
          </div>

          <div className="footer-icon-btn-wrapper">
            <button className="card-footer-icon" type="submit">Add</button>
          </div>
        </section>
      </div>

      </form>
      
    </div>
  );
};
