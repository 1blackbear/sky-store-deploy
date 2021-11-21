import { Container, Row, Col } from 'react-bootstrap';
import React from 'react'
import './details.css';
import { useState, useEffect } from 'react';
import { fs } from '../../../../../config/firebase.js'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const SecDetailPage = () => {
    const [item, setItem] = useState(null);

    useEffect(() => {
        let str = window.location.href.toString();
        str = str.slice(str.length - 20);
        fs.collection('Portifolio-item').onSnapshot(snapshot => {
            const newItem = snapshot.docs.map((doc) => ({
                ID: doc.id,
                ...doc.data(),
            }));
            newItem.map((individualItem) => {
                if (individualItem.ID === str) {
                    setItem(individualItem);
                }
            })
        })
    }, [])

    return (
        <Container fluid>
            <Row className="first-section-detail">
                <Col className="first-col-detail">
                    {item && (<>
                        <h1>{item.title}</h1>
                        <p>{item.desc}</p>
                    </>)}
                    {!item && (
                        <div className='container-fluid'>Por favor, espere....</div>
                    )}
                </Col>
            </Row>
            <Row>
                <Col className="col-detail">
                    {item && (<>
                        <LazyLoadImage
                        className="first-detail-image"
                        effect="opacity"
                        src={item.urls[0]} />
                    </>)}
                    {!item && (
                        <div className='container-fluid'>Por favor, espere....</div>
                    )}

                </Col>
                <Col className="col-detail">
                    {item && (<>
                        <LazyLoadImage
                        className="first-detail-image"
                        effect="opacity"
                        src={item.urls[1]} />
                    </>)}
                </Col>
            </Row>
            <Row>
                <Col className="col-detail">
                    {item && (<>
                        <LazyLoadImage
                        className="first-detail-image"
                        effect="opacity"
                        src={item.urls[2]} />
                        <LazyLoadImage
                        className="first-detail-image"
                        effect="opacity"
                        src={item.urls[3]} />
                    </>)}
                </Col>
            </Row>
        </Container>
    )
}


export default SecDetailPage;