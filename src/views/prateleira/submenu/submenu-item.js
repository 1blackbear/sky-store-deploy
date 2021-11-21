import IndividualSubmenu from "./individual-submenu";

//Código individual do item

export const SubmenuItem = ({ items }) => {

    return items.map((individualItem) => (
        <div>
            <IndividualSubmenu key={individualItem.ID} individualItem={individualItem}/>
        </div>

    )
    )
};
 

