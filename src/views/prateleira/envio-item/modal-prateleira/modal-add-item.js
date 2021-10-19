import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import FormsPrateleira from './forms-prateleira';
import { fs, auth, storage } from '../../../../config/firebase';


const ModalPrateleira = ({ show, onHide, items }) => {

    return (

        /*Modal Prateleira */
        < div >
            <Modal
                show={show}
                centered
                onHide={onHide}
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Adicionar item prateleira</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormsPrateleira onHide={onHide} items={items} />
                </Modal.Body>


            </Modal>

        </div >

        /*Modal  de Cadastro */

    )
}

export default ModalPrateleira;