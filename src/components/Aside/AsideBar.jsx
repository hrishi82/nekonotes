import "./asidebar.css";
import {Link, useNavigate} from "react-router-dom"
import {useAuth} from "../../context/authContext"
import {useData} from "../../context/dataContext"

export const AsideBar = () => {


  const {token, setToken, setUser} = useAuth()
  const {state, dispatch} = useData()
  const {displaySidebar} = state
  const navigate = useNavigate()

  const logoutHandler = (e) =>{
    e.preventDefault()
    localStorage.removeItem("login")
    setToken(null)
    setUser(null)
    dispatch({type: "SET_ALL_NOTES", payload: []})
    dispatch({type: "SET_ALL_ARCHIVED_NOTES", payload: []})
    navigate("/logoutpage")
  }

  return (
    <aside className={`sidebar ${displaySidebar && "sidebar-show" } `}>
      
      <ul className="sidebar-list-container">
        <li className="sidebar-li-item">
          <Link to="/homepage" className="sidebar-links" onClick={()=>dispatch({type: "TOGGLE_SIDEBAR"})}>
            Home
          </Link>
        </li>
        <li className="sidebar-li-item">
          <Link to="/labelspage" className="sidebar-links" onClick={()=>dispatch({type: "TOGGLE_SIDEBAR"})}>
            Labels
          </Link>
        </li>
        <li className="sidebar-li-item">
          <Link to="/archivepage" className="sidebar-links" onClick={()=>dispatch({type: "TOGGLE_SIDEBAR"})}>
            Archive
          </Link>
        </li>
        <li className="sidebar-li-item">
          <Link to="/trashpage" className="sidebar-links" onClick={()=>dispatch({type: "TOGGLE_SIDEBAR"})}>
            Trash
          </Link>
        </li>
      </ul>

      <ul className="sidebar-list-container-bottom">
        <li className="sidebar-li-item">
        {token && <Link to="/profilepage" className="sidebar-links" onClick={()=>dispatch({type: "TOGGLE_SIDEBAR"})}>
          PROFILE
        </Link>}
        </li>
        <li className="sidebar-li-item">
        {token ? <Link to="/loginpage" className="sidebar-links" onClick={(e)=>logoutHandler(e)}>
          LOGOUT </Link> : 
         <Link to="/loginpage" className="sidebar-links" onClick={()=>dispatch({type: "TOGGLE_SIDEBAR"})}>
          LOGIN
        </Link>}
        </li>

      </ul>

    </aside>
  );
};
