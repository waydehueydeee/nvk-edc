import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskCreatePage from "./components/TaskCreatePage";
import TaskToDoPage from "./components/TaskToDoPage";
import UsersListPage from "./components/UsersListPage";
import MainPage from "./components/MainPage";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <div className="main-conteiner">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/tasks" element={<TaskToDoPage />}></Route>
          <Route path="/constructor" element={<TaskCreatePage />}></Route>
          <Route path="/users" element={<UsersListPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
