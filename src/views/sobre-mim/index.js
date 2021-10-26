import './index.css';
import { Form, Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { storage, fs, auth } from './../../config/firebase.js';
import { motion } from "framer-motion"


function SobreMim() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //- Descricao
    const [desc, setDesc] = useState('');

    //- Imagem princial
    const [imgMain, setMainIMG] = useState(null);

    //- Imagem princial
    const [imgUrl, setImgUrl] = useState("");

    //Tipos de imagens válidos
    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

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
            alert('please select your file');
        }
    };

    const AddNewItem = (e) => {
        e.preventDefault();
        if (imgMain == null) {
            fs.collection('Sobre-mim').doc("tnyYhgkXPqlbNiTz63J8").update({
                desc,
                imgUrl,
            }).then(() => {
                handleClose();
            });
        } else {
            const uploadTask = storage.ref(`/portifolio-images/${imgMain.name}`).put(imgMain);
            uploadTask.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            }, (err) => {
                console.log(err)
            }, () => {
                storage.ref('portifolio-images').child(imgMain.name).getDownloadURL().then(imgUrl => {
                    fs.collection('Sobre-mim').doc("tnyYhgkXPqlbNiTz63J8").update({
                        desc,
                        imgUrl,
                    }).then(() => {
                        handleClose();
                    });
                })
            })
        }
    };

    const [items, setItems] = useState([]);
    const [showBtn, setShowBtn] = useState(false);
    //Atualização dinâmicas de itens da coluna com base em lista do firebase
    useEffect(() => {
        //Busca a snapshot da coleção 'Portifolio-item'
        fs.collection('Sobre-mim').onSnapshot(snapshot => {
            const newItem = // Variável com vetor de itens do map seguinte:
                snapshot.docs.map((doc) => ({  //Faz um map na lista de documentos da seleção
                    ID: doc.id,
                    ...doc.data(),
                }));
            newItem.map((individualItem) => { //Faz um map no vetor de itens do newItem
                setItems((prevState) => [...prevState, individualItem]);
                setDesc(individualItem.desc);
                setImgUrl(individualItem.imgUrl);
            })
        })
        auth.onAuthStateChanged(user => {
            if (user && user.uid == "UGr7iwkw4ONmIlS16rJzROSTQ6A3") {
                setShowBtn(true);
            }
        })
    }, [])

    const variants = {
        hidden: { x: -200, y: 0 },
        enter: { x: 0, y: 0 },
        exit: { x: 0, y: -100 },
    }


    return (
        <section className="start-page-back">
            <div className="container">
                <motion.div variants={variants} // Pass the variant object into Framer Motion 
                    initial="hidden" // Set the initial state to variants.hidden
                    animate="enter" // Animated state to variants.enter
                    exit="exit" // Exit state (used later) to variants.exit
                    transition={{ type: "spring", stiffness: 150 }}>
                    <div className="sobre-mim row">

                        {items.length > 0 && (
                            <img className="col-12 skai-photo col-sm-6" src={imgUrl} />
                        )}
                        <div className="col-12 col-sm-6 text-about">
                            {items.length > 0 && (
                                <a> {desc}
                                </a>
                            )}
                            {showBtn && (
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Button onClick={handleShow} id="update-aboutme">Atualizar Conteúdo</Button>
                                </Form.Group>
                            )}

                        </div>
                        <Form id="form">
                            <Modal
                                show={show}
                                centered
                                onHide={handleClose}
                                keyboard={false}
                            >
                                <Modal.Header>
                                    <Modal.Title>Atualizar conteúdo</Modal.Title>
                                </Modal.Header>
                                <Modal.Body id="body-praleira">
                                    <Form.Group controlId="formFileMultiple" className="mb-3" id="input-files-1">
                                        <Form.Label>Escolha a imagem principal</Form.Label>
                                        <Form.Control type="file" className="input-photos" onChange={HandleMainImg} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Descrição</Form.Label>
                                        <Form.Control as="textarea" rows={4} defaultValue={items.length > 0 ? desc : ""} onChange={(e) => setDesc(e.target.value)} />
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <div />
                                    <button type="button"
                                        class="btn btn-primary button-save" onClick={AddNewItem}>Enviar</button>
                                </Modal.Footer>
                            </Modal>
                        </Form>

                    </div>
                </motion.div>
            </div>
        </section>

    )
}

export default SobreMim;