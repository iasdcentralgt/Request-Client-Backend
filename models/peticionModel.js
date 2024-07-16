const db = require('../config/db');
const Peticion = {};

Peticion.ObtenerTodas=(callback)=>{
  const sql = 'SELECT * FROM peticion';
  db.query(sql, callback);
}

Peticion.Crear=(nuevaPeticion, callback)=>{
  const sql = 'INSERT INTO peticion SET ?'
  db.query(sql, nuevaPeticion, callback)
}

module.exports = Peticion;
