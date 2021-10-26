import React from "react";
import ItemIndividualCarrinho from "./item-individual-carrinho";

const ItensCarrinho = ({cartItens}) => {
    return cartItens.map((cartItem)=>(
        <ItemIndividualCarrinho key={cartItem.ID} cartItem={cartItem}/>
    ))
}

export default ItensCarrinho;