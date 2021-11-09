import { useState } from "react";
import { Form, Button, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import FechaCadastro from "./botao-fechar";
import Usuario from "./usuario";
import './index.css';


const FormsCadastro = ({ voltaLogin, toggle }) => {

    const [nome, setNome] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const [typeInput, setTypeInput] = useState("password");
    const [typeInput2, setTypeInput2] = useState("password");


    const user = new Usuario;

    function cadastrar(){
        user.cadastrar(email, senha, confirmSenha, nome);
    }


    return (

        <>
            {/*Forms  de Cadastro */}
            <Form>
                <Modal.Body id="body-cadastro">
                    <Form.Group>
                        <Form.Label className="titulo-campo">Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="titulo-campo">E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="titulo-campo">Senha</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={typeInput}
                                        placeholder="Senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        className="inputText"
                                    />
                                    <InputGroup.Text className="visibility" ><a onClick={() => { if (typeInput == "password") setTypeInput("text"); else setTypeInput("password"); }}>
                                        {typeInput == "password" && <i class="fas fa-eye"></i>}
                                        {typeInput != "password" && <i class="fas fa-eye-slash"></i>}
                                    </a></InputGroup.Text>
                                </InputGroup>

                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="titulo-campo">Confirmar Senha</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={typeInput2}
                                        placeholder="Confirmar Senha"
                                        value={confirmSenha}
                                        onChange={(e) => setConfirmSenha(e.target.value)}
                                        className="inputText"
                                    />
                                    <InputGroup.Text className="visibility" ><a onClick={() => { if (typeInput2 == "password") setTypeInput2("text"); else setTypeInput2("password"); }}>
                                        {typeInput2 == "password" && <i class="fas fa-eye"></i>}
                                        {typeInput2 != "password" && <i class="fas fa-eye-slash"></i>}
                                    </a></InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer id="footer-cadastro" className="modal-footer footer d-flex justify-content-between">
                    <label onClick={voltaLogin} for="" class="voltarLogin"><a href="#"><i class="fas fa-arrow-left"></i>Já possuo conta!</a></label>
                    <div />
                    <div>
                        <Button className="btn btn-primary button-save" variant="primary" onClick={cadastrar} type="submit" block>
                            Cadastrar
                        </Button>
                        <FechaCadastro
                            onClick={toggle}
                        >
                        </FechaCadastro>
                    </div>
                </Modal.Footer>
            </Form>
            {/*Forms  de Cadastro */}

        </>
    )
}

export default FormsCadastro;