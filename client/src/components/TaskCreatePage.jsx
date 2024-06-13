import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import TaskInputs from "./TaskInputs";

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
    <div>
      <h1>Конструктор заданий</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Тема работы"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
        />
        <select
          onChange={(e) => setValues({ ...values, id_course: e.target.value })}>
          <option value={0}>Курс</option>
          <option value={1}>Руский язык - Основной курс</option>
          <option value={2}>Руский язык - Углублённый курс</option>
          <option value={3}>Руский язык - Интенсивный курс</option>
        </select>

        {/* временный отступ */}
        <br />

        {taskList.map((taskId) => (
          <TaskInputs
            key={taskId}
            id={taskId}
            onDelete={() => handleDeleteTask(taskId)}
            setValues={setValues}
          />
        ))}
        <button type="button" onClick={handleAddTask}>
          добавить
        </button>
        {taskList != 0 && <button type="submit">Отправить</button>}
      </form>
    </div>
  );
}

export default TaskCreatePage;
