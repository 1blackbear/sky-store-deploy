import { Row, Col } from 'react-bootstrap';

const IndividualItemEnco = ({ individualItem }) => {

    //Renderizar individualItem
    return (
        <Row className="table-Item">
            <Col xs={4} className="table-child">{individualItem.num_pedido}</Col>
            <Col xs={3} className="table-child">{individualItem.campos['tipo']}</Col>
            <Col xs={2} className="table-child">{individualItem.status}</Col>
            <Col xs={3} className="table-child">{individualItem.data}</Col>
        </Row>
    )
}

export default IndividualItemEnco;

