import { Row, Col, Container, Modal } from 'react-bootstrap';
import '../styles/modal-ilustra.css';
import '../styles/modal-half-form.css';
import ModalFormIlustra from './modal-ilustra-form.js';
import React, { useState } from 'react';

const ModalIlustra = ({ onHide, show }) => {
    /*Funções para abrir e fechar o Modal de form ilustra digital */
    const [item, setitem] = useState("teste");
    const [showForm, setShowForm] = useState(false);
    const handleCloseForm = () => setShowForm(false);
    function handleShowForm  (currentItem) {
        setitem(currentItem);
        onHide();
        setShowForm(true);
    }

    return (<>
        <Modal
        backdrop="static"
            onHide={onHide}
            show={show}
            dialogClassName="modal-100w"
        >
            <Modal.Header closeButton id="modal-enc-header">
                <div />
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row className="modal-enc-linha modal-enc-linhaHalf">
                        <h1>ILUSTRAÇÃO DIGITAL</h1>
                    </Row>
                    <Row className="modal-enc-linha">
                        <Row>
                            <Col xs={4} className="modal-enc-col">
                                <div className="modal-img-size modal-img-perfil" onClick={() => {handleShowForm("PERFIL")}}>PERFIL</div>
                            </Col>
                            <Col xs={4} className="modal-enc-col">
                                <div className="modal-img-size modal-img-paisagem" onClick={() => {handleShowForm("PAISAGEM")}}>PAISAGEM</div>
                            </Col>
                            <Col xs={4} className="modal-enc-col">
                                <div className="modal-img-size modal-img-half" onClick={() => {handleShowForm("METADE DE CORPO")}}>METADE DE CORPO</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} className="modal-enc-col">
                                <div className="modal-img-size modal-img-conc" onClick={() => {handleShowForm("CONCEITUAL")}}>CONCEITUAL</div>
                            </Col>
                            <Col xs={4} className="modal-enc-col">
                                <div className="modal-img-size modal-img-pet" onClick={() => {handleShowForm("PET")}}>PET</div>
                            </Col>
                            <Col xs={4} className="modal-enc-col">
                                <div className="modal-img-size modal-img-outros" onClick={() => {handleShowForm("OUTROS")}}>OUTROS</div>
                            </Col>
                        </Row>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
        <ModalFormIlustra show={showForm} onHide={handleCloseForm} item={item}/>
    </>)
}

export default ModalIlustra;