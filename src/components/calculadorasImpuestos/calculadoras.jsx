import { Link } from "react-router-dom"


export const Calculadoras = () => {

    return (
        <div className="menuContenedor">
        <div style={{padding:"20px"}}>
          <Link to={"./ganancias"}>
            Impuesto a las ganancias (PH)
          </Link>
        </div>
        </div>
    )
}