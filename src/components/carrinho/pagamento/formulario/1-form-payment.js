import { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Card } from 'react-bootstrap';
import '../pagamento.css';
import { EstadosList } from './estados.js';

const PaymentFormOne = ({ nome, setNome, cpf, setCPF, estado, setEstado, end, setEnd, cidade, setCidade, cep, setCEP, email, setEmail, next }) => {
    useEffect(() => {
        console.log(nome);
        console.log(estado);
    },[estado]);
    return (
        <>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Row>
                            <Col xs={7}>
                                <Form.Label className="titulo-campo">Nosme</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </Col>
                            <Col xs={5}>
                                <Form.Label className="titulo-campo">CPF</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="CPF"
                                    value={cpf}
                                    onChange={(e) => setCPF(e.target.value)}
                                />
                            </Col>
                        </Row>
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
                        <Row>
                            <Col xs={8}>
                                <Form.Label className="titulo-campo">Endereço</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Endereço completo"
                                    value={end}
                                    onChange={(e) => setEnd(e.target.value)}
                                />
                            </Col>
                            <Col xs={4}>
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
                        <Row>
                            <Col xs={7}>
                                <Form.Label className="titulo-campo">Cidade</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Cidade"
                                    value={cidade}
                                    onChange={(e) => setCidade(e.target.value)}
                                />
                            </Col>
                            <Col xs={5}>
                                <Form.Label className="titulo-campo">Estado</Form.Label>
                                <Form.Control as="select" onChange={(e) => setEstado(e.target.value)}>
                                    <EstadosList />
                                </Form.Control>
                                {/*
                                <Form.Control
                                    type="email"
                                    placeholder="UF"
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
    />*/}
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button className="btn-secondary" disabled> Anterior</Button>
                <Button className="button-save" type="submit" onClick={next}>Próximo</Button>
            </Modal.Footer>
        </>
    )
}

export default PaymentFormOne;