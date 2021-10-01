import './index.css';
import Skai from '../../images/skai.jpg'

function SobreMim() {
    return (
        <section className="start-page-back">
            <div className="container">
            <div className="sobre-mim row">
                <img className="col-12 skai-photo col-sm-6" src={Skai} />
                <div className="col-12 col-sm-6 text-about">
                    <a> Oi! Meu nome é sky, eu sou uma ilustradora e designer autônoma. <br/>
                        Nascida e criada no interior de Minas Gerais. 
                        Obrigada por visitar o site e espero que encontre o que procura!
                    </a>
                </div>
            </div>
            </div>
        </section>
    )
}

export default SobreMim;