import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { auth, fs } from "../../config/firebase";
import './carrinho.css'
import ItensCarrinho from "./itens-carrinho";
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';


const CarrinhoDeCompras = ({ handleCart, open }) => {

    const [cartItens, setCartItens] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection('Cart' + " " + user.uid).onSnapshot(snapshot => {
                    const newCartItem = snapshot.docs.map((doc) => ({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartItens(newCartItem)
                })
            }
        })
    }, [])

        // getting the TotalProductPrice from cartProducts in a seperate array
        const price = cartItens.map((cartItens)=>{
            return parseFloat(cartItens.price);
        })
    
        // reducing the price in a single value
        const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;
    
        const totalPrice = price.reduce(reducerOfPrice,0);


    return (
        <Modal
            show={open}
            onHide={handleCart}
            dialogClassName="modalCart"
        >
            <Modal.Header closeButton>
                <Modal.Title className="cart-title">Carrinho de Compras</Modal.Title>
            </Modal.Header>
            <Modal.Body id="modal-body">
                {cartItens.length > 0 && (
                    <div className='container-fluid'>
                        <h1 className='products-box'>
                            <ItensCarrinho cartItens={cartItens}/>
                        </h1>
                    </div>
                )}
                {cartItens.length < 1 && (
                    <div className='container-fluid empty-cart'>
                        <LocalMallOutlinedIcon className="bag-empty"/>
                        <p>Ooopps... Seu carrinho está vazio!</p>
                        </div>
                )}

            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Row>
                    <Col xs={12} className='d-flex justify-content-center total-price'>
                        <p>Total: R$ {totalPrice}</p>
                    </Col>
                    <Col xs={12} className='d-flex justify-content-center'>
                        <Button className='btn-buy' >COMPRAR</Button>
                    </Col>
                </Row>
            </Modal.Footer>

        </Modal >
    );
};
export default CarrinhoDeCompras;