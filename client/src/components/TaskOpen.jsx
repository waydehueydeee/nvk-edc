import { useEffect, useState } from "react";

function TaskOpen({ taskTitle, id, description, text, updateTaskAnswer }) {
  const [taskAnswer, setTaskAnswer] = useState("");

  const handleChange = (e) => {
    const answer = e.target.value;
    setTaskAnswer(answer);
    updateTaskAnswer(id + 1, answer);
  };

  // удаление содержимого input полей
  useEffect(() => {
    setTaskAnswer("");
  }, [taskTitle]);

  return (
    <div>
      <p>Задание №{id + 1}</p>
      <p>{description}</p>
      <p>{text}</p>
      <div>
        <p>Ответ:</p>
        <input type="text" onChange={handleChange} value={taskAnswer} />
      </div>
    </div>
  );
}

export default TaskOpen;
