const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('kljfldsj');
});



const PeticionController = {};
PeticionController.post = (req, res) => {
  const { name } = req.body;
  res.send({ user: name });
}


app.post('/', PeticionController.post)


app.listen(port, () => {
  console.log("running...");
});





