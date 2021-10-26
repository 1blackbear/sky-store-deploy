import './buttons.css';
import PlayArrow from '@material-ui/icons/PlayArrowRounded';
import { Link } from "react-router-dom";

const  Buttons = ({text, name, linkBtn, onClick, link}) => {
    return (
        <button onClick={onClick} className={name}><Link to="/encomendas"  className={linkBtn}>{text}<PlayArrow className="playIcon"/></Link></button>
    )
}

export default Buttons;