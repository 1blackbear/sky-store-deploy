const express = require('express');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();
const stripe = require('stripe')('sk_test_51JrZLfKyWWBDpZuikaXVZfdHihMgOLXrN8Ka07Cs5EjRZu5O3PwifoyVGzsCfozZ6dNgHAKyktpuZgK1Vz73b3Id00bByLRsRs');

const app = express();

const port = process.env.PORT || 5000;

app.use(require('cors')());
app.use(express.json());


app.post('/create-payment-intent', async (req, res) => {
    let status
    let error
    const { paymentMethodType, currency, amount } = req.body;
    console.log(req.body.amount);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: req.body.currency,
            payment_method_types: [req.body.paymentMethodType],
            /*data: {
                billing_details: {
                    address: {
                        city: req.body.city,
                        country: req.body.country,
                        line1: req.body.line1,
                        postal_code: req.body.postal_code,
                    },
                    email: req.body.email,
                    name: req.body.name,
                },
            }*/
        });
        res.json({ clientSecret: paymentIntent.client_secret });

    } catch (error) {
        res.status(400).json({ error: { message: error.message } });
        console.log(error);
        status = "error"

    }

})

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


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/*', (req, res) => res.sendFile('index.html', { root: 'build' }));
}



app.listen(port, () => {
    console.log('server start');
});