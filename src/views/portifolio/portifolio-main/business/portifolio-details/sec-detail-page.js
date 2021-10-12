import { Container, Row, Col } from 'react-bootstrap';
import React from 'react'
import './details.css';
import { useState, useEffect } from 'react';
import { fs } from '../../../../../config/firebase.js'

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
                        <img src={item.urls[0]} className="first-detail-image" />
                    </>)}
                    {!item && (
                        <div className='container-fluid'>Por favor, espere....</div>
                    )}

                </Col>
                <Col className="col-detail">
                    {item && (<>
                        <img src={item.urls[1]} className="first-detail-image" />
                    </>)}
                </Col>
            </Row>
            <Row>
                <Col className="col-detail">
                    {item && (<>
                        <img src={item.urls[2]} className="first-detail-image" />
                        <img src={item.urls[3]} className="first-detail-image" />
                    </>)}
                </Col>
            </Row>
        </Container>
    )
}


export default SecDetailPage;