import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { alertafail, alertainfo, alertasuccess } from '../alertas'


export function Opciones(props) {


  const {p} = props
  const {num} = props

  const checkRespuesta = (c, num, id) => {
    try {
    const respuesta = document.querySelector(`input[name=opciones${num}]:checked`).value;
    if(respuesta === c) {
     alertasuccess("Respuesta correcta")
      document.getElementById(`respuesta-${id}`).style.display = 'block'
    } else {
      alertafail("Respuesta incorrecta")
    }
    } catch (error) {
        alertainfo("debe seleccionar una respuesta") 
    }
  }

  return (
      <div
      className='contenedor-opciones'>
        {p.tipo === "Multiple" &&
      <div
      className='opciones'>
      <label>
      <input name={`opciones${num}`} type="radio" value="a"/>
      {`a) ${p.opciones.a}`}  
      </label>
      <label>           
      <input name={`opciones${num}`} type="radio" value="b"/>
      {`b) ${p.opciones.b}`}
      </label>   
      <label>          
      <input name={`opciones${num}`} type="radio" value="c"/>
      {`c) ${p.opciones.c}`}
      </label>
      <label>
      <input name={`opciones${num}`} type="radio" value="d"/>
      {`d) ${p.opciones.d}`}
      </label>
      <button
      className='home-boton'
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
