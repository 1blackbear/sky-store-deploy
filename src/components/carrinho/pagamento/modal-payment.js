import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Card } from 'react-bootstrap';
import {
    Elements,
    ElementProps,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useElements,
    useStripe,
    CardElement,
} from '@stripe/react-stripe-js';
import './pagamento.css';
import 'react-step-progress/dist/index.css';
import PaymentFormOne from './formulario/1-form-payment';
import PaymentFormTwo from './formulario/2-form-payment';
import PaymentFormThree from './formulario/3-form-payment';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51JrZLfKyWWBDpZuitxWoSwRmwTw3dInYsukVrmY4nVT0WyvRmZx4AKteESxudKGBAiyVTwCi6yN8nW5iyMar6XxV00DpzR3JKQ');

const ModalPayment = ({ handleClose, show }) => {

    //Primeira etapa do formulário
    const [nome, setNome] = useState("");
    const [end, setEnd] = useState("");
    const [cidade, setCidade] = useState("");
    const [cep, setCEP] = useState("");
    const [pais, setPais] = useState("");
    const [email, setEmail] = useState();
    
    const [cardNumber, setCardNumber] = useState();

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
                {stepOne && (<>
                    <PaymentFormOne
                        nome={nome}
                        setNome={setNome}
                        end={end}
                        setEnd={setEnd}
                        cidade={cidade}
                        setCidade={setCidade}
                        cep={cep}
                        setCEP={setCEP}
                        pais={pais}
                        setPais={setPais}
                        email={email}
                        setEmail={setEmail}                        
                        next={next}
                    >
                    </PaymentFormOne>
                </>)}
                {stepTwo && (<>
                    <Elements stripe={stripePromise}>
                        <PaymentFormTwo
                            nome={nome}
                            end={end}
                            cidade={cidade}
                            cep={cep}
                            pais={pais}
                            email={email}
                            next={next}
                            prev={prev}
                            prevDisable={prevDisable}
                        ></PaymentFormTwo>
                    </Elements>
                </>)}
                {stepThree && (<>
                    <PaymentFormThree
                        prev={prev}
                        prevDisable={prevDisable}
                    >
                    </PaymentFormThree>
                </>)}
                {/* <Modal.Footer className="d-flex justify-content-between">
                    <Button className="btn-secondary" onClick={prev} disabled={prevDisable}> Anterior</Button>
                    {!stepThree && (
                        <Button className="button-save" onClick={next}>Próximo</Button>
                    )}
                    {stepThree && (
                        <Button className="button-save" type="submit">Pagar</Button>
                    )}
                </Modal.Footer>
                */}
            </Modal.Body>

        </Modal>
    );
};
export default ModalPayment;
