import IndividualItemPrat from './individual-item';

//Código individual do item

export const PrateleiraItem = ({ items }) => {

    return items.map((individualItem) => (
        <div>
            <IndividualItemPrat key={individualItem.ID} individualItem={individualItem}/>
        </div>

    )
    )
};
 

