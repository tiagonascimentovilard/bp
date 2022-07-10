import express from 'express';
const tracker = require('./Controllers/SimularController');

const port = 8080;
const app = express();
app.get('/jogo/simular', tracker.get);

app.listen(port, () => console.log('Conectado Porta:' + port));