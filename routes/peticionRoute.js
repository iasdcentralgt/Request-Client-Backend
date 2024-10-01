const express = require('express');
const router = express.Router();
const peticionController = require('../controllers/peticionController');
const { body } = require('express-validator');

router.post('/cliente/peticiones', [
  body('nombre')
    .isString().withMessage('ERROR El nombre debe ser una cadena de texto'),
  body('correo')
    .isString().withMessage('ERROR El correo debe ser una cadena de texto'),
  body('telefono')
    .isString().withMessage('ERROR El teléfono debe ser una cadena de texto'),
  body('contenido')
    .notEmpty().withMessage('ERROR peticion obligatoria')
    .isString().withMessage('ERROR La peticion debe ser una cadena de texto'),
  body('estado')
    .notEmpty().withMessage('ERROR El estado es obligatorio')
    .isInt().withMessage('El estado debe ser un número entero')
], peticionController.CrearPeticion);

router.get('/admin/peticiones', peticionController.ObtenerPeticiones);
router.get('/cliente/peticiones', peticionController.ObtenerPeticiones);
router.post('/cliente/peticiones/estado', peticionController.CambiarEstadoPeticion);

module.exports = router;
