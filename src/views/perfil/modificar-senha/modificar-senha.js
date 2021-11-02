import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import React, { useState } from "react";
import { auth } from '../../../config/firebase.js'
import { useHistory } from 'react-router-dom';


const ModificarSenha = ({ show, handleClose }) => {
    //Rotas para a página
    const history = useHistory();

    const [confirmSenha, setConfirmSenha] = useState("");
    const [senha, setSenha] = useState();

    const [typeInput, setTypeInput] = useState("password");
    const [typeInput2, setTypeInput2] = useState("password");

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    function updatePass() {
        if (senha === confirmSenha) {
            auth.currentUser.updatePassword(senha).then(() => {
                setErrorMsg('');
                setSuccessMsg("Senha atualizada com sucesso!");
                setTimeout(() => {
                    setSuccessMsg('');
                    handleClose();
                    auth.signOut();
                    history.push('/');
                    window.location.reload();
                }, 2500)
            }).catch((error) => {
                if (error.message === "auth/requires-recent-login") {
                    setErrorMsg("Para realizar essa ação é necessário que você se autentique novamente!");
                } else if (error.message === "This operation is sensitive and requires recent authentication. Log in again before retrying this request.") {
                    setErrorMsg("Para realizar essa ação é necessário que você se autentique novamente!");
                }
            })
        } else {
            setSuccessMsg('');
            setErrorMsg("Senhas digitadas não coincidem. Por favor digite novamente!");
        }
    }

    function closeModal() {
        setSuccessMsg("");
        setErrorMsg("");
        setConfirmSenha("");
        setSenha("")
        handleClose();
    }

    return (

        <Modal backdrop="static" centered show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Alterar senha</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="titulo-campo">Nova Senha</Form.Label>
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
                    {successMsg && <>
                        <div className='success-msg'>{successMsg}</div>
                    </>}
                    {errorMsg && <>
                        <div className='error-msg'>{errorMsg}</div>
                    </>}
                </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-end">
                <Button type="submit" className="btn btn-primary button-save" onClick={updatePass}>Alterar senha</Button>
                <Button className="btn btn-secondary" onClick={closeModal}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModificarSenha;