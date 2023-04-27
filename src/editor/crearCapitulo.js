import { useEffect, useState } from "react";
import { crearCapitulo } from "../components/servicios/cursos/cursosSQL/crearCapitulo";
import { modificarCapitulo } from "../components/servicios/cursos/cursosSQL/modifCapitulo";


export function EditorCapitulo(props) {

  const { curso, modifCapitulo, cancelarModfCapitulo, crearActualizar, modificarActualizar, indiceCapitulo } = props;
  const [nombreCapitulo, setNombreCapitulo] = useState(modifCapitulo ? modifCapitulo?.CapituloNombre : null);
  const [descripcion, setDescripcion] = useState(modifCapitulo ? modifCapitulo?.CapituloDescripcion : null);

  useEffect(() => {
    if (modifCapitulo) {
      setNombreCapitulo(modifCapitulo?.CapituloNombre)
      setDescripcion(modifCapitulo?.CapituloDescripcion)

    } else {
      setNombreCapitulo("")
      setDescripcion("")

    }


  }, [modifCapitulo])



  return (
    <>
     <div style={{position:"relative", padding:"10px"}}>
      {modifCapitulo &&
        <button 
        className="btn btn-danger form-cancelar"
        onClick={() => cancelarModfCapitulo(indiceCapitulo)}>X</button>
      }
     
      <h3>Añadir un nuevo capitulo</h3>
      <form
        className="form-vof"
      >
        Nombre
        <input
          value={nombreCapitulo}
          min={3}
          onChange={(e) => setNombreCapitulo(e.target.value)}
        >

        </input>
        Descripcion
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        >

        </textarea>
        {modifCapitulo ?
          <button
            onClick={(event) => modificarActualizar(nombreCapitulo, descripcion, modifCapitulo?.CapituloId, modifCapitulo.indice, event)}
            className="home-boton">
            Modificar Capitulo
          </button>
          :
          <button
            onClick={(event) => crearActualizar(curso, nombreCapitulo, descripcion, event)}
            className="home-boton">
            Añadir Capitulo
          </button>
        }
      </form>
      </div>
    </>
  )
}