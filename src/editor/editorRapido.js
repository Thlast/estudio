import { useEffect, useState } from "react";
import { crearSeccion } from "../components/servicios/cursos/cursosSQL/crearSeccion";
import { modificarSeccion } from "../components/servicios/cursos/cursosSQL/modifSeccion";
import { Spinner } from "../components/Login/Spinner";


export function EditorRapidoSeccion(props) {

  //const {curso} = props;
  const { capituloId, seccionModificar, cargando, crearSeccionActualizar, crearSeccionNavegar, modificarSeccionActualizar, cancelarModfSeccion, indiceCapitulo, creandoSeccion } = props;
  const [nombreSeccion, setNombreSeccion] = useState(seccionModificar ? seccionModificar.SeccionNombre : null);
  const [contenido, setContenido] = useState(seccionModificar ? seccionModificar.SeccionContenido : null);

  const [mostrarContenido, setMostrarContenido] = useState(false);

  useEffect(() => {
    if (seccionModificar) {
      setNombreSeccion(seccionModificar?.SeccionNombre)
      setContenido(seccionModificar?.SeccionContenido)
    } else {
      setNombreSeccion("")
      setContenido("")
    }

  }, [seccionModificar])


  return (
    <>
      {cargando ? <Spinner></Spinner> :
        <div style={{ position: "relative" }}>
          {seccionModificar ? <h5>Modificar seccion:</h5> :
            <h5>Añadir secciones al capitulo:</h5>
          }
          {seccionModificar &&
            <button
              className="btn btn-danger form-cancelar"
              onClick={() => cancelarModfSeccion(indiceCapitulo)}>X</button>
          }
          <form
            className="form-vof"

          >

            Nombre
            <input
              required
              value={nombreSeccion}
              min={3}
              onChange={(e) => setNombreSeccion(e.target.value)}
            >

            </input>
            {/* por ahora lo oculto para modificar, no tengo el contenido para modificar desde listarSecciones */}
            {seccionModificar ? null :
              <>
                Contenido
                <button
                  className="home-boton"
                  type="button"
                  onClick={() => setMostrarContenido(!mostrarContenido)}
                >Mostrar contenido</button>
                {mostrarContenido ?
                  <div>

                    <textarea
                      className="editorContenido"
                      value={contenido}
                      onChange={(e) => setContenido(e.target.value)}
                    >
                    </textarea>
                  </div>
                  : null
                }
              </>
            }
            {seccionModificar ?
              //ESTE EDITOR no modifica el contenido, para modificar ingresando en la seccion
              <button
                onClick={(e) => modificarSeccionActualizar(nombreSeccion, seccionModificar.SeccionId, seccionModificar.indice, e)}
                className="btn btn-primary">
                Modificar
              </button>
              :
              <>
                {creandoSeccion ?
                  <Spinner />
                  :
                  <>
                    <div className="botones-EditorSeccion">
                      <button
                        type="submit"
                        onClick={(event) => crearSeccionActualizar(capituloId, nombreSeccion, contenido, event)}
                        className="btn btn-primary">
                        Añadir Sección
                      </button>
                      <button
                        type="submit"
                        onClick={(event) => crearSeccionNavegar(capituloId, nombreSeccion, contenido, event)}
                        className="btn btn-primary">
                        Añadir en Editor Detallado
                      </button>
                    </div>
                  </>
                }
              </>
            }
          </form >
        </div>
      }
    </>

  )
}