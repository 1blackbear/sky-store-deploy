import { IndividualSubmenuMain } from "./individual-submenu-main";

//Código individual do item

export const SubmenuItemMain = ({ categoria, filterData}) => {
    return categoria.map((individualItem) => (
        <IndividualSubmenuMain
            key={individualItem.ID}
            individualItem={individualItem}
            filterData={filterData}

        />
    ))
};