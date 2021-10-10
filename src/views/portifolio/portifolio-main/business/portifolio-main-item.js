import { IndividualItemMain } from './individual-item';
import { Link } from "react-router-dom";

export const PortifolioItemMain = ({ items }) => {
    return (
        items.map((individualItem) => {
            if (individualItem.checkType === 'img1') {
                return (
                    <Link to={"/portifolio-details-1/" + individualItem.ID} key={individualItem.ID}>
                        <IndividualItemMain key={individualItem.ID} individualItemMain={individualItem} />
                    </Link>
                )
            } else if (individualItem.checkType === 'img2') {
                return (
                    <Link to={"/portifolio-details/" + individualItem.ID} key={individualItem.ID}>
                        <IndividualItemMain key={individualItem.ID} individualItemMain={individualItem} />
                    </Link>
                )
            } else if (individualItem.checkType === 'img3') {
                return (
                    <Link to={"/portifolio-details-2/" + individualItem.ID} key={individualItem.ID}>
                        <IndividualItemMain key={individualItem.ID} individualItemMain={individualItem} />
                    </Link>
                )
            }
        }
        ))
};