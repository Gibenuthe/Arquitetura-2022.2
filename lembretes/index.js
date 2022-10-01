const axios = require ('axios');
const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const lembretes = {};
contador = 0;

app.get('/lembretes', (req, res) => {
    res.send(lembretes);
});

app.post('/lembretes', async (req, res) => {
    contador ++;
    const {texto} = req.body;
    lembretes[contador] = {
        contador, texto
    }
    await axios.post("http://10.33.109.26:10000/eventos", {
        tipo: "LembreteCriado",
        dados: {
            contador,
            texto,
        },
    });
    res.status(200).send(lembretes[contador]);
});

app.post("/eventos", (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados);
    } catch (err) {}
    res.status(200).send({msg: "ok"});
})

app.listen(4000, () => {
    console.log('Lembretes. Porta 4000')
});