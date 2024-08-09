const express = require('express');
const router = express.Router();
const usrController = require('../controllers/userController');
const { body } = require('express-validator');

router.post('/usuario', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('correo').isEmail().withMessage('Correo inválido'),
    body('contrasena').notEmpty().withMessage('La contraseña es obligatoria'),
], usrController.crearUsuario);

router.get('/usuarios', usrController.obtenerUsuarios);
router.put('/usuario/:id', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('correo').isEmail().withMessage('Correo inválido'),
], usrController.actualizarUsuario);
router.delete('/usuario/:id', usrController.eliminarUsuario);

module.exports = router;