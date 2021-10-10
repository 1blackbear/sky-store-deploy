import {IndividualItem} from './individual-item';

export const PortifolioItem = ({items}) => {
    return items.map((individualItem)=>(
        <IndividualItem key = {individualItem.ID} individualItem={individualItem}/>
    ))
};