import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { fs, auth } from './../../../../config/firebase.js';

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

    const [status, setStatus] = useState('');

    const EditaItem = (e) => {
        e.preventDefault();
        if (window.confirm('Você tem certeza que deseja atualizar o status deste pedido?')) {
            fs.collection('Encomendas-list').doc(individualItem.ID).update({
                status
            }).then(() => {
                window.location.reload();
            });
        }
    };


    const [stats, setStats] = useState({
        recebido: 'Pedido recebido',
        contato: 'Em contato',
        producao: 'Em produção',
        entregue: 'Pedido entregue',
    });

    useEffect(() => {
        if (individualItem.status === "Em contato") {
            setStats(
                {
                    recebido: individualItem.status,
                    contato: 'Pedido recebido',
                    producao: 'Em produção',
                    entregue: 'Pedido entregue',
                }
            );
        } else if (individualItem.status === "Em produção") {
            setStats(
                {
                    recebido: individualItem.status,
                    contato: 'Em contato',
                    producao: 'Pedido recebido',
                    entregue: 'Pedido entregue',
                }
            );
        } else if (individualItem.status === "Pedido entregue") {
            setStats(
                {
                    recebido: individualItem.status,
                    contato: 'Em contato',
                    producao: 'Em produção',
                    entregue: 'Pedido recebido',
                }
            );
        }
    }, [])

    //Função para deletar o individualItem desejado
    const handleDelete = () => {
        if (window.confirm('Você tem certeza que deseja deletar esse item?')) {
            auth.onAuthStateChanged(user => {
                if (user) {
                    fs.collection('Encomendas-list').doc(individualItem.ID).delete();
                }
            })
        }
    };

    //Renderizar individualItem
    return (
        <Row className="table-Item">
            <Col xs={3} className="table-child">{individualItem.num_pedido}</Col>
            <Col xs={2} className="table-child">{individualItem.campos['tipo']}</Col>
            <Col xs={2} className="table-child">
                <Form.Control as="select" onChange={(e) => setStatus(e.target.value)}>
                    <option value={stats["recebido"]}>{stats["recebido"]}</option>
                    <option value={stats["contato"]}>{stats["contato"]}</option>
                    <option value={stats["producao"]}>{stats["producao"]}</option>
                    <option value={stats["entregue"]}>{stats["entregue"]}</option>
                </Form.Control>
            </Col>
            <Col xs={2} className="table-child">{getCurrentDate()}</Col>
            <Col xs={2} className="table-child d-flex">
                <Col xs={6}><Button className="btn-update link-editItem" onClick={EditaItem}>Atualizar</Button></Col>
                <Col xs={6}><Button className="btn-delete" onClick={handleDelete}>Deletar</Button></Col>
            </Col>
        </Row>
    )
}

export default IndividualItemEnco;

