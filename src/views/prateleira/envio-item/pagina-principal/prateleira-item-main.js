import { IndividualItemPratMain } from './individual-item-main';

//Código individual do item

export const PrateleiraItemMain = ({ items, addToCart }) => {

   

    return items.map((individualItem) => (
        <IndividualItemPratMain
            key={individualItem.ID}
            individualItem={individualItem}
            addToCart={addToCart}
        />
    ))
};