const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.login = (req, res) => {
    const { correo, contrasena } = req.body;

    db.query('SELECT * FROM usuario WHERE correo = ?', [correo], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(401).send('Correo o contraseña incorrecta');

        const usuario = result[0];
        const contrasenaValida = bcrypt.compareSync(contrasena, usuario.contrasena);
        if (!contrasenaValida) return res.status(401).send('Correo o contraseña incorrecta');

        const token = jwt.sign({ id: usuario.id, privilegio: usuario.privilegio_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        db.query('INSERT INTO access_token (token, usuario_id, expira_en) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))', [token, usuario.id], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ token });
        });
    });
};

exports.verificarToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).send('Acceso denegado. No hay token.');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Token inválido');
        }

        req.usuario = decoded;
        next();
    });
};