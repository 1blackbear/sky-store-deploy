import { Container, Row, Col } from 'react-bootstrap';
import '../styles/portifolio.css';
import '../styles/arrow.scss';
import '../styles/images-portifolio.css';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { fs} from '../../../../config/firebase.js'
import { PortifolioItemMain } from './portifolio-main-item.js';

const Portifolio = () => {
    //Seta para a seção de itens do portifólio
    const commentSection = useRef(null); //referência para seção
    const componentDidMount = () =>
        // scroll para a referência da commentSection  
        commentSection.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    
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


    return (
        <Container fluid>
            <Row className="first-part">
                <Col className="first-section">
                    <h3>aqui estão alguns trabalhos feitos por mim<br></br> e um pouco mais sobre mim</h3>
                    <a onClick={componentDidMount} id="button"><div class="ico animated">
                        <div class="circle circle-top"></div>
                        <div class="circle circle-main"></div>
                        <div class="circle circle-bottom"></div>
                        <svg class="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 612 612" xmlSpace="preserve" >
                            <defs>
                                <clipPath id="cut-off-arrow">
                                    <circle cx="306" cy="306" r="287" />
                                </clipPath>

                                <filter id="goo">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                                    <feBlend in="SourceGraphic" in2="goo" />
                                </filter>

                            </defs>
                            <path class="st-arrow" d="M317.5,487.6c0.3-0.3,0.4-0.7,0.7-1.1l112.6-112.6c6.3-6.3,6.3-16.5,0-22.7c-6.3-6.3-16.5-6.3-22.7,0
					l-86,86V136.1c0-8.9-7.3-16.2-16.2-16.2c-8.9,0-16.2,7.3-16.2,16.2v301.1l-86-86c-6.3-6.3-16.5-6.3-22.7,0
					c-6.3,6.3-6.3,16.5,0,22.7l112.7,112.7c0.3,0.3,0.4,0.7,0.7,1c0.5,0.5,1.2,0.5,1.7,0.9c1.7,1.4,3.6,2.3,5.6,2.9
					c0.8,0.2,1.5,0.4,2.3,0.4C308.8,492.6,313.8,491.3,317.5,487.6z"/>
                        </svg>
                    </div></a>
                </Col>
            </Row>
            <Row ref={commentSection} id="linha-fotos"> {/*Linha de referência para a commentSection*/}
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