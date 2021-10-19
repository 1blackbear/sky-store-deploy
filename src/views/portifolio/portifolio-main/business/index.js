import { Container, Row, Col } from 'react-bootstrap';
import '../styles/portifolio.css';
import '../styles/images-portifolio.css';
import { useState, useEffect } from 'react';
import { fs } from '../../../../config/firebase.js'
import { PortifolioItemMain } from './portifolio-main-item.js';
import { motion } from "framer-motion";

const Portifolio = () => {

    //Vetores de itens da Coluna 1 e Coluna 2
    const [itemsCol1, setitemsCol1] = useState([]);
    const [itemsCol2, setitemsCol2] = useState([]);

    //Atualização dinâmicas de itens da coluna com base em lista do firebase
    useEffect(() => {
        //Busca a snapshot da coleção 'Portifolio-item'
        fs.collection('Portifolio-item').onSnapshot(snapshot => {
            const newItem = // Variável com vetor de itens do map seguinte:
                snapshot.docs.map((doc) => ({  //Faz um map na lista de documentos da seleção
                    ID: doc.id,
                    ...doc.data(),
                }));
            newItem.map((individualItem) => { //Faz um map no vetor de itens do newItem
                if (individualItem.checkCol === 'col1') { //Verifica qual coluna pertence o item
                    setitemsCol1((prevState) => [...prevState, individualItem]);
                } else {
                    setitemsCol2((prevState) => [...prevState, individualItem]);
                }
            })
        })
    }, [])

    const variants = {
        hidden: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 },
    }

    return (
        <Container fluid>
            <Row className="first-section-detail">
            <Col className="first-col-detail">
                <motion.div variants={variants} // Pass the variant object into Framer Motion 
                    initial="hidden" // Set the initial state to variants.hidden
                    animate="enter" // Animated state to variants.enter
                    exit="exit" // Exit state (used later) to variants.exit
                    transition={{ type: "spring", stiffness: 150 }}>
                        <h1>Portifolio</h1>
                </motion.div>
                </Col>
            </Row>
            <Row id="linha-fotos"> {/*Linha de referência para a commentSection*/}
                <Col className="coluna">
                    {/*O vetor de itens da coluna 1 é maior que 0? Se sim, renderiza os itens presente nele*/}
                    {itemsCol1.length > 0 && (
                        <PortifolioItemMain items={itemsCol1} />
                    )}
                    {itemsCol1.length < 1 && (
                        <div className='container-fluid'>Por favor, espere....</div>
                    )}
                </Col>
                <Col className="coluna">
                    {/*O vetor de itens da coluna 2 é maior que 0? Se sim, renderiza os itens presente nele*/}
                    {itemsCol2.length > 0 && (
                        <PortifolioItemMain items={itemsCol2} />
                    )}
                    {itemsCol2.length < 1 && (
                        <div className='container-fluid'>Por favor, espere....</div>
                    )}
                </Col>
            </Row>
        </Container>
    )

}

export default Portifolio;