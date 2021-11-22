import { Modal, Button, Row, Col, Form, Card } from 'react-bootstrap';

const PaymentFormThree = ({ next, prev, prevDisable, totalPrice }) => {
    return (
        <>
            <Modal.Body>
                Valor total a ser pago: R$ {totalPrice}
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-secondary" onClick={prev} disabled={prevDisable}> Anterior</Button>
                <Button className="button-save" type="submit" onClick={next}>Próximo</Button>
            </Modal.Footer>
        </>
    )
}

export default PaymentFormThree;