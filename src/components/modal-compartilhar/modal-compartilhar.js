import './modal-compartilhar.css';
import { Modal } from 'react-bootstrap';

const ModalComp = ({ show, onHide }) => {
    return (
        <div id="share">
            {/*Modal  de Compartilhar */}
            <Modal  centered show={show} onHide={onHide} id="modal-compartilhar">
                <Modal.Body>
                    <div class="modal-body">
                        <form id="share-form">
                            <div className="redes-sociais">
                                <ul>
                                    <a href="http://www.facebook.com/sharer/sharer.php?u=https://www.skai-store.com.br/" target="_blank"><i className="fab fa-facebook-f"></i></a>
                                    <a href="http://www.twitter.com/intent/tweet?url=https://www.skai-store.com.br/" target="_blank"><i className="fab fa-twitter"></i></a>
                                    <a href="https://www.instagram.com/?url=https://www.skai-store.com.br/" target="_blank"><i className="fab fa-instagram"></i></a>
                                    <a href="http://api.whatsapp.com/send?text=https://www.skai-store.com.br/" target="_blank"><i className="fab fa-whatsapp"></i></a>
                                    <a href="http://telegram.me/share/url?url=https://www.skai-store.com.br/" target="_blank"><i className="fab fa-telegram-plane"></i></a>
                                </ul>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
            {/*Modal  de Compartilhamento */}
        </div>

    )
}

export default ModalComp;