import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { fs, auth } from '../../../config/firebase.js';
import { useHistory } from "react-router-dom";
import { EncomendasItem } from './individual-item-sky/encomenda-item-sky.js';


const EncomendasListSky = () => {
    const [items, setItems] = useState([]);
    const history = useHistory();

    
    //lista
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                if (user.uid.toString() == "UGr7iwkw4ONmIlS16rJzROSTQ6A3") {
                    fs.collection('Encomendas-list').onSnapshot(snapshot => {
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
                    <h1>Minhas encomendas</h1>
                </Col>
            </Row>
            <Row id="table-header">
                <Row id="table-Item-header">
                    <Col xs={3}>Número do Pedido</Col>
                    <Col xs={2}>Titulo</Col>
                    <Col xs={2}>Status</Col>
                    <Col xs={2}>Data</Col>
                    <Col xs={3}>Ações</Col>
                </Row>
            </Row>
            <Row id="table-body">
                {items.length > 0 && (<>
                    <EncomendasItem items={items} />
                </>)}
                {items.length < 1 && (
                    <div className='container-fluid'>Por favor, espere....</div>
                )}
            </Row>
        </Container>
    )
};

export default EncomendasListSky;