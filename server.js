const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const http = require('http').createServer(app);

app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
  credentials: true,
  origin: "*"
}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_information'
})

connection.connect((error) => {
  if (error) {
    throw error;
  }
  else {
    console.log("Mysql is connected");
  }
})

app.get("/api/user/list", (request, response) => {
  const query = `SELECT * FROM employee_information`;
  connection.query(query, (error, result) => {
    if (error) {
      response.status(500).send(error);
      return;
    }
    response.status(200).send(result);
  });
});

app.post("/api/user/create", (request, response) => {
  const FirstName = request.body.first_name;
  const LastName = request.body.last_name;
  const Class = request.body.class;
  const Age = request.body.age;
  const Location = request.body.location;
  const Sec = request.body.sec;
  const query = `INSERT INTO  employee_information (first_name ,last_name,class,age,location,sec) VALUES ('${FirstName}', '${LastName}', '${Class}','${Age}','${Location}','${Sec}')`;
  connection.query(query, (error, result) => {
    if (error) {
      response.status(500).send(error);
      return;
    }
    response.status(200).send({
      message: "successfuly created new user "
    });
  });
});

app.put("/api/user/edit/:id", (request, response) => {
  const id = request.params.id;
  const FirstName = request.body.first_name;
  const LastName = request.body.last_name;
  const Class = request.body.class;
  const Age = request.body.age;
  const Location = request.body.location;
  const Sec = request.body.sec;
  const query = `UPDATE employee_information SET  first_name ='${FirstName}' , last_name='${LastName}', class='${Class}' , age='${Age}', location='${Location}',sec='${Sec}' WHERE id='${id}'`;
  connection.query(query, (error, result) => {
    if (error) {
      response.status(500).send(error);
      return;
    }
    response.status(200).send({
      message: "successfuly Updated new user"
    });
  });
});

app.delete("/api/user/delete/:id", (request, response) => {
  const id = request.params.id;
  const query = `DELETE FROM employee_information WHERE id='${id}'`;
  connection.query(query, (error, result) => {
    if (error) {
      response.status(500).send(error);
      return;
    }
    response.status(200).send({
      message: "successfuly Delete new user"
    });
  });
});

const port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log("Node JS server is  runnig on port 8080");
})