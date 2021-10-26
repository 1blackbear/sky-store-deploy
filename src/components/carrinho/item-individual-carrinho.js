import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import './carrinho.css'
import { fs, auth } from '../../config/firebase.js';
import CloseIcon from '@material-ui/icons/Close';


const ItemIndividualCarrinho = ({ cartItem }) => {

    const handleCartItemDelete=()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart' + " " + user.uid).doc(cartItem.ID).delete().then(()=>{
                    console.log('successfully deleted');
                })
            }
        })
    }

    return (
        <Row className='item'>
            <Col xs={3}>
            <img src={cartItem.url} alt='item-img' className='item-img'/>
            </Col>
            <Col xs={7} className='item-text'>
                <Col xs={12}><p>{cartItem.title}</p></Col>
                <Col xs={12}><p className="price">{"R$ " + cartItem.price}</p></Col>
            </Col>
            <Col xs={2}>
                <CloseIcon className="close-item" onClick={handleCartItemDelete}/>
            </Col>
        </Row>
    )
}

export default ItemIndividualCarrinho;