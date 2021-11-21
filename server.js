const express = require('express');
const path = require('path');
const cors = require('cors');
const {v4: uuidv4}=require('uuid');
require("dotenv").config();
const stripe=require('stripe')('sk_test_51JrZLfKyWWBDpZuikaXVZfdHihMgOLXrN8Ka07Cs5EjRZu5O3PwifoyVGzsCfozZ6dNgHAKyktpuZgK1Vz73b3Id00bByLRsRs');

const app = express();

app.use(require('cors')());
app.use(express.json());


app.post('/create-payment-intent', async (req, res) =>{
    let status
    let error
    const {paymentMethodType, currency} = req.body;
    console.log(paymentMethodType);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1999,
            currency: currency,
            payment_method_types: [paymentMethodType],
        });
        res.json({ clientSecret: paymentIntent.client_secret });
        
    } catch (error) {
        res.status(400).json({ error: {message: error.message}});
        console.log(error);
        status="error"
        
    }
    
})


/*app.post('/checkout',async(req, res)=>{
    let error;
    let status;
    try{
        console.log(req.body);
        const {cart, token}=req.body;
        const customer = await stripe.customers.create({
            email: req.body.email,
            source: req.body.id
        })
        const key = uuidv4();
        const charge = await stripe.charges.create({
            amount: cart.totalPrice*100,
            currency: 'brl',
            customer: customer.id,
            receipt_email: token.email,
            description: 'products descriptions here',
            shipping:{
                name: token.card.name,
                address:{
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }
        },{idempotencyKey: key})
        status="success";
    }
    catch(error){
        console.log(error);
        status="error"
    }
    res.json({status});
})
*/

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