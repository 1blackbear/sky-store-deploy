import IndividualItemPrat from './individual-item';
import { Col } from 'react-bootstrap';
import AbreEditar from './botao-editar.js';
import { fs, auth } from '../../../config/firebase.js';

//Código individual do item

export const PrateleiraItem = ({items, onClick }) => {

    return items.map((individualItem) => (
        <div>
            <IndividualItemPrat key={individualItem.ID} individualItem={individualItem} onClick={onClick} />
        </div>

    )
    )
};
