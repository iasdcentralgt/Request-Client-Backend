const Peticion = require('../models/peticionModel');

exports.ObtenerPeticiones = async (req, res) => {
  Peticion.ObtenerTodas((err, result)=>{
    if(err){
      return res.status(500).send(err);
    }
    res.json(result)
  })
};

exports.CrearPeticion = (req, res) => {
  const nuevaPeticion = req.body;
  Peticion.Crear(nuevaPeticion, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id: result.insertId, ...nuevaPeticion });
  });
};
