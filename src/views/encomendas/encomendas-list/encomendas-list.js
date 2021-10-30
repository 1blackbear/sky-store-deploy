import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {fs, auth} from '../../../config/firebase.js'
import {EncomendasItem} from './indivudal-item/encomenda-item.js';


const EncomendasList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Encomendas-list').onSnapshot(snapshot => {
                    const newItem = // Variável com vetor de itens do map seguinte:
                        snapshot.docs.map((doc) => ({  //Faz um map na lista de documentos da seleção
                            ID: doc.id,
                            ...doc.data(),
                        }));
                    newItem.map((individualItem) => { //Faz um map no vetor de itens do newItem
                        if (individualItem.uid === user.uid.toString()) { 
                            setItems((prevState) => [...prevState, individualItem]);
                        } 
                    })
                })
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
                    <Col xs={4}>Número do Pedido</Col>
                    <Col xs={3}>Titulo</Col>
                    <Col xs={2}>Status</Col>
                    <Col xs={3}>Data</Col>
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

export default EncomendasList;