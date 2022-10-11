import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


export function Respuesta(props) {

  const {p} = props
  const mostrar = (id) => {
    document.getElementById("respuesta-"+id).style.display = 'block';
    document.getElementById("ocultar-"+id).style.display = 'block';
    document.getElementById("mostrar-"+id).style.display = 'none';
  }
  const ocultar = (id) => {
    document.getElementById("respuesta-"+id).style.display = 'none';
    document.getElementById("mostrar-"+id).style.display = 'block';
    document.getElementById("ocultar-"+id).style.display = 'none';
  }

    return (
      <div>
      {p.tipo === "Normal" &&
        <div>
      <div>
      <button
        className='boton respuesta-show'
        id={"mostrar-"+p.id}
        onClick={() => mostrar(p.id)}>
        Mostrar Respuesta
      </button>
      <button
        className='boton respuesta-hide'
        id={"ocultar-"+p.id}
        onClick={() => ocultar(p.id)}>
        Ocultar Respuesta
      </button>
      </div>
      <div
      id={"respuesta-"+p.id}
      className='respuesta-hide show-element'>
        <hr></hr>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}>
        {p.respuesta}
      </ReactMarkdown>
      </div>            
      </div>
      }
    </div>
    )
}

