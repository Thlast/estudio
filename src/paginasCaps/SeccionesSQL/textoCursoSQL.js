import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { InformeAuditor } from '../../components/informeAuditor';
import { Spinner } from '../../components/Login/Spinner';
import { getSeccionPorId } from '../../components/servicios/cursos/obtenerSeccion';
import { CardSkeleton } from '../../modulos-css/esqueletoSeccion';

export function TextoCursoSQL(props) {

  const { mobile } = props;
  const { contenidoSeccion } = props;
  const {cargando} = props;
  const { recargarFuncionClickcode } = props


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