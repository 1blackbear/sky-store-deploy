//Código do item único do portifólio que receberá por parâmetro o objeto 
//individual da lista de itens da coleção 'Portifolio-item'


export const IndividualItemMain = ({ individualItemMain }) => {
    return (
        <div className="imagem">
                <img src={individualItemMain.url} className="fotos col-image" />
                <div className="capa">
                    <p className="text-item">{individualItemMain.title}</p>
                </div>      
        </div>
    )
}