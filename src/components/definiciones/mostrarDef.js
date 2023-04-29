import { useEffect, useState } from 'react';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from 'remark-gfm'
import { FormCrearDef } from './crearDef';
import { getDef } from '../servicios/definiciones/service.getDef';
import { Spinner } from '../Login/Spinner';

export function MostrarDef(props) {

  const [def, setDef] = useState();
  const [cargando, setCargando] = useState(false);
  const { curso } = props;
  const { dic } = props;
  const { recargarFuncionClickcode } = props;
  const [habilitarAgregarDef, setHabilitarAgregarDef] = useState(false)

  useEffect(() => {

    if (dic) {
      setDef()
      setCargando(true)
    }

    if(dic !== "" && dic){
    // Creamos el controlador para abortar la petición
    const controller = new AbortController()
    // Recuperamos la señal del controlador
    const { signal } = controller
    // Hacemos la petición a la API y le pasamos como options la señal

    getDef(dic, { signal }).then(data => (
      setDef(data[0]),
      setCargando(false),
      recargarFuncionClickcode()
    ))

    return () => controller.abort()
    }
  }, [dic])

  return (
    <>
      {cargando ? <Spinner></Spinner> :
        <>
          {def && dic ?

            <div className='def-contenedor show-element'>
              Definición:
              <h1>
                {def.nombreConcepto}
              </h1>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}>
                {def.definicion}
              </ReactMarkdown>
              <div style={{ display: "flex", gap: "5px" }}><span>Fuente:</span><ReactMarkdown>{def.fuente}</ReactMarkdown></div>
              <div style={{ display: "flex", gap: "5px" }}><span>Curso:</span><ReactMarkdown>{def.curso}</ReactMarkdown></div>
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
                dic ?
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
      }
    </>
  )
}