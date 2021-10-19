

const Mensagem = ({tipoErro,msgErro}) => {

    return(
        <div className="msg-login text-black text-center my-5">
                {tipoErro === 'sucesso' && <span><strong>WoW!</strong>Usuário cadastrado com sucesso! &#128526; </span>}
                {tipoErro === 'erro' && <span><strong>Ops!</strong> {msgErro} &#128546; </span>}
            </div>
    )

}

export default Mensagem;