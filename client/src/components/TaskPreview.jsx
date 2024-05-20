import axios from "axios";

function TaskPreview({
  id,
  title,
  count,
  getTaskTitle,
  getTaskContent,
  onSelectTask,
}) {
  function handleOpenTask() {
    getTaskTitle(title);
    onSelectTask(title, count);

    axios
      .get("http://localhost:3000/api/task/open", { params: { title } })
      .then((res) => {
        getTaskContent(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <button onClick={handleOpenTask}>
        <h2>Работа №{id + 1}</h2>
        <p>{"Тема: " + title}</p>
        <p>Количество заданий: {count}</p>
      </button>
    </div>
  );
}

export default TaskPreview;
