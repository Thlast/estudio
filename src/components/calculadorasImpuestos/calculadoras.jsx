import { Link } from "react-router-dom"


export const Calculadoras = () => {

    return (
        <div className="menuContenedor">
        <div style={{padding:"20px"}}>
          <h1>Calculadoras:</h1>
          <hr></hr>
          <div className="cuadrilla">
          <Link className="examen" to={"./ganancias"}>
            Impuesto a las ganancias (PH-SI)
          </Link>
          </div>
        </div>
        </div>
    )
}