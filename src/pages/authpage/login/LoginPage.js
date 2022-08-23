import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {loginServiceHandler, getNotesServiceHandler, getArchivedNotesServiceHandler, getTrashServiceHandler} from "../../../services/services"
import "../Auth.css"
import {useData} from "../../../context/dataContext"
import {useAuth} from "../../../context/authContext"
import {validateEmail} from "../../../utils/authUtils"

const LoginPage = () => {

    const navigate = useNavigate()

    const {token, setToken, user, setUser} = useAuth()

    const {dispatch} = useData()
  
    const [credential, setCredential] = useState({email: "", password: ""})
    const [authInputError, setAuthInputError] = useState({ email: "", password: "", errorMessage: "" });



    const loginHandler = async (e) =>{
        e.preventDefault()

        try{
            let resp;
            if(e.target.innerText === "Login as Guest"){
                setCredential({email: "adarshbalika@gmail.com", password: "adarshBalika123"})
                resp = await loginServiceHandler({email: "adarshbalika@gmail.com", password: "adarshBalika123"})
    
            }else{
                resp = await loginServiceHandler({email: credential.email, password: credential.password})
            }

            if (resp.status === 200 || resp.status === 201 ){
              localStorage.setItem(
                'login',
                JSON.stringify({
                  token: resp.data.encodedToken,
                  user: resp.data.foundUser,
                })
              );
                setToken(resp.data.encodedToken)
                setUser(resp.data.foundUser)
            }

            const getNotesResp = await getNotesServiceHandler({encodedToken: resp.data.encodedToken})
            if (getNotesResp.status === 200 || getNotesResp.status === 201 ){
                dispatch({type:"SET_ALL_NOTES", payload: getNotesResp.data.notes })
            }

            const getArchivedNotesResp = await getArchivedNotesServiceHandler({encodedToken: resp.data.encodedToken})
            if (getArchivedNotesResp.status === 200 || getArchivedNotesResp.status === 201 ){
                dispatch({type:"SET_ALL_ARCHIVED_NOTES", payload: getArchivedNotesResp.data.archives })
            }

            const getTrashNotesResp = await getTrashServiceHandler({encodedToken: resp.data.encodedToken})
            if (getTrashNotesResp.status === 200 || getTrashNotesResp.status === 201 ){
                dispatch({type:"SET_DELETED_NOTES", payload: getTrashNotesResp.data.trash })
            }

            navigate("/homepage")

        }catch(err){
          setAuthInputError({...authInputError, errorMessage: "Please provide proper input or credentials"})
        }

    }


    const credentialHandler = (e) =>{

      setAuthInputError({...authInputError, errorMessage: ""})
  
      if(e.target.name=== "email"){
        setCredential({ ...credential, email: e.target.value })
        if (!validateEmail(e.target.value)) {
          setAuthInputError({
            ...authInputError,
            email: 'Invalid email format',
          });
        } else {
          setAuthInputError({ ...authInputError, email: '' });
        }
        
        
      }else if(e.target.name=== "password"){
        setCredential({ ...credential, password: e.target.value })
      }
      
    }
  
    return (
      <>
        <div className="auth-page-container">
          <div className="auth-content-container">
            <div className="auth-title">
              <h2 className="text-center">Login</h2>
            </div>

            {authInputError.errorMessage !== "" ? (
                <div className='input auth-input-error-cont text-center'>
                  {authInputError.errorMessage}
                </div>
              ) : null}
  
            <div className="input">
              <label>Email</label>
              <input
                className="input-txt"
                type="email"
                name="email"
                value={credential.email}
                onChange={(e) =>
                  credentialHandler(e)
                }
              />
            </div>
            {authInputError.email ? (
                <div className='input auth-input-error-cont'>
                  {authInputError.email}
                </div>
              ) : null}
  
            <div className="input">
              <label>Password</label>
              <input
                className="input-txt"
                type="password"
                name="password"
                value={credential.password}
                onChange = {e=> setCredential({...credential, password: e.target.value})}
              />
            </div>
  
            <div className="input input-flex-cont">
              <div className="input-condition-cont">
                <input type="checkbox" className="input-checkbox" />
                <p className="text spacing-sm">Remember Me</p>
              </div>
  
              <Link
                to="/loginpage"
                className="auth-form-forget-pass-alignment auth-page-link"
              >
                Forgot your Password?
              </Link>
            </div>
  
            <div className="auth-form-btn-container">
              <button
                className="btn btn-primary auth-form-btn"
                onClick = {(e)=>loginHandler(e)}
              >
                Login
              </button>
  
              <button
                className="btn btn-secondary auth-form-btn"
                onClick = {(e)=>loginHandler(e)}
              >
                Login as Guest
              </button>
            </div>
  
            <div className="text-center auth-action-signup-link-cont">
              <Link
                to="/signuppage"
                className="auth-page-link auth-action-signup-link"
              >
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export { LoginPage };
  