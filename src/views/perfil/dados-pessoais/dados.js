import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { fs, auth } from '../../../config/firebase.js'
import EditIcon from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';

const DadosPessoais = ({ show, handleClose }) => {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState();

    const [controller, setController] = useState(true);
    const [controllerName, setControlName] = useState(true);

    function userData(data) {
        setNome(data.nome);
        setEmail(data.email);
    }

    function control() {
        if (!controller || !controllerName) {
            return true;
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection("Users").doc(user.uid)
                    .onSnapshot((doc) => {
                        userData(doc.data());
                    });
            }
        })
    }, [])

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    function updateData(data, type) {
        if (type === "nome")
            fs.collection("Users").doc(auth.currentUser.uid).update({
                nome,
            }).then(() => {
                setController(true);
                setControlName(true);
                handleClose();
            });
        else
            fs.collection("Users").doc(auth.currentUser.uid).update({
                email,
            }).then(() => {
                setController(true);
                setControlName(true);
                handleClose();
            });
    }

    function redefinir() {
        if (!controllerName) {
            setErrorMsg('');
            setSuccessMsg("Nome atualizado com sucesso!");
            setTimeout(() => {
                setSuccessMsg('');
                updateData(nome, "nome");
            }, 2500)
        }
        if (!controller) {
            auth.currentUser.updateEmail(email).then(() => {
                setErrorMsg('');
                setSuccessMsg("E-mail atualizado com sucesso!");
                setTimeout(() => {
                    setSuccessMsg('');
                    updateData(email, "email");
                }, 2500)
            }).catch((error) => {
                if (error.message === "auth/requires-recent-login") {
                    setErrorMsg("Para realizar essa ação é necessário que você se autentique novamente!");
                } else if (error.message === "This operation is sensitive and requires recent authentication. Log in again before retrying this request.") {
                    setErrorMsg("Para realizar essa ação é necessário que você se autentique novamente!");
                }
            })
        }
    }

    function closeModal() {
        setController(true);
        setControlName(true);
        setErrorMsg("");
        handleClose();
    }

    return (

        <Modal backdrop="static" centered show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Dados Pessoais</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label className="titulo-campo">Nome</Form.Label>
                    <InputGroup>
                        <Form.Control
                            disabled={controllerName}
                            type="text"
                            placeholder="Nome Completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <InputGroup.Text className="visibility" ><a onClick={() => { if (controllerName) setControlName(false); else setControlName(true); }}>
                            {controllerName && <EditIcon />}
                            {!controllerName && <Close />}
                        </a></InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="titulo-campo">E-mail</Form.Label>
                    <InputGroup>
                        <Form.Control
                            disabled={controller}
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputGroup.Text className="visibility" ><a onClick={() => { if (controller) setController(false); else setController(true); }}>
                            {controller && <EditIcon />}
                            {!controller && <Close />}
                        </a></InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                {successMsg && <>
                    <div className='success-msg'>{successMsg}</div>
                </>}
                {errorMsg && <>
                    <div className='error-msg'>{errorMsg}</div>
                </>}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-end">
                {control() && (
                    <Button type="submit" className="btn btn-primary button-save" onClick={redefinir}>Atualizar</Button>
                )}
                <Button className="btn btn-secondary" onClick={closeModal}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DadosPessoais;