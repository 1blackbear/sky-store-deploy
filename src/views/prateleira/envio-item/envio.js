import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { fs, auth, storage } from '../../../config/firebase.js';
import { PrateleiraItem } from './prateleira-item';
import { propTypes } from 'react-bootstrap/esm/Image';
import { Link, useHistory } from "react-router-dom";



const PrateleiraList = () => {

    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);

    const history = useHistory();

    //lista
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                if (user.uid.toString() == "UGr7iwkw4ONmIlS16rJzROSTQ6A3") {
                    fs.collection('Prateleira-item').onSnapshot(snapshot => {
                        const newItem = snapshot.docs.map((doc) => ({
                            ID: doc.id,
                            ...doc.data(),
                        }));
                        setItems(newItem);
                    })
                } else {
                    history.push('/');
                }
            }
            else {
                history.push('/');
            }
        })
    }, [])


    //Renderizar tabela database 
    return (
        <Container>
            <Row id="table-title">
                <Col className="d-flex justify-content-between align-items-center">
                    <h1>Prateleira Database</h1>
                    <Col xs={3} className="d-flex">
                        <Button id="btn-addItem" href="/submenu-list"><Link to={"/submenu-list"} id={"link-addItem"}>Submenu Database</Link></Button>
                        <Button id="btn-addItem" href="/adiciona-prateleira"><Link to={"/adiciona-prateleira"} id={"link-addItem"}>Adicionar item</Link></Button>
                    </Col>
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