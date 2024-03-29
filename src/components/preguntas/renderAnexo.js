import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from "react-router-dom";
import { alertaquitar } from '../alertas';
import { ResueltasContext } from '../../context/Resueltas'
import { useContext } from 'react'
import { Opciones } from './opcionesMultiples';
import { VoF } from './formVoF';
import { Resultado } from './resultado';

export function AnexadasExamen(props) {

  const {devolverResueltas, resueltas} = useContext(ResueltasContext)
  const [completadas, setCompletadas] = useState([])
  const { quitar } = props;
  const { anexadas } = props;
  const { examenid } = props;
  const { numpreguntas } = props;
  const [renderanexadas, setRenderAnexadas] = useState(anexadas)

  const mostrar = (id) => {
    document.getElementById("respuesta-" + id).style.display = 'block';
    document.getElementById("ocultar-" + id).style.display = 'block';
    document.getElementById("mostrar-" + id).style.display = 'none';
  }
  const ocultar = (id) => {
    document.getElementById("respuesta-" + id).style.display = 'none';
    document.getElementById("mostrar-" + id).style.display = 'block';
    document.getElementById("ocultar-" + id).style.display = 'none';
  }

  const quitarAnexo = (preguntaid) => {

    const funcionquitar = async () => {
      await quitar(examenid, preguntaid);
      setRenderAnexadas(renderanexadas.filter(a => a.id !== preguntaid))
    }

    alertaquitar(funcionquitar)
  }
  useEffect(() => {
    if (devolverResueltas(anexadas.curso)[0]?.resueltas == undefined) {
      setCompletadas([])
    } else {
      setCompletadas(devolverResueltas(anexadas.curso)[0]?.resueltas)
    }

    //console.log(devolverResueltas(p.curso)[0]?.resueltas)
  }, [anexadas, resueltas])


  return (
    <div className='container-anexo'>
      {anexadas?.length !== 0 ?
        renderanexadas?.map((p, num) => {
          return (
            <div
              className='cuadro cuadro-pregunta'
              id={p.id}
              key={p.id}>
              {completadas?.length === 0 ? <circle></circle> :
                completadas.indexOf(p.id) !== -1 ?
                  <circle
                    className='resuelta'>
                    ✓
                  </circle>
                  :
                  <circle>

                  </circle>
              }
              <div
                className='quitar'>
                <button
                  onClick={() => quitarAnexo(p.id)}
                  className=''>
                  -
                </button>
              </div>

              <div
                className='pregunta-encabezado'>
                Pregunta Nº {numpreguntas + num + 1}: {" "}
                <Link
                  to={`/cursos/${p.curso}/${p.titulo}/${p.seccion}`}>
                  {p.seccion}
                </Link>
              </div>
              <hr></hr>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}>
                {p.pregunta}
              </ReactMarkdown>
              {p.resultado ?

                <Resultado
                  c={p.resultado}
                  id={p.id}
                  num={num}
                />
                : null
              }
              {p.tipo === "Normal" &&
                <div>
                  <div>
                    <button
                      className='boton respuesta-show'
                      id={"mostrar-" + p.id}
                      onClick={() => mostrar(p.id)}>
                      Mostrar Respuesta
                    </button>
                    <button
                      className='boton respuesta-hide'
                      id={"ocultar-" + p.id}
                      onClick={() => ocultar(p.id)}>
                      Ocultar Respuesta
                    </button>
                  </div>

                  <div
                    id={"respuesta-" + p.id}
                    className='respuesta-hide show-element'>
                    <hr></hr>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}>
                      {p.respuesta}
                    </ReactMarkdown>
                  </div>
                </div>
              }
              {p.tipo === "Multiple" ?
                <Opciones
                  p={p}
                  num={num}
                /> : null
              }
              {p.tipo === "vof" ? <VoF
                p={p}
              /> : null}
            </div>
          )
        })
        : null
      }
    </div>
  );
}
