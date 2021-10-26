import { Row, Col, Container, Modal } from 'react-bootstrap';
import '../styles/modal-digital.css';
import '../styles/modal-half-form.css';
import ModalFormDigital from './modal-arte-form.js';
import React, { useState } from 'react';


const ModalDigital = ({ onHide, show }) => {
    /*Funções para abrir e fechar o Modal de form ilustra digital */
    const [item, setitem] = useState("");
    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => setShowForm(false);
    function handleShowForm  (currentItem) {
        setitem(currentItem);
        onHide();
        setShowForm(true);
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
                <Container>
                    <Row className="modal-enc-linha modal-enc-linhaHalf">
                        <h1>ARTE DIGITAL</h1>
                    </Row>
                    <Row className="modal-enc-linha">
                        <Row>
                            <Col xs={4} className="modal-enc-col">
                                <div className="modal-img-size modal-img-visita" onClick={() => {handleShowForm("CARTÃO DE VISITA")}}>CARTÃO DE VISITA</div>
                            </Col>
                            <Col xs={4} className="modal-enc-col">
                                <div className="modal-img-size modal-img-logo" onClick={() => {handleShowForm("LOGO")}}>LOGO</div>
                            </Col>
                            <Col xs={4} className="modal-enc-col">
                                <div className="modal-img-size modal-img-capa" onClick={() => {handleShowForm("CAPA DE LIVRO")}}>CAPA DE LIVRO</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} className="modal-enc-col">
                                <div className="modal-img-size modal-img-adesivo" onClick={() => {handleShowForm("ADESIVO")}}>ADESIVO</div>
                            </Col>
                            <Col xs={4} className="modal-enc-col">
                                <div className="modal-img-size modal-img-redes" onClick={() => {handleShowForm("REDES SOCIAIS")}}>REDES SOCIAIS</div>
                            </Col>
                            <Col xs={4} className="modal-enc-col">
                                <div className="modal-img-size modal-img-doutros" onClick={() => {handleShowForm("OUTROS")}}>OUTROS</div>
                            </Col>
                        </Row>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
        <ModalFormDigital show={showForm} onHide={handleCloseForm} item={item}/>
    </>)
}

export default ModalDigital;