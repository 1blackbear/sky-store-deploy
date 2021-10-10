import { Modal } from 'react-bootstrap';
import React, { useState } from "react";
import '../modal-login.css';
import {auth} from '../../../../config/firebase.js'


const ModalEsqueciSenha = ({ showEsq, handleCloseLogin, handleCloseEsq, voltaLogin }) => {

    /*Atributos do esqueci minha senha */
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState();

    function redefinir() {

        if (error !== '') setError('');

        setSending(true);

        auth.sendPasswordResetEmail(auth, email)
            .then(() => {
                setSent('Email enviado');
                setSending(false);
            })
            .catch(error => {
                alert("Email não encontrado")
                setSending(false);
            });
    }

    return (
        <div id="login-esqueci">
            <Modal backdrop="static" centered show={showEsq} onHide={handleCloseLogin}>
                <Modal.Header>
                    <Modal.Title>Esqueci minha senha</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="modal-body">
                        {sent ?
                            <React.Fragment>
                                <p>Um link foi enviado para o seu email com as instruções.</p>
                                <button className="btn btn-primary button-save" onClick={handleCloseLogin}>Voltar para o login</button>
                            </React.Fragment>
                            :
                            <>
                                {/*Forms de esqueci minha senha */}
                                <form id="esqueci-form">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Email</label>
                                        <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div class="form-group d-flex justify-content-between align-items-center">
                                        <label onClick={voltaLogin} for="" class="voltarLogin"><a href="#"><i class="fas fa-arrow-left"></i>Voltar ao login</a></label>
                                        <div>
                                            <button type="submit" className="btn btn-primary button-save" onClick={redefinir}>Refefinir senha</button>
                                            <button className="btn btn-secondary" onClick={handleCloseEsq}>Fechar</button>
                                        </div>

                                    </div>
                                </form>
                                {/*Forms de esqueci minha senha */}
                            </>
                        }
                    </div>
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default ModalEsqueciSenha;