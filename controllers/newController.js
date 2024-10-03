
const Noticia = require('../models/newModel');

exports.obtenerTodasLasNoticias = (req, res) => {
  Noticia.obtenerNoticias((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error al obtener las noticias' });
    }
    res.status(200).json({ data: result });
  });
};

// Obtener la última noticia insertada
exports.obtenerUltimaNoticia = (req, res) => {
  Noticia.obtenerUltimaNoticia((err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener la última noticia' });
    }
    res.status(200).json({ data: result });
  });
};

// Crear una nueva noticia
exports.crearNoticia = (req, res) => {
  const nuevaNoticia = {
    title: req.body.title,
    content: req.body.content,
    conclution: req.body.conclution,
    image: req.body.image
  };

  // Verificar que todos los campos estén completos
  if (!nuevaNoticia.title || !nuevaNoticia.content || !nuevaNoticia.conclution || !nuevaNoticia.image) {
    return res.status(400).json({ message: 'Faltan datos para crear la noticia' });
  }

  Noticia.crearNoticia(nuevaNoticia, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear la noticia' });
    }
    res.status(201).json({ data: { message: 'Noticia creada correctamente', id: result.insertId } });
  });
};

// Actualizar una noticia por su ID
exports.actualizarNoticia = (req, res) => {
  const noticiaActualizada = {
    title: req.body.title,
    content: req.body.content,
    conclution: req.body.conclution,
    image: req.body.image
  };

  const noticiaId = req.body.id;

  // Verificar que el ID esté presente
  if (!noticiaId) {
    return res.status(400).json({ message: 'ID de la noticia no proporcionado' });
  }

  Noticia.actualizarNoticia(noticiaId, noticiaActualizada, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar la noticia' });
    }
    res.status(200).json({ message: 'Noticia actualizada correctamente' });
  });
};

// Eliminar una noticia por su ID
exports.eliminarNoticia = (req, res) => {
  const noticiaId = req.params.id;

  // Verificar que el ID esté presente
  if (!noticiaId) {
    return res.status(400).json({ message: 'ID de la noticia no proporcionado' });
  }

  Noticia.eliminarNoticia(noticiaId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar la noticia' });
    }
    res.status(200).json({ message: 'Noticia eliminada correctamente' });
  });
};

// Obtener noticias que tengan un campo o condición específica (ejemplo de filtro)
exports.obtenerNoticiasConFiltro = (req, res) => {
  const filtro = req.query.filtro;  // Ejemplo de uso de query para filtros

  Noticia.obtenerNoticiasConFiltro(filtro, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener las noticias filtradas' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No se encontraron noticias' });
    }

    res.status(200).json({ data: result });
  });
};

