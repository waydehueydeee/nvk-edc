import React, { useState } from "react";

function TaskInputs({ id, onDelete, setValues }) {
  const [inputValues, setInputValues] = useState({
    title: "",
    id_course: "",
    task_description: "",
    task_text: "",
    task_answer: "",
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
        name="task_description"
        placeholder="Описание задания"
        onChange={handleChange}
        value={inputValues.task_description}
      />
      <textarea
        type="text"
        name="task_text"
        placeholder="Текст задания"
        onChange={handleChange}
        value={inputValues.task_text}
      />
      <input
        type="text"
        name="task_answer"
        placeholder="Ответ на задание"
        onChange={handleChange}
        value={inputValues.task_answer}
      />

      <button onClick={onDelete} type="button">
        Удалить
      </button>
    </div>
  );
}

export default TaskInputs;
