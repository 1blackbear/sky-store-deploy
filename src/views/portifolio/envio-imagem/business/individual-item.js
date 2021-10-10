import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import {fs, auth} from '../../../../config/firebase.js'

export const IndividualItem = ({ individualItem }) => {
    const [col, setCol] = useState();
    useEffect(()=>{
        if (individualItem.checkCol === 'col1') {
            setCol(1);
        } else {
            setCol(2);
        }
    },[])

    const handleDelete = () => {
        if (window.confirm('Você tem certeza que deseja deletar esse item?')) {
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Portifolio-item').doc(individualItem.ID).delete().then(()=>{
                    console.log('successfully deleted');
                })
            }
        })
    }
    };
    
    return (
        <Row className="table-Item">
            <Col xs={1}>{individualItem.id}</Col>
            <Col xs={1}>{col}</Col>
            <Col xs={2}>{individualItem.title}</Col>
            <Col xs={6}>{individualItem.desc}</Col>
            <Col xs={2} className="d-flex">
                <Col xs={6}><Button className="btn-update">Editar</Button></Col>
                <Col xs={6}><Button className="btn-delete" onClick={handleDelete}>Deletar</Button></Col>
            </Col>
        </Row>
    )
}