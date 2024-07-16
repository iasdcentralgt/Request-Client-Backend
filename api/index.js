const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const peticionRoutes = require('../routes/peticionRoute');
require('../config/db'); 

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Backend Arriba');
});


app.use('/api', peticionRoutes);


app.listen(port, () => {
  console.log(`Servidor  en el puerto ${port}`);
});



