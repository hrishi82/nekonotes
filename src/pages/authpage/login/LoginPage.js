import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {loginServiceHandler, getNotesServiceHandler, getArchivedNotesServiceHandler} from "../../../services/services"
import "../Auth.css"
import {useData} from "../../../context/dataContext"
import {useAuth} from "../../../context/authContext"

const LoginPage = () => {

    const navigate = useNavigate()

    const {token, setToken, user, setUser} = useAuth()

    const {dispatch} = useData()
  
    const [credential, setCredential] = useState({email: "", password: ""})


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
                setToken(resp.data.encodedToken)
                setUser(resp.data.foundUser)
            }

            const getNotesResp = await getNotesServiceHandler({encodedToken: resp.data.encodedToken})
            if (getNotesResp.status === 200 || getNotesResp.status === 201 ){
                dispatch({action:"SET_ALL_NOTES", payload: "getNotesResp.data.notes" })
            }

            const getArchivedNotesResp = await getArchivedNotesServiceHandler({encodedToken: resp.data.encodedToken})
            if (getArchivedNotesResp.status === 200 || getArchivedNotesResp.status === 201 ){
                dispatch({action:"SET_ALL_ARCHIVED_NOTES", payload: "getArchivedNotesResp.data.archives" })
            }

            navigate("/homepage")

        }catch(err){
            console.log(err)
        }

    }
  
    return (
      <>
        <div className="auth-page-container">
          <div className="auth-content-container">
            <div className="auth-title">
              <h2 className="text-center">Login</h2>
            </div>
  
            <div className="input">
              <label>Email</label>
              <input
                className="input-txt"
                type="email"
                value={credential.email}
                onChange = {e=> setCredential({...credential, email: e.target.value})}
              />
            </div>
  
            <div className="input">
              <label>Password</label>
              <input
                className="input-txt"
                type="password"
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
                Forget your Password?
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
  