import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Card } from 'react-bootstrap';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useElements,
    useStripe,
    CardElement,
} from '@stripe/react-stripe-js';
import PaymentIcon from '@material-ui/icons/Payment';
import boleto from '../../../../images/boleto-icon.png'
import '../pagamento.css';

const PaymentFormTwo = (nome, end, cidade, cep,pais,email, next, prev, prevDisable) => {

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

    const [check, setCheckList] = useState(true);
    function handleInputChange(event) {
        if (event.target.value === 'boleto') {
            setCheckList(false);
        } else if (event.target.value === 'card') {
            setCheckList(true);
        }
    }

    const elements = useElements();
    const stripe = useStripe();

    //Função submit do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setTimeout(() => { console.log(elements.getElement(CardElement)) }, 3000);

        if (!stripe || !elements) {
            return;
        }
        console.log('stripe', stripe);

        const { clientSecret } = await fetch('create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethodType: 'card',
                currency: 'brl',
            }),
        }).then(r => r.json());

        next();

        const { paymentIntent } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
            }
        }
        )
    };

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
                            <Button className="button-save" type="submit" onClick={next}>Próximo</Button>
                        </Modal.Footer>
                    </Form>
                </>)}
            </Modal.Body>

        </>
    )
}

export default PaymentFormTwo;