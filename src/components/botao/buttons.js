import './buttons.css';
import PlayArrow from '@material-ui/icons/PlayArrowRounded';

function  Button(){
    return (
        <button className="button">ENCOMENDE COM A SKY!<PlayArrow className="playIcon"/></button>
    )
}

export default Button;