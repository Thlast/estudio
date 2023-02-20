import React from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Spinner } from '../components/Login/Spinner';

export function Consola(props) {

  const { datos } = props;
  const { curso } = props;
  const { dic } = props;
  const { eliminarDelHistorial } = props;
  const { limpiarHistorial } = props;
  const { enconsola } = props;
  const { cargando } = props;
  const url = process.env.REACT_APP_PROYECT_PRODUCTION_URL || process.env.REACT_APP_PROYECT_LOCAL_URL

  return (
    <div>
      <div
        id="consol"
        className="navconsola">
        <p>
          {cargando ?
            <div className='consolacargando'>
              <Spinner></Spinner>
            </div>
            : <div></div>
          }
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
        {datos[0] ? 
        datos[0].seccion.enunciado.length == 0 || dic === "" ? "no hay datos" :
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
            <blockquote>Link a la sección:
              <code>
              <a 
              target="_blank"
              href={`${url}/cursos/${datos[0].curso}/${datos[0].capitulo}/${datos[0].seccion.nombre}`}>
                {" "}{datos[0].seccion.nombre}
              </a>
              </code>
            </blockquote>
          </>
          : null}
        


      </div>

    </div>
  )
}