const db = require('../config/db');

exports.crearPrivilegio = (nombre, descripcion, callback) => {
    db.query(
        'INSERT INTO privilegios (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion],
        callback
    );
};

exports.obtenerPrivilegios = (callback) => {
    db.query('SELECT * FROM privilegios', callback);
};

exports.actualizarPrivilegio = (id, privilegio, callback) => {
    const { nombre, descripcion } = privilegio;
    db.query(
        'UPDATE privilegios SET nombre = ?, descripcion = ? WHERE id = ?',
        [nombre, descripcion,  id],
        callback
    );
};

exports.eliminarPrivilegio = (id, callback) => {
    db.query('DELETE FROM privilegios WHERE id = ?', [id], callback);
};