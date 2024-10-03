const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const peticionRoute = require('../routes/peticionRoute');
const usrRoutes = require('../routes/userRoutes');
const privilegioRoutes = require('../routes/privRoutes');
const authRoutes = require('../routes/authRoutes');
require('dotenv').config();
const semanaRoutes = require('../routes/semanaRoutes');
const newsRoutes = require('../routes/newsRoutes');


require('../config/db');

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Backend Arriba');
});


app.use('/api', peticionRoute);
app.use('/api', usrRoutes);
app.use('/api', privilegioRoutes);
app.use('/api', authRoutes);
app.use('/api', semanaRoutes);
app.use('/api', newsRoutes);

app.listen(port, () => {
  console.log(`Servidor  en el puerto ${port}`);
});



