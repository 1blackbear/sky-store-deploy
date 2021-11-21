import { Row, Col } from 'react-bootstrap';


const IndividualItemEnco = ({ individualItem }) => {
    function getCurrentDate(separator = '/') {
        const fireBaseTime = new Date(
            individualItem.data.seconds * 1000 + individualItem.data.nanoseconds / 1000000,
        );
        let date = fireBaseTime.getDate();
        let month = fireBaseTime.getMonth() + 1;
        let year = fireBaseTime.getFullYear();
        return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
    }

    //Renderizar individualItem
    return (
        <Row className="table-Item">
            <Col xs={4} className="table-child nm-table-mobile">{individualItem.num_pedido}</Col>
            <Col xs={3} className="table-child title-table-mobile">{individualItem.campos['tipo']}</Col>
            <Col xs={2} className="table-child">{individualItem.status}</Col>
            <Col xs={3} className="table-child data-table-mobile">{getCurrentDate()}</Col>
        </Row>
    )
}

export default IndividualItemEnco;

