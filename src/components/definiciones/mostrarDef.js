import {useState} from 'react';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from 'remark-gfm'

export function MostrarDef(props) {

  const {def} = props;
  const {mostrarForm} = props;
  const [habilitarModificar, setHabilitarModificar] = useState(false)

  return (
    <>
    Definición:
    <h1>
    {def.nombreConcepto}
    </h1>
    <ReactMarkdown
    remarkPlugins={[remarkGfm]}>
    {def.definicion}
    </ReactMarkdown>
    <button
    onClick={() => mostrarForm()}
    className="home-boton">
      Modificar
    </button>
    </>
  )
}