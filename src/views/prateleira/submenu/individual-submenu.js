import { Row, Col, Button } from 'react-bootstrap';
import { fs, auth } from '../../../config/firebase.js';
import { Link } from "react-router-dom";

const IndividualSubmenu = ({ individualItem }) => {

    //Função para deletar o individualItem desejado
    const handleDelete = () => {
        if (window.confirm('Você tem certeza que deseja deletar esse item?')) {
            auth.onAuthStateChanged(user => {
                if (user) {
                    fs.collection('Submenu-item').doc(individualItem.ID).delete();
                }
            })
        }
    };

    //Renderizar individualItem
    return (
        <Row className="table-Item">
            <Col xs={2}>{individualItem.id}</Col>
            <Col xs={8}>{individualItem.categoria}</Col>
            <Col xs={2} className="d-flex">
                <Col xs={6}><Button className="btn-update"><Link to={"/edita-submenu/" + individualItem.ID} key={individualItem.ID} id={"link-editItem"}>Editar</Link></Button></Col>
                <Col xs={6}><Button className="btn-delete" onClick={handleDelete}>Deletar</Button></Col>
            </Col>
        </Row>
    )
}

export default IndividualSubmenu;

