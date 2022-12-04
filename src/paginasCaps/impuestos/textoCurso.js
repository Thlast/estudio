import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function TextoCurso(props) {

  const {seccion} = props;
  const {enunciado} = props

 
  return (
    <div>
    <h1>
      {seccion}    
    </h1>
    <br></br>
        <div>
      {enunciado === undefined || enunciado[0].enunciado === undefined || enunciado[0].enunciado.length === 0 ? null :
      enunciado[0].enunciado.map((e, num) => {
        
          return (
            <div
            className='show-element'
            key={seccion+num}>
            <ReactMarkdown 
            remarkPlugins={[remarkGfm]}>  
            {e}   
            </ReactMarkdown>   
            </div>                 
          )
      } 
    )
      
      } 
      </div>
    </div>
  )
}