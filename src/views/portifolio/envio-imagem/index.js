import { Form, Container, Row, Col } from 'react-bootstrap';
import './index.css';
import option1 from '../../../images/portifolio-inicial/adicionar-img/option1.jpg'
import option2 from '../../../images/portifolio-inicial/adicionar-img/option2.jpg'
import option3 from '../../../images/portifolio-inicial/adicionar-img/option3.jpg'

const AddPortifolio = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Form id="form">
                        <h1>ADICIONAR ITEM PORTIFÓLIO</h1>
                        <br />
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Título da Arte</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>

                        <div key={`inline-radio`} className="mb-3 ">
                            <Form.Check
                            className="form-checkt"
                                inline
                                label="Coluna 1"
                                name="group1"
                                type="radio"
                                id="inline-radio-1"
                            />
                            <Form.Check
                            className="form-checkt"
                                inline
                                label="Coluna 2"
                                name="group1"
                                type="radio"
                                id={`inline-radio-2`}
                            />
                        </div>
                        <Form.Group controlId="formFileMultiple" className="mb-3" id="input-files-1">
                            <Form.Label>Escolha a imagem principal</Form.Label>
                            <Form.Control type="file" className="input-photos" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Escolha o formato da página de descrição</Form.Label>
                            <div id="label-box">
                                <label className="label-choose">
                                    <input type="radio" name="option[238]" value="56" />
                                    <img src={option1} alt="Cinza" className="img-thumbnail" />
                                </label>
                                <label className="label-choose">
                                    <input type="radio" name="option[238]" value="56" />
                                    <img src={option2} alt="Cinza" className="img-thumbnail" />
                                </label>
                                <label className="label-choose">
                                    <input type="radio" name="option[238]" value="56" />
                                    <img src={option3} alt="Cinza" className="img-thumbnail" />
                                </label>
                            </div>

                        </Form.Group>
                        
                        <Form.Group controlId="formFileMultiple" className="mb-3" id="input-files">
                            <div id="input-photo">
                                <Form.Label>Escolha x imagens</Form.Label>
                                <Form.Control type="file" multiple className="input-photos" />
                            </div>
                            <button type="button"
                                class="btn btn-primary button-save">Enviar</button>
                        </Form.Group>

                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

export default AddPortifolio;