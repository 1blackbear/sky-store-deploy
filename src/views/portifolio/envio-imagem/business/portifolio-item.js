import {IndividualItem} from './individual-item';

//Código individual do item

export const PortifolioItem = ({items}) => {
    return items.map((individualItem)=>(
        <IndividualItem key = {individualItem.ID} individualItem={individualItem}/>
    ))
};