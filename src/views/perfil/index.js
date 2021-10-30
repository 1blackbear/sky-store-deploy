import { useState, useEffect, createRef } from 'react';
import { Container, Row, Col, Image, Nav, Form } from 'react-bootstrap';
import { fs, auth, storage } from '../../config/firebase.js'
import { EncomendasItem } from '../encomendas/encomendas-list/indivudal-item/encomenda-item.js';
import "./perfil.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import EditIcon from '@material-ui/icons/Edit';


const Perfil = () => {
    const [progress, setProgress] = useState(0);
    const cloud = "https://firebasestorage.googleapis.com/v0/b/sky-loja.appspot.com/o/cloud.png?alt=media&token=a317d1c4-94d2-4dc2-afe0-b701715b45e7"

    function returnDate(date) {
        var partesData = date.split("/");
        var data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
        return data;
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
                            if (returnDate(individualItem.data) > returnDate(newItem[index + 1].data)) {
                                let vect = [individualItem];
                                setItems(vect);
                                if (individualItem.status === "Em contato")
                                    setProgress(33.3)
                                else if (individualItem.status === "Em produção")
                                    setProgress(66.67)
                                else if (individualItem.status === "Pedido entregue")
                                    setProgress(100)
                            }
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
    return (
        <Container>
            <Row id="profile-header">
                <Col xs={3}>
                    <a onClick={uploadImage} id="trigger-photo">
                        <div className="imagem">
                            <Image src={url == "" ? cloud : url} className="profile-image" roundedCircle />
                            <div className="capa capa-perfil">
                                <p className="text-item"><EditIcon id="edit-icon" /></p>
                            </div>
                        </div>
                    </a>
                    <Form.Control type="file" id="profile-input" ref={inputElement} onChange={HandleImg} />
                </Col>
                <Col xs={9} id="profile-column">
                    <Col xs={12}>
                        <h1>Olá, {name.split(' ').slice(0, 2).join(' ')}!</h1>
                    </Col>
                    <Col xs={12}>
                        <Nav defaultActiveKey="/home" as="ul" className="profile-nav">
                            <Nav.Item as="li">
                                <Nav.Link href="/manutencao">Dados pessoais</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link href="/manutencao">Alterar senha</Nav.Link>
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
    )
};

export default Perfil;