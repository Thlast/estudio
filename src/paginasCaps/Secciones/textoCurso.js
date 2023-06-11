import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { InformeAuditor } from '../../components/informeAuditor';
import { obtenerDatosSeccion } from '../../components/servicios/cursos/obtenerSeccion';
import { Spinner } from '../../components/Login/Spinner';
import { useNavigate } from 'react-router-dom';
import { Articulos } from '../../components/dataInformes/articulos';

export function TextoCurso(props) {

  const { seccion } = props;
  const { curso } = props;
  const { titulo } = props;
  const [enunciado, setEnunciado] = useState()
  const [cargando, setCargando] = useState(false)
  const [mostrarRT, setMostrarRT] = useState(false)
  const { recargarFuncionClickcode } = props
  const navigate = useNavigate()

  const cargarPagina = async ({ signal }) => {
    setCargando(true)
    obtenerDatosSeccion(curso, seccion, titulo, { signal })
      .then(data => {
        setEnunciado(data)
        setCargando(false)
        recargarFuncionClickcode()
      }
      ).catch(error => {
        console.log(error);
        navigate("/Error404", { state: { mensaje: `No se encontro la seccion ${seccion} o no corresponde al capítulo ${titulo}` } })
      });
  }

  useEffect(() => {
    setEnunciado();

    if (titulo == "Listado de Resoluciones técnicas") {
      setMostrarRT(true)
    }
    else {
      setMostrarRT(false)
      // Creamos el controlador para abortar la petición
      const controller = new AbortController()
      // Recuperamos la señal del controlador
      const { signal } = controller
      // Hacemos la petición a la API y le pasamos como options la señal
      cargarPagina({ signal })
      return () => controller.abort()

    }
  }, [seccion])
  
  return (
    <>
      {
        mostrarRT ? <Articulos articulo={seccion} recargarFuncionClickcode={recargarFuncionClickcode} />
          :

          cargando ? <Spinner></Spinner> :
            <div>
              <h1>
                {seccion}
              </h1>
              {/* {
            seccion == "Informes de auditor" ? <InformeAuditor recargarFuncionClickcode={recargarFuncionClickcode} /> : null
          } */}

              <br></br>
              <div>
                {enunciado?.length == 0 ? null :
                  enunciado?.map(a => {
                    return (
                      <>
                        {a.enunciado?.map((e, num) => {

                          return (
                            <>
                              <div
                                className='show-element'
                                key={seccion + num}>
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm]}>
                                  {e}
                                </ReactMarkdown>
                              </div>
                            </>
                          )
                        }
                        )
                        }
                        {
                          <blockquote>
                            id: {a.SeccionId}
                          </blockquote>
                        }
                      </>
                    )
                  })


                }
              </div>
            </div>
      }
    </>
  )
}