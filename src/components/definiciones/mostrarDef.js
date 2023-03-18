import { useState } from 'react';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from 'remark-gfm'
import { FormCrearDef } from './crearDef';

export function MostrarDef(props) {

  const { def } = props;
  const { curso } = props;
  const { dic } = props;
  const [habilitarAgregarDef, setHabilitarAgregarDef] = useState(false)

  return (
    <>
      {def ?
        <>
          Definición:
          <h1>
            {def.nombreConcepto}
          </h1>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}>
            {def.definicion}
          </ReactMarkdown>
          <p>Fuente: {def.fuente}</p>
          <p>Curso: {def.curso}</p>
          <button
            onClick={() => setHabilitarAgregarDef(!habilitarAgregarDef)}
            className="home-boton">
            Modificar
          </button>
          
          {habilitarAgregarDef ?
            <FormCrearDef dic={dic} curso={curso} def={def} />
            : null
          }
        </>
        :
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
      }

    </>
  )
}