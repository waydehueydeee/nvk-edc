import { useState } from "react";
import TaskInputs from "./TaskInputs";

function TaskCreatePage() {
  // массив заданий (компоненов)
  const [taskList, setTaskList] = useState([]);
  // нумерация заданий (компоненов)
  const [taskNumber, setTaskNumber] = useState(1);

  // функция добавления задания
  const handleAddTask = () => {
    setTaskList([...taskList, taskNumber]);
    setTaskNumber(taskNumber + 1);
  };

  // функция удаления задания
  const handleDeleteTask = (taskId) => {
    // удаление выбранного задания
    const updatedTaskList = taskList.filter((task) => task !== taskId);
    // обновление массива заданий
    setTaskList(updatedTaskList);

    // (?)
    updatedTaskList.forEach((task, index) => {
      if (task !== index + 1) {
        updatedTaskList[index] = index + 1;
      }
    });

    // новое кол-во компонентов в массиве
    setTaskNumber(updatedTaskList.length + 1);
  };

  return (
    <div>
      <h1>Конструктор заданий</h1>

      <input type="text" placeholder="Тема работы" />

      {/* вариант того, как может выглядеть выбор группы */}
      <select>
        <option value={"OK-24"}>Основной курс</option>
        <option value={"YK-24"}>Углублённый курс</option>
      </select>

      {/* временный отступ */}
      <br />

      {/* task.map - перебор каждого элемента массива taskList */}
      {/* для каждого taskId создаётся новый TaskInputs */}
      {taskList.map((taskId) => (
        <TaskInputs
          // уникальный ключ для каждого задания (нельзя передать как props!)
          key={taskId}
          // номер задания (аналогично key)
          id={taskId}
          // передача функции удаления как props
          onDelete={() => handleDeleteTask(taskId)}
        />
      ))}

      <button onClick={handleAddTask}>добавить</button>

      {/* кнопка появится только если кол-во заданий > 0 */}
      {taskList != 0 && <button>Отправить</button>}
    </div>
  );
}

export default TaskCreatePage;
