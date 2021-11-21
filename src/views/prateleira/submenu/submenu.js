import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { fs, auth, storage } from '../../../config/firebase.js';
import { SubmenuItem } from './submenu-item.js';
import { Link } from "react-router-dom";

const SubmenuList = () => {

    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);

    //lista
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection('Submenu-item').onSnapshot(snapshot => {
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
                    <h1>Submenu Database</h1>
                    <Col xs={3.5} className="d-flex">
                        <Button id="btn-addItem" href="/prateleira-list"><Link to={"/prateleira-list"} id={"link-addItem"}>Voltar prateleira</Link></Button>
                        <Button id="btn-addItem" href="/adiciona-submenu"><Link to={"/adiciona-submenu"} id={"link-addItem"}>Adicionar categoria</Link></Button>
                    </Col>
                </Col>
            </Row>
            <Row id="table-header">
                <Row id="table-Item-header">
                    <Col xs={2}>ID</Col>
                    <Col xs={8}>Categoria</Col>
                    <Col xs={2}>Ações</Col>
                </Row>
            </Row>
            <Row id="table-body">
                {items.length > 0 && (<>
                    <SubmenuItem items={items} />
                </>)}
                {items.length < 1 && (
                    <div className='container-fluid'>Por favor, espere....</div>
                )}
            </Row>
        </Container>

    )
};

export default SubmenuList;
