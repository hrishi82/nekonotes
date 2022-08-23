// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../context/authContext";
// import { useData } from "../../../context/dataContext";
// import {signupServiceHandler} from "../../../services/services"

// export const SignupPage = () => {

//     const [signupForm, setSignupForm] = useState({name: "", email: "", password: ""})

//     const {dispatch} = useData()
//     const {token, setToken, user, setUser} = useAuth()
//     const navigate = useNavigate();



//       function formHandler(e){
//         e.preventDefault()

//         const {name, email, password} = signupForm
//         if (email && password && name !== '') {
//             (async () => {
//               signupUser(email, password, name);
//             })();
//         }
//     }

//     const signupUser = async (email, password, name) => {
//         try {
//           const response = await signupServiceHandler({ email, password, name });
//           if (response.status === 201) {
//             localStorage.setItem(
//               'login',
//               JSON.stringify({
//                 token: response.data.encodedToken,
//                 user: response.data.createdUser,
//               })
//             );
//             setUser(response.data.createdUser);
//             setToken(response.data.encodedToken);
//             navigate('/homepage');
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       };

//   return (
//     <div className="auth-page-container">
//       <div className="auth-content-container">
//         <div className="auth-title">
//           <h2 className="text-center">Signup</h2>
//         </div>

//         <div className="input">
//           <label>Name</label>
//           <input className="input-txt" type="name" value={signupForm.name} onChange={(e)=>setSignupForm({...signupForm, name: e.target.value})} />
//         </div>  

//         <div className="input">
//           <label>Email</label>
//           <input className="input-txt" type="email" value={signupForm.email} onChange={(e)=>setSignupForm({...signupForm, email: e.target.value})}/>
//         </div>

//         <div className="input">
//           <label>Password</label>
//           <input className="input-txt" type="password" value={signupForm.password} onChange={(e)=>setSignupForm({...signupForm, password: e.target.value})}/>
//         </div>

//         <div className="input input-flex-cont">
//           <div className="input-condition-cont">
//             <input type="checkbox" className="input-checkbox" />
//             <p className="text spacing-sm">
//               I accept all the Terms & Conditions
//             </p>
//           </div>
//         </div>

//         <div className="auth-form-btn-container">
//           <button className="btn btn-primary" onClick={(e)=>formHandler(e)}>Create New Account</button>
//         </div>

//         <div className="text-center auth-action-signup-link-cont">
//           <Link
//             className="auth-page-link auth-action-signup-link"
//             to="/loginpage"
//           >
//             Already have an account?
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useData } from "../../../context/dataContext";
import {validateEmail, validatePassword} from "../../../utils/authUtils"
import {createRandomUser} from "../../../utils/utils"

export const SignupPage = () => {

    const [signupForm, setSignupForm] = useState({name: '', email: "", password: "", termsConditions: false})
    const [authInputError, setAuthInputError] = useState({ email: "", password: "", errorMessage: "" });


    const {dispatch} = useData()
    const { token, signupUser } = useAuth();
    const navigate = useNavigate();

    const fakesignupdata = createRandomUser()


    useEffect(() => {
      let id;
      if (token) {
        id = setTimeout(() => {
          navigate('/');
        }, 500);
      }
      return () => clearTimeout(id);
    }, [token]);

    function formHandler(e){
        e.preventDefault()

        const {name, email, password, termsConditions} = signupForm
        try{
          if (email && password && name !== '' && termsConditions) {
            (async () => {
              signupUser(email, password, name, );
            })();
          }else if((email && password && name !== '' && !termsConditions)){
            setAuthInputError({...authInputError, errorMessage: "Please accept terms and conditions"})
          }else{
            setAuthInputError({...authInputError, errorMessage: "Please provide proper input"})
          }

          
        }catch(err){
          console.log(err)
        }
    }

    const credentialHandler = (e) =>{

      setAuthInputError({...authInputError, errorMessage: ""})

      if(e.target.name=== "email"){
        setSignupForm({ ...signupForm, email: e.target.value })
        if (!validateEmail(e.target.value)) {
          setAuthInputError({
            ...authInputError,
            email: 'Invalid email format',
          });
        } else {
          setAuthInputError({ ...authInputError, email: '' });
        }
        
        
      }else if(e.target.name=== "password"){
        
        setSignupForm({ ...signupForm, password: e.target.value })
        if (!validatePassword(e.target.value)) {
          setAuthInputError({
            ...authInputError,
            password:
              'Password should be in 8 to 20 chars and should have one digit',
          });
        } else {
          setAuthInputError({ ...authInputError, password: '' });
        }
      }else if(e.target.name=== "name"){
        setSignupForm({...signupForm, name: e.target.value})
      }else if(e.target.name=== "termsAndConditions"){
        setSignupForm({...signupForm, termsConditions: !signupForm.termsConditions})
      }
      
    }

  const dummySignpup = () =>{
    const dummySignupData = {email: fakesignupdata.email, password: fakesignupdata.password, name: fakesignupdata.name}

    const {email, password, name } = dummySignupData

    try{
      signupUser(email, password, name );
    }catch(err){
      console.log(err)
    }

  }

  

  return (
    <div className="auth-page-container">
      <div className="auth-content-container">
        <div className="auth-title">
          <h2 className="text-center">Signup</h2>
        </div>

        {authInputError.errorMessage !== "" ? (
                <div className='input auth-input-error-cont text-center'>
                  {authInputError.errorMessage}
                </div>
              ) : null}

        <div className="input">
          <label>Name</label>
          <input className="input-txt" type="name" name="name" value={signupForm.name} onChange={(e)=>credentialHandler(e)} />
        </div>  

        <div className="input">
          <label>Email</label>
          <input className="input-txt" type="email" name="email" value={signupForm.email} onChange={(e)=>credentialHandler(e)}/>
        </div>
        {authInputError.email ? (
                <div className='input auth-input-error-cont'>
                  {authInputError.email}
                </div>
              ) : null}

        <div className="input">
          <label>Password</label>
          <input className="input-txt" type="password"  name="password" value={signupForm.password} onChange={(e)=>credentialHandler(e)}/>
        </div>
        {authInputError.password ? (
                <div className='input auth-input-error-cont'>
                  {authInputError.password}
                </div>
              ) : null}

        <div className="input input-flex-cont">
          <div className="input-condition-cont">
            <input type="checkbox" className="input-checkbox" name="termsAndConditions" onClick={(e)=>credentialHandler(e)} />
            <p className="text spacing-sm">
              I accept all the Terms & Conditions
            </p>
          </div>
        </div>

        <div className="auth-form-btn-container auth-form-signup-btn-container">
          <button className="btn btn-primary authform-signup-btn" onClick={(e)=>formHandler(e)}>Create New Account</button>
          <button className="btn btn-secondary authform-signup-btn" onClick={dummySignpup}>Autofill and Signup</button>
        </div>

        <div className="text-center auth-action-signup-link-cont">
          <Link
            className="auth-page-link auth-action-signup-link"
            to="/loginpage"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

