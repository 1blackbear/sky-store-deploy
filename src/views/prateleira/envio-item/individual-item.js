import { Row, Col, Button } from 'react-bootstrap';
import {fs, auth} from '../../../config/firebase.js'

export const IndividualItemPrat = ({ individualItem }) => {

    //Função para deletar o individualItem desejado
    const handleDelete = () => {
        if (window.confirm('Você tem certeza que deseja deletar esse item?')) {
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Prateleira-item').doc(individualItem.ID).delete();
            }
        })
    }
    };
    
    //Renderizar individualItem
    return (
        <Row className="table-Item">
            <Col xs={1}>{individualItem.id}</Col>
            <Col xs={2}>Categoria</Col>
            <Col xs={5}>{individualItem.title}</Col>
            <Col xs={2}>{individualItem.price}</Col>
            <Col xs={2} className="d-flex">
                <Col xs={6}><Button className="btn-update">Editar</Button></Col>
                <Col xs={6}><Button className="btn-delete" onClick={handleDelete}>Deletar</Button></Col>
            </Col>
        </Row>
    )
}