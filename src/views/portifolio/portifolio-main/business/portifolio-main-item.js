import { IndividualItemMain } from './individual-item';
import { Link } from "react-router-dom";

//Código do item único do portifólio que receberá por parâmetro 
//a lista de itens da coleção 'Portifolio-item'

export const PortifolioItemMain = ({ items }) => {
    return (
        items.map((individualItem) => { //Map pela lista recebida por parâmetro
            if (individualItem.checkType === 'img1') { //Verificando se o tipo de página de descrição é o 1
                return (
                    <Link to={"/portifolio-details-1/" + individualItem.ID} key={individualItem.ID}>
                        <IndividualItemMain key={individualItem.ID} individualItemMain={individualItem} />
                    </Link>
                )
            } else if (individualItem.checkType === 'img2') { //Verificando se o tipo de página de descrição é o 2
                return (
                    <Link to={"/portifolio-details/" + individualItem.ID} key={individualItem.ID}>
                        <IndividualItemMain key={individualItem.ID} individualItemMain={individualItem} />
                    </Link>
                )
            } else if (individualItem.checkType === 'img3') { //Verificando se o tipo de página de descrição é o 3
                return (
                    <Link to={"/portifolio-details-2/" + individualItem.ID} key={individualItem.ID}>
                        <IndividualItemMain key={individualItem.ID} individualItemMain={individualItem} />
                    </Link>
                )
            }
        }
        ))
};