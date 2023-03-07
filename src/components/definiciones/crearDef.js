import { useState } from "react";
import { crearDef } from "../servicios/definiciones/service.crearDef";
import { modificarDef } from "../servicios/definiciones/service.modificarDef";


export function FormCrearDef(props) {

  const { dic } = props;
  const { def } = props;
  const [concepto, setConcepto] = useState(dic || null);
  const [definicion, setDefinicion] = useState(def ? def.definicion : null);
  const [fuente, setFuente] = useState(def ? def.fuente : null);
  const { curso } = props;


  console.log(def? typeof def.id : null)

  return (
    <>
      <form
        className="form-container"
      //onSubmit={(e) => crearDef(concepto, definicion, curso, fuente, e)}
      >
        Concepto:
        <input
          style={{ width: "90%" }}
          placeholder="Escribe el concepto"
          onChange={(e) => setConcepto(e.target.value)}
          value={concepto}
          type="text">

        </input>
        Definicion:
        <textarea
          style={{ width: "90%" }}
          placeholder="Escribe la definición"
          onChange={(e) => setDefinicion(e.target.value)}
          value={definicion}>

        </textarea>
        Fuente:
        <input
          style={{ width: "90%" }}
          placeholder="Fuente"
          onChange={(e) => setFuente(e.target.value)}
          value={fuente}
          type="text">

        </input>
        {def ?
          <button
            onClick={(e) => modificarDef(concepto, definicion, curso, fuente, def.id, e)}
            type="submit">
            Modificar
          </button>
          :
          <button
            onClick={(e) => crearDef(concepto, definicion, curso, fuente, e)}
            type="submit">
            Crear
          </button>
        }
      </form>
      <hr></hr>
    </>
  )
}