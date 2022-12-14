const express = require('express');
const bodyParser = require('body-parser');
//para enviar eventos para os demais microsserviços
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/eventos', (req, res) => {
    const evento = req.body;
    //envia o evento para o microsserviço de lembretes
    axios.post('http://10.33.109.26:4000/eventos', evento);
    //envia o evento para o microsserviço de observações
    axios.post('http://10.33.109.26:5000/eventos', evento);
    //envia o evento para o microsserviço de consulta
    axios.post('http://10.33.109.26:6000/eventos', evento);
    //envia o evento para o microsserviço de classificacao
    axios.post('http://10.33.109.26:7000/eventos', evento);
    res.status(200).send({ msg: "ok"});
});

app.listen(10000, () => {
    console.log('Barramento de eventos. Porta 10000');
});