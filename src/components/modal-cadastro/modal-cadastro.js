import { Modal, Button } from 'react-bootstrap';

import FormsCadastro from "./forms-cadastro";
import Usuario from "./usuario";

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
                    <FormsCadastro voltaLogin={voltaLogin} toggle={toggle}>
                    </FormsCadastro>                
                </Modal.Body>
                
            </Modal >
            {/*Modal  de Cadastro */}
        </div>
    )

}

export default ModalCadastro;