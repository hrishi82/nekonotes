import "./asidebar.css";
import {Link} from "react-router-dom"

export const AsideBar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-list-container">
        <li className="sidebar-li-item">
          <Link to="/homepage" className="sidebar-links" >
            Home
          </Link>
        </li>
        <li className="sidebar-li-item">
          <Link to="/labelspage" className="sidebar-links" >
            Labels
          </Link>
        </li>
        <li className="sidebar-li-item">
          <Link to="/archivepage" className="sidebar-links">
            Archive
          </Link>
        </li>
        <li className="sidebar-li-item">
          <Link to="/trashpage" className="sidebar-links">
            Trash
          </Link>
        </li>
      </ul>

    </aside>
  );
};
