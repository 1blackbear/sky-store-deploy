import './prateleira.css';
import { Container, Row, Nav, Tab, NavItem } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { PrateleiraItemMain } from './envio-item/pagina-principal/prateleira-item-main';
import CarrinhoDeCompras from '../../components/carrinho/carrinho';
import { fs, auth } from '../../config/firebase.js';
import { SubmenuItemMain } from './submenu/filter/submenu-item-main';


function Prateleira() {
    const [open, setOpen] = useState(false);

    const handleCart = () => {
        setOpen(!open);
    };

    const [items, setItems] = useState([]);

    const [categoria, setCategoria] = useState([]);


    function GetUserUid() {
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                }
            })
        }, [])
        return uid;
    }

    const uid = GetUserUid();


    let Item;
    const addToCart = (individualItem) => {
        if (uid !== null) {
            Item = individualItem;
            Item['Total'] = individualItem.price;
            fs.collection('Cart' + " " + uid).doc(individualItem.ID).set(Item).then(() => {
                handleCart();
            })
        }

    }

    useEffect(() => {
        fs.collection('Prateleira-item').onSnapshot(snapshot => {
            const newItem = snapshot.docs.map((doc) => ({
                ID: doc.id,
                ...doc.data(),
            }));
            setItems(newItem);
        })
    }, [])

    useEffect(() => {
        fs.collection('Submenu-item').onSnapshot(snapshot => {
            const newItem = snapshot.docs.map((doc) => ({
                ID: doc.id,
                ...doc.data(),
            }));
            setCategoria(newItem);
        })
    }, [])

    const filterData = (value) => {
        fs.collection('Prateleira-item')
            .where('option', '==', value)
            .onSnapshot((snapshot) => {
                const items = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),

                }))
                setItems(items);
            });
    }

    const handleReset = () => {
        fs.collection('Prateleira-item')
            .onSnapshot((snapshot) => {
                const items = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setItems(items);
                console.log(items);
            });
    }


    return (
        <>
            <Container className="card-part">
                <Row >

                    <Nav justify variant="tabs" className="d-flex justify-content-center nav-categorias" defaultActiveKey="cat1-btn">
                        <Nav.Item>
                            <Nav.Link eventKey="cat1-btn" onClick={handleReset} className="nav-itens">Geral</Nav.Link>
                        </Nav.Item>
                        <SubmenuItemMain categoria={categoria} filterData={filterData}> </SubmenuItemMain>
                    </Nav>

                    <PrateleiraItemMain
                        items={items}
                        addToCart={addToCart}
                    >
                    </PrateleiraItemMain>

                </Row>

            </Container>
            <CarrinhoDeCompras
                open={open}
                handleCart={handleCart}
            >
            </CarrinhoDeCompras>
        </>)
}

export default Prateleira;
