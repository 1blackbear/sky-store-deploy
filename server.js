const express = require('express');
const path = require('path');
const cors = require('cors');
require("dotenv").config();

const app = express();

app.use(require('cors')());
app.use(express.json());

app.post('/encomendas/send', (req, res, next) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const contato = req.body.contato;
    const descricao = req.body.desc;
    const tipo = req.body.tipo;
    
    require('./services/mail-services.js')(email, nome, contato, tipo, descricao)
    .then(response => res.json(response))
    .catch(error => res.status(500).json(error));
});

app.post('/encomendas/send-ilustra', (req, res, next) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const contato = req.body.contato;
    const descricao = req.body.desc;
    const tipo = req.body.tipo;
    const adicao_personagem = req.body.adicao_personagem;
    const fundo = req.body.fundo;
    
    require('./services/mail-services-ilustra.js')(email, nome, contato, tipo, descricao, adicao_personagem, fundo)
    .then(response => res.json(response))
    .catch(error => res.status(500).json(error));
});



app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => res.sendFile('index.html' , { root : 'build' } ));


app.listen(3000, () => {
    console.log('server start');
});