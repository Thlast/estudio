import { useEffect, useState } from "react";
import { crearSeccion } from "../components/servicios/cursos/cursosSQL/crearSeccion";
import { modificarSeccion } from "../components/servicios/cursos/cursosSQL/modifSeccion";
import { Spinner } from "../components/Login/Spinner";


export function ModificarSeccion(props) {

  //const {curso} = props;
  const { capituloId, seccionModificar, previsualizar, cargando, modificando, modificarActualizar } = props;
  const [nombreSeccion, setNombreSeccion] = useState(seccionModificar?.SeccionNombre);
  const [contenido, setContenido] = useState(seccionModificar?.SeccionContenido);

  useEffect(() => {
    if (previsualizar) {
      previsualizar(contenido)
    }

  }, [contenido])

  useEffect(() => {
    if (seccionModificar) {
      setNombreSeccion(seccionModificar?.SeccionNombre)
      setContenido(seccionModificar?.SeccionContenido)
    }
  }, [seccionModificar])


  return (
    <>
      {cargando ? <Spinner></Spinner> :
        <>
          <h5>Editando seccion:</h5>
          <form
            className="form-vof"
          //onSubmit={(event) => crearSeccion(capituloId, nombreSeccion, contenido, event)}
          >
            {seccionModificar ? null :
              <h3>Añadir secciones al capitulo:</h3>
            }
            Nombre
            <input
              value={nombreSeccion}
              min={3}
              onChange={(e) => setNombreSeccion(e.target.value)}
            >

            </input>
            Contenido
            <textarea
              className="editorContenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
            >

            </textarea>
            {modificando ? <Spinner></Spinner>
              :
              <button
                onClick={(e) => modificarActualizar(nombreSeccion, contenido, seccionModificar.SeccionId, e)}
                className="home-boton">
                Modificar
              </button>
            }
          </form>
        </>
      }
    </>

  )
}