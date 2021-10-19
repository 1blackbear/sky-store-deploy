import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {fs, auth} from '../../../../config/firebase.js'
import { Link } from "react-router-dom";
import '../styles/portifolio-list.css';
import { PortifolioItem } from './portifolio-item.js';

const PortifolioList = () => {
    const [items, setItems] = useState([]);

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Portifolio-item').onSnapshot(snapshot=>{
                    const newItem = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setItems(newItem);                    
                })
            }
        })
    },[])

    //Renderizar tabela database 
    return (
        <Container>
            <Row id="table-title">
                <Col className="d-flex justify-content-between align-items-center">
                    <h1>Portifolio Database</h1>
                    <Button id="btn-addItem" href="/adiciona-portifolio"><Link to="/adiciona-portifolio" id="link-addItem">Adicionar item</Link></Button>
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
                    <PortifolioItem items={items}/>
                )}
                {items.length < 1 && (
                    <div className='container-fluid'>Por favor, espere....</div>
                )}
            </Row>
        </Container>
    )
};

export default PortifolioList;