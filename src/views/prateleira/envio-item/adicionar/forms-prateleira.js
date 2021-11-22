import { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup, Modal, Container } from 'react-bootstrap';
import { fs, storage, auth } from '../../../../config/firebase';
import { useHistory } from 'react-router-dom';
import '../../prateleira.css';

const FormsPrateleira = () => {

    //Rotas
    const history = useHistory();

    //- Items
    const [items, setItems] = useState([]);

    //- Titulo
    const [title, setTitle] = useState('');

    //- Preço
    const [price, setPrice] = useState('');

    //- Imagem princial
    const [img, setIMG] = useState(null);

    //- Categoria
    const [option, setOption] = useState('');

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


    // adicionar item na lista
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
                    option,
                    url,
                    id
                }).then(() => {
                    setTitle('');
                    setPrice('');
                    setOption('');
                    history.push('/prateleira-list');
                });
            })
        })
    };

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                if (user.uid.toString() == "UGr7iwkw4ONmIlS16rJzROSTQ6A3") {
                    fs.collection('Prateleira-item').onSnapshot(snapshot => {
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
                        <h1>ADICIONAR ARTE PRATELEIRA</h1>
                        <br />
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Título da Arte</Form.Label>
                            <Form.Control type="text" defaultValue={items.length > 0 ? title : ""} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Col xs={12} md={2}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Preço</Form.Label>
                                <Form.Control type="text" defaultValue={items.length > 0 ? price : ""} onChange={(e) => setPrice(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridState">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control as="select" defaultValue={items.length > 0 ? option : ""} onChange={(e) => setOption(e.target.value)}>
                                    <option value="Opcoes">Opções...</option>
                                    <option value="Estampa">Estampa</option>
                                    <option value="Adesivo">Adesivo</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Form.Group controlId="formFileMultiple" className="mb-3" id="button-form">
                            <div id="files-input">
                                <Form.Label>Escolha a imagem da arte</Form.Label>
                                <Form.Control type="file" className="photos-input" onChange={HandleImg} />
                            </div>
                            <button type="button"
                                class="btn btn-primary button-save" onClick={AddNewItem}>Adicionar</button>

                        </Form.Group>

                    </Form>
                </Col>
            </Row>
        </Container>

    )

}

export default FormsPrateleira
