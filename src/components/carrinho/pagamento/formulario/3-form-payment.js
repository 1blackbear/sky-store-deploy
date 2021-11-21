import { Modal, Button, Row, Col, Form, Card } from 'react-bootstrap';

const PaymentFormThree = ({ prev, prevDisable }) => {
    return (
        <>
            <Modal.Body>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-secondary" onClick={prev} disabled={prevDisable}> Anterior</Button>
                <Button className="button-save">Pagar</Button>
            </Modal.Footer>
        </>
    )
}

export default PaymentFormThree;