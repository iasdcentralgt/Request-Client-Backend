const db = require('../config/db');

exports.crearToken = (token, usuario_id, expires, callback) => {
    db.query(
        'INSERT INTO access_token (token, usuario_id, expires) VALUES (?, ?, ?)',
        [token, usuario_id, expires],
        callback
    );
};

exports.obtenerToken = (token, callback) => {
    db.query('SELECT * FROM access_token WHERE token = ?', [token], callback);
};

exports.eliminarToken = (token, callback) => {
    db.query('DELETE FROM access_token WHERE token = ?', [token], callback);
};
