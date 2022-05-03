import "./asidebar.css";
import {Link} from "react-router-dom"

export const AsideBar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-list-container">
        <li className="sidebar-li-item">
          <Link to="/allvideos" className="sidebar-links" >
            Home
          </Link>
        </li>
        <li className="sidebar-li-item">
          <Link to="/allplaylistpage" className="sidebar-links" >
            Labels
          </Link>
        </li>
        <li className="sidebar-li-item">
          <Link to="/likedvideospage" className="sidebar-links">
            Archive
          </Link>
        </li>
        <li className="sidebar-li-item">
          <Link to="/watchlaterpage" className="sidebar-links">
            Trash
          </Link>
        </li>
      </ul>

    </aside>
  );
};
