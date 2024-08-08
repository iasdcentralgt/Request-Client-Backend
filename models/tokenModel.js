const db = require('../config/db');

exports.crearToken = (token, usuario_id, expira_en, callback) => {
    db.query(
        'INSERT INTO access_token (token, usuario_id, expira_en) VALUES (?, ?, ?)',
        [token, usuario_id, expira_en],
        callback
    );
};

exports.obtenerToken = (token, callback) => {
    db.query('SELECT * FROM access_token WHERE token = ?', [token], callback);
};

exports.eliminarToken = (token, callback) => {
    db.query('DELETE FROM access_token WHERE token = ?', [token], callback);
};
