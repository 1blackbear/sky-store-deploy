import './prateleira.css';
import { Container, Row, Nav, Tab, NavItem } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { PrateleiraItemMain } from './envio-item/pagina-principal/prateleira-item-main';
import Filter from './envio-item/pagina-principal/submenu-prateleira';
import { fs, auth } from '../../config/firebase.js';


function Prateleira() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fs.collection('Prateleira-item').onSnapshot(snapshot => {
            const newItem = snapshot.docs.map((doc) => ({
                ID: doc.id,
                ...doc.data(),
            }));
            setItems(newItem);
        })
    }, [])

    return (
        <Container className="card-part">
            <Row >
                <Filter/>
                <PrateleiraItemMain items={items}></PrateleiraItemMain>
            </Row>

        </Container>
    )
}

export default Prateleira;
