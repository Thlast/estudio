import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Anexar } from './anexar'
import { Opciones } from './opcionesMultiples'
import { Respuesta } from './respuesta'
import { ResueltasContext } from '../../context/Resueltas'
import { useContext } from 'react'
import { VoF } from './formVoF'
import { useAuth } from '../../context/AuthContext'
import { Resultado } from './resultado'

export function Preguntas(props) {

  const {user} = useAuth()
  const {completadas} = useContext(ResueltasContext)
  const {edit} = props
  const {irModificarPregunta} = props
  const {eliminar} = props
  const {p} = props
  const {num} = props
  const {integral} = props
  const {irModificarVof} = props
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
        {p.resultado ? 
        <Resultado 
        c={p.resultado}
        id={p.id}
        num={num}
        />
        : null
        }
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
       {integral &&
        p.tipo === "vof" &&
        <VoF 
        p={p}
        />
      
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
  )
}
