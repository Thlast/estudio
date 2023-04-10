import { useEffect, useState } from 'react';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from 'remark-gfm'
import { FormCrearDef } from './crearDef';

export function MostrarDef(props) {

  const { def } = props;
  const { curso } = props;
  const { dic } = props;
  const { recargarFuncionClickcode } = props;
  const [habilitarAgregarDef, setHabilitarAgregarDef] = useState(false)

  useEffect(() => {
    if(recargarFuncionClickcode){
      recargarFuncionClickcode()
    }

  }, [def])
  
  return (
    <>
      {def && dic ?

        <div className='def-contenedor'>
          Definición:
          <h1>
            {def.nombreConcepto}
          </h1>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}>
            {def.definicion}
          </ReactMarkdown>
          <div style={{display: "flex", gap: "5px"}}><span>Fuente:</span><ReactMarkdown>{def.fuente}</ReactMarkdown></div>
          <div style={{display: "flex", gap: "5px"}}><span>Curso:</span><ReactMarkdown>{def.curso}</ReactMarkdown></div>
          <button
            onClick={() => setHabilitarAgregarDef(!habilitarAgregarDef)}
            className="home-boton">
            Modificar
          </button>
          
          {habilitarAgregarDef ?
            <FormCrearDef dic={dic} curso={curso} def={def} />
            : null
          }
        </div>
        :
        <>
        {
          dic && def ?
          <>
          No existe la definición:{" "}
          <button
            className='home-boton'
            onClick={() => setHabilitarAgregarDef(!habilitarAgregarDef)}>
            ¿Agregar?
          </button>
          
          {habilitarAgregarDef ?
            <FormCrearDef dic={dic} curso={curso} def={def} />
            : null
          }
          </> 
          :
          <></>
        }
        </>
      }

    </>
  )
}