import { Link } from "react-router-dom";

export const IndividualItemMain = ({ individualItemMain }) => {
    return (
        <div className="imagem">
            <Link to="/">
                <img src={individualItemMain.url} className="fotos col-image" />
                <div className="capa">
                    <p className="text-item">{individualItemMain.title}</p>
                </div>
            </Link>
        </div>
    )
}