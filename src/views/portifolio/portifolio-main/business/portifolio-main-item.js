import {IndividualItemMain} from './individual-item';

export const PortifolioItemMain = ({items}) => {
    return items.map((individualItem)=>(
            <IndividualItemMain key = {individualItem.ID} individualItemMain={individualItem}/>     
    ))
};