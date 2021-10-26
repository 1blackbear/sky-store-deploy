import ModalEnc from './modal-list/modal-enc.js';
import ModalIlustra from './modal-list/modal-ilustracao/modal-ilustra.js';
import ModalDigital from './modal-list/modal-arte-digital/modal-arte-digital.js';
import React, { useState } from 'react';
import Buttons from '../../../components/botao/buttons';
import { Row } from "react-bootstrap";

const ModalList = () => {
    /*Funções para abrir e fechar o Modal de encomenda */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    /*Funções para abrir e fechar o Modal de ilustra */
    const [showIlustra1, setShowIlustra1] = useState(false);
    const handleCloseIlustra1 = () => setShowIlustra1(false);
    const handleShowIlustra1 = () => {
        setShow(false);
        setShowIlustra1(true);
    }


     /*Funções para abrir e fechar o Modal de arte digital */
     const [showDigital, setShowDigital] = useState(false);
     const handleCloseDigital = () => setShowDigital(false);
     const handleShowDigital = () => {
         setShow(false);
         setShowDigital(true);
     }
    return (<>
        <Row>
            <div className="botao-encomende d-flex justify-content-end">
                <Buttons text="ENCOMENDE COM A SKY!" name="buttonBlue" linkBtn="link-btn" onClick={handleShow} />
            </div>
        </Row>
        <ModalEnc onHide={handleClose} show={show} showIlustra={handleShowIlustra1} showDigital={handleShowDigital}/>
        <ModalIlustra onHide={handleCloseIlustra1} show={showIlustra1} />
        <ModalDigital onHide={handleCloseDigital} show={showDigital} />
    </>
    )
}

export default ModalList;