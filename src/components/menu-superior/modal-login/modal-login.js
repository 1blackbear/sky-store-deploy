import { Modal } from 'react-bootstrap';
import { useState } from "react";
import './modal-login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";




const ModalLogin = ({ show, onHide, onClick, showEsq }) => {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    function logar(e) {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, senha)
            .then((resultado) => {
                setEmail("");
                setSenha("");
                setErrorMsg('');
                setSuccessMsg('Logado com sucesso! Um momentinho para redirecionarmos você. ^.^');
                console.log(resultado);
                setTimeout(() => {
                    setSuccessMsg('');
                    setErrorMsg('');
                    onHide();
                }, 3000)
                //var user = userCredential.user;
            })
            .catch((error) => {
                switch (error.message) {
                    case 'Firebase: Error (auth/user-not-found).':
                        setErrorMsg('Ooops! E-mail não encontrado. Tente novamente! :(');
                        break;
                    case 'Firebase: Error (auth/invalid-email).':
                        setErrorMsg('Ooops! Formato de e-mail inválido. Tente novamente! :(');
                        break;
                    case 'Firebase: Error (auth/internal-error).':
                        setErrorMsg('Ooops! Campo de senha vazio. Tente novamente! :(');
                        break;
                    case 'Firebase: Error (auth/wrong-password).':
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
                                <input onChange={(e) => setSenha(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" />
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
                                class="btn btn-primary button-save">Entrar com Google</button></a>
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