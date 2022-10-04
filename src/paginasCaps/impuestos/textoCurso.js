import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function TextoCurso(props) {

  const {seccion} = props;
  const {enunciado} = props

  console.log(enunciado)
  return (
    <div>
    <h1>
      {seccion}    
    </h1>
    <br></br>
        <div>
      {enunciado === undefined || enunciado[0].enunciado === undefined || enunciado[0].enunciado.length === 0 ? "" :
      enunciado[0].enunciado.map((e, num) => {
        if(typeof e === `string`) {
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
        } else if (e.destacar) {
          return (
            <div className="destacar show-element"
            key={seccion+num}>
            <ReactMarkdown 
            remarkPlugins={[remarkGfm]}>                          
              {e.destacar} 
            </ReactMarkdown>    
            </div>
          )
        } else {
              return (
                <div
                key={seccion+num}>
                </div>
              )
            } 
      } 
    )
      
      } 
      </div>
    </div>
  )
}