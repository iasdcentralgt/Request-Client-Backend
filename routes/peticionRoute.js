const express = require('express');
const router = express.Router();
const peticionController = require('../controllers/peticionController');

router.post('/cliente/peticiones', peticionController.CrearPeticion);
router.get('/admin/peticiones', peticionController.ObtenerPeticiones);
router.get('/cliente/peticiones', peticionController.ObtenerPeticiones);


module.exports = router;
