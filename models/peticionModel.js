const db = require('../config/db');
const Peticion = {};

Peticion.ObtenerTodas = (callback) => {
  const sql = 'SELECT * FROM peticion';
  db.query(sql, callback);
}

Peticion.Crear = (nuevaPeticion, callback) => {
  const sql = 'INSERT INTO peticion SET ?'
  db.query(sql, nuevaPeticion, callback)
}

Peticion.CambiarEstado = (estado, id_petition, callback) => {
  const sql = 'update peticion set estado=? where id=?';
  db.query(sql, [estado, id_petition], callback);
}

module.exports = Peticion;
