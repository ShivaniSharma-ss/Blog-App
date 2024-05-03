const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "weather",
  port: 3306,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("MySQL Server is connected successfully...");
});

module.exports = con;
