const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
app.get('/', (req, res) => {
  res.send('kljfldsj');
});


app.post('/', (req, res) => {
  const { name } = req.body;
  res.send({ user: name });
});


app.listen(port, () => {
  console.log("running...");
});





