import { useRef, useState } from "react";
import { Form, Button, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { auth, fs } from '../../config/firebase.js';
import './index.css';
import FechaCadastro from "./botao-fechar";


const FormsCadastro = ({ voltaLogin, toggle }) => {

    const [nome, setNome] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const [typeInput, setTypeInput] = useState("password");
    const [typeInput2, setTypeInput2] = useState("password");

    const [msgTipo, setMsgTipo] = useState("");
    const [msg, setMsg] = useState("");

    function cadastrar() {
        if (!email || !senha) {
            setMsgTipo('erro')
            setMsg('Você precisa informar o email e senha para fazer o cadastro!')
            return;
        }
        if (senha != confirmSenha) {
            setMsgTipo('erro')
            setMsg('As senhas informadas são diferentes!')
            return;
        }
        auth.createUserWithEmailAndPassword(email, senha)
            .then((resultado) => {
                let urlImg = "https://firebasestorage.googleapis.com/v0/b/sky-loja.appspot.com/o/default-image.jpg?alt=media&token=1f5a3516-a00f-4edc-a0ac-743ff0e60814";
                fs.collection('Users').doc(resultado.user.uid).set({
                    url: urlImg,
                    nome: nome,
                    email: email,
                })
                setMsgTipo('sucesso')
                if(resultado.user.uid) {
                    setTimeout(() => {
                        toggle();
                    }, 1500)
                }
            })
            .catch((erro) => {
                setMsgTipo('erro')
                switch (erro.message) {
                    case 'Password should be at least 6 characters':
                        setMsg('A senha deve ter pelo menos 6 caracteres!');
                        break;
                    case 'The email address is already in use by another account.':
                        setMsg('Este email já está sendo utilizado por outro usuário!');
                        break;
                    case 'The email address is badly formatted.':
                        setMsg('O formato do seu email é inválido!');
                        break;
                    default:
                        setMsg('Não foi possível cadastrar. Tente novamente mais tarde!');
                        break;
                }
            });


    }
    const ref = useRef();
    return (

        <>
            {/*Forms  de Cadastro */}
            <Form onSubmit={cadastrar}>
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
                    <Row className="msg-cad-row">
                        {msgTipo === 'sucesso' && <span><strong>WoW!</strong>Usuário cadastrado com sucesso! &#128526; </span>}
                        {msgTipo === 'erro' && <span><strong>Ops!</strong> {msg} &#128546; </span>}
                    </Row>
                </Modal.Body>
                <Modal.Footer id="footer-cadastro" className="modal-footer footer d-flex justify-content-between">
                    <label onClick={voltaLogin} for="" class="voltarLogin"><a href="#"><i class="fas fa-arrow-left"></i>Já possuo conta!</a></label>
                    <div />
                    <div>
                        <Button className="btn btn-primary button-save" variant="primary" type="submit" block>
                            Cadastrar
                        </Button>
                        <FechaCadastro ref={ref}
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