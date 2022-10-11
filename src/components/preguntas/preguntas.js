import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Anexar } from './anexar'
import { Opciones } from './opcionesMultiples'
import { Respuesta } from './respuesta'


export function Preguntas(props) {

  const {edit} = props
  const {irModificarPregunta} = props
  const {eliminar} = props
  const {p} = props
  const {num} = props
  const {integral} = props


  return (
      <div
      className='cuadro cuadro-pregunta'
      id={p.id}
      key={p.id}>
        <Anexar 
        p={p}
        />
        <div
        className='pregunta-encabezado'>
      <p>
       Pregunta Nº {1 + num}:
       </p>
       </div>
       <ReactMarkdown
        remarkPlugins={[remarkGfm]}>
        {p.pregunta}
        </ReactMarkdown>
        
        {integral &&
       <Respuesta 
         p={p}/>}
        {integral &&
        p.tipo === "Multiple" &&
        <Opciones 
        p={p}
        num={num}
        />
      
      }
       {edit &&
      <div
      className='botones-editar'>
      <button
      onClick={() => irModificarPregunta(p, num)}
      className='btn btn-primary'>
        Modificar
      </button>
      <button
      onClick={() => (eliminar(p.id))}
      className='btn btn-danger'>
        Eliminar
      </button>
      </div> 
      
  }
      </div>
  )
}
