import { useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap';

const FechaCadastro = ({ onClick }) => {
    return (
        <>
            <Button variant="secondary" onClick={onClick}>
                Fechar
            </Button>
        </>
    )
}

export default FechaCadastro;