import { Row, Col, Button } from 'react-bootstrap';
import { fs, auth } from '../../../config/firebase.js';
import AbreEditar from './botao-editar.js';

const IndividualItemPrat = ({ individualItem, onClick}) => {

    //Função para deletar o individualItem desejado
    const handleDelete = () => {
        if (window.confirm('Você tem certeza que deseja deletar esse item?')) {
            auth.onAuthStateChanged(user => {
                if (user) {
                    fs.collection('Prateleira-item').doc(individualItem.ID).delete();
                }
            })
        }
    };


    //Renderizar individualItem
    return (
        <Row className="table-Item">
            <Col xs={1}>{individualItem.id}</Col>
            <Col xs={2}>{individualItem.option}</Col>
            <Col xs={5}>{individualItem.title}</Col>
            <Col xs={2}>{individualItem.price}</Col>
            <Col xs={2} className="d-flex">
                <Col xs={6}><AbreEditar
                    onClick={onClick}
                >
                </AbreEditar> </Col>
                <Col xs={6}><Button className="btn-delete" onClick={handleDelete}>Deletar</Button></Col>
            </Col>
        </Row>
    )
}

export default IndividualItemPrat;

