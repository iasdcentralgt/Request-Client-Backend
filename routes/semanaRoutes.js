
const express = require('express');
const router = express.Router();
const semanaController = require('../controllers/semanaController');

router.get('/semanas', semanaController.obtenerTodasLasSemanas);
router.get('/semanas/todas', semanaController.obtenerSemanasConPeticiones);

router.get('/semana/ultima', semanaController.obtenerUltimaSemana);

router.post('/semana', semanaController.crearSemana);

router.post('/semana/detalle', semanaController.crearDetalleSemana);

module.exports = router;
