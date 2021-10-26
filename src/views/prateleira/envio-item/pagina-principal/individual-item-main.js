import {Col, Card} from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export const IndividualItemPratMain = ({ individualItem, addToCart }) => {

    const handleAddToCart=()=>{
        addToCart(individualItem);
    }

    //Renderizar individualItem
    return (
        <Col xs={12} md={4} className="d-flex justify-content-center">
            <Card className="produtos part1" style={{ width: '16rem' }}  >
                <Card.Img className="artes-img" variant="top" src={individualItem.url} />
                <Card.Body className="d-flex justify-content-start part1-body">
                    <Card.Text className="descricao">
                        {individualItem.title}
                    </Card.Text>
                </Card.Body>
                <Card.Body className="d-flex justify-content-between part2-body">
                    <Card.Link className="valor-artes"> {"R$ "+individualItem.price} </Card.Link>
                    <Card.Link href="#" onClick={handleAddToCart}> <AiOutlineShoppingCart size={24} color="#68747b" /></Card.Link>
                </Card.Body>
            </Card>
        </Col>
    )
}