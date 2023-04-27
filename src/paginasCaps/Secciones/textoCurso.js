import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { InformeAuditor } from '../../components/informeAuditor';
import { obtenerDatosSeccion } from '../../components/servicios/cursos/obtenerSeccion';
import { Spinner } from '../../components/Login/Spinner';

export function TextoCurso(props) {

  const { seccion } = props;
  const { curso } = props;
  const { titulo } = props;
  const [enunciado, setEnunciado] = useState()
  const [cargando, setCargando] = useState(false)
  const { recargarFuncionClickcode } = props

  const cargarPagina = async ({ signal }) => {
    setCargando(true)
    await obtenerDatosSeccion(curso, seccion, titulo, { signal })
      .then(data => {
        setEnunciado(data)
        setCargando(false)
      }
      );
    recargarFuncionClickcode()

  }

  useEffect(() => {
  
    setEnunciado();
    // Creamos el controlador para abortar la petición
    const controller = new AbortController()
    // Recuperamos la señal del controlador
    const { signal } = controller
    // Hacemos la petición a la API y le pasamos como options la señal
    cargarPagina({ signal })
    return () => controller.abort()
  }, [seccion])


  return (
    <>
      {cargando ? <Spinner></Spinner> :
        <div>
          <h1>
            {seccion}
          </h1>
          {
            seccion == "Informes de auditor" ? <InformeAuditor recargarFuncionClickcode={recargarFuncionClickcode} /> : null
          }

          <br></br>
          <div>
            {enunciado === undefined || enunciado[0].enunciado === undefined || enunciado[0].enunciado.length === 0 ? null :
              enunciado[0].enunciado.map((e, num) => {

                return (
                  <div
                    className='show-element'
                    key={seccion + num}>
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
      }
    </>
  )
}