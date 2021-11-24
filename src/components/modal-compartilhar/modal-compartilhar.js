import './modal-compartilhar.css';
import { Modal } from 'react-bootstrap';

const ModalComp = ({ show, onHide }) => {
    const mensagem = "E aí gente! Venham aqui conhecer o site da sky, tenho certeza que irão gostar!! ";
    const link = "https://tsky-store.herokuapp.com/";
    return (
        <div id="share">
            {/*Modal  de Compartilhar */}
            <Modal  centered show={show} onHide={onHide} id="modal-compartilhar">
                <Modal.Header className="justify-content-center"><Modal.Title >Compartilhe o site!</Modal.Title></Modal.Header>
                <Modal.Body>
                    <div class="modal-body">
                        <form id="share-form">
                            <div className="redes-sociais">
                                <ul>
                                    <a href={"http://www.facebook.com/sharer/sharer.php?u=" + link} target="_blank"><i className="fab fa-facebook-f"></i></a>
                                    <a href={"http://www.twitter.com/intent/tweet?url="+ mensagem + link} target="_blank"><i className="fab fa-twitter"></i></a>
                                    <a href={"https://www.instagram.com/?url="+ mensagem + link} target="_blank"><i className="fab fa-instagram"></i></a>
                                    <a href={"http://api.whatsapp.com/send?text=" + mensagem + link} target="_blank"><i className="fab fa-whatsapp"></i></a>
                                    <a href={"http://telegram.me/share/url?url=" + mensagem + link} target="_blank"><i className="fab fa-telegram-plane"></i></a>
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