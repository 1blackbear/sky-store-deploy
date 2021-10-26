import { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup, Modal, Container } from 'react-bootstrap';
import { fs, storage } from '../../../../config/firebase';
import { useHistory, useParams } from 'react-router-dom';

const FormsEditPortifolio = () => {

    //Rotas
    const history = useHistory();

    //- Itens
    const [items, setItems] = useState([]);

    //- Titulo
    const [title, setTitle] = useState('');

    //- Preço
    const [desc, setDesc] = useState('');

    //- Valor do radiobutton 'col'
    const [checkCol, setCheckCol] = useState('');
    const HandleCheckCol = (e) => setCheckCol(e.target.value);

    //- Imagem princial
    const [img, setIMG] = useState(null);

    const [url, setUrl] = useState('');


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

    useEffect(() => {
        let str = window.location.href.toString();
        str = str.slice(str.length - 20);
        fs.collection('Portifolio-item').onSnapshot(snapshot => {
            const newItem = snapshot.docs.map((doc) => ({
                ID: doc.id,
                ...doc.data(),
            }));
            newItem.map((individualItem) => {
                if (individualItem.ID === str) {
                    setItems((prevState) => [...prevState, individualItem]);
                    setDesc(individualItem.desc);
                    setTitle(individualItem.title);
                    setUrl(individualItem.url);
                    setCheckCol(individualItem.checkCol);
                }
            })
        })
    }, []);

    const EditaItem = (e) => {
        let str = window.location.href.toString();
        str = str.slice(str.length - 20);
        e.preventDefault();
        fs.collection('Portifolio-item').onSnapshot(snapshot => {
            const newItem = snapshot.docs.map((doc) => ({
                ID: doc.id,
                ...doc.data(),
            }));
            newItem.map((individualItem) => {
                if (individualItem.ID === str) {
                    if (img == null) {
                        console.log("entrou");
                        fs.collection('Portifolio-item').doc(individualItem.ID).update({
                            title,
                            desc,
                            checkCol,
                            url
                        }).then(() => {
                            setTitle('');
                            setDesc('');
                            setCheckCol('');
                            history.push('/portifolio-list');
                            history.go(0);
                        });
                    } else {
                        const uploadTask = storage.ref(`/portifolio-images/${img.name}`).put(img);
                        uploadTask.on('state_changed', snapshot => {
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        }, (err) => {
                            console.log(err)
                        }, () => {
                            storage.ref('portifolio-images').child(img.name).getDownloadURL().then(url => {
                                fs.collection('Portifolio-item').doc(individualItem.ID).update({
                                    title,
                                    desc,
                                    checkCol,
                                    url
                                }).then(() => {
                                    setTitle('');
                                    setDesc('');
                                    setCheckCol('');
                                    history.push('/portifolio-list');
                                    history.go(0);
                                });
                            })
                        })
                    }
                }
            })
        })
    };


    return (
        <Container>
            <Row>
                <Col>
                    <Form id="form" >
                        <h1>ATUALIZAR ITEM PORTIFÓLIO</h1>
                        <br />
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Título da Arte</Form.Label>
                            <Form.Control defaultValue={items.length > 0 ? title : ""} type="text" onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control defaultValue={items.length > 0 ? desc : ""} as="textarea" rows={3} onChange={(e) => setDesc(e.target.value)} />
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
                            <Form.Control type="file" className="input-photos" onChange={HandleImg} />
                        </Form.Group>
                        <button type="button"
                            class="btn btn-primary button-save" onClick={EditaItem}>Atualizar</button>
                    </Form>
                </Col>
            </Row>
        </Container>

    )

}

export default FormsEditPortifolio