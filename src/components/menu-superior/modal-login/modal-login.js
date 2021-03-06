import { Modal, InputGroup } from 'react-bootstrap';
import { useState } from "react";
import './modal-login.css';
import { auth, fs } from '../../../config/firebase.js';
import { googleProvider } from '../../../config/auth-methods';
import googleAuth from '../../../service/auth';
import firebase from "firebase";

const ModalLogin = ({ show, onHide, onClick, showEsq }) => {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const [typeInput, setTypeInput] = useState("password");

    const user = firebase.auth().currentUser;

    const handleOnClick = async (provider) => {
        const res = await googleAuth(provider);
        setEmail("");
        setSenha("");
        setErrorMsg('');
        setSuccessMsg('Logado com sucesso! Um momentinho para redirecionarmos você. ^.^');
        setTimeout(() => {
            setSuccessMsg('');
            setErrorMsg('');
            onHide();
        }, 3000)
        console.log(res);
    };

    function logar(e) {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, senha)
            .then(() => {
                setEmail("");
                setSenha("");
                setErrorMsg('');
                setSuccessMsg('Logado com sucesso! Um momentinho para redirecionarmos você. ^.^');
                setTimeout(() => {
                    setSuccessMsg('');
                    setErrorMsg('');
                    onHide();
                }, 3000)
                //var user = userCredential.user;
            })
            .catch((error) => {
                switch (error.message) {
                    case 'There is no user record corresponding to this identifier. The user may have been deleted.':
                        setErrorMsg('Ooops! E-mail não encontrado. Tente novamente! :(');
                        break;
                    case 'The email address is badly formatted.':
                        setErrorMsg('Ooops! Formato de e-mail inválido. Tente novamente! :(');
                        break;
                    case 'Firebase: Error (auth/internal-error).':
                        setErrorMsg('Ooops! Campo de senha vazio. Tente novamente! :(');
                        break;
                    case 'The password is invalid or the user does not have a password.':
                        setErrorMsg('Ooops! Senha incorreta. Tente novamente! :(');
                        break;
                    default:
                        setErrorMsg(error.message);
                }
                //alert(error)
                // var errorCode = error.code;
                // var errorMessage = error.message;
            });

    }

    return (

        <div id="new_login">
            {/*Modal  de Login */}
            <Modal
                backdrop="static"
                centered show={show}
                onHide={onHide}
            >
                <Modal.Header>
                    <Modal.Title>Fazer login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="modal-body">
                        <form id="login-form">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <small id="emailHelp" class="form-text text-muted">Nós nunca compartilharemos seu email com
                                    ninguém.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Senha</label>
                                <InputGroup>
                                    <input onChange={(e) => setSenha(e.target.value)} type={typeInput} className="form-control inputText" id="exampleInputPassword1" />
                                    <InputGroup.Text className="visibility" ><a onClick={() => { if (typeInput == "password") setTypeInput("text"); else setTypeInput("password"); }}>
                                        {typeInput == "password" && <i class="fas fa-eye"></i>}
                                        {typeInput != "password" && <i class="fas fa-eye-slash"></i>}
                                    </a></InputGroup.Text>
                                </InputGroup>
                            </div>
                            {successMsg && <>
                                <div className='success-msg'>{successMsg}</div>
                            </>}
                            {errorMsg && <>
                                <div className='error-msg'>{errorMsg}</div>
                            </>}
                            <div class="form-group form-check">
                                <div class="esqueci-part">
                                    <label onClick={showEsq} class="esqueci" for="" ><a href="#">Esqueci minha senha</a></label>
                                </div><div class="botao-part">
                                    <button type="submit" className="btn btn-primary button-save" onClick={logar}>Entrar</button>
                                    <button className="btn btn-secondary" onClick={onHide}>Fechar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <div class="login-google">
                            <a href="#"><button type="button"
                                class="btn btn-primary button-save" onClick={() => handleOnClick(googleProvider)}>Entrar com Google</button></a>
                        </div>
                        <label onClick={onClick} for="" class="cadastro"><a href="#"><i class="fas fa-sign-in-alt"></i>Cadastrar
                            minha
                            conta</a></label>
                    </div>
                </Modal.Body>
            </Modal>
            {/*Modal  de Login */}
        </div>


    )
}

export default ModalLogin;