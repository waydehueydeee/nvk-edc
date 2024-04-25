function TaskInputs({ id, onDelete }) {
  return (
    <div>
      <span>Задание № {id}</span>
      <textarea type="text" placeholder="Описание задания" />
      <textarea type="text" placeholder="Текст задания" />
      <input type="text" placeholder="Ответ на задание" />

      <button onClick={onDelete}>Удалить</button>
    </div>
  );
}

export default TaskInputs;
