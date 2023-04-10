import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MostrarDef } from '../components/definiciones/mostrarDef';
import { obtenerDatosConsola } from '../components/servicios/cursos/obtenerSeccion';

export function Consola(props) {

  const [datos, setDatos] = useState()
  const { curso } = props;
  const { dic } = props;
  const { eliminarDelHistorial } = props;
  const { limpiarHistorial } = props;
  const { enconsola } = props;
  const [cargando, setCargando] = useState(false)
  const { recargarFuncionClickcode } = props;

  const url = process.env.REACT_APP_PROYECT_PRODUCTION_URL || process.env.REACT_APP_PROYECT_LOCAL_URL

  useEffect(() => {

    // Creamos el controlador para abortar la petición
    const controller = new AbortController()
    // Recuperamos la señal del controlador
    const { signal } = controller
    // Hacemos la petición a la API y le pasamos como options la señal
    if (dic) {
      setDatos()
      setCargando(true)
    }

    obtenerDatosConsola(curso, dic, { signal })
      .then(data => (setDatos(data),
        setCargando(false),
        recargarFuncionClickcode()
      ));

    //setCargando(false)
    return () => controller.abort()
  }, [dic])

  useEffect(() => {
    document.getElementById("consol").scrollIntoView({ behavior: 'smooth' });
  }, [datos, dic])

  return (
    <div>
      <div
        id="consol"
        className="navconsola">
        <p>
          {/* {cargando ?
            <div className='consolacargando'>
              <Spinner></Spinner>
            </div>
            :
            null
          } */}
          <button
            className="botonhistorial"
            onClick={() => limpiarHistorial()}
          >X
          </button>Visto reciente:{" "}
          {enconsola.map((a, num) => {
            return (
              <span
                key={`historial-${a}`}>
                <button
                  className="botonhistorial"
                  onClick={() => eliminarDelHistorial(a)}
                >X
                </button>
                <code
                  className="aa">
                  {a}
                </code>
              </span>
            )
          })}
        </p>
        <p className="enconsola">
          Consola:
          {" " + dic}
        </p>
      </div>
      <div
        className="consola">

        <>
          {/* si existen definiciones se renderizan: */}

          <>
            <MostrarDef
              recargarFuncionClickcode={recargarFuncionClickcode}
              curso={curso}
              dic={dic} />
            <hr></hr>
          </>

          {/*^^si existen definiciones se renderizan:^^*/}
          {cargando ? null :
            datos?.[0] ?
              datos[0].seccion.enunciado.length == 0 || dic === "" ? null :
                <>
                  {datos[0].seccion.enunciado.map((b, num) => {
                    return (
                      <div
                        key={"consola" + dic + num}
                        class="show-element">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}>
                          {b}
                        </ReactMarkdown>
                      </div>
                    )
                  })
                  }
                  <br></br>
                  <blockquote>Link a la sección:
                    <em
                      style={{ textDecoration: "underline" }}>
                      <a
                        target="_blank"
                        href={`${url}/cursos/${datos[0].curso}/${datos[0].capitulo}/${datos[0].seccion.nombre}`}>
                        {" "}{datos[0].seccion.nombre}
                      </a>
                    </em>
                  </blockquote>
                  <hr></hr>
                </>
              : null}

        </>

      </div>

    </div>
  )
}