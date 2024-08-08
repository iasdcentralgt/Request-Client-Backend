const express = require('express');
const router = express.Router();
const privilegioController = require('../controllers/privController');
const { body } = require('express-validator');

router.post('/privilegio', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
], privilegioController.crearPrivilegio);

router.get('/privilegios', privilegioController.obtenerPrivilegios);
router.put('/privilegio/:id', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
], privilegioController.actualizarPrivilegio);
router.delete('/privilegio/:id', privilegioController.eliminarPrivilegio);

module.exports = router;
