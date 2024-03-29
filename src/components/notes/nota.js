import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Nota(props) {

  const { n } = props;
  const { indice } = props;
  const { seccion, seccionId } = props;
  const { irModificarNota } = props;
  const { notaEliminada } = props;
  const { user } = useAuth()

  return (
    <div
      key={"nota-" + n.id}
    >
      {seccion || seccionId ? null :
      <>
      <div>
        <span>
          {n.seccion &&
            <>
              {n.capitulo + " → "}

              <Link
                style={{ textDecoration: "underline" }}
                to={`/cursos/${n.curso}/${n.capitulo}/${n.seccion}`}>
                {n.seccion}
              </Link>
            </>
          }
           </span>
           </div>
           <div>
           <span>
          {n.SeccionId &&
            <>
              {n.CapituloNombre + " → "}
              <Link
                style={{ textDecoration: "underline" }}
                to={`/cursosSQL/${n.curso}/${n.CapituloId}/${n.CapituloNombre}/${n.SeccionId}`}>
                {n.SeccionNombre}
              </Link>
            </>
          }
       </span>
       </div>
       </>
      }
      <div
        className="cuadro cuadro-pregunta"
        style={{ padding: "20px" }}
      >
        <span
          style={{ textAlign: "left" }}
        >{n.privateStatus == "true" ? "🔐" : "🔓"} Nota: {indice + 1}</span>

        <h3
          style={{ textAlign: "center", textDecoration: "underline" }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}>
            {n.name}
          </ReactMarkdown>
        </h3>

        <div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}>
            {n.contenido}
          </ReactMarkdown>

        </div>
        <div
          className='botones-editar'>
          {n.user_id == user.uid ?
            <div>
              <button
                onClick={() => irModificarNota(n, indice)}
                className='btn btn-primary'>
                Modificar
              </button>
              <button
                onClick={() => notaEliminada(n.id, n.user_id)}
                className='btn btn-danger'>
                Eliminar
              </button>
            </div>
            : null
          }
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
