import { useState, useEffect, createRef } from 'react';
import { Container, Row, Col, Image, Nav, Form } from 'react-bootstrap';
import { fs, auth, storage } from '../../config/firebase.js'
import { EncomendasItem } from '../encomendas/encomendas-list/indivudal-item/encomenda-item.js';
import "./perfil.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import EditIcon from '@material-ui/icons/Edit';
import ModificarSenha from './modificar-senha/modificar-senha.js';
import DadosPessoais from './dados-pessoais/dados.js';


const Perfil = () => {
    const [progress, setProgress] = useState(0);
    const default_image = "https://firebasestorage.googleapis.com/v0/b/sky-loja.appspot.com/o/profile-images%2Fphoto_2021-11-01_20-07-23.jpg?alt=media&token=4f3dc9af-c2d3-4882-8b7a-1c858bfbc6c7";
    const cloud = "https://firebasestorage.googleapis.com/v0/b/sky-loja.appspot.com/o/cloud.png?alt=media&token=a317d1c4-94d2-4dc2-afe0-b701715b45e7"

    /*Funções para abrir e fechar o Modal de Trocar senha */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /*Funções para abrir e fechar o Modal de Dados Pessoais */
    const [showDados, setShowDados] = useState(false);
    const handleCloseDados = () => setShowDados(false);
    const handleShowDados = () => setShowDados(true);

    function returnDate(date) {
        return new Date(
            date.seconds * 1000 + date.nanoseconds / 1000000,
        );
    }
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    function userData(data) {
        setName(data.nome);
        setUrl(data.url);
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection("Users").doc(user.uid)
                    .onSnapshot((doc) => {
                        userData(doc.data());
                    });
                fs.collection('Encomendas-list').onSnapshot(snapshot => {
                    const newItem = // Variável com vetor de itens do map seguinte:
                        snapshot.docs.map((doc) => ({  //Faz um map na lista de documentos da seleção
                            ID: doc.id,
                            ...doc.data(),
                        }));
                    newItem.map((individualItem, index) => { //Faz um map no vetor de itens do newItem
                        if (individualItem.uid === user.uid.toString() && newItem[index + 1] != null) {
                            let item = individualItem;
                            if (returnDate(individualItem.data) > returnDate(newItem[index + 1].data)) {
                                setItems([individualItem]);
                            } else {
                                item = newItem[index + 1];
                                setItems([newItem[index + 1]]);
                            }
                            if (item.status === "Pedido recebido")
                                setProgress(0)
                            else if (item.status === "Em contato")
                                setProgress(33.4)
                            else if (item.status === "Em produção")
                                setProgress(66.67)
                            else if (item.status === "Pedido entregue")
                                setProgress(100)

                        } else if (individualItem.uid === user.uid.toString() && newItem.length == 1) {
                            setItems((prevState) => [...prevState, individualItem]);
                        }

                    })
                })
            }
        })
    }, [])

    function uploadImage() {
        inputElement.current.click();
    }

    const inputElement = createRef();

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
    const HandleImg = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (types.includes(selectedFile.type)) {
                const uploadTask = storage.ref(`/profile-images/${selectedFile.name}`).put(selectedFile);
                uploadTask.on('state_changed', snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                }, (err) => {
                    console.log(err)
                }, () => {
                    auth.onAuthStateChanged(user => {
                        if (user) {
                            storage.ref('profile-images').child(selectedFile.name).getDownloadURL().then(url => {
                                fs.collection('Users').doc(user.uid).update({
                                    url
                                })
                            })
                        }
                    })
                })
            }
        }
    };

    //Renderizar tabela database 
    return (<>
        <Container>
            <Row id="profile-header">
                <Col xs={3}>
                    <div className="imagem">
                        <Image  src={url == "" ? default_image : url} className="profile-image" roundedCircle />
                        <div id="trigger-photo" onClick={uploadImage} className="capa capa-perfil">
                            <p className="text-item"><EditIcon id="edit-icon" /></p>
                        </div>
                    </div>
                    <Form.Control type="file" id="profile-input" ref={inputElement} onChange={HandleImg} />
                </Col>
                <Col xs={9} id="profile-column">
                    <Col xs={12}>
                        <h1>Olá, {name.split(' ').slice(0, 2).join(' ')}!</h1>
                    </Col>
                    <Col xs={12}>
                        <Nav defaultActiveKey="/home" as="ul" className="profile-nav">
                            <Nav.Item as="li">
                                <Nav.Link onClick={handleShowDados}>Dados pessoais</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link onClick={handleShow}>Alterar senha</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link eventKey="link-2" href="/encomendas-list">Minhas encomendas</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link href="/manutencao">Histórico de compras</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Col>
            </Row>
            <Row id="table-title-profile">
                <Col className="d-flex justify-content-between align-items-center">
                    <h1>Última encomenda</h1>
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
                    <div className='container-fluid'>Nenhuma encomenda registrada...</div>
                )}
            </Row>
            <Row id="progress-section">
                <Row className="progress-bar-main">
                    <ProgressBar
                        hasStepZero={true}
                        percent={progress}
                        filledBackground="#90CBEB"
                    >
                        <Step transition="scale">
                            {({ accomplished }) => (
                                <img
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                    width={`${accomplished ? 50 : 30}`}
                                    src={cloud}
                                />
                            )}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) => (
                                <img
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                    width={`${accomplished ? 50 : 30}`}
                                    src={cloud}
                                />
                            )}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) => (
                                <img
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                    width={`${accomplished ? 50 : 30}`}
                                    src={cloud}
                                />
                            )}
                        </Step>
                        <Step transition="scale">
                            {({ accomplished }) => (
                                <img
                                    style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                    width={`${accomplished ? 50 : 30}`}
                                    src={cloud}
                                />
                            )}
                        </Step>
                    </ProgressBar>
                </Row>
                <Row id="progress-bar">
                    <Col className="progress-state">Pedido Recebido</Col>
                    <Col className="progress-state">Em contato</Col>
                    <Col className="progress-state">Em produção</Col>
                    <Col className="progress-state">Pedido Entregue</Col>
                </Row>
            </Row>
        </Container >
        <ModificarSenha
            show={show}
            handleClose={handleClose}
        />
        <DadosPessoais
            show={showDados}
            handleClose={handleCloseDados}
        />
    </>)
};

export default Perfil;