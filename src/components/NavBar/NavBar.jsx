import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"
import {useAuth} from "../../context/authContext"
import {useData} from "../../context/dataContext"



const NavBar = () => {

  const {token, setToken, setUser} = useAuth()
  const {dispatch} = useData()

  const logoutHandler = (e) =>{
    e.preventDefault()
    localStorage.removeItem("login")
    setToken(null)
    setUser(null)
    dispatch({type: "SET_ALL_NOTES", payload: []})
    dispatch({type: "SET_ALL_ARCHIVED_NOTES", payload: []})
  }

  const toggleSidebar = () =>{
    dispatch({type: "TOGGLE_SIDEBAR"})
  }

  return (
    <nav className="nav-wrapper">
      <nav className="nav-items-left">
      <i className="fa-solid fa-bars nav-menu-option" onClick={toggleSidebar}></i>
        <h4 className="nav-title">
          <Link to="/homepage" className="link-no-decor">
            nekoNotes
          </Link>
        </h4>
      </nav>

      <nav className="nav-items-right">
        <div className="search-wrapper nav-search-bar">
          <input
            type="text"
            placeholder="Search.."
            name="search-bar"
            className="search-bar"
          />
          <button type="submit" className="search-bar-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </nav>

    </nav>
  );
};

export {NavBar}
