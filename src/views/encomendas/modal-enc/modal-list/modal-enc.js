import { Row, Col, Container, Modal } from 'react-bootstrap';
import './styles/modal.css';
import './styles/modal-enc.css';


const ModalEnco = ({ onHide, show, showIlustra, showDigital}) => {
    return (
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
                    <Row className="modal-enc-linha">
                        <h1>O QUE VOCÊ DESEJA?</h1>
                    </Row>
                    <Row className="modal-enc-linha">
                        <Col xs={12} md={6} className="modal-enc-col">
                            <div className="modal-enc-ret ilustra" onClick={showIlustra}>ILUSTRAÇÃO</div>
                        </Col>
                        <Col xs={12} md={6} className="modal-enc-col">
                            <div className="modal-enc-ret arte-digital" onClick={showDigital}>ARTE DIGITAL</div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default ModalEnco;