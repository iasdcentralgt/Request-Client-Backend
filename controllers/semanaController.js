
const Semana = require('../models/semanaModel');

exports.obtenerTodasLasSemanas = (req, res) => {
  Semana.ObtenerTodas((err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener las semanas' });
    }
    res.status(200).json({ data: result });
  });
};

// Obtener la última semana insertada
exports.obtenerUltimaSemana = (req, res) => {
  Semana.ObtenerUltimaSemana((err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener la última semana' });
    }
    res.status(200).json({ data: result });
  });
};

// Crear una nueva semana
exports.crearSemana = (req, res) => {
  const nuevaSemana = {
    fh_creacion: req.body.fh_creacion,
    fh_inicio: req.body.fh_inicio,
    fh_final: req.body.fh_final
  };

  if (!nuevaSemana.fh_creacion || !nuevaSemana.fh_inicio || !nuevaSemana.fh_final) {
    return res.status(400).json({ message: 'Faltan datos para crear la semana' });
  }

  Semana.Crear(nuevaSemana, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear la semana' });
    }
    res.status(201).json({ data: { message: 'Semana creada correctamente', id: result.insertId } });
  });
};

// Crear un nuevo detalle (si es necesario para otro caso)
exports.crearDetalleSemana = (req, res) => {
  const nuevoDetalle = {
    ...req.body
  };

  Semana.CrearDetalle(nuevoDetalle, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el detalle' });
    }
    res.status(201).json({ data: { message: 'Detalle creado correctamente', id: result.insertId } });
  });
};



exports.obtenerSemanasConPeticiones = (req, res) => {
  Semana.ObtenerSemanasConPeticiones((err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener las semanas con peticiones' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No se encontraron semanas' });
    }

    res.status(200).json({ data: result });
  });
}
