const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'sql5.freesqldatabase.com',
//   user: 'sql5720206',
//   password: 'f8IXbcD5Bv',
//   database: 'sql5720206'
// });



db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = db;