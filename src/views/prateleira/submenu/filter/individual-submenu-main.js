import { Row, NavItem, Nav } from 'react-bootstrap';


export const IndividualSubmenuMain = ({ individualItem, filterData }) => {

    //Renderizar individualItem
    return (
            <Nav.Item >
                <Nav.Link eventKey={individualItem.id} onClick={() => filterData(individualItem.categoria)} className="nav-itens">{individualItem.categoria}</Nav.Link>
            </Nav.Item>
    )
}