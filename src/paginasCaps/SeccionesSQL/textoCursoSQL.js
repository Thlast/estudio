import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CardSkeleton } from '../../modulos-css/esqueletoSeccion';

export function TextoCursoSQL(props) {

  const { contenidoSeccion } = props;
  const {cargando} = props;

  return (
    <>
      {cargando ? <CardSkeleton /> :
        <div>
          {/* {mobile ? */}
            <h1>
              {contenidoSeccion?.SeccionNombre}
            </h1> 
            {/* :
            null
          } */}


          <br></br>
          <div
            className='show-element'
            key={"texto-" + contenidoSeccion?.SeccionId}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}>
              {contenidoSeccion?.SeccionContenido}
            </ReactMarkdown>
          </div>
        </div>
      }
    </>
  )
}