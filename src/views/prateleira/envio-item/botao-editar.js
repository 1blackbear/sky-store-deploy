import { Button, Col } from 'react-bootstrap';

const AbreEditar = ({ onClick }) => {
    return (
        <>
            <Button className="btn-update"
                onClick={onClick}>
                Editar
            </Button>
        </>
    )
}

export default AbreEditar;


