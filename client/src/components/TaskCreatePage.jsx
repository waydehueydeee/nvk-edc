import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import TaskInputs from "./TaskInputs";
import "./TaskCreatePage.css";

function TaskCreatePage() {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);
  const [taskNumber, setTaskNumber] = useState(1);
  const [values, setValues] = useState({
    tasks: [],
    title: "",
    id_course: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    values.tasks.map((task) => [
      (task.title = values.title),
      (task.id_course = values.id_course),
    ]);
    axios
      .post("http://localhost:3000/api/tasks/add", { tasks: values.tasks })
      .then((res) => {
        console.log(res, values.tasks);
        navigate("/tasks");
      })
      .catch((err) => console.log(err));
  };

  const handleAddTask = () => {
    setTaskList([...taskList, taskNumber]);
    setTaskNumber(taskNumber + 1);
    setValues((prevValues) => ({
      ...prevValues,
      tasks: [...prevValues.tasks, { id: taskNumber, ...values }],
    }));
  };

  const handleDeleteTask = (taskId) => {
    const updatedTaskList = taskList.filter((task) => task !== taskId);
    setTaskList(updatedTaskList);
    setValues((prevValues) => ({
      ...prevValues,
      tasks: prevValues.tasks.filter((task) => task.id !== taskId),
    }));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="block-1">
          <input
            type="text"
            placeholder="Тема работы"
            className="block-1__input"
            autocomplete="off"
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
          <select
            className="block-1__select"
            onChange={(e) =>
              setValues({ ...values, id_course: e.target.value })
            }>
            <option value={0}>Курс</option>
            <option value={1}>Руский язык - Основной курс</option>
            <option value={2}>Руский язык - Углублённый курс</option>
            <option value={3}>Руский язык - Интенсивный курс</option>
          </select>
        </div>
        {taskList != 0 && (
          <h2 className="count">
            Количество созданных заданий: {taskList.length}
          </h2>
        )}
        {taskList == 0 && <h2 className="count">Добавьте задание</h2>}
        {taskList.map((taskId) => (
          <TaskInputs
            key={taskId}
            id={taskId}
            onDelete={() => handleDeleteTask(taskId)}
            setValues={setValues}
          />
        ))}
        <button type="button" className="button green" onClick={handleAddTask}>
          добавить
        </button>
        {taskList != 0 && (
          <button type="submit" className="button">
            Отправить
          </button>
        )}
      </form>
    </div>
  );
}

export default TaskCreatePage;
