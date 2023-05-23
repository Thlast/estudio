import { useContext, useEffect, useState } from "react";
import { evaluarIA, getRespuestaIA, guardarRespuestaIA } from "../servicios/serviciosIA/evaluar";
import { useAuth } from "../../context/AuthContext";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { agregarResuelta } from "../servicios/preguntas/resueltas";
import { ResueltasContext } from "../../context/Resueltas";
import { Spinner } from "../Login/Spinner";

export function EvaluarRespuesta(props) {

  const { datosUser, user } = useAuth()
  const { pregunta, respuesta, idPregunta, curso } = props;
  const [respuestaUsuario, setRespuestaUsuario] = useState()
  const [evaluacionIA, setEvaluacionIA] = useState()
  const [cargando, setCargando] = useState()
  const [notaIA, setNotaIA] = useState()
  const [modificarRespuestaId, setModificarRespuestaId] = useState()
  const { devolverResueltas, agregarResueltasContext } = useContext(ResueltasContext)

  const evaluar = async () => {
    setCargando(true)
    await evaluarIA(pregunta, respuesta, respuestaUsuario, datosUser?.apiKey).then(async data => {
      setEvaluacionIA(data.choices[0].message.content)
      await pushResuelta(data)
      setCargando(false)
    })
  }
  // Utilizamos una expresión regular para buscar el número entre las llaves
  const pushResuelta = async (infoIA) => {

    if (infoIA) {
      const regex = /nota es: (\d+)|nota de (\d+)/;
      const match = infoIA.choices[0].message.content.match(regex);
      const nota = match[1] | match[2];
      if (match) {
        setNotaIA(parseInt(match[1]))
        await guardarRespuestaIA(infoIA.id, idPregunta, infoIA.choices[0].message.content, respuestaUsuario, parseInt(nota), user.uid, modificarRespuestaId)
        if (parseInt(match[1]) >= 7) {
          await agregarResueltasContext(parseInt(match[1]), curso, idPregunta)

        }
      } else {
        await guardarRespuestaIA(infoIA.id, idPregunta, infoIA.choices[0].message.content, respuestaUsuario, null, user.uid, modificarRespuestaId)
        console.log("No se encontró ninguna nota en el texto.");
      }
    }
  }

  useEffect(() => {
    getRespuestaIA(user.uid, idPregunta).then(data => {
      if (data) {
        setModificarRespuestaId(data[0].id)
        setEvaluacionIA(data[0].respuestaIA)
      }
    })
  }, [idPregunta])

  return (
    <>
      {datosUser?.apiKey ?
        <>
          {cargando ? <Spinner></Spinner> :
            <>
              <div
                style={{ display: evaluacionIA ? "none" : "block" }}
                className="form-container">
                <textarea
                  style={{ width: "100%" }}
                  placeholder="Escribe tu respuesta"
                  value={respuestaUsuario}
                  onChange={(e) => setRespuestaUsuario(e.target.value)}
                >

                </textarea>
                <button
                  className="btn btn-primary"
                  onClick={() => evaluar()}
                >
                  Evaluar
                </button>
              </div>
              <div
                style={{ display: evaluacionIA ? "block" : "none" }}
                className="form-container">
                <button
                  className="boton home-boton"
                  onClick={() => setEvaluacionIA()}
                >
                  Intentar de nuevo
                </button>
                <div className="cuadro">
                  <h3>Tu respuesta fue:</h3>
                  <p>
                    {respuestaUsuario}
                  </p>
                  <hr></hr>
                  <ReactMarkdown>
                    {evaluacionIA}
                  </ReactMarkdown>
                </div>
              </div>
            </>
          }
        </>
        :
        <blockquote>
          <a target="_blank" href="https://platform.openai.com/account/api-keys">Agrega una apiKey para poder ser evaluado.</a>
        </blockquote>
      }
    </>

  )
}