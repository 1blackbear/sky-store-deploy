import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { fs, auth } from '../../../../config/firebase.js'
import { Link, useHistory } from "react-router-dom";
import '../styles/portifolio-list.css';
import { PortifolioItem } from './portifolio-item.js';

const PortifolioList = () => {
    const [items, setItems] = useState([]);

    const history = useHistory();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                if (user.uid.toString() == "UGr7iwkw4ONmIlS16rJzROSTQ6A3") {
                    fs.collection('Portifolio-item').onSnapshot(snapshot => {
                        const newItem = snapshot.docs.map((doc) => ({
                            ID: doc.id,
                            ...doc.data(),
                        }));
                        setItems(newItem);
                    })
                } else {
                    history.push('/');
                }
            } else {
                history.push('/');
            }
        })
    }, [])

    //Renderizar tabela database 
    return (
        <Container>
            <Row id="table-title">
                <Col className="d-flex justify-content-between align-items-center">
                    <h1>Portfolio Database</h1>
                    <Button id="btn-addItem" href="/adiciona-portfolio"><Link to="/adiciona-portfolio" id="link-addItem">Adicionar item</Link></Button>
                </Col>
            </Row>
            <Row id="table-header">
                <Row id="table-Item-header">
                    <Col xs={1}>ID</Col>
                    <Col xs={1}>Coluna</Col>
                    <Col xs={2}>Título</Col>
                    <Col xs={6}>Descrição</Col>
                    <Col xs={2}>Ações</Col>
                </Row>
            </Row>
            <Row id="table-body">
                {items.length > 0 && (
                    <PortifolioItem items={items} />
                )}
                {items.length < 1 && (
                    <div className='container-fluid'>Por favor, espere....</div>
                )}
            </Row>
        </Container>
    )
};

export default PortifolioList;