import { Form, Container, Row, Col, Modal } from 'react-bootstrap';
import React, { useState} from 'react';
import '../styles/index.css';
import '../styles/check.scss';
import option1 from '../../../../images/portifolio-inicial/adicionar-img/option1.jpg';
import option2 from '../../../../images/portifolio-inicial/adicionar-img/option2.jpg';
import option3 from '../../../../images/portifolio-inicial/adicionar-img/option3.jpg';
import { storage, fs } from '../../../../config/firebase.js';
import { useHistory } from 'react-router-dom';


const AddPortifolio = () => {
    //Rotas para a página
    const history = useHistory();

    //Tipos de imagens válidos
    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

    //Tratamento de dados:
    //- Titulo
    const [title, setTitle] = useState('');

    //- Descricao
    const [desc, setDesc] = useState('');

    //- Imagem princial
    const [imgMain, setMainIMG] = useState(null);
    
    //- Imagens múltiplas
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);

    //- Valor do radiobutton 'col'
    const [checkCol, setCheckCol] = useState('');
    const HandleCheckCol = (e) => setCheckCol(e.target.value);

    //- Template de descrição 
    const [checkType, setCheckType] = useState('');
    

    //Número de imagens múltiplas
    const [numberImg, setNumber] = useState(0);
    const HandleCheckType = (e) => {
        setCheckType(e.target.value);
        if (e.target.value === 'img2') {
            setNumber(8);
        } else {
            setNumber(4);
        }
    };

    //Modal sucesso
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const [id, setID] = useState(getRandomInt(1000,9999));
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }


    //Obter valor da imagem principal e múltiplas imagens
    const HandleMainImg = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setMainIMG(selectedFile);
            }
            else {
                setMainIMG(null);
            }
        }
        else {
            console.log('please select your file');
        }
    };
    const HandleMultiImg = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    //Upload de dados das imagens e campos
    const handleUpload = () => {
        const promises = [];
        images.map((image) => {
            const uploadTask = storage.ref(`portifolio-images/${image.name}`).put(image);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    console.log(progress + 'multi');
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    await storage
                        .ref("portifolio-images")
                        .child(image.name)
                        .getDownloadURL()
                        .then((urls) => {
                            setUrls((prevState) => [...prevState, urls]);
                        });
                }
            );
        });

        Promise.all(promises)
            .then(() => console.log("All images uploaded"))
            .catch((err) => console.log(err));
    };
    const AddNewItem = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`/portifolio-images/${imgMain.name}`).put(imgMain);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress + 'single');
        }, (err) => {
            console.log(err)
        }, () => {
            storage.ref('portifolio-images').child(imgMain.name).getDownloadURL().then(url => {
                fs.collection('Portifolio-item').add({
                    title,
                    desc,
                    checkCol,
                    checkType,
                    url,
                    urls,
                    id
                }).then(() => {
                    setTitle('');
                    setDesc('');
                    handleClose();
                    history.push('/portifolio-list');
                });
            })
        })
    };


    return (
        <Container>
            <Row>
                <Col>
                    <Form id="form" >
                        <h1>ADICIONAR ITEM PORTIFÓLIO</h1>
                        <br />
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Título da Arte</Form.Label>
                            <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(e) => setDesc(e.target.value)} />
                        </Form.Group>
                        <div key={`inline-radio`} className="mb-3 ">
                            <Form.Check
                                className="form-checkt"
                                inline
                                label="Coluna 1"
                                value="col1"
                                name="group1"
                                type="radio"
                                id="inline-radio-1"
                                checked={checkCol === 'col1'}
                                onChange={HandleCheckCol}
                            />
                            <Form.Check
                                className="form-checkt"
                                inline
                                value="col2"
                                label="Coluna 2"
                                name="group1"
                                type="radio"
                                id={`inline-radio-2`}
                                checked={checkCol === 'col2'}
                                onChange={HandleCheckCol}
                            />
                        </div>
                        <Form.Group controlId="formFileMultiple" className="mb-3" id="input-files-1">
                            <Form.Label>Escolha a imagem principal</Form.Label>
                            <Form.Control type="file" className="input-photos" onChange={HandleMainImg} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Escolha o formato da página de descrição</Form.Label>
                            <div id="label-box">
                                <label className="label-choose">
                                    <input type="radio" name="option[238]" value="img1" checked={checkType === 'img1'} onChange={HandleCheckType} />
                                    <img src={option1} alt="Cinza" className="img-thumbnail" />
                                </label>
                                <label className="label-choose">
                                    <input type="radio" name="option[238]" value="img2" checked={checkType === 'img2'} onChange={HandleCheckType} />
                                    <img src={option2} alt="Cinza" className="img-thumbnail" />
                                </label>
                                <label className="label-choose">
                                    <input type="radio" name="option[238]" value="img3" checked={checkType === 'img3'} onChange={HandleCheckType} />
                                    <img src={option3} alt="Cinza" className="img-thumbnail" />
                                </label>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formFileMultiple" className="mb-3" id="input-files">
                            <div id="input-photo">
                                <Form.Label>Escolha {numberImg} imagens</Form.Label>
                                <Form.Control type="file" multiple className="input-photos" onChange={HandleMultiImg} />
                            </div>
                            <button type="button"
                                class="btn btn-primary button-save" onClick={() => {
                                    handleUpload(); setTimeout(() => {
                                        handleShow();
                                    }, 3000)
                                }}>Enviar</button>
                        </Form.Group>

                        {/*--------MODAL SUCESSO--------*/}
                        <Modal backdrop="static" centered show={show} onHide={handleClose} id="modal-compartilhar">
                            <Modal.Header>
                                <Modal.Title>Item enviado com sucesso!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div class="success-checkmark">
                                    <div class="check-icon">
                                        <span class="icon-line line-tip"></span>
                                        <span class="icon-line line-long"></span>
                                        <div class="icon-circle"></div>
                                        <div class="icon-fix"></div>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="modal-footer d-flex justify-items-end">
                                <div />
                                <button type="button"
                                    class="btn btn-primary button-save" onClick={AddNewItem}>Voltar à página</button>
                            </Modal.Footer>
                        </Modal>
                        {/*--------MODAL SUCESSO--------*/}
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default AddPortifolio;