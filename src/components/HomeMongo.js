import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { obtenerLongitudPreguntas, obtenerPreguntaMateria, obtenerPreguntaMateriaPorIndice } from './servicios/preguntas/obtenerPregunta';
import { Spinner } from './Login/Spinner';
import { Link } from 'react-router-dom';
import { alertainfo, alertareiniciar } from './alertas';
import { MateriasContext } from '../context/MateriasContext';
import { Preguntas } from './preguntas/preguntas';
import { Opciones } from './preguntas/opcionesMultiples';
import { VoF } from './preguntas/formVoF';
import { SelectMateria } from './selectMateria';
import { ResueltasContext } from '../context/Resueltas';
import { ProgressCircle } from './porcentajeProgreso';

export function HomeMongo() {

  const { cargandoMaterias, cargarMaterias, preferenciaMateria, materias, matPreferida,
    identificarCurso,
    historialeshistorial,
    historialesagregar,
    historialesreiniciarh, materiasIndices } = useContext(MateriasContext);
  const { totalResueltas } = useContext(ResueltasContext)
  const [preguntas, setPreguntas] = useState([]);
  const [longitudPreguntas, setLongitudPreguntas] = useState();
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  const [cargando, setCargando] = useState(false);

  const { loading } = useAuth()
  const [numeroBuscar, setNumeroBuscar] = useState(1)
  const [recargar, setRecargar] = useState(false)

  const cargarHome = async () => {
    //setCargando(true)
    setRecargar(false)
    if (materias.length == 0) {
      await cargarMaterias()
    }

    await obtenerLongitudPreguntas(matPreferida).then(data => {
      if (data !== "error del servidor") {
        setLongitudPreguntas(data)
      } else {
        setRecargar(true)
      }
    })

    await identificarCurso().then(async resp => {
      if (resp == undefined) {
        setRecargar(true)
      } else {
        await obtenerPreguntaPorIndice(matPreferida, historialeshistorial[resp][historialeshistorial[resp]?.length - 1])
        setCurrent(historialeshistorial[resp][historialeshistorial[resp]?.length - 1])
      }
    }
    )
  }

  const obtenerPreguntaPorIndice = async (mat, c) => {
    setCargando(true)
    await obtenerPreguntaMateriaPorIndice(mat, c)
      .then(data => {
        if (data !== "error del servidor") {
          if (data.error) {
            setCargando(false)
            alertainfo(data.error)
          } else if (data.length == 0) {
            setCargando(false)
            setRecargar(true)
          }
          else {
            setCargando(false)
            setPreguntas([data])
          }
        } else {
          setCargando(false)
          setRecargar(true)
        }
      }
      )
  }

  useEffect(() => {
    cargarHome()

  }, [matPreferida])


  // const identificarCurso = async () => {
  //   return materiasIndices?.indexOf(matPreferida);
  // };

  const funcionreiniciar = async () => {
    await identificarCurso().then(resp => historialesreiniciarh(current, resp))
  }

  const reiniciar = () => {
    alertareiniciar(funcionreiniciar)
  }

  const random = async () => {
    if (longitudPreguntas > 0) {

      const indice = Math.floor(Math.random() * longitudPreguntas)
      await identificarCurso().then(resp => {
        //console.log(historialeshistorial[resp])
        if (historialeshistorial[resp].indexOf(indice) === -1 && longitudPreguntas !== historialeshistorial[resp].length) {
          historialesagregar(indice, resp)
          setCurrent(indice)
          obtenerPreguntaPorIndice(matPreferida, indice)
        } else if (historialeshistorial[resp].indexOf(indice) !== -1 && longitudPreguntas !== historialeshistorial[resp].length) {
          random()
        } else if (longitudPreguntas === historialeshistorial[resp].length) {
          reiniciar()
        }
      })
    } else {
      alertainfo("No hay preguntas")
    }
  }

  const siguiente = async () => {
    if (longitudPreguntas > 0) {
      const indice = current + 1
      if (indice !== longitudPreguntas) {
        await identificarCurso().then(resp => historialesagregar(indice, resp));
        setCurrent(indice);
        obtenerPreguntaPorIndice(matPreferida, indice)
      } else if (indice >= longitudPreguntas) {
        alertainfo("No hay mas preguntas")
      }
      setShow(false);
    } else {
      alertainfo("No hay preguntas")
    }
  }
  const anterior = async () => {
    if (longitudPreguntas > 0) {
      const indice = current - 1
      if (indice !== -1) {
        await identificarCurso().then(resp => historialesagregar(indice, resp));
        setCurrent(indice);
        obtenerPreguntaPorIndice(matPreferida, indice)
      } else if (indice <= 0) {

      }
      setShow(false);
    }
    else {
      alertainfo("No hay preguntas")
    }
  }

  const buscarPregunta = async (event, numeroBuscar) => {
    event.preventDefault();
    const indice = parseInt(numeroBuscar) - 1
    if (indice < longitudPreguntas & indice >= 0) {
      await identificarCurso().then(resp => historialesagregar(indice, resp));
      setCurrent(indice);
      obtenerPreguntaPorIndice(matPreferida, indice)
    } else if (indice >= longitudPreguntas) {
      alertainfo("No existe la pregunta número " + numeroBuscar + ", número máximo " + longitudPreguntas)
    }
    setShow(false);
  }
  const mostrarRespuesta = (id) => {
    let estado = document.getElementById(`respuesta-${id}`).style.display

    if (estado === 'block') {
      document.getElementById(`respuesta-${id}`).style.display = 'none'
      setShow(false)
    } else {
      document.getElementById(`respuesta-${id}`).style.display = 'block'
      setShow(true)
    }
  }

  return (
    <div className="App">
      <main className="HomeMongo">
        {loading ? <Spinner></Spinner>
          :
          <div>
            <form
              className='homebuscar'>
              <div>
                <span>
                  Buscar por Nº {" "}
                </span>
                <input
                  min={1}
                  max={longitudPreguntas}
                  onChange={(e) => setNumeroBuscar(e.target.value)}
                  value={numeroBuscar}
                  type="number">
                </input>
                <button
                  className='home-botonbuscar'
                  onClick={(event) => buscarPregunta(event, numeroBuscar)}>
                  🔎
                </button>
              </div>
            </form>
            <br></br>
            <div
              className='contenedorMateriaIa'
            >
              {(totalResueltas && longitudPreguntas) ?
                <>
                <ProgressCircle progress={(Math.round((totalResueltas / longitudPreguntas) * 100))} />
                </>
                :
                <>
                <ProgressCircle progress={0} />
                </>
              }
              <div>
                <SelectMateria />
              </div>
            </div>
            <br></br>
            <div>
              <button
                class="boton home-boton"
                onClick={() => anterior()}>
                {"< "}Anterior
              </button>
              <button
                class="boton home-boton"
                onClick={() => (random(), setShow(false))}>
                ⚄ Aleatoria ⚄
              </button>
              <button
                class="boton home-boton"
                onClick={() => siguiente()
                }>
                <span>Siguiente{" >"}</span>
              </button>
            </div>
            {cargando ? <Spinner></Spinner> :
              <>
                {!recargar ?
                  longitudPreguntas > 0 ?
                    <>
                      {
                        preguntas?.map(p => {
                          return (
                            <div
                              key={p.id}>
                              <h1>
                                Pregunta Nº {current + 1} de {longitudPreguntas}:
                              </h1>
                              {p.seccion && !p.seccionId ?
                                <div>
                                  <span>De la seccion: {" "}</span>
                                  <Link
                                    to={`/cursos/${p.curso}/${p.titulo.replaceAll(" ", "%20")}/${p.seccion?.replaceAll(" ", "%20")}`}
                                    className='home-seccion'>
                                    {p.seccion}
                                  </Link>
                                </div>
                                : ""
                              }
                              {p.seccionId ?
                                <div>
                                  <span>De la seccion: {" "}</span>
                                  <Link
                                    to={`/cursosSQL/${p.curso}/${p.capituloId}/${p.titulo.replaceAll(" ", "%20")}/${p.seccionId}`}
                                    className='home-seccion'>
                                    {`${p.seccionId}: ${p.titulo}`}
                                  </Link>
                                </div>
                                : ""
                              }
                              {p.examen ?
                                <div>
                                  <Link
                                    to={`/examenes/${p.examen}`}
                                    className='home-seccion'>
                                    Examen
                                  </Link>
                                </div>
                                : ""
                              }
                              <div
                                style={{ "text-align": "-webkit-center" }}>
                                <Preguntas
                                  edit={false}
                                  p={p}
                                  num={current}
                                />
                              </div>
                              <div>
                                <br></br>
                                {p.tipo === "Normal" &&
                                  <>
                                    <button
                                      className='boton home-boton'
                                      onClick={() => mostrarRespuesta(p.id)}>
                                      {show ? "Ocultar Respuesta" : "Mostrar Respuesta"}
                                    </button>
                                  </>
                                }
                                <hr></hr>
                              </div>
                              {p.tipo === "Multiple" &&
                                <div
                                  className="home-multiple cuadro">
                                  <Opciones
                                    p={p}
                                    num={current} />
                                </div>}
                              {p.tipo === "vof" &&
                                <div
                                  style={{ "text-align": "left" }}
                                  className="home-multiple cuadro">
                                  <VoF
                                    p={p}
                                    num={current} />
                                </div>}

                              <div
                                className='hide'
                                id={"respuesta-" + p.id}>
                                <div>
                                  <p style={{ "color": "green" }} className='hide' id={`correcto-${p.id}`}>✓</p>
                                  <p>
                                    La respuesta correcta es: {p.correcta || p.resultado}
                                  </p>
                                </div>
                                <div
                                  className="show-element cuadro contendedor-pregunta-respuesta">
                                  <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}>
                                    {p.respuesta}
                                  </ReactMarkdown>
                                </div>
                              </div>

                            </div>
                          )

                        }

                        )
                      }
                    </>
                    : null

                  : <div
                    style={{ paddingTop: 20 }}>

                    <button
                      className='home-boton'
                      onClick={() => cargarHome()}>
                      Recargar
                    </button>
                  </div>
                }
              </>
            }

          </div>}

      </main>

    </div>
  );
}
