import IndividualItemEnco from './individual-item';

//Código individual do item

export const EncomendasItem = ({ items }) => {

    return items.map((individualItem) => (
        <div>
            <IndividualItemEnco key={individualItem.ID} individualItem={individualItem}/>
        </div>

    )
    )
};
 

