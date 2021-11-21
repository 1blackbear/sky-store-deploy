import React from "react";
import {auth, fs} from '../../config/firebase.js'

class Usuario extends React.Component {
    constructor() {
        super();

        this.state = {
            nome: "",
            email: "",
            senha: "",
            confirmSenha: "",
            msgTipo: "",
            msg: ""
        };
    }

    cadastrar(email, senha, confirmSenha, nome) {

        if (!email || !senha) {
            this.setState({ msgTipo: 'erro' })
            this.setState({ msg: 'Você precisa informar o email e senha para fazer o cadastro!' })
            return;
        }
        if (senha != confirmSenha) {
            this.setState({ msgTipo: 'erro' })
            this.setState({ msg: 'As senhas informadas são diferentes!' })
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
                this.setState({ msgTipo: 'sucesso' })
            })
            .catch((erro) => {
                this.setState({ msgTipo: 'erro' })
                switch (erro.message) {
                    case 'Password should be at least 6 characters':
                        this.setState({ msg: 'A senha deve ter pelo menos 6 caracteres!' });
                        break;
                    case 'The email address is already in use by another account.':
                        this.setState({ msg: 'Este email já está sendo utilizado por outro usuário!' });
                        break;
                    case 'The email address is badly formatted.':
                        this.setState({ msg: 'O formato do seu email é inválido!' });
                        break;
                    default:
                        this.setState({ msg: 'Não foi possível cadastrar. Tente novamente mais tarde!' });
                        break;
                }
            });
    }

    

    render() {
        return (
            <div className="msg-login text-black text-center my-5">
                {this.msg === 'sucesso' && <span><strong>WoW!</strong>Usuário cadastrado com sucesso! &#128526; </span>}
                {this.msgTipo === 'erro' && <span><strong>Ops!</strong> {this.msg} &#128546; </span>}
            </div>
        )
    }


}

export default Usuario;