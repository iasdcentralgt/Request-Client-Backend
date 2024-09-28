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
  console.log('Request body:', req.body);
  const { estado, id_peticion } = req.body;

  if (estado === undefined || id_peticion === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  Peticion.CambiarEstado(estado, id_peticion, (err, result) => {
    console.log('Estado:', estado);
    console.log('ID Peticion:', id_peticion);
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.status(200).json({ data: { message: 'Updated' } });
  });
};

exports.obtenerPeticionesUltimaSemana = (req, res) => {
  Semana.ObtenerPeticionesUltimaSemana((err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener las peticiones de la última semana' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No se encontraron peticiones para la última semana' });
    }

    res.status(200).json({ data: result });
  });
};




