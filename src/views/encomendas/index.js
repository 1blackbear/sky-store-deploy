import { Container, Row, Col } from "react-bootstrap"
import imgUrl from '../../images/Tutorial.svg';
import PlayArrow from '@material-ui/icons/PlayArrowRounded';
import './index.css';
import { motion } from "framer-motion";
import ModalList from './modal-enc/modal-list.js';



export const Encomendas = () => {

    const variants = {
        hidden: { opacity: 0, x: -400, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -100 },
    }

    return (
        <motion.div variants={variants} // Pass the variant object into Framer Motion 
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit" // Exit state (used later) to variants.exit
            transition={{ type: "linear", stiffness: 150 }}>
            <Container>
                <Row className="row-tutorial">
                    <h1 id="title-tutorial">Como eu faço uma encomenda?</h1>
                </Row>
                <Row className="row-tutorial">
                    <img id="encomendas-tutorial" src={imgUrl} />
                </Row>
                <div className="desc-tutorial">
                    <Row className="row-tutorial">
                        <h1 id="title-desc-tutorial"><PlayArrow className="playIcon" />Descrição das etapas</h1>
                    </Row>
                    <Row className="row-desc-tutorial">
                        <Col>
                            <Col className="d-flex text-tutorial">
                                <p>1.</p>
                                <p>Ao clicar no botão abaixo você terá a possibilidade de escolher qual o tipo de arte que
                                    você deseja (arte digital ou ilustração) e após isso poderá escolher a categoria em que
                                    ela melhor se encaixa.</p>
                            </Col>
                            <Col className="d-flex text-tutorial">
                                <p>2.</p>
                                <p>Personalize sua arte do jeito que você imagina, ajudando a Skai ter uma visão melhor do
                                    que você almeja.</p>
                            </Col>
                            <Col className="d-flex text-tutorial">
                                <p>3.</p>
                                <p>A Sky entrará em contato com você para se alinharem e decidirem os melhores pontos
                                    do seu desenho. </p>
                            </Col>
                            <Col className="d-flex text-tutorial">
                                <p>4.</p>
                                <p>Tudo certo, agora a imagem é sua! Pode usar e abusar dela.</p>
                            </Col>
                        </Col>
                    </Row>
                    <ModalList/>
                </div>

            </Container>
        </motion.div>
    )
}