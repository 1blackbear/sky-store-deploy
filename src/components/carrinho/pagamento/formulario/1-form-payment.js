import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Card } from 'react-bootstrap';
import '../pagamento.css';

const PaymentFormOne = ({ nome, setNome, end, setEnd, cidade, setCidade, cep, setCEP,pais,setPais,email,setEmail,next }) => {
    return (
        <>
            <Modal.Body>
                <Form>
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
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button className="button-save" type="submit" onClick={next}>Próximo</Button>
            </Modal.Footer>
        </>
    )
}

export default PaymentFormOne;