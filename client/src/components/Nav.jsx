import { Link, NavLink } from "react-router-dom";
import navykLogo from "../assets/navyk-logo.svg";
import "./Nav.css";

function Nav() {
  return (
    <div className="nav">
      <img src={navykLogo} alt="navyk-logo" className="nav-logo" />
      <div className="nav-links">
        <NavLink to="/" className="nav-links-el" activeClassName>
          Главная
        </NavLink>
        <NavLink to="/tasks" className="nav-links-el" activeClassName>
          Задания
        </NavLink>
        <NavLink to="/constructor" className="nav-links-el" activeClassName>
          Конструктор
        </NavLink>
        <NavLink to="/users" className="nav-links-el" activeClassName>
          Пользователи
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
