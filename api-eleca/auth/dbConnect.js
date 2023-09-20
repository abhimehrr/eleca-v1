const mysql = require("mysql");
const { db } = require('./Secrets')

// module.exports = mysql.createConnection({
//   host: 'localhost',
//   user: db.user,
//   password: db.password,
//   database: db.database
// });


module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'eleca',
});