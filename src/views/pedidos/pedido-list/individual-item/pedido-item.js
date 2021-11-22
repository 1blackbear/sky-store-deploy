import IndividualItemPedido from './individual-item';

//Código individual do item

export const PedidoItem = ({ items }) => {

    return items.map((individualItem) => (
        <div>
            <IndividualItemPedido key={individualItem.ID} individualItem={individualItem}/>
        </div>

    )
    )
};