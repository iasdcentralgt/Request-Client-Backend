
const express = require('express');
const router = express.Router();
const noticiaController = require('../controllers/newController');

router.get('/noticias', noticiaController.obtenerTodasLasNoticias);

router.get('/noticia/ultima', noticiaController.obtenerUltimaNoticia);

router.post('/noticia', noticiaController.crearNoticia);

router.post('/noticia/update', noticiaController.actualizarNoticia);

router.delete('/noticia/:id', noticiaController.eliminarNoticia);

router.get('/noticias/filtro', noticiaController.obtenerNoticiasConFiltro);

module.exports = router;
