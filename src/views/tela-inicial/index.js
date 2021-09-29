import './index.css';
import Botao from '../../components/botao/buttons';
import { ReactComponent as LogoMobile } from '../../images/logo-mobile.svg';
import { Link } from "react-router-dom";

function TelaInicial() {
    return (
        <section className="start-page-back">
            <div className="start-page container flex-column justify-content-between">
                <div />
                <a href="#"><LogoMobile className="logo-mobile col-2" /></a>
                <p>
                    Oi! Meu nome é sky, eu sou uma ilustradora e designer autônoma<br></br>
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;nascida e criada no interior de Minas Gerais. <Link to="/sobre-mim" className="saiba-mais">Saiba mais</Link><br></br>
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Obrigada por visitar o site e espero que encontre o que procura!
                </p>
                <div className="botao-main">
                    <div className="botao-encomende d-flex justify-content-end">
                        <Botao />
                    </div>
                </div>
                <div />
            </div>
        </section>
    )
}

export default TelaInicial;