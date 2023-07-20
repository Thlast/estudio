import { useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ResueltasContext } from '../../context/Resueltas'
import { alertafail, alertainfo, alertasuccess } from '../alertas'
import { UserConfig } from '../../context/UserConfig'


export function Opciones(props) {
  
  const {confetti} = useContext(UserConfig)
  const {agregarResueltasContext} = useContext(ResueltasContext)
  const {p} = props
  const {num} = props

  const checkRespuesta = async (c, num, id) => {
    try {
    const respuesta = document.querySelector(`input[name=opciones${num}-${id}]:checked`).value;
    if(respuesta === c) {
      alertasuccess("Respuesta correcta", confetti)
      document.getElementById(`respuesta-${id}`).style.display = 'block'
      agregarResueltasContext(10, p.curso, p.id)
      //agregarHistorial(id)
      // localStorage.setItem("listaResueltas", lista)
    } else if (respuesta === null || undefined) {
      alertainfo("debe seleccionar una respuesta") 
    }
    else {
      alertafail("Respuesta incorrecta")
    }
    } catch (error) {
        
        console.log(error)
    }
  }

  return (
      <div
      className='contenedor-opciones'>
        {p.tipo === "Multiple" &&
        <div>
        <div>
      <div
      className='opciones'>
      <label>
      <input name={`opciones${num}-${p.id}`} type="radio" value="a"/>
      <span>a)</span><ReactMarkdown>{p.opciones.a}</ReactMarkdown>
      </label>
      <label>          
      <input name={`opciones${num}-${p.id}`} type="radio" value="c"/>
      <span>c)</span><ReactMarkdown>{p.opciones.c}</ReactMarkdown>
      </label>
      <label>           
      <input name={`opciones${num}-${p.id}`} type="radio" value="b"/>
      <span>b)</span><ReactMarkdown>{p.opciones.b}</ReactMarkdown>
      </label>   
      <label>
      <input name={`opciones${num}-${p.id}`} type="radio" value="d"/>
      <span>d)</span><ReactMarkdown>{p.opciones.d}</ReactMarkdown>
      </label>
      </div>
      
      </div>
      <button
      className='home-boton controlar'
      onClick={() => checkRespuesta(p.correcta, num, p.id)}>
      Controlar
      </button>
      </div>
}

      
      <div
      id={`respuesta-${p.id}`}
      className='respuesta-hide show-element'>
      <p>La respuesta correcta es: {p.correcta}</p>
      <hr></hr>
      <ReactMarkdown
      remarkPlugins={[remarkGfm]}>
      {p.respuesta}
      </ReactMarkdown>
      </div>        
      </div>
      
  )
}
