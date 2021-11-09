import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Card } from 'react-bootstrap';
import {
    Elements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from '@stripe/react-stripe-js';
import './pagamento.css';
import 'react-step-progress/dist/index.css';
import PaymentIcon from '@material-ui/icons/Payment';
import boleto from '../../../images/boleto-icon.png'

const stripePromise = loadStripe('pk_test_51JrZLfKyWWBDpZuitxWoSwRmwTw3dInYsukVrmY4nVT0WyvRmZx4AKteESxudKGBAiyVTwCi6yN8nW5iyMar6XxV00DpzR3JKQ');

const ModalPayment = ({ handleClose, show }) => {

    //Primeira etapa do formulário
    const [nome, setNome] = useState("");
    const [end, setEnd] = useState("");
    const [cidade, setCidade] = useState("");
    const [cep, setCEP] = useState("");
    const [pais, setPais] = useState("");
    const [email, setEmail] = useState();

    //Segunda etapa do formulário
    const [card, setCard] = useState("");
    const [cardVenc, setCardVenc] = useState("");
    const [cardCvc, setCardCvc] = useState("");

    //Estilização padrão para campos ipunt do Stripe
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

    //Verificar se selicionou boleto ou cartão
    const [check, setCheckList] = useState(true);
    function handleInputChange(event) {
        if (event.target.value === 'boleto') {
            setCheckList(false);
        } else if (event.target.value === 'card') {
            setCheckList(true);
        }
    }

    //Função submit do formulário
    const handleSubmit = () => {
    };

    //Paginação do formulário
    const [stepOne, setStepOne] = useState(true);
    const [stepTwo, setStepTwo] = useState(false);
    const [stepThree, setStepThree] = useState(false);

    const [prevDisable, setDisable] = useState(true);
    useEffect(() => {
        if (stepOne)
            setDisable(true);
        else
            setDisable(false);

    }, [stepOne])

    function next() {
        if (stepOne) {
            setStepOne(false);
            setStepTwo(true);
            setStepThree(false);
        } else if (stepTwo) {
            setStepOne(false);
            setStepTwo(false);
            setStepThree(true);
        }
    }
    function prev() {
        if (!stepOne) {
            if (stepTwo) {
                setStepOne(true);
                setStepTwo(false);
                setStepThree(false);
            } else {
                setStepOne(false);
                setStepTwo(true);
                setStepThree(false);
            }
        }
    }


    return (
        <Modal
            show={show}
            onHide={() => {
                setStepOne(true);
                setStepTwo(false);
                setStepThree(false);
                handleClose();
            }}
            centered
        >

            <Modal.Header>
                {stepOne && (
                    <Modal.Title>Dados Pessoais</Modal.Title>
                )}
                {stepTwo && (
                    <Modal.Title>Método de pagamento</Modal.Title>
                )}
                {stepThree && (
                    <Modal.Title>Finalizar compra</Modal.Title>
                )} 
            </Modal.Header>
            <Modal.Body>
                <Elements stripe={stripePromise}>
                    <Form onSubmit={handleSubmit}>
                        {stepOne && (<>
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label className="titulo-campo">Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className="titulo-campo">E-mail</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="E-mail"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className="titulo-campo">Endereço</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Endereço completo"
                                        value={end}
                                        onChange={(e) => setEnd(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Label className="titulo-campo">Cidade</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Cidade"
                                                value={cidade}
                                                onChange={(e) => setCidade(e.target.value)}
                                            />
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Label className="titulo-campo">CEP</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="CEP"
                                                value={cep}
                                                onChange={(e) => setCEP(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label className="titulo-campo">País</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="País"
                                        value={pais}
                                        onChange={(e) => setPais(e.target.value)}
                                    />
                                </Form.Group>
                            </Modal.Body>
                        </>)}
                        {stepTwo && (<>
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
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label className="titulo-campo">Cartão de crédito</Form.Label>
                                        <div className="border-styles">
                                            <CardNumberElement
                                                onChange={(e) => setCard(e.target.value)}
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
                                                        onChange={(e) => setCardVenc(e.target.value)}
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
                                                        onChange={(e) => setCardCvc(e.target.value)}
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
                                </>)}
                            </Modal.Body>
                        </>)}
                        {stepThree && (<>
                            <Modal.Body>

                            </Modal.Body>
                        </>)}
                    </Form>
                </Elements>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button className="btn-secondary" onClick={prev} disabled={prevDisable}> Anterior</Button>
                {!stepThree && (
                    <Button className="button-save" onClick={next}>Próximo</Button>
                )}
                {stepThree && (
                    <Button className="button-save" type="submit">Pagar</Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};
export default ModalPayment;
