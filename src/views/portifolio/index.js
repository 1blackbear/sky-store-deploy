import { Container, Row, Col } from 'react-bootstrap';
import './portifolio.css';
import './arrow.scss';
import olhosAzuis from '../../images/portifolio-inicial/foto.jpg'
import louis from '../../images/portifolio-inicial/6.png'
import jornal from '../../images/portifolio-inicial/15.jpg'
import { Link } from "react-router-dom";
import React, { Component, useRef } from 'react';

const Portifolio = () => {
    const commentSection = useRef(null);
    const componentDidMount = () => 
            commentSection.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
        });

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
                <Row ref={commentSection} id="linha-fotos">
                    <Col className="coluna">
                        <Link to="/"> <img src={olhosAzuis} className="fotos col-image" /></Link>
                        <Link to="/"> <img src={jornal} className="fotos col-image" /></Link>
                    </Col>
                    <Col className="coluna"><Link to="/"><img src={louis} className="fotos col2-image" /></Link></Col>
                </Row>
            </Container>
        )
    
}

export default Portifolio;