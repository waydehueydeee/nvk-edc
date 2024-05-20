import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import TaskPreview from "./TaskPreview";
import TaskOpen from "./TaskOpen";

function TaskDoPage() {
  const [taskAvailableCount, setTaskAvailableCount] = useState(0);
  const [taskCompletedCount, setTaskCompletedCount] = useState(0);
  const [tasksAvailable, setAvailableTasks] = useState([]);
  const [tasksCompleted, setTasksCompleted] = useState([]);
  const [taskTitle, setTaskTitle] = useState("Работа не выбрана");
  const [taskContent, setTaskContent] = useState([]);
  const [taskAnswers, setTaskAnswers] = useState([]);
  const [taskTab, setTaskTab] = useState("available");
  const [taskList, setTaskList] = useState([]);
  const navigate = useNavigate();

  // запрос всего списка заданий
  useEffect(() => {
    fetch("http://localhost:3000/api/tasks/list")
      .then((res) => res.json())
      .then((res) => setTaskList(res))
      .catch((err) => console.error(err));
  }, []);

  // запрос количества доступных заданий
  useEffect(() => {
    fetch("http://localhost:3000/api/tasks/available/count")
      .then((res) => res.json())
      .then((res) => setTaskAvailableCount(res.count))
      .catch((err) => console.error(err));
  }, []);

  // запрос количества выполненных заданий
  useEffect(() => {
    fetch("http://localhost:3000/api/tasks/completed/count")
      .then((res) => res.json())
      .then((res) => setTaskCompletedCount(res.count))
      .catch((err) => console.error(err));
  }, []);

  // запрос списка доступных заданий
  useEffect(() => {
    fetch("http://localhost:3000/api/tasks/available")
      .then((res) => res.json())
      .then((res) => setAvailableTasks(res))
      .catch((err) => console.error(err));
  }, []);

  // запрос списка выполненных заданий
  useEffect(() => {
    fetch("http://localhost:3000/api/tasks/completed")
      .then((res) => res.json())
      .then((res) => setTasksCompleted(res))
      .catch((err) => console.error(err));
  }, []);

  // отображение заголовка задания
  const getTaskTitle = (title) => {
    setTaskTitle(title);
  };

  // отображение контента задания
  const getTaskContent = (taskContent) => {
    setTaskContent(taskContent);
  };

  // обработчик выбора задачи
  const handleSelectTask = (title, count) => {
    setTaskTitle(title);
    // Создание пустого массива ответов на основе количества заданий
    const initialAnswers = Array.from({ length: count }, (_, index) => ({
      taskTitle: title,
      taskNumber: index + 1,
      taskAnswer: "",
    }));
    setTaskAnswers(initialAnswers);
  };

  // функция для обновления ответов на задания
  const updateTaskAnswer = (taskNumber, taskAnswer) => {
    setTaskAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((answer) =>
        answer.taskNumber === taskNumber ? { ...answer, taskAnswer } : answer
      );
      return updatedAnswers;
    });
  };

  // отправка ответов
  const handleSubmit = (e) => {
    e.preventDefault();

    let flag = true;

    for (let i = 0; i < taskAnswers.length; i++) {
      if (taskAnswers[i].taskAnswer == "" || taskAnswers[i].taskAnswer == " ") {
        flag = false;
      }
    }

    if (flag) {
      axios
        .post("http://localhost:3000/api/tasks/send", { taskTitle })
        .then((res) => {
          console.log(res.data, taskTitle);
          navigate("/tasks");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log("не отправлено!");
    }
  };

  const handleChangeTaskTab = (e) => {
    setTaskTab(e.target.value);
  };

  const handleDeleteTask = (e) => {
    let taskId = e.target.value;
    axios
      .post("http://localhost:3000/api/tasks/delete", { taskId })
      .then((res) => {
        console.log(res.data, taskId);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button value={"list"} onClick={handleChangeTaskTab}>
        Список
      </button>
      <button value={"available"} onClick={handleChangeTaskTab}>
        Доступные
      </button>
      <button value={"completed"} onClick={handleChangeTaskTab}>
        Выполненные
      </button>

      {taskTab == "available" && (
        <div>
          <h1> Доступно заданий: {taskAvailableCount}</h1>
          {tasksAvailable.map((titleData, index) => (
            <TaskPreview
              key={index}
              id={index}
              title={titleData.title}
              count={titleData.count}
              getTaskTitle={getTaskTitle}
              getTaskContent={getTaskContent}
              onSelectTask={handleSelectTask}
            />
          ))}
          <h2>{taskTitle}</h2>
          <form onSubmit={handleSubmit}>
            {taskContent.map((taskContent, index) => (
              <TaskOpen
                key={index}
                id={index}
                description={taskContent.taskDescription}
                text={taskContent.taskText}
                updateTaskAnswer={updateTaskAnswer}
                taskTitle={taskTitle}
              />
            ))}
            {taskTitle != "Работа не выбрана" && (
              <button type="submit">отправить</button>
            )}
          </form>
        </div>
      )}

      {taskTab == "completed" && (
        <div>
          <h1> Выполнено заданий: {taskCompletedCount}</h1>
          {tasksCompleted.map((titleData, index) => (
            <TaskPreview
              key={index}
              id={index}
              title={titleData.title}
              count={titleData.count}
              getTaskTitle={getTaskTitle}
              getTaskContent={getTaskContent}
              onSelectTask={handleSelectTask}
            />
          ))}
          <h2>{taskTitle}</h2>
          {taskContent.map((taskContent, index) => (
            <TaskOpen
              key={index}
              id={index}
              description={taskContent.taskDescription}
              text={taskContent.taskText}
              updateTaskAnswer={updateTaskAnswer}
              taskTitle={taskTitle}
            />
          ))}
        </div>
      )}

      {taskTab == "list" && (
        <table>
          <thead>
            <tr>
              <th>Работа</th>
              <th>Курс</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((d, i) => (
              <tr key={i}>
                <td>{d.title}</td>
                <td>{d.courseName}</td>
                <td>{d.status}</td>
                <td>
                  <button onClick={handleDeleteTask} value={d.title}>
                    удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskDoPage;
