const db = require('../config/db');
const Semana = require('./semanaModel');
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
  const sql = 'UPDATE peticion SET estado=? WHERE id=?';

  db.query(sql, [estado, id_petition], (err, result) => {
    if (err) {
      return callback(err);
    }

    Semana.ObtenerUltimaSemana((err, semanas) => {
      if (err) {
        return callback(err);
      }

      const ultimaSemanaId = semanas[0].id;

      const nuevoDetalle = {
        id_peticion: id_petition,
        id_semana: ultimaSemanaId
      };

      Semana.CrearDetalle(nuevoDetalle, (err, detalleResult) => {
        if (err) {
          return callback(err);
        }

        return callback(null, { message: 'Petición actualizada y detalle creado correctamente' });
      });
    });
  });
};


Semana.ObtenerSemanasConPeticiones = (callback) => {
  const sql = `
    SELECT 
      s.id AS semana_id,
      s.fh_creacion,
      s.fh_inicio,
      s.fh_final,
      p.id AS peticion_id,
      p.nombre,
      p.correo,
      p.telefono,
      p.contenido,
      p.fecha,
      p.estado
    FROM semana s
    LEFT JOIN detalle_semana ds ON s.id = ds.id_semana
    LEFT JOIN peticion p ON ds.id_peticion = p.id
    ORDER BY s.id DESC;
  `;
  db.query(sql, callback);
};
module.exports = Peticion;
