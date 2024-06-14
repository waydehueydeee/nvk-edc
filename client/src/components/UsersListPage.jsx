import { useEffect, useState } from "react";
import axios from "axios";
import "./UserListPage.css";
import deleteButton from "../assets/delete-button-icon.png";

function UsersListPage() {
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState({
    surname: "",
    firstName: "",
    patronymic: "",
    contact_info: "",
    id_users: "",
    id_course: "",
    group_name: "",
    academic_year: "",
    status: "обучается",
    role: 0,
  });
  const role_list = { 0: "Ученик", 1: "Предподаватель", 2: "Админ" };

  console.log(data);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/users/add", userInfo)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    console.log(userInfo);
  };

  return (
    <div className="conteiner">
      {/* <h1>Список пользователей</h1> */}
      <div className="table">
        <div className="table__header">
          <div className="table__header-el">id</div>
          <div className="table__header-el">Фамилия</div>
          <div className="table__header-el">Имя</div>
          <div className="table__header-el">Отчество</div>
          <div className="table__header-el">Контакты</div>
          <div className="table__header-el">Курс</div>
          <div className="table__header-el">Год</div>
          <div className="table__header-el">Статус</div>
          <div className="table__header-el">Группа</div>
          <div className="table__header-el">Роль</div>
          <div className="table__header-el"></div>
        </div>

        {data.map((data, i) => (
          <div key={i} className="table__content">
            <div className="table__content-el">{data.id_users}</div>
            <div className="table__content-el">{data.surname}</div>
            <div className="table__content-el">{data.firstName}</div>
            <div className="table__content-el">{data.patronymic}</div>
            <div className="table__content-el">{data.contact_info}</div>
            <div className="table__content-el">{data.name_course}</div>
            <div className="table__content-el">{data.academic_year}</div>
            <div className="table__content-el">{data.status}</div>
            <div className="table__content-el">{data.group_name}</div>
            <div className="table__content-el">{role_list[data.role]}</div>
            <div className="table__content-el">
              <button className="delete-button">
                <img src={deleteButton} alt="" className="delete-button-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__block">
          <input
            type="text"
            name="surname"
            placeholder="Фамилия"
            className="form__input"
            autocomplete="off"
            value={userInfo.surname}
            onChange={handleChangeUser}
          />
          <input
            type="text"
            name="firstName"
            placeholder="Имя"
            className="form__input"
            autocomplete="off"
            value={userInfo.firstName}
            onChange={handleChangeUser}
          />
          <input
            type="text"
            name="patronymic"
            placeholder="Отчество"
            className="form__input"
            autocomplete="off"
            value={userInfo.patronymic}
            onChange={handleChangeUser}
          />
          <input
            type="text"
            name="contact_info"
            placeholder="контактная информация"
            className="form__input"
            autocomplete="off"
            value={userInfo.contact_info}
            onChange={handleChangeUser}
          />
        </div>
        <div className="form__block">
          <input
            type="text"
            name="academic_year"
            placeholder="год поступления"
            className="form__input"
            autocomplete="off"
            value={userInfo.academic_year}
            onChange={handleChangeUser}
          />
          <select
            name="id_course"
            className="form__select"
            value={userInfo.id_course}
            onChange={handleChangeUser}>
            <option value={1}>Русский язык - Основной курс</option>
            <option value={2}>Русский язык - Углублённый курс</option>
            <option value={3}>Русский язык - Интенсивный курс</option>
          </select>
          {/* <input
            type="text"
            name="group_name"
            placeholder="группа"
            className="form__input"
            value={userInfo.group_name}
            onChange={handleChangeUser}
          /> */}
          <select
            name="group_name"
            className="form__select"
            value={userInfo.group_name}
            onChange={handleChangeUser}>
            <option value={"РУС-ОСН-24"}>РУС-ОСН-24</option>
            <option value={"РУС-УГЛ-24"}>РУС-УГЛ-24</option>
            <option value={"РУС-ИНТ-24"}>РУС-ИНТ-24</option>
          </select>
          <select
            name="role"
            className="form__select"
            value={userInfo.role}
            onChange={handleChangeUser}>
            <option value={0}>Ученик</option>
            <option value={1}>Преподаватель</option>
            {/* <option value={2}>Админ</option> */}
          </select>
        </div>
        <button type="submit" className="form__button">
          добавить
        </button>
      </form>
    </div>
  );
}

export default UsersListPage;
