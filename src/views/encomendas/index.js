import { Container, Row, Col } from "react-bootstrap"
import imgUrl from '../../images/passos.png';
import PlayArrow from '@material-ui/icons/PlayArrowRounded';
import './index.css';
import { motion } from "framer-motion";
import ModalList from './modal-enc/modal-list.js';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
                <Row className="row-tutorial ">
                    <LazyLoadImage
                        className="col-12 step-photo col-sm-6"
                        effect="blur"
                        height="300px"
                        src={imgUrl} />
                </Row>
                <div className="desc-tutorial">
                    <Row className="row-tutorial d-flex">
                        <Col id="desc-etapas"><PlayArrow className="playIcondesc" /><div id="title-desc-tutorial">Descrição das etapas</div></Col>
                    </Row>
                    <Row className="row-desc-tutorial">
                        <Col>
                            <Col className="d-flex text-tutorial">
                                <p>1.</p>
                                <p>Ao clicar no botão abaixo você terá a possibilidade de escolher qual o tipo de arte que
                                    você deseja (arte digital ou ilustração digital).</p>
                            </Col>
                            <Col className="d-flex text-tutorial">
                                <p>2.</p>
                                <p>Na segunda etapa, você deverá escolher o que deseja que a sky produza pra você, caso nenhuma das opções se encaixe
                                    no seu desejo, basta clicar em "outros"!
                                </p>
                            </Col>
                            <Col className="d-flex text-tutorial">
                                <p>3.</p>
                                <p>Nesta etapa você irá preencher um pequeno formulário informando os detalhes da arte desejada,
                                     e lembre-se: quanto mais detalhes você fornecer à sky, mais incrível a arte ficará!</p>
                            </Col>
                            <Col className="d-flex text-tutorial">
                                <p>4.</p>
                                <p>Tudo certo, agora é só esperar a sky entrar em contato pelo número informado na etapa anterior e observar o status da sua encomenda em seu perfil!</p>
                            </Col>
                        </Col>
                    </Row>
                    <ModalList />
                </div>

            </Container>
        </motion.div>
    )
}