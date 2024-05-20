import { useEffect, useState } from "react";
import axios from "axios";

function UsersListPage() {
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState({
    surname: "",
    firstName: "",
    patronymic: "",
    courseName: "",
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
        window.location.reload();
      })
      .catch((err) => console.log(err));
    console.log(userInfo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleDeleteUser = (e) => {
    let userId = e.target.value;
    axios
      .post("http://localhost:3000/api/users/delete", { userId })
      .then((res) => {
        console.log(res.data, userId);
        window.location.reload();
      })
      .catch((err) => console.log(err));
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
            <th>Курс</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.idusers}</td>
              <td>{d.surname}</td>
              <td>{d.firstName}</td>
              <td>{d.patronymic}</td>
              <td>{d.courseName}</td>
              <td>
                <button>Изменить</button>
              </td>
              <td>
                <button onClick={handleDeleteUser} value={d.idusers}>
                  удалить
                </button>
              </td>
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
          onChange={handleChange}
        />
        <input
          type="text"
          name="firstName"
          placeholder="Имя"
          value={userInfo.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="patronymic"
          placeholder="Отчество"
          value={userInfo.patronymic}
          onChange={handleChange}
        />
        <select
          name="courseName"
          value={userInfo.courseName}
          onChange={handleChange}>
          <option value={""}>-</option>
          <option value={"Р-ОК-24"}>Р-ОК-24</option>
          <option value={"Р-УК-24"}>Р-УК-24</option>
          <option value={"Р-ИК-24"}>Р-ИК-24</option>
        </select>
        <button type="submit">добавить</button>
      </form>
    </div>
  );
}

export default UsersListPage;
