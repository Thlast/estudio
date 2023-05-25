import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { getCapitulos, obtenerDetalleCurso } from './servicios/cursos/obtenerCurso';
import { obtenerDatosTitulos } from './servicios/cursos/obtenerSeccion';
import { Spinner } from './Login/Spinner';
import style from '../modulos-css/Curso.module.css'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Secciones } from './listarSecciones';

export function Curso() {

  const [cargando, setCargando] = useState(true)
  const { curso } = useParams();
  const [curs, setCurs] = useState([]);
  const { focus } = useParams();
  const [datosCaps, setDatosCaps] = useState([]);

  useEffect(() => {

    setCargando(true)
    obtenerDetalleCurso(curso)
      .then(data => {
        //console.log(data)
        setCurs(data)
      });
    obtenerDatosTitulos(curso)
      .then(data => {
        //console.log(data)
        setDatosCaps(data)
        setCargando(false)
      }
      )


  }, [])

  const asd = () => {
    setTimeout(() => {
      if (document.getElementById(focus)) {
        document.getElementById(focus).scrollIntoView()
      }
    }, 200)
  }

  useEffect(() => {

    asd()

  }, [document.getElementById(focus)], cargando)

  const most = (e) => {
    document.getElementById("capitulo" + e).style.display = 'block';
    document.getElementById("mostrar" + e).style.display = 'none';
    document.getElementById("ocultar" + e).style.display = 'block';
  }
  const ocultar = (e) => {
    document.getElementById("capitulo" + e).style.display = 'none';
    document.getElementById("mostrar" + e).style.display = 'block';
    document.getElementById("ocultar" + e).style.display = 'none';
  }

  return (
    <div className="App">

      <div className={style.cursolistado}>

        <Link
          className={style.volver}
          to={"/cursos"}>
          {"<"} Volver a cursos
        </Link>
        <div class="cursos-container">
          <div class='cursos-descripcion'>
            <a
              rel="noopener noreferrer"
              href={`/imprimirResumen/${curso}`}
              target="_blank"
              className='home-boton'
              style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <svg
                style={{ width: 24 }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zm-16-88c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z" />
              </svg>
              Imprimir resumen
            </a>

            {curs?.map((t, num) => {
              return (
                <div
                  key={"curso-descripcion-" + t.nombre + num}>

                  <h1>
                    {t.nombre}
                  </h1>

                  <div class="bloque-descripcion">
                    {t.descripcion}

                  </div>
                </div>
              )
            }
            )}
            <Secciones />
            {cargando ? <Spinner /> :
              <div class='curso-capitulos-contenedor'>
                <hr></hr>
                Del archivo fijo:
                {datosCaps ?
                  datosCaps?.map((s, num) => {

                    return (
                      <div
                        key={s.CapituloId}
                        id={s.CapituloId}
                        class="cuadro-curso">
                        <div class="bloque-curso">
                          <h3>
                            {s.titulo}
                          </h3>
                        </div>
                        <div class="bloque-descripcion">
                          <ReactMarkdown>{s.descripcion}</ReactMarkdown>
                          <p>Bibliografia:</p>
                          <ul>
                            {s.bibliografia.map((b, i) => {
                              return <li
                                key={i + "-" + s.titulo + "-bib"}>
                                {b}
                              </li>
                            })}
                          </ul>
                        </div>

                        <div class="boton-curso">
                          <button
                            class="show boton-curso"
                            id={"mostrar" + num}
                            onClick={() => most(num)}>
                            Expandir
                          </button>
                          <button
                            class="hide boton-curso"
                            id={"ocultar" + num}
                            onClick={() => ocultar(num)}>
                            Ocultar
                          </button>
                        </div>
                        <ul
                          className={style.contenedor}
                          id={"capitulo" + num}>
                          {s.secciones.map((sec, num) => {
                            return (
                              <Link
                                key={sec.SeccionId}
                                className={style.seccion}
                                to={`/cursos/${curso}/${s.titulo}/${sec.nombre}`}>
                                {sec.nombre}
                              </Link>
                            )
                          })}
                        </ul>
                      </div>

                    )

                  }
                  ) : null
                }

              </div>
            }

          </div>

        </div>

      </div>
    </div>
  )
}