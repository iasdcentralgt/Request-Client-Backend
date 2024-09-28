const Peticion = require('../models/peticionModel');
const { validationResult } = require('express-validator');
const moment = require('moment-timezone');


exports.ObtenerPeticiones = (req, res) => {
  Peticion.ObtenerTodas((err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
};

exports.CrearPeticion = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const fechaActual = moment().tz("America/Guatemala").format("YYYY-MM-DD");

  const nuevaPeticion = {
    ...req.body,
    fecha: fechaActual
  }
  Peticion.Crear(nuevaPeticion, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id: result.insertId, ...nuevaPeticion });
  });
};

exports.CambiarEstadoPeticion = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { estado, id_petition } = req.body;
  Peticion.CambiarEstado(estado, id_petition, (err, result) => {
    console.log(result);
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json({ data: { message: 'Updated', estado: estado, id_petition: id_petition } });
  });
}







