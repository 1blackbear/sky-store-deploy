import { Col, Card, OverlayTrigger, Tooltip, Row, Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useState } from 'react';
import { auth } from "../../../../config/firebase";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export const IndividualItemPratMain = ({ individualItem, addToCart }) => {

    const [show, setShow] = useState(false);

    const handleAddToCart = () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                addToCart(individualItem);
            } else {
                setShow(true);
            }
        })
    }


    //Renderizar individualItem
    return (
        <Col xs={12} md={4} className="d-flex justify-content-center">
            <Row className="produtos part1" style={{ width: '16rem' }}  >
                <Col xs={12}>
                    <LazyLoadImage
                        className="artes-img"
                        effect="opacity"
                        width="100%"
                        src={individualItem.url} />
                </Col>
                <Col>
                    <Col xs={12}>
                        <Card.Text className="produt-title">
                            {individualItem.title}
                        </Card.Text>
                    </Col>
                    <Col className="d-flex justify-content-between produt-desc">
                        <Card.Link className="valor-artes"> {"R$ " + individualItem.price} </Card.Link>


                        <OverlayTrigger
                            key={"top"}
                            placement={"top"}
                            overlay={show ?
                                <Tooltip>
                                    Você precisa estar logado antes: /
                                </Tooltip>
                                :
                                <a></a>
                            }
                        >
                            <Card.Link id="shopping-icon" onClick={handleAddToCart}> <AiOutlineShoppingCart color="#68747b" /></Card.Link>
                        </OverlayTrigger>

                    </Col>
                </Col>
            </Row >
        </Col >
    )
}