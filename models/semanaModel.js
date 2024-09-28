const db = require('../config/db');
const Semana = {};

Semana.ObtenerTodas = (callback) => {
  const sql = 'SELECT * FROM semana';
  db.query(sql, callback);
}


Semana.ObtenerUltimaSemana = (callback) => {
  const sql = `
    SELECT s.* 
    FROM semana s
    LEFT JOIN detalle_semana ds ON s.id = ds.id_semana
    WHERE ds.id_semana IS NULL
    ORDER BY s.id DESC
    LIMIT 1;
  `;
  db.query(sql, callback);
};


Semana.Crear = (nuevaSemana, callback) => {
  const sql = 'INSERT INTO semana SET ?'
  db.query(sql, nuevaSemana, callback)
}

Semana.CrearDetalle = (nuevoDetalle, callback) => {
  const sql = 'INSERT INTO detalle_semana SET ?'
  db.query(sql, nuevoDetalle, callback)
}



Semana.ObtenerPeticionesUltimaSemana = (callback) => {
  const sql = `
    SELECT p.* 
    FROM peticion p
    INNER JOIN detalle_semana ds ON p.id = ds.id_peticion
    INNER JOIN semana s ON ds.id_semana = s.id
    WHERE s.id = (SELECT MAX(id) FROM semana)
  `;
  db.query(sql, callback);
};


module.exports = Semana;
