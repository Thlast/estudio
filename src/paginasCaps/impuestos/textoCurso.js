import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { InformeAuditor } from '../../components/informeAuditor';

export function TextoCurso(props) {

  const {seccion} = props;
  const {enunciado} = props
 
  return (
    <div>
    <h1>
      {seccion}    
    </h1>
    {
      seccion == "Informes de auditor" ? <InformeAuditor /> : null
    }
    
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