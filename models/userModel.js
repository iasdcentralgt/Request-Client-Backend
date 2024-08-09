const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.crearUsuario = (nombre, correo, contrasena, privilegio_id, callback) => {
    const hashedPassword = bcrypt.hashSync(contrasena, 10);
    db.query(
        'INSERT INTO usuario (nombre, correo, contrasena, privilegio_id) VALUES (?, ?, ?, ?)',
        [nombre, correo, hashedPassword, privilegio_id],
        callback
    );
};
exports.obtenerUsuarios = (callback) => {
    db.query('SELECT * FROM usuario', callback);
};

exports.actualizarUsuario = (id, usuario, callback) => {
    const { nombre, correo, privilegio_id } = usuario;
    db.query(
        'UPDATE usuario SET nombre = ?, correo = ?, privilegio_id = ? WHERE id = ?',
        [nombre, correo, privilegio_id, id],
        callback
    );
};

exports.eliminarUsuario = (id, callback) => {
    db.query('DELETE FROM usuario WHERE id = ?', [id], callback);
};