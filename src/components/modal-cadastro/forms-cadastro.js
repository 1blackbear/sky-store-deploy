import { useState } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import Usuario from "./usuario";

const FormsCadastro = () => {

    const [nome, setNome] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const user = new Usuario;


    return (

        <>
            {/*Forms  de Cadastro */}
            <Form>
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
                            <Form.Control
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="titulo-campo">Confirmar Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirmar Senha"
                                value={confirmSenha}
                                onChange={(e) => setConfirmSenha(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="d-flex justify-content-between">
                    <div />
                    <Button className="btn btn-primary button-save" onClick={user.cadastrar(email, senha, confirmSenha)} variant="primary" type="submit" block>
                        Cadastrar
                    </Button>
                </div>

                <Usuario
                    cadastrar={user.cadastrar(email, senha, confirmSenha)}
                >
                </Usuario>
            </Form>
            {/*Forms  de Cadastro */}

        </>
    )
}

export default FormsCadastro;