import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Anexar } from './anexar'
import { Opciones } from './opcionesMultiples'
import { Respuesta } from './respuesta'
import { ResueltasContext } from '../../context/Resueltas'
import { useContext } from 'react'

export function Preguntas(props) {

  const {completadas} = useContext(ResueltasContext)
  const {edit} = props
  const {irModificarPregunta} = props
  const {eliminar} = props
  const {p} = props
  const {num} = props
  const {integral} = props

  // console.log(completadas[0])

  return (
      <div
      className='cuadro cuadro-pregunta'
      id={p.id}
      key={p.id}>
       {completadas.length === 0 ? <circle></circle> :
       completadas.indexOf(p.id) !== -1 ?
        <circle
        className='resuelta'>
        ✓
        </circle>
        :
        <circle>

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
        // completadas={completadas}
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
