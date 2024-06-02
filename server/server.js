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
  password: "nvk-edc-2024",
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
// ==========================================

app.post("/api/users/add", (req, res) => {
  const {
    surname,
    firstName,
    patronymic,
    contact_info,
    id_users,
    id_course,
    group_name,
    academic_year,
    status,
  } = req.body;

  const sql_find =
    "SELECT id_users FROM client WHERE surname=? AND firstName=? AND patronymic=? AND contact_info=?";
  const filter = [surname, firstName, patronymic, contact_info];

  db.query(sql_find, filter, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    client_exist(
      surname,
      firstName,
      patronymic,
      contact_info,
      id_users,
      id_course,
      group_name,
      academic_year,
      status,
      results,
      res
    );
  });
});

function client_exist(
  surname,
  firstName,
  patronymic,
  contact_info,
  id_users,
  id_course,
  group_name,
  academic_year,
  status,
  check,
  res
) {
  if (typeof check === "undefined" || check.length == 0) {
    client_create(
      surname,
      firstName,
      patronymic,
      contact_info,
      id_users,
      id_course,
      group_name,
      academic_year,
      status,
      res
    );
  } else {
    history_order_create(
      id_course,
      check[0].id_users,
      group_name,
      academic_year,
      status,
      res
    );
  }
}

function client_create(
  surname,
  firstName,
  patronymic,
  contact_info,
  id_users,
  id_course,
  group_name,
  academic_year,
  status,
  res
) {
  const sql_client =
    "INSERT INTO client (`surname`,`firstName`,`patronymic`,`contact_info`) VALUES (?, ?, ?, ?)";
  const values_client = [surname, firstName, patronymic, contact_info];

  db.query(sql_client, values_client, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    id_client_find(
      surname,
      firstName,
      patronymic,
      contact_info,
      id_users,
      id_course,
      group_name,
      academic_year,
      status,
      res
    );
  });
}

function id_client_find(
  surname,
  firstName,
  patronymic,
  contact_info,
  id_users,
  id_course,
  group_name,
  academic_year,
  status,
  res
) {
  const sql_find =
    "SELECT id_users FROM client WHERE surname=? AND firstName=? AND patronymic=? AND contact_info=?";
  const filter = [surname, firstName, patronymic, contact_info];

  db.query(sql_find, filter, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    history_order_create(
      id_course,
      results[0].id_users,
      group_name,
      academic_year,
      status,
      res
    );
  });
}

function history_order_create(
  id_course,
  id_user,
  group_name,
  academic_year,
  status,
  res
) {
  const sql = "SELECT * FROM history_order WHERE id_course=? AND id_users=?";
  const filter = [id_course, id_user];

  db.query(sql, filter, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (results.length === 0) {
      const sql_order =
        "INSERT INTO history_order (`id_course`, `id_users`,`group_name`,`academic_year`, `status`) VALUES (?, ?, ?, ?, ?)";
      const values_order = [
        id_course,
        id_user,
        group_name,
        academic_year,
        status,
      ];

      db.query(sql_order, values_order, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        res.status(200).send("History order created successfully");
      });
    } else {
      res.status(200).send("History order already exists");
    }
  });
}

// app.post("/api/users/add", (req, res) => {
//   const {
//     surname,
//     firstName,
//     patronymic,
//     contact_info,
//     id_users,
//     id_course,
//     group_name,
//     academic_year,
//     status,
//   } = req.body;

//   let check;

//   const sql_find =
//     "SELECT id_users FROM client WHERE surname=? AND firstName=? AND patronymic=? AND contact_info=?";
//   const filter = [surname, firstName, patronymic, contact_info];
//   db.query(sql_find, filter, function (err, results) {
//     if (err) console.log(err);
//     check = results;
//     client_exist(
//       surname,
//       firstName,
//       patronymic,
//       contact_info,
//       id_users,
//       id_course,
//       group_name,
//       academic_year,
//       status,
//       check
//     );
//   });
// });

// function history_order_create(
//   id_course,
//   id_user,
//   group_name,
//   academic_year,
//   status
// ) {
//   let abobes;
//   const sql = "SELECT * FROM history_order WHERE id_course=? AND id_users=?";
//   const filter = [id_course, id_user];
//   db.query(sql, filter, function (err, results) {
//     if (err) console.log(err);
//     abobes = results;
//     console.log(abobes);
//     slave(id_course, id_user, group_name, academic_year, status, abobes);
//   });
// }

// function slave(id_course, id_user, group_name, academic_year, status, abobes) {
//   if (abobes === undefined || abobes.length == 0) {
//     const sql_order =
//       "INSERT INTO history_order (`id_course`, `id_users`,`group_name`,`academic_year`, `status`) VALUES (?, ?, ?, ?, ?);";
//     const values_order = [
//       id_course,
//       id_user,
//       group_name,
//       academic_year,
//       status,
//     ];
//     db.query(sql_order, values_order, (err, result) => {});
//     console.log(values_order);
//   }
// }

// function client_create(
//   surname,
//   firstName,
//   patronymic,
//   contact_info,
//   id_users,
//   id_course,
//   group_name,
//   academic_year,
//   status
// ) {
//   const sql_client =
//     "INSERT INTO client (`surname`,`firstName`,`patronymic`,`contact_info`) VALUES (?, ?, ?, ?)";
//   const values_client = [surname, firstName, patronymic, contact_info];
//   db.query(sql_client, values_client, (err, result) => {
//     id_client_find(
//       surname,
//       firstName,
//       patronymic,
//       contact_info,
//       id_users,
//       id_course,
//       group_name,
//       academic_year,
//       status
//     );
//   });
// }

// function id_client_find(
//   surname,
//   firstName,
//   patronymic,
//   contact_info,
//   id_users,
//   id_course,
//   group_name,
//   academic_year,
//   status
// ) {
//   const sql_find =
//     "SELECT id_users FROM client WHERE surname=? AND firstName=? AND patronymic=? AND contact_info=?";
//   const filter = [surname, firstName, patronymic, contact_info];
//   db.query(sql_find, filter, function (err, results) {
//     if (err) console.log(err);
//     history_order_create(
//       id_course,
//       results[0].id_users,
//       group_name,
//       academic_year,
//       status
//     );
//     console.log(filter);
//   });
// }

// function client_exist(
//   surname,
//   firstName,
//   patronymic,
//   contact_info,
//   id_users,
//   id_course,
//   group_name,
//   academic_year,
//   status,
//   check
// ) {
//   if (typeof check === "undefined" || check.length == 0) {
//     client_create(
//       surname,
//       firstName,
//       patronymic,
//       contact_info,
//       id_users,
//       id_course,
//       group_name,
//       academic_year,
//       status
//     );
//   } else {
//     history_order_create(
//       id_course,
//       check[0].id_users,
//       group_name,
//       academic_year,
//       status
//     );
//   }
// }

// app.post("/api/order/add", (req, res) => {
//   const { id_course, group_name, academic_year, status } = req.body;
//   const sql =
//     "INSERT INTO history_order (`id_course`,`group_name`,`academic_year`, `status`) VALUES (?, ?, ?, ?);";
//   const values = [id_course, group_name, academic_year, status];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json(result);
//     }
//   });
//   console.log(values);
// });

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
