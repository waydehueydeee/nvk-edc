import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Link to="/">Главная</Link>
      <Link to="/tasks">Задания</Link>
      <Link to="/constructor">Конструктор</Link>
      <Link to="/users">Пользователи</Link>
    </div>
  );
}

export default Nav;
