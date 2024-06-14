import React, { useState } from "react";

function TaskInputs({ id, onDelete, setValues }) {
  const [inputValues, setInputValues] = useState({
    title: "",
    id_course: 0,
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
    <div className="task">
      {/* <span>Задание № {id}</span> */}
      <div className="hz-2">
        <div className="hz">
          <textarea
            type="text"
            name="task_description"
            placeholder="Описание задания"
            className="task__input-2"
            autocomplete="off"
            onChange={handleChange}
            value={inputValues.task_description}
          />
          <textarea
            type="text"
            name="task_text"
            placeholder="Текст задания"
            className="task__input-2"
            autocomplete="off"
            onChange={handleChange}
            value={inputValues.task_text}
          />
        </div>
        <input
          type="text"
          name="task_answer"
          placeholder="Ответ на задание"
          className="task__input"
          autocomplete="off"
          onChange={handleChange}
          value={inputValues.task_answer}
        />
      </div>
      <button onClick={onDelete} type="button" className="delete">
        Удалить
      </button>
    </div>
  );
}

export default TaskInputs;
