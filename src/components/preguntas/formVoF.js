import { useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ResueltasContext } from '../../context/Resueltas'
import { alertafail, alertainfo, alertasuccess } from '../alertas'

export function VoF(props) {

//   const {agregarHistorial} = useContext(ResueltasContext)
  const {p} = props
  const {num} = props

  const checkRespuesta = async (preg, num, id) => {
    try {
    const respuesta = document.querySelector(`input[name=vof${num}${id}]:checked`).value;
    if(respuesta === preg.vof) {
      await alertasuccess("Respuesta correcta")
      document.getElementById(`respuesta-${id}${num}`).style.display = 'block'
      document.getElementById(`correcto-${id}${num}`).style.display = 'block'
      
      // agregarHistorial(id)
      // localStorage.setItem("listaResueltas", lista)
    } else if (respuesta === null || undefined) {
      alertainfo("debe seleccionar una respuesta") 
    }
    else {
      alertafail("Respuesta incorrecta")
      document.getElementById(`respuesta-${id}${num}`).style.display = 'block'
      document.getElementById(`incorrecto-${id}${num}`).style.display = 'block'
    }
    } catch (error) {
        
        console.log(error)
    }
  }
  const checkTodas = () => {
    try {
      for(let i = 0; i < p.arrayPreguntas.length; i++) {
      checkRespuesta(p.arrayPreguntas[i], i, p.id)
      }
    
    } catch (error) {
        
        console.log(error)
    }
  }

  return (
      <div
      className='contenedor-opciones'>
        {p.tipo === "vof" &&
        <div>
      <div
      className='preguntas-vof'>
      {p.arrayPreguntas.map((preg, num) => {
        return (
            <div
            id={p.id}
            key={'card-vof'+p.id+num}
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
          
            <span className='hide' id={`incorrecto-${p.id}${num}`}>✘</span>
            <span className='hide' id={`correcto-${p.id}${num}`}>✓</span>
            <p>La respuesta correcta es: {p.arrayPreguntas[num].vof === "true" ? "verdadero" : "falso"}</p>
          
          <p>{`${1 + num}) ${preg.respuesta}`}</p>
          <hr></hr>
          <ReactMarkdown
          remarkPlugins={[remarkGfm]}>
          {p.respuesta}
          </ReactMarkdown>
          </div>    
            </div>
        )
      })}
      </div>
      <button
              className='home-boton'
              onClick={() => checkTodas()}>
                Check
              </button>
      </div>
}    
      </div>
      
  )
}
