import { useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ResueltasContext } from '../../context/Resueltas'
import { alertainfo, alertasuccess } from '../alertas'

export function VoF(props) {

  //   const {agregarHistorial} = useContext(ResueltasContext)
  const { p } = props
  const { agregarResueltasContext } = useContext(ResueltasContext)
  const checkRespuesta = async (preg, num, id) => {
    try {
      const respuesta = document.querySelector(`input[name=vof${num}${id}]:checked`).value;
      if (respuesta === preg.vof) {
        // await alertasuccess("Respuesta correcta")
        document.getElementById(`respuesta-${id}${num}`).style.display = 'block'
        document.getElementById(`correcto-${id}${num}`).style.display = 'block'
        document.getElementById(`incorrecto-${id}${num}`).style.display = 'none'
        return 1
        // agregarHistorial(id)
        // localStorage.setItem("listaResueltas", lista)
      } else if (respuesta === null || undefined) {
        alertainfo("debe seleccionar una respuesta")
        return 0
      }
      else {
        // alertafail("Respuesta incorrecta")
        document.getElementById(`respuesta-${id}${num}`).style.display = 'block'
        document.getElementById(`incorrecto-${id}${num}`).style.display = 'block'
        document.getElementById(`correcto-${id}${num}`).style.display = 'none'
        return 0
      }
    } catch (error) {

      console.log(error)
      return 0
    }


  }
  const checkTodas = async () => {
    let count = 0
    try {
      for (let i = 0; i < p.arrayPreguntas.length; i++) {
        await checkRespuesta(p.arrayPreguntas[i], i, p.id).then(n => count += n)
      }
    } catch (error) {

      console.log(error)
    }
    if (count === p.arrayPreguntas.length) {
      alertasuccess(`${count} / ${p.arrayPreguntas.length}`);
      agregarResueltasContext(10, p.curso, p.id)
    } else {
      alertainfo(`${count} / ${p.arrayPreguntas.length}`)
    }
  }

  return (
    <div
      className='contenedor-opciones'>
      {p.tipo === "vof" &&
        <div>
          <div
            className='preguntas-vof'>
            {p.arrayPreguntas?.map((preg, num) => {
              return (
                <div
                  id={p.id}
                  key={'card-vof' + p.id + num}
                >
                  <div
                    className='vof-listado'>
                    <div>
                      {`${1 + num}) ${preg.pregunta}`}
                    </div>
                    <div
                      className='vof-inputs'>
                      <div
                        className='vof-vf'>
                        <input
                          value={true}
                          name={`vof${num}${p.id}`}
                          id={`verdadero${num}${p.id}`}
                          type="radio" />
                        <label for={`verdadero${num}${p.id}`}>
                          {"  "}V
                        </label>
                      </div>
                      <div
                        className='vof-vf'>
                        <input
                          value={false}
                          name={`vof${num}${p.id}`}
                          id={`falso${num}${p.id}`}
                          type="radio" />
                        <label for={`falso${num}${p.id}`}>
                          {"  "}F
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    id={`respuesta-${p.id}${num}`}
                    className='respuesta-hide show-element'>

                    <span style={{ "color": "red" }} className='hide' id={`incorrecto-${p.id}${num}`}>✘</span>
                    <span style={{ "color": "green" }} className='hide' id={`correcto-${p.id}${num}`}>✓</span>
                    <p>La respuesta correcta es: {p.arrayPreguntas[num].vof === "true" ? "verdadero" : "falso"}</p>

                    {/* <p>{`${1 + num}) ${preg.respuesta}`}</p> */}
                    <div
                      style={{ "display": "flex", "gap": "5px" }}
                    >
                      <span>{1 + num}{") "}</span>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}>
                        {preg.respuesta}
                      </ReactMarkdown>
                    </div>
                    <hr></hr>
                  </div>
                </div>
              )
            })}
          </div>
          <div
            style={{ "textAlign": "center" }}>
            <button

              className='home-boton'
              onClick={() => checkTodas()}>
              Check
            </button>
          </div>
        </div>
      }
    </div>

  )
}
