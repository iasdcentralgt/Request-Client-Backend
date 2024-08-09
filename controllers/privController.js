const privilegioModel = require('../models/privModel');
const { validationResult } = require('express-validator');

exports.crearPrivilegio = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, descripcion } = req.body;
    privilegioModel.crearPrivilegio(nombre, descripcion, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: result.insertId, nombre, descripcion });
    });
};

exports.obtenerPrivilegios = (req, res) => {
    privilegioModel.obtenerPrivilegios((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(result);
    });
};

exports.actualizarPrivilegio = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const privilegio = req.body;
    privilegioModel.actualizarPrivilegio(id, privilegio, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Privilegio actualizado' });
    });
};

exports.eliminarPrivilegio = (req, res) => {
    const { id } = req.params;
    privilegioModel.eliminarPrivilegio(id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Privilegio eliminado' });
    });
};