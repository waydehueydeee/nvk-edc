const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sasha212118",
  database: "nvk-edc",
});

app.get("/api/users", (req, res) => {
  const sql =
    "SELECT c.id_users, c.surname, c.firstName, c.patronymic, c.contact_info, cc.name_course, ho.academic_year, ho.status, ho.group_name FROM client c JOIN history_order ho ON c.id_users = ho.id_users JOIN course_category cc ON ho.id_course = cc.id_course;";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
});

app.get("/api/tasks/list", (req, res) => {
  const sql = "select distinct `title`, `courseName` from tasks";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
});

// app.get("/api/tasks/available/count", (req, res) => {
//   const sql =
//     "SELECT COUNT(DISTINCT `title`) AS unique_titles_count FROM `tasks` WHERE status = 0";
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const uniqueTitlesCount = result[0].unique_titles_count;
//       res.json({ count: uniqueTitlesCount });
//     }
//   });
// });

// app.get("/api/tasks/completed/count", (req, res) => {
//   const sql =
//     "SELECT COUNT(DISTINCT `title`) AS unique_titles_count FROM `tasks` WHERE status = 1";
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const uniqueTitlesCount = result[0].unique_titles_count;
//       res.json({ count: uniqueTitlesCount });
//     }
//   });
// });

app.get("/tasks-list-title", (req, res) => {
  const sql = "SELECT DISTINCT title FROM tasks";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
});

app.post("/api/tasks/add", (req, res) => {
  const sql =
    "INSERT INTO tasks (`title`,`taskDescription`,`taskText`,`taskAnswer`, `id_course`) VALUES ?";
  const values = req.body.tasks.map((task) => [
    task.title,
    task.taskDescription,
    task.taskText,
    task.taskAnswer,
    task.courseName,
  ]);
  db.query(sql, [values], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
  console.log(values);
});

app.post("/api/tasks/delete", (req, res) => {
  const id = req.body.taskId;
  const sql = `DELETE from tasks WHERE title = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
  console.log(id);
});

app.post("/api/users/add", (req, res) => {
  const { surname, firstName, patronymic, contact_info } = req.body;
  const sql =
    "INSERT INTO client (`surname`,`firstName`,`patronymic`,`contact_info`) VALUES (?, ?, ?, ?)";
  const values = [surname, firstName, patronymic, contact_info];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
  console.log(values);
});

app.post("/api/order/add", (req, res) => {
  const { id_course, group_name, academic_year, status } = req.body;
  const sql =
    "INSERT INTO history_order (`id_course`,`group_name`,`academic_year`, `status`) VALUES (?, ?, ?, ?);";
  const values = [id_course, group_name, academic_year, status];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
  console.log(values);
});

app.post("/api/users/delete", (req, res) => {
  const id = req.body.userId;
  const sql = `DELETE from users WHERE idusers = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
  console.log(id);
});

// app.post("/api/tasks/send", (req, res) => {
//   const sql = "UPDATE tasks SET status = 1 WHERE title = ?";
//   const title = req.body.taskTitle;
//   db.query(sql, [title], (err, result) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(result);
//     }
//   });
// });

app.get("/api/tasks/available", (req, res) => {
  const sql = "SELECT title, COUNT(*) AS count FROM tasks GROUP BY title";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
});

app.get("/api/task/open", (req, res) => {
  const title = req.query.title;
  const sqlQuery = `SELECT * FROM tasks WHERE title = ?`;
  db.query(sqlQuery, [title], (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/api/tasks/completed", (req, res) => {
  const sql =
    "SELECT title, COUNT(*) AS count FROM tasks WHERE status = 1 GROUP BY title";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  });
});

app.listen(3000, () => {
  console.log("listen 3000 port !");
});
