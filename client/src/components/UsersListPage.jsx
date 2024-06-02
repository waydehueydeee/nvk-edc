import { useEffect, useState } from "react";
import axios from "axios";

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
  });

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
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    console.log(userInfo);
  };

  return (
    <div>
      <h1>Список пользователей</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Контактная информация</th>
            <th>Курс</th>
            <th>Год обучения</th>
            <th>Статус</th>
            <th>Группа</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, i) => (
            <tr key={i}>
              <td>{data.id_users}</td>
              <td>{data.surname}</td>
              <td>{data.firstName}</td>
              <td>{data.patronymic}</td>
              <td>{data.contact_info}</td>
              <td>{data.name_course}</td>
              <td>{data.academic_year}</td>
              <td>{data.status}</td>
              <td>{data.group_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="surname"
          placeholder="Фамилия"
          value={userInfo.surname}
          onChange={handleChangeUser}
        />
        <input
          type="text"
          name="firstName"
          placeholder="Имя"
          value={userInfo.firstName}
          onChange={handleChangeUser}
        />
        <input
          type="text"
          name="patronymic"
          placeholder="Отчество"
          value={userInfo.patronymic}
          onChange={handleChangeUser}
        />
        <input
          type="text"
          name="contact_info"
          placeholder="контактная информация"
          value={userInfo.contact_info}
          onChange={handleChangeUser}
        />
        <select
          name="id_course"
          value={userInfo.id_course}
          onChange={handleChangeUser}>
          <option value={1}>Русский язык - Основной курс</option>
          <option value={2}>Русский язык - Углублённый курс</option>
          <option value={3}>Русский язык - Интенсивный курс</option>
        </select>
        <input
          type="text"
          name="group_name"
          placeholder="группа"
          value={userInfo.group_name}
          onChange={handleChangeUser}
        />
        <input
          type="text"
          name="academic_year"
          placeholder="год поступления"
          value={userInfo.academic_year}
          onChange={handleChangeUser}
        />

        <button type="submit">добавить</button>
      </form>
    </div>
  );
}

export default UsersListPage;
