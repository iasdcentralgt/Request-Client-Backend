const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const JWT_SECRET = "xd";

exports.login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        db.query('SELECT * FROM usuario WHERE correo = ?', [correo], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error del servidor');
            }
            if (result.length === 0) return res.status(401).send('Correo o contraseña incorrecta');

            const usuario = result[0];
            const contrasenaValida = bcrypt.compareSync(contrasena, usuario.contrasena);
            if (!contrasenaValida) return res.status(401).send('Correo o contraseña incorrecta');

            
            const token = jwt.sign(
                { id: usuario.id, privilegio: usuario.privilegio_id }, 
                JWT_SECRET, 
                { expiresIn: '1h' }
            );

            db.query('INSERT INTO tokens (token, usuario_id, expires) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))', 
                [token, usuario.id], 
                (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error al guardar el token');
                    }
                    res.json({ token });
            });
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).send('Error interno del servidor');
    }
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