import React from 'react';
import { Nav } from 'react-bootstrap';
import '../../prateleira.css';

export default function Filter() {
    return (

        <Nav justify variant="tabs" className="d-flex justify-content-center nav-categorias" defaultActiveKey="cat1-btn">
            <Nav.Item>
                <Nav.Link eventKey="cat1-btn" className="nav-itens">GERAL</Nav.Link>
            </Nav.Item>
            <Nav.Item >
                <Nav.Link eventKey="cat2-btn" className="nav-itens">ADESIVO</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="cat3-btn" className="nav-itens">ESTAMPA</Nav.Link>
            </Nav.Item>
        </Nav>

    )
}

