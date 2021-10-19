import { useState, useEffect } from "react";
import { Form, Button, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { fs, auth, storage } from '../../../../config/firebase';
import PrateleiraList from "../envio";


const FormsPrateleira = ({ onHide, items }) => {

    const initialFieldValues = {
        title: '',
        price: '',
        option: '',
        img: ''
    }

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
                    onHide();
                });
            })
        })
    };


    return (
        <>

            <Form id="form">
                <Modal.Body id="body-praleira">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Título da Arte</Form.Label>
                        <Form.Control type="text" onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control type="text" onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridState">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control as="select" onChange={(e) => setOption(e.target.value)}>
                            <option value="Opcoes">Opções...</option>
                            <option value="Estampa">Estampa</option>
                            <option value="Adesivo">Adesivo</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formFileMultiple" className="mb-3" id="button-form">
                        <div id="files-input">
                            <Form.Label>Escolha a imagem da arte</Form.Label>
                            <Form.Control type="file" className="photos-input" onChange={HandleImg} />
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <div />
                    <button type="button"
                        class="btn btn-primary button-save" onClick={AddNewItem}>Enviar</button>
                </Modal.Footer>
            </Form>

        </>

    )

}

export default FormsPrateleira

