const db = require('../config/db');

// Crear una noticia
exports.crearNoticia = (title, content, conclution, image, callback) => {
  db.query(
    'INSERT INTO noticia (title, content, conclution, image) VALUES (?, ?, ?, ?)',
    [title, content, conclution, image],
    callback
  );
};

// Obtener todas las noticias
exports.obtenerNoticias = (callback) => {
  db.query('SELECT * FROM noticia', callback);
};

// Actualizar una noticia por su ID
exports.actualizarNoticia = (id, noticia, callback) => {
  console.log(noticia);
  console.log(id);
  const { title, content, conclution, image } = noticia;
  try {

    db.query(
      'UPDATE noticia SET title = ?, content = ?, conclution = ?, image = ? WHERE id = ?',
      [title, content, conclution, image, id],
      callback
    );
  }
  catch (err) {
    console.log(err);
  }
};

// Eliminar una noticia por su ID
exports.eliminarNoticia = (id, callback) => {
  db.query('DELETE FROM noticia WHERE id = ?', [id], callback);
};
