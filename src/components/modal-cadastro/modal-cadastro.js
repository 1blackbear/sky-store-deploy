import { Modal } from 'react-bootstrap';
import FechaCadastro from "./botao-fechar";
import FormsCadastro from "./forms-cadastro";

const ModalCadastro = ({show, onHide, voltaLogin, toggle}) => {

    return (


        <div>
            {/*Modal de Cadastro */}
            <Modal
                show={show}
                onHide={onHide}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Cadastrar novo usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body id="modal-body">
                    <FormsCadastro>
                    </FormsCadastro>                
                </Modal.Body>
                <Modal.Footer className="modal-footer footer">
                <label onClick={voltaLogin} for="" class="voltarLogin"><a href="#"><i class="fas fa-arrow-left"></i>Já possuo conta!</a></label>
                    <FechaCadastro
                        onClick={toggle}
                    >
                    </FechaCadastro>
                </Modal.Footer>
            </Modal >
            {/*Modal  de Cadastro */}
        </div>
    )

}

export default ModalCadastro;