import './buttons.css';
import PlayArrow from '@material-ui/icons/PlayArrowRounded';
import { Link } from "react-router-dom";

export const  Button = ({text, name, linkBtn}) => {
    return (
        <button className={name}><Link to="/encomendas"  className={linkBtn}>{text}<PlayArrow className="playIcon"/></Link></button>
    )
}

