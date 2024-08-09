const userModel = require('../models/userModel');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, correo, contrasena, privilegio_id } = req.body;

    userModel.crearUsuario(nombre, correo, contrasena, privilegio_id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: result.insertId, nombre, correo, privilegio_id });
    });
};

exports.obtenerUsuarios = (req, res) => {
    usuarioModel.obtenerUsuarios((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
};

exports.actualizarUsuario = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const usuario = req.body;
    usuarioModel.actualizarUsuario(id, usuario, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Usuario actualizado' });
    });
};

exports.eliminarUsuario = (req, res) => {
    const { id } = req.params;
    usuarioModel.eliminarUsuario(id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Usuario eliminado' });
    });
};