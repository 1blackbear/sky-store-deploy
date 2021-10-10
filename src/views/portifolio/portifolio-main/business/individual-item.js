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