//Código do item único do portifólio que receberá por parâmetro o objeto 
//individual da lista de itens da coleção 'Portifolio-item'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';


export const IndividualItemMain = ({ individualItemMain }) => {
    return (
        <div className="imagem">  
            <LazyLoadImage
                className={"fotos "  + individualItemMain.checkCol}
                effect="opacity"
                width="100%"
                src={individualItemMain.url}/>
                <div className="capa">
                    <p className="text-item">{individualItemMain.title}</p>
                </div>      
        </div>
    )
}