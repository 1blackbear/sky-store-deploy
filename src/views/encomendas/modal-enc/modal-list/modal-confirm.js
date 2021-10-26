import { Modal } from 'react-bootstrap';
import './styles/modal.css';
import { motion } from "framer-motion";


const ModalConfirm = ({ onHide, show }) => {
    const variants = {
        hidden: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 },
    }
    return (<>
        <Modal
            onHide={onHide}
            show={show}
            dialogClassName="modal-100w"
            backdrop="static"
        >
            <Modal.Body id="modal-confirm">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
                <motion.div variants={variants} // Pass the variant object into Framer Motion 
                    initial="hidden" // Set the initial state to variants.hidden
                    animate="enter" // Animated state to variants.enter
                    exit="exit" // Exit state (used later) to variants.exit
                    transition={{ type: "spring", stiffness: 30 }}>
                    <h1>TUDO CERTO!</h1>
                    <h1>EM BREVE ENTRAREI EM CONTATO</h1>
                </motion.div>
            </Modal.Body>
        </Modal>
    </>)
}

export default ModalConfirm;