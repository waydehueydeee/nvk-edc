import React, { useState } from "react";

function TaskInputs({ id, onDelete, setValues }) {
  const [inputValues, setInputValues] = useState({
    title: "",
    courseName: "",
    taskDescription: "",
    taskText: "",
    taskAnswer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setValues((prevValues) => ({
      ...prevValues,
      tasks: prevValues.tasks.map((task) =>
        task.id === id ? { ...task, [name]: value } : task
      ),
    }));
  };

  return (
    <div>
      <span>Задание № {id}</span>
      <textarea
        type="text"
        name="taskDescription"
        placeholder="Описание задания"
        onChange={handleChange}
        value={inputValues.taskDescription}
      />
      <textarea
        type="text"
        name="taskText"
        placeholder="Текст задания"
        onChange={handleChange}
        value={inputValues.taskText}
      />
      <input
        type="text"
        name="taskAnswer"
        placeholder="Ответ на задание"
        onChange={handleChange}
        value={inputValues.taskAnswer}
      />

      <button onClick={onDelete} type="button">
        Удалить
      </button>
    </div>
  );
}

export default TaskInputs;
