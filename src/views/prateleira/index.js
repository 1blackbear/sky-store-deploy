import './prateleira.css';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import arte1 from '../../images/prateleira/arte1.jpg';
import arte2 from '../../images/prateleira/arte2.jpg';
import arte3 from '../../images/prateleira/arte3.jpg'
import arte4 from '../../images/prateleira/arte4.jpg'
import arte5 from '../../images/prateleira/arte5.jpg'
import arte6 from '../../images/prateleira/arte6.jpg'
import arte7 from '../../images/prateleira/arte7.png'


function Prateleira() {

    return (
        <Container className="card-part">
            <Row >
                <Col xs={12} md={4}>
                    <Card className="produtos part1" style={{ width: '16rem' }}>
                        <Card.Img className="artes-img" variant="top" src={arte1} />
                        <Card.Body className="d-flex justify-content-start part1-body">
                            <Card.Text className="descricao">
                                Arte digital de tatuagem 1
                            </Card.Text>
                        </Card.Body>
                        <Card.Body className="d-flex justify-content-between part2-body">
                            <Card.Link className="valor-artes"> R$100,00 </Card.Link>
                            <Card.Link href="#"> <AiOutlineShoppingCart size={24} color="#68747b" /></Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className="produtos part1" style={{ width: '16rem' }}>
                        <Card.Img className="artes-img" variant="top" src={arte2} />
                        <Card.Body className="d-flex justify-content-start part1-body">
                            <Card.Text className="descricao">
                                Arte digital de tatuagem 2
                            </Card.Text>
                        </Card.Body>
                        <Card.Body className="d-flex justify-content-between part2-body">
                            <Card.Link className="valor-artes"> R$100,00 </Card.Link>
                            <Card.Link href="#"> <AiOutlineShoppingCart size={24} color="#68747b" /></Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className="produtos part1" style={{ width: '16rem' }}>
                        <Card.Img className="artes-img" variant="top" src={arte3} />
                        <Card.Body className="d-flex justify-content-start part1-body">
                            <Card.Text className="descricao">
                                Arte digital de tatuagem 3
                            </Card.Text>
                        </Card.Body>
                        <Card.Body className="d-flex justify-content-between part2-body">
                            <Card.Link className="valor-artes"> R$100,00 </Card.Link>
                            <Card.Link href="#"> <AiOutlineShoppingCart size={24} color="#68747b" /></Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className="produtos part1" style={{ width: '16rem' }}>
                        <Card.Img className="artes-img" variant="top" src={arte4} />
                        <Card.Body className="d-flex justify-content-start part1-body">
                            <Card.Text className="descricao">
                                Arte digital de tatuagem 4
                            </Card.Text>
                        </Card.Body>
                        <Card.Body className="d-flex justify-content-between part2-body">
                            <Card.Link className="valor-artes"> R$100,00 </Card.Link>
                            <Card.Link href="#"> <AiOutlineShoppingCart size={24} color="#68747b" /></Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className="produtos part1" style={{ width: '16rem' }}>
                        <Card.Img className="artes-img" variant="top" src={arte5} />
                        <Card.Body className="d-flex justify-content-start part1-body">
                            <Card.Text className="descricao">
                                Arte digital de tatuagem 5
                            </Card.Text>
                        </Card.Body>
                        <Card.Body className="d-flex justify-content-between part2-body">
                            <Card.Link className="valor-artes"> R$100,00 </Card.Link>
                            <Card.Link href="#"> <AiOutlineShoppingCart size={24} color="#68747b" /></Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className="produtos part1" style={{ width: '16rem' }}>
                        <Card.Img className="artes-img" variant="top" src={arte6} />
                        <Card.Body className="d-flex justify-content-start part1-body">
                            <Card.Text className="descricao">
                                Arte digital de tatuagem 6
                            </Card.Text>
                        </Card.Body>
                        <Card.Body className="d-flex justify-content-between part2-body">
                            <Card.Link className="valor-artes"> R$100,00 </Card.Link>
                            <Card.Link href="#"> <AiOutlineShoppingCart size={24} color="#68747b" /></Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4}>
                    <Card className="produtos part1" style={{ width: '16rem' }}>
                        <Card.Img className="artes-img" variant="top" src={arte7} />
                        <Card.Body className="d-flex justify-content-start part1-body">
                            <Card.Text className="descricao">
                                Arte digital de tatuagem 7
                            </Card.Text>
                        </Card.Body>
                        <Card.Body className="d-flex justify-content-between part2-body">
                            <Card.Link className="valor-artes"> R$100,00 </Card.Link>
                            <Card.Link href="#"> <AiOutlineShoppingCart size={24} color="#68747b" /></Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>


    )
}

export default Prateleira;
