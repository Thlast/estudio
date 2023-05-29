import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MostrarDef } from '../components/definiciones/mostrarDef';
import { getSeccionConsola, obtenerDatosConsola } from '../components/servicios/cursos/obtenerSeccion';
import { getSeccionPorId } from '../components/servicios/cursos/obtenerSeccion';
import { Articulos } from '../components/dataInformes/articulos';
import { buscarConsolaSQL } from '../components/servicios/cursos/cursosSQL/buscarSeccion';

export function Consola(props) {

  const [datos, setDatos] = useState()
  const [datosSeccion, setDatosSeccion] = useState()
  const { curso } = props;
  const { dic } = props;
  const { buscarSeccionId, pasarSeccionId } = props;
  const { eliminarDelHistorial } = props;
  const { limpiarHistorial } = props;
  const { enconsola } = props;
  const [cargando, setCargando] = useState(false)
  const [articulo, setArticulo] = useState(false)
  const { recargarFuncionClickcode } = props;

  const url = process.env.REACT_APP_PROYECT_PRODUCTION_URL || process.env.REACT_APP_PROYECT_LOCAL_URL

  useEffect(() => {
    if (dic) {
      pasarSeccionId()
      setArticulo()
      setDatos()
      setDatosSeccion()
      pasarSeccionId()
      setCargando(true)
    }


    if (dic !== "" & !(dic.includes("artículo") || dic.includes("articulo"))) {
      buscarConsolaSQL(curso, dic)
        .then(data => {
          setDatosSeccion(data)
          recargarFuncionClickcode()
        });
      // Creamos el controlador para abortar la petición
      const controller = new AbortController()
      // Recuperamos la señal del controlador
      const { signal } = controller
      // Hacemos la petición a la API y le pasamos como options la señal
      obtenerDatosConsola(curso, dic, { signal })
        .then(data => (setDatos(data),
          setCargando(false),
          recargarFuncionClickcode()
        ));

      //setCargando(false)
      return () => controller.abort()
    } 
    //buscar articulos si el curso=impuestos
    else if (curso == "impuestos" && (dic.includes("artículo") || dic.includes("articulo"))) {
      
      setArticulo(dic)
    }
  }, [dic])

  //esto es por si limipio la consola desde Secciones
  useEffect(() => {
    if (!dic && !buscarSeccionId) {
      setArticulo()
      setDatosSeccion()
    }

  }, [dic, buscarSeccionId])

//console.log(dic)
  //cuando le paso directo el id del SVG
  useEffect(() => {
    if (buscarSeccionId) {
      setArticulo()
      // setDatos()
      // setDatosSeccion()
      setCargando(true)
    }

    if (buscarSeccionId) {
      // const controller = new AbortController()
      // const { signal } = controller
      getSeccionConsola(buscarSeccionId)
        .then(data => (setDatosSeccion(data),
          setCargando(false),
          recargarFuncionClickcode()
        ));

      //return () => controller.abort()
    }
  }, [buscarSeccionId])

  useEffect(() => {
    document.getElementById("consol").scrollIntoView({ behavior: 'smooth' });
  }, [datos, dic])

  return (
    <div>
      <div
        id="consol"
        className="navconsola">
        <p>
          {/* {cargando ?
            <div className='consolacargando'>
              <Spinner></Spinner>
            </div>
            :
            null
          } */}
          <button
            className="botonhistorial"
            onClick={() => limpiarHistorial()}
          >X
          </button>Visto reciente:{" "}
          {enconsola.map((a, num) => {
            return (
              <span
                key={`historial-${a}`}>
                <button
                  className="botonhistorial"
                  onClick={() => eliminarDelHistorial(a)}
                >X
                </button>
                <code
                  className="aa">
                  {a}
                </code>
              </span>
            )
          })}
        </p>
        <p className="enconsola">
          Consola:
          {" " + dic}
        </p>
      </div>
      <div
        className="consola">

        <>
          {/* si existen definiciones se renderizan: */}
          {articulo ?
            <Articulos articulo={articulo} />
            :
            <>
              <MostrarDef
                recargarFuncionClickcode={recargarFuncionClickcode}
                curso={curso}
                dic={dic} />
              <hr></hr>
            </>
          }

          {
            datosSeccion ? <>
              {datosSeccion?.map(s => {
                return (
                  <div
                    key={"consola" + buscarSeccionId}
                    class="show-element">
                    <h1>{s.SeccionNombre}</h1>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}>
                      {s.SeccionContenido}
                    </ReactMarkdown>
                    <br></br>
                    <blockquote>Link a la sección:
                      <em
                        style={{ textDecoration: "underline" }}>
                        <a
                          target="_blank"
                          href={`${url}/cursosSQL/${curso}/${s.CapituloId}/${s.CapituloNombre}/${s.SeccionId}`}>
                          {" "}{s.SeccionNombre}
                        </a>
                      </em>
                    </blockquote>
                    <hr></hr>

                  </div>
                )
              })}


            </> : null
          }
          {/*^^si existen definiciones se renderizan:^^*/}
          {cargando ? null :
            datos?.[0] ?
              datos[0].seccion.enunciado.length == 0 || dic === "" ? null :
                <>
                  {datos[0].seccion.enunciado.map((b, num) => {
                    return (
                      <div
                        key={"consola" + dic + num}
                        class="show-element">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}>
                          {b}
                        </ReactMarkdown>
                      </div>
                    )
                  })
                  }
                  <br></br>
                  <blockquote>Link a la sección:
                    <em
                      style={{ textDecoration: "underline" }}>
                      <a
                        target="_blank"
                        href={`${url}/cursos/${datos[0].curso}/${datos[0].capitulo}/${datos[0].seccion.nombre}`}>
                        {" "}{datos[0].seccion.nombre}
                      </a>
                    </em>
                  </blockquote>
                  <hr></hr>
                </>
              : null}

        </>

      </div>

    </div>
  )
}