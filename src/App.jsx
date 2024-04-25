import { useState } from "react";
import TaskCreatePage from "./components/TaskCreatePage";
import TaskToDoPage from "./components/TaskToDoPage";

// ДЛЯ ЗАПУСКА СЕРВЕРА (!)
// Консоль в корне папки проекта (navyk-platform):
// 1) npm-install
// 2) cd nvk-edc
// 3) npm run dev
// В консоли появится localhost + port (!)

function App() {
  // состояние для кнопок (дефолт - вкладка "задания")
  const [tab, setTab] = useState("tasksDo");
  // функция обновления значения для кнопки
  const handleChangeTab = (e) => {
    setTab(e.target.value);
  };

  return (
    <div>
      <button onClick={handleChangeTab} value={"tasksDo"}>
        Задания
      </button>

      <button onClick={handleChangeTab} value={"tasksCreater"}>
        Конструктор
      </button>

      {/* Рендр страницы с заданиями (дефолт) */}
      {tab == "tasksDo" && <TaskToDoPage />}

      {/* Рендр страницы конструктора заданий */}
      {tab == "tasksCreater" && <TaskCreatePage />}
    </div>
  );
}

export default App;
