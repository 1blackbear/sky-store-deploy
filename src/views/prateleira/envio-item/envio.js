import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { fs, auth, storage } from '../../../config/firebase.js';
import { PrateleiraItem } from './prateleira-item';
import { propTypes } from 'react-bootstrap/esm/Image';
import { Link } from "react-router-dom";


const PrateleiraList = () => {
    
    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);
    
    //lista
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection('Prateleira-item').onSnapshot(snapshot => {
                    const newItem = snapshot.docs.map((doc) => ({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setItems(newItem);
                })
            }
            else {
                alert('Usuário não está logado');
            }
        })
    }, [])


    //Renderizar tabela database 
    return (
        <Container>
            <Row id="table-title">
                <Col className="d-flex justify-content-between align-items-center">
                    <h1>Prateleira Database</h1>
                    <Button id="btn-addItem" href="/adiciona-prateleira"><Link to={"/adiciona-prateleira"} id={"link-addItem"}>Adicionar item</Link></Button>
                </Col>
            </Row>
            <Row id="table-header">
                <Row id="table-Item-header">
                    <Col xs={1}>ID</Col>
                    <Col xs={2}>Categoria</Col>
                    <Col xs={5}>Titulo</Col>
                    <Col xs={2}>Preço</Col>
                    <Col xs={2}>Ações</Col>
                </Row>
            </Row>
            <Row id="table-body">
                {items.length > 0 && (<>
                    <div />
                    <PrateleiraItem items={items} />
                </>)}
                {items.length < 1 && (
                    <div className='container-fluid'>Por favor, espere....</div>
                )}
            </Row>
        </Container>

    )
};

export default PrateleiraList;