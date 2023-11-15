const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv/config");
const app = express();
const PORT = process.env.SERVER_PORT || 5000;

const data = [
  {
    name: "john",
    age: 20,
  },
];
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "llauderes",
  database: "vench",
});
//handling data for login
app.post("/signin", async (req, res) => {
  const { Username, Password } = req.body;
  const sql = "SELECT * FROM users where `Name` = ? AND `Password` = ?";
  // INSERT INTO users (`Name`, `password`) VALUES (?)
  const values = [Username, Password];
  await db.query(sql, [Username, Password], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      console.log("Connected!");
      //Check if there is atleast one row filtered in a table.
      if (data.length > 0) {
        ValidateUserLogin(Username, Password, res);
      } else {
        res.json("Error");
      }
    }
  });
});

//adding users to a fields/table
const InsertUser = (Username, Password, res) => {
  const sql = "INSERT INTO users (`Name`, `password`) VALUES (?)";
  const values = [Username, Password];
  db.query(sql, [values], (err, data, fields) => {
    if (err) {
      return res.json(err);
    } else {
      res.json(data);
    }
  });
};
//validating if the user is already registered to a table.
const ValidateUserLogin = (Username, Password, res) => {
  const readData = "SELECT * FROM users";
  db.query(readData, (err, data, fields) => {
    if (err) {
      return res.json(err);
    } else if (data[0]["Name"] === Username) {
      res.json("Success");
    } else {
      res.json("Invalid");
    }
  });
};
//validating if the user is already registered to a table.
const ValidateUser = (Username, Password, res) => {
  const readData = "SELECT * FROM users";
  db.query(readData, (err, data, fields) => {
    console.log(data[0]);
    if (err) {
      return res.json(err);
      //check if user already registered.
    } else if (data[0]["Name"] === Username.toLowerCase().trim()) {
      res.json("user exist!");
    } else {
      InsertUser(Username, Password, res);
    }
  });
};
//regex for email validation
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

//handling data for signin
app.post("/register", async (req, res) => {
  const { Email, Username, Password, ConfirmPassword } = req.body;

  if (Password !== ConfirmPassword) {
    res.json("Password error!");
  } else if (!validateEmail(Email)) {
    res.json("Invalid format!");
  } else {
    ValidateUser(Username, Password, res);
  }
});
app.get("/signin", async (req, res) => {
  res.json(data);

  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
