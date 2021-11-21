import './index.css';
import Buttons from '../../components/botao/buttons';
import { ReactComponent as LogoMobile } from '../../images/logo-mobile.svg';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { fs } from '../../config/firebase.js';
import { PortifolioItemMain } from '../portifolio/portifolio-main/business/portifolio-main-item.js';

function TelaInicial() {
    //Vetores de itens da Coluna 1 e Coluna 2
    const [items, setitems] = useState([]);

    //Atualização dinâmicas de itens da coluna com base em lista do firebase
    useEffect(() => {
        //Busca a snapshot da coleção 'Portifolio-item'
        fs.collection('Portifolio-item').onSnapshot(snapshot => {
            const newItem = // Variável com vetor de itens do map seguinte:
                snapshot.docs.map((doc) => ({  //Faz um map na lista de documentos da seleção
                    ID: doc.id,
                    ...doc.data(),
                }));
                setitems([newItem[0],newItem[1],newItem[2]]);
        })
    }, [])
 
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
                            <Buttons text="ENCOMENDE COM A SKY!" name="button" linkBtn="link-btn-ini" />
                        </div>
                    </div>
                </motion.div>
                <div />
            </div>
            <div id="top-bar"></div>
            <div id="portfolio-view">
                {/*O vetor de itens da coluna 1 é maior que 0? Se sim, renderiza os itens presente nele*/}
                {items.length > 0 && (
                    <PortifolioItemMain items={items} />
                )}
                {items.length < 1 && (
                    <div className='container-fluid'>Por favor, espere....</div>
                )}
            </div>
        </section>
    )
}

export default TelaInicial;