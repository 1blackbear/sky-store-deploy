import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form} from 'react-bootstrap';
import {fs, auth, storage} from '../../../config/firebase.js';
import {PrateleiraItem} from './prateleira-item';


const PrateleiraList = () => {
    //- Titulo
    const [title, setTitle] = useState('');
    
    //- Preço
    const [price, setPrice] = useState('');

     //- Imagem princial
     const [img, setIMG] = useState(null);

     //Tipos de imagens válidos
    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

    //Função para gerar ID aleatório entre 1000-9999
    const [id, setID] = useState(getRandomInt(1000, 9999));
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

     const HandleImg = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (types.includes(selectedFile.type)) {
                setIMG(selectedFile);
            }
            else {
                setIMG(null);
            }
        }
        else {
            alert('please select your file');
        }
    };

    const AddNewItem = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`/prateleira-images/${img.name}`).put(img);
        uploadTask.on('state_changed', snapshot => { 
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        }, (err) => {
            console.log(err)
        }, () => {
            storage.ref('prateleira-images').child(img.name).getDownloadURL().then(url => {
                fs.collection('Prateleira-item').add({
                    title,
                    price,
                    url,
                    id
                }).then(() => {
                    setTitle('');
                    setPrice('');
                    handleClose();
                });
            })
        })
    };



    const [items, setItems] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Prateleira-item').onSnapshot(snapshot=>{
                    const newItem = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setItems(newItem);                    
                })
            }
            else{
                alert('Usuário não está logado');
            }
        })
    },[])

    //Renderizar tabela database 
    return (
        <Container>
            <Row id="table-title">
                <Col className="d-flex justify-content-between align-items-center">
                    <h1>Prateleira Database</h1>
                    <Button id="btn-addItem" onClick={handleShow}>Adicionar item</Button>
                </Col>
            </Row>
            <Row id="table-header">
                <Row id="table-Item-header">
                    <Col xs={1}>ID</Col>
                    <Col xs={2}>Categoria</Col>
                    <Col xs={5}>Titulo</Col>
                    <Col xs={2}>Preço</Col>
                    <Col xs={2}>Ações</Col>
                </Row>
            </Row>
            <Row id="table-body">
                {items.length > 0 && ( <>
                    <div/>
                    <PrateleiraItem items={items}/>
                </> )}
                {items.length < 1 && (
                    <div className='container-fluid'>Por favor, espere....</div>
                )}
            </Row>
            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Adicionar item prateleira</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form id="form">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Título da Arte</Form.Label>
                            <Form.Control type="text" onChange={(e) => setTitle(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control type="text" onChange={(e) => setPrice(e.target.value)}/>
                        </Form.Group>
                         <Form.Group className="mb-3" controlId="formGridState">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control as="select">
                                    <option value="opcoes">Opções...</option>
                                    <option value="estampa">Estampa</option>
                                    <option value="adesivo">Adesivo</option>
                                </Form.Control>
                         </Form.Group>
                        <Form.Group controlId="formFileMultiple" className="mb-3" id="button-form">
                            <div id="files-input">
                                <Form.Label>Escolha a imagem da arte</Form.Label>
                                <Form.Control type="file" className="photos-input" onChange={HandleImg}/>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div/>
                <button type="button"
                                class="btn btn-primary button-save" onClick={AddNewItem}>Enviar</button>
                </Modal.Footer>
            </Modal >
        </Container>
    )
};

export default PrateleiraList;