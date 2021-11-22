import { useEffect } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import './pedido.css';

const IndividualItemPedido = ({ individualItem }) => {
    function getCurrentDate(separator = '/') {
        const fireBaseTime = new Date(
            individualItem.data_pedido.seconds * 1000 + individualItem.data_pedido.nanoseconds / 1000000,
        );
        let date = fireBaseTime.getDate();
        let month = fireBaseTime.getMonth() + 1;
        let year = fireBaseTime.getFullYear();
        return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
    }

    useEffect(() => {
        console.log(individualItem)
    })







    function ReptileListItems() {
        const reptiles = individualItem.item;
        return reptiles.map((reptile) =>
            <>
                <Row className="card-pedido-body">
                    <Col xs={3} className="col-pedido">
                        <img width="50px" className="photo-item-pedido" src={reptile.url}></img>
                    </Col>
                    <Col xs={5} className="col-pedido">
                        <Col xs={12} className="pedido-title">{reptile.title}</Col>
                        <Col xs={12} className="pedido-preco">
                        R$ {reptile.price}
                        </Col>
                    </Col>
                    <Col xs={4} className="col-pedido"><Button className='btn-download'>Baixar Imagem</Button></Col>
                </Row>
            </>
        );
    }

    //Renderizar individualItem
    return (
        <>
            <Container className="card-pedido-row">
                <Row className="card-pedido-header">
                    <Col><strong>Pedido realizado: </strong>{getCurrentDate()}</Col>
                    <Col><strong>Número do pedido: </strong>{individualItem.num_pedido}</Col>
                </Row>
                <ReptileListItems />
            </Container>



            {/**
        <Row className="table-Item">

            <Col xs={4} className="table-child">{individualItem.num_pedido}</Col>
            <Col xs={3} className="table-child"></Col>
            <Col xs={2} className="table-child">teste</Col>
            <ReptileListItems />

            <Col xs={3} className="table-child">{getCurrentDate()}</Col>
        </Row>
         */}
        </>
    )
}

export default IndividualItemPedido;

