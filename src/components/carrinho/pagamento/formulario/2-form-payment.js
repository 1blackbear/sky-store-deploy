import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Card } from 'react-bootstrap';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import PaymentIcon from '@material-ui/icons/Payment';
import boleto from '../../../../images/boleto-icon.png'
import '../pagamento.css';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { auth, fs } from "../../../../config/firebase";
import '../pagamento.css';

toast.configure();

const PaymentFormTwo = ({ nome, cpf, end, cidade, estado, cep, pais, email, prev, prevDisable, totalPrice }) => {

    const inputStyle = {
        iconColor: '#a9a9a9',
        height: '10px',
        fontFamily: 'Open Sans, sans-serif',
        fontWeight: '400',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
            color: '#a9a9a9',
        },
        '::placeholder': {
            color: 'rgb(130, 130, 130)',
        },
    }

    const [paymentMethodType, setPaymentMethodType] = useState("card");

    const [check, setCheckList] = useState(true);
    function handleInputChange(event) {
        if (event.target.value === 'boleto') {
            setCheckList(false);
            setPaymentMethodType("boleto");
        } else if (event.target.value === 'card') {
            setCheckList(true);
            setPaymentMethodType("card")
        }
    }

    const elements = useElements();
    const stripe = useStripe();
    const history = useHistory();
    //Função submit do formulário
    const uid = auth.currentUser.uid;
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!stripe || !elements) {
            return;
        }
        const { clientSecret } = await fetch('create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethodType: paymentMethodType,
                currency: 'brl',
                amount: totalPrice * 100,
            }),
        }).then(r => r.json());

        if (check) {
            const { paymentIntent } = await stripe.confirmCardPayment(
                clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        address: {
                            line1: end,
                            city: cidade,
                            state: estado,
                            postal_code: cep,
                            country: pais,
                        },
                        name: nome,
                        email: email
                    },
                },
            })

            if (paymentIntent) {
                history.push('/');
                toast.success('Compra realizada com sucesso', {
                    position: 'top-left',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
            }
        } else {
            const { error, paymentIntent } = await stripe.confirmBoletoPayment(
                clientSecret, {
                payment_method: {
                    billing_details: {
                        address: {
                            line1: end,
                            city: cidade,
                            state: estado,
                            postal_code: cep,
                            country: pais,
                        },
                        name: nome,
                        email: email
                    },
                    boleto: {
                        tax_id: cpf,
                    }
                }
            })
            if (paymentIntent) {
                history.push('/');
                toast.success('O pagamento será confirmado em 2 dias úteis a partir da data do pagamento', {
                    position: 'top-left',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
            }
        }


        const carts = await fs.collection('Cart' + " " + uid).get()
        let num_pedido = getRandomInt(1000000, 9999999);
        const pedidoString = num_pedido.toString()

        let valores = {
            'item': newItem,
            'num_pedido': pedidoString,
            'data_pedido': new Date(),
            'uid': uid,
        }



        fs.collection('Pedidos-list').doc(pedidoString).set(valores)

        for (var snap of carts.docs) {
            fs.collection('Cart' + " " + uid).doc(snap.id).delete();
        }
        setTimeout(() => {
            window.location.reload();
        }, 2000)

    };

    const [newItem, setNewItem] = useState();

    useEffect(() => {
        if (uid) {
            fs.collection('Cart' + " " + uid).onSnapshot(snapshot => {
                setNewItem(snapshot.docs.map((doc) => ({
                    ID: doc.id,
                    ...doc.data(),
                }))
                )


            })
        }
    }, [newItem])

    return (
        <>
            <Modal.Body>
                <Row>
                    <Col xs={6}>
                        <label className="label-choose-modal">
                            <input type="radio" name="option[238]" value="card" onChange={handleInputChange} checked={check} />
                            <Card className="card-box">
                                <Card.Body className="card-body">
                                    <PaymentIcon />
                                    <p>Cartão</p>
                                </Card.Body>
                            </Card>
                        </label>
                    </Col>
                    <Col xs={6}>
                        <label className="label-choose-modal">
                            <input type="radio" name="option[238]" value="boleto" onChange={handleInputChange} checked={!check} />
                            <Card className="card-box">
                                <Card.Body className="card-body">
                                    <img src={boleto} className="boleto-icon" />
                                    <p>Boleto</p>
                                </Card.Body>
                            </Card>
                        </label>
                    </Col>
                </Row>
                {check && (<>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="titulo-campo">Cartão de crédito</Form.Label>
                            <div className="border-styles">
                                <CardNumberElement
                                    options={{
                                        showIcon: true,
                                        iconStyle: 'solid',
                                        disabled: false,
                                        placeholder: 'Número do cartão',
                                        style: {
                                            base: inputStyle,
                                        },
                                    }}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Row>
                                <Col xs={6}>
                                    <Form.Label className="titulo-campo">Data de vencimento</Form.Label>
                                    <div className="border-styles">
                                        <CardExpiryElement
                                            options={{
                                                disabled: false,
                                                placeholder: 'mm/YY',
                                                style: {
                                                    base: inputStyle,
                                                },
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <Form.Label className="titulo-campo">CVC</Form.Label>
                                    <div className="border-styles">
                                        <CardCvcElement
                                            options={{
                                                disabled: false,
                                                placeholder: 'CVC',
                                                style: {
                                                    base: inputStyle,
                                                },
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Modal.Footer className="d-flex justify-content-between">
                            <Button className="btn-secondary" onClick={prev} disabled={prevDisable}> Anterior</Button>
                            <Button className="button-save" type="submit">Pagar</Button>
                        </Modal.Footer>
                    </Form>
                </>)}

                {!check && (<>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Footer className="d-flex justify-content-between">
                            <Button className="btn-secondary" onClick={prev} disabled={prevDisable}> Anterior</Button>
                            <Button className="button-save" type="submit">{check ? "Pagar" : "Gerar Boleto"}</Button>
                        </Modal.Footer>
                    </Form>
                </>)}
            </Modal.Body>

        </>
    )
}

export default PaymentFormTwo;