import { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup, Modal, Container } from 'react-bootstrap';
import { fs, auth } from '../../../../config/firebase';
import { useHistory, useParams } from 'react-router-dom';
import '../../prateleira.css';

const FormSubmenuEdit = () => {

    //Rotas
    const history = useHistory();

    //- Itens
    const [items, setItems] = useState([]);

    //- Categoria
    const [categoria, setCategoria] = useState('');

    const [id, setID] = useState(getRandomInt(1000, 9999));
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    useEffect(() => {
        let str = window.location.href.toString();
        str = str.slice(str.length - 20);
        fs.collection('Submenu-item').onSnapshot(snapshot => {
            const newItem = snapshot.docs.map((doc) => ({
                ID: doc.id,
                ...doc.data(),
            }));
            newItem.map((individualItem) => {
                if (individualItem.ID === str) {
                    setItems((prevState) => [...prevState, individualItem]);
                    setCategoria(individualItem.categoria);
                }
            })
        })
    }, []);

    const EditaSubmenu = (e) => {
        let str = window.location.href.toString();
        str = str.slice(str.length - 20);
        e.preventDefault();
        fs.collection('Submenu-item').onSnapshot(snapshot => {
            const newItem = snapshot.docs.map((doc) => ({
                ID: doc.id,
                ...doc.data(),
            }));
            newItem.map((individualItem) => {
                if (individualItem.ID === str) {
                    fs.collection('Submenu-item').doc(individualItem.ID).update({
                        categoria,
                    }).then(() => {
                        setCategoria('');
                        history.push('/submenu-list');
                        history.go(0);
                    });
                }
            })
        })
    };
        //lista
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    if (user.uid.toString() == "UGr7iwkw4ONmIlS16rJzROSTQ6A3") {
                        fs.collection('Submenu-item').onSnapshot(snapshot => {
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

    return (
        <Container>
            <Row>
                <Col>
                    <Form id="form">
                        <h1>ADICIONAR CATEGORIA SUBMENU</h1>
                        <br />
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control type="text" defaultValue={items.length > 0 ? categoria : ""} onChange={(e) => setCategoria(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formFileMultiple" className="mb-3" id="button-form">
                            <button type="button"
                                class="btn btn-primary button-save" onClick={EditaSubmenu}>Atualizar</button>

                        </Form.Group>

                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default FormSubmenuEdit;
