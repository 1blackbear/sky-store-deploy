import './index.css';
import Skai from '../../images/skai.jpg'

function SobreMim() {
    return (
        <section className="start-page-back">
            <div className="container">
            <div className="sobre-mim row">
                <img className="col-6 skai-photo" src={Skai} />
                <div className="col-6">
                    <p> Oi! Meu nome é sky, eu sou uma ilustradora e designer autônoma. <br/>
                        Nascida e criada no interior de Minas Gerais. 
                        Obrigada por visitar o site e espero que encontre o que procura!
                    </p>
                </div>
            </div>
            </div>
        </section>
    )
}

export default SobreMim;