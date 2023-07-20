import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Anexar } from './anexar'
import { Opciones } from './opcionesMultiples'
import { Respuesta } from './respuesta'
import { ResueltasContext } from '../../context/Resueltas'
import { useContext, useEffect, useState } from 'react'
import { VoF } from './formVoF'
import { useAuth } from '../../context/AuthContext'
import { Resultado } from './resultado'
import { EvaluarRespuesta } from '../IA/evaluarRespuesta'
import { Link } from 'react-router-dom'

export function Preguntas(props) {

  const { user } = useAuth()
  const [completadas, setCompletadas] = useState([])
  const [mostrarEvaluar, setMostrarEvaluar] = useState(false)
  const { edit } = props
  const { irModificarPregunta } = props
  const { eliminar } = props
  const { p } = props
  const { num } = props
  const { integral, isLink } = props
  const { irModificarVof } = props
  const { devolverResueltas, resueltas } = useContext(ResueltasContext)
  // console.log(completadas[0])


  useEffect(() => {
    if (devolverResueltas(p.curso)[0]?.resueltas == undefined) {
      setCompletadas([])
    } else {
      setCompletadas(devolverResueltas(p.curso)[0]?.resueltas)
    }

    //console.log(devolverResueltas(p.curso)[0]?.resueltas)
  }, [p, resueltas])

  return (
    <>
      {/* //LINKS A LAS PREGUNTAS */}
      {isLink == undefined ?
        <>

          {p.seccionId ?
            <div>
              <span>De la seccion: {" "}</span>
              <Link
                to={`/cursosSQL/${p.curso}/${p.capituloId}/${p.titulo.replaceAll(" ", "%20")}/${p.seccionId}`}
                className='home-seccion'>
                {`${p.seccionId}: ${p.titulo}`}
              </Link>
            </div>
            :
            <>
              {p.seccion ?
                <div>
                  <span>De la seccion: {" "}</span>
                  <Link
                    to={`/cursos/${p.curso}/${p.titulo.replaceAll(" ", "%20")}/${p.seccion?.replaceAll(" ", "%20")}`}
                    className='home-seccion'>
                    {p.seccion}
                  </Link>
                </div>
                :
                <>
                  {p.examen ?
                    <div>
                      <Link
                        to={`/examenes/${p.examen}`}
                        className='home-seccion'>
                        Examen
                      </Link>
                    </div>
                    : null}
                </>
              }
            </>
          }
        </>
        : null}
      <div
        className='cuadro cuadro-pregunta'
        id={p.id}
        key={p.id}>
        {
          completadas?.length <= 0 ?
            <circle>

            </circle>
            :
            completadas?.indexOf(p.id) == -1 ?
              <circle>
              </circle>
              :
              <circle
                className='resuelta'>
                ✓
              </circle>
        }
        <Anexar
          p={p}
        />
        <div
          className='pregunta-encabezado'>
          <p>
            Pregunta Nº {1 + num}:
          </p>
        </div>
        <div className='contendedor-pregunta-respuesta'>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}>
            {p.pregunta}
          </ReactMarkdown>
          {p.resultado ?
            <Resultado
              c={p.resultado}
              id={p.id}
              curso={p.curso}
              num={num}
            />

            : null
          }
        </div>
        {integral &&
          <Respuesta
            p={p} />}
        {integral &&
          p.tipo === "Multiple" &&
          <Opciones
            p={p}
            num={num}
          />

        }
        {integral &&
          p.tipo === "vof" &&
          <VoF
            p={p}
          />

        }
        {p.tipo === "Normal" &&
          <>
            <button
              className='boton respuesta-show'
              onClick={() => setMostrarEvaluar(!mostrarEvaluar)}
            >
              {mostrarEvaluar ? "ocultar" : "Responder"}
            </button>
            {
              mostrarEvaluar ?
                <EvaluarRespuesta pregunta={p.pregunta} respuesta={p.respuesta} idPregunta={p.id} curso={p.curso} />
                :
                null
            }
          </>
        }
        {edit & p.user === user.uid ?
          <div
            className='botones-editar'>
            {p.tipo === "vof" ?
              <button
                onClick={() => irModificarVof(p, num)}
                className='btn btn-primary'>
                Modificar
              </button> :
              <button
                onClick={() => irModificarPregunta(p, num)}
                className='btn btn-primary'>
                Modificar
              </button>
            }
            <button
              onClick={() => (eliminar(p.id, p.user))}
              className='btn btn-danger'>
              Eliminar
            </button>
          </div>
          : null
        }
      </div>
    </>
  )
}
