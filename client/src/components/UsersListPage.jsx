import { useEffect, useState } from "react";
import axios from "axios";

function UsersListPage() {
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState({
    surname: "",
    firstName: "",
    patronymic: "",
    contact_info: "",
  });
  const [orderInfo, setOrderInfo] = useState({
    id_users: "",
    id_course: "",
    group_name: "",
    academic_year: "",
    status:"обучается"
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

      axios
      .post("http://localhost:3000/api/order/add", orderInfo)
      .then((res) => {
        console.log(res.data);
        // window.location.reload();
      })
      .catch((err) => console.log(err));
    console.log(orderInfo);
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    console.log(userInfo)
  };

  const handleChangeOrder = (e) => {
    const { name, value } = e.target;
    setOrderInfo({ ...orderInfo, [name]: value });
    console.log(orderInfo)
  };

  const handleUpdate = () => {

  };

  console.log(data)
  // const handleDeleteUser = (e) => {
  //   let userId = e.target.value;
  //   axios
  //     .post("http://localhost:3000/api/users/delete", { userId })
  //     .then((res) => {
  //       console.log(res.data, userId);
  //       window.location.reload();
  //     })
  //     .catch((err) => console.log(err));
  // };

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

              {/* <td>
                <button onClick={handleDeleteUser} value={d.idusers}>
                  удалить
                </button>
              </td> */}
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
          value={orderInfo.id_course}
          onChange={handleChangeOrder}
        >
          <option value={1}>Русский язык - Основной курс</option>
          <option value={2}>Русский язык - Углублённый курс</option>
          <option value={3}>Русский язык - Интенсивный курс</option>
        </select>
        <input
          type="text"
          name="group_name"
          placeholder="группа"
          value={orderInfo.group_name}
          onChange={handleChangeOrder}
        />
        <input
          type="text"
          name="academic_year"
          placeholder="год поступления"
          value={orderInfo.academic_year}
          onChange={handleChangeOrder}
        />

        <button type="submit">добавить</button>
      </form>
      <button onClick={handleUpdate}>обновить</button>
    </div>
  );
}

export default UsersListPage;
