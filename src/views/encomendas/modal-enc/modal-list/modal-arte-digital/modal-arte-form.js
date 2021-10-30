import { Row, Col, Container, Modal, Form, Button } from 'react-bootstrap';
import '../styles/modal.css';
import '../styles/modal-form.css';
import React, { useState } from 'react';
import axios from 'axios';
import ModalConfirm from '../../modal-list/modal-confirm.js';
import { auth, fs } from "../../../../../config/firebase";
import { useHistory } from 'react-router-dom';



const ModalFormDigital = ({ onHide, show, item }) => {
    //Rotas para a página
    const history = useHistory();

    /*Funções para abrir e fechar o Modal de Confirmação */
    const [showConfirm, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [campos, setCampos] = useState({
        tipo: '',
        nome: '',
        contato: '',
        email: '',
        desc: ''
    });


    function handleInputChange(event) {
        campos[event.target.name] = event.target.value;
        setCampos(campos);
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getCurrentDate(separator='/'){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        campos["tipo"] = item;
        setCampos(JSON.stringify(campos));
        auth.onAuthStateChanged(user => {
            if (user) {
                let num_pedido = getRandomInt(1000000,9999999);
                let uid = user.uid;
                let status = "Pedido recebido";
                let data = getCurrentDate();
                fs.collection('Encomendas-list').add({
                    uid,
                    campos,
                    status,
                    data,
                    num_pedido
                }).then(() => {
                    axios.post('/encomendas/send',
                        campos,
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then((response) => {
                            setCampos({
                                tipo: '',
                                nome: '',
                                contato: '',
                                email: '',
                                desc: ''
                            });
                            onHide();
                            handleShow();
                            setTimeout(() => { 
                                handleClose();
                                history.push('/perfil');
                            }, 4000)
                        });
                });
            }
        })
    }



    return (<>
        <Modal
            onHide={onHide}
            show={show}
            dialogClassName="modal-100w"
            backdrop="static"
        >
            <Modal.Header closeButton id="modal-enc-header">
                <div />
            </Modal.Header>
            <Modal.Body>
                <Container className="modal-container-form">
                    <Row className="modal-enc-linhaForm">
                        <h1>{"ARTE DIGITAL - " + item}</h1>
                    </Row>
                    <Row className="modal-line-form">
                        <Form onSubmit={handleFormSubmit}>
                            <Row>
                                <Col xs={8}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Nome Completo</Form.Label>
                                        <Form.Control type="text" placeholder="Nome" name="nome" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                                <Col xs={4}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Contato (whatsapp)</Form.Label>
                                        <Form.Control type="text" placeholder="(xx) xxxxx-xxxx" name="contato" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" name="email" onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Descrição do pedido</Form.Label>
                                <Form.Control as="textarea" rows={5} name="desc" onChange={handleInputChange} />
                            </Form.Group>
                            <Row>
                                <div className="botao-encomende d-flex justify-content-end">
                                    <Button className="btn btn-primary button-save" variant="primary" type="submit" block>
                                        FAZER ORÇAMENTO
                                    </Button>
                                </div>
                            </Row>
                        </Form>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
        <ModalConfirm show={showConfirm} onHide={handleClose} />
    </>)
}

export default ModalFormDigital;