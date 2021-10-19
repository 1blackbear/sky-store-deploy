import './index.css';
import { Button } from '../../components/botao/buttons';
import { ReactComponent as LogoMobile } from '../../images/logo-mobile.svg';
import { Link } from "react-router-dom";
import { motion } from "framer-motion"

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
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="botao-main">
                        <div className="botao-encomende d-flex justify-content-end">
                            <Button text="ENCOMENDE COM A SKY!" name="button" linkBtn="link-btn-ini" />
                        </div>
                    </div>
                </motion.div>
                <div />
            </div>
        </section>
    )
}

export default TelaInicial;