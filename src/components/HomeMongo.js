import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { obtenerLongitudPreguntas, obtenerPreguntaMateriaPorIndice } from './servicios/preguntas/obtenerPregunta';
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
import { CardSkeleton } from '../modulos-css/esqueletoSeccion';
import { SelectCapitulo } from './selectCapitulo';

export function HomeMongo() {


  const { materias,
    matPreferida,
    identificarCurso,
    historialeshistorial,
    historialesagregar,
    historialesreiniciarh } = useContext(MateriasContext);
  const { totalResueltas } = useContext(ResueltasContext)
  const [preguntas, setPreguntas] = useState([]);
  const [longitudPreguntas, setLongitudPreguntas] = useState();
  const [longitudPreguntasTotal, setLongitudPreguntasTotal] = useState();
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  const [cargando, setCargando] = useState(false);

  const { loading } = useAuth()
  const [numeroBuscar, setNumeroBuscar] = useState(1)
  const [recargar, setRecargar] = useState(false)

  const [filtrarCapitulos, setFiltrarCapitulos] = useState(false)
  const [capituloSeleccionado, setCapituloSeleccionado] = useState()

  const cambiarCapitulo = (id) => {
    setCapituloSeleccionado(id)
  }
  useEffect(() => {

    setCapituloSeleccionado()
  }, [filtrarCapitulos, matPreferida])

  useEffect(() => {
    if (capituloSeleccionado) {
      funcionreiniciar()
      setCurrent(0)
      cargarHome(capituloSeleccionado)
    }
  }, [capituloSeleccionado])

  const cargarHome = async (cap) => {
    setCargando(true)
    setRecargar(false)
    if (materias.length > 0) {

      await obtenerLongitudPreguntas(matPreferida, cap).then(data => {
        if (data !== "error del servidor") {
          setLongitudPreguntas(data.capitulo)
          setLongitudPreguntasTotal(data.total)
        } else {
          setRecargar(true)
        }
      })

      await identificarCurso().then(async resp => {
        if (resp == undefined) {
          setRecargar(true)
        } else {
          await obtenerPreguntaPorIndice(matPreferida,
            0,
            cap
            // historialeshistorial[resp][historialeshistorial[resp]?.length - 1]
          )
          setCurrent(
            0
            // historialeshistorial[resp][historialeshistorial[resp]?.length - 1]
          )
        }
      }
      )
    } else {
      setRecargar(true)
    }
  }

  const obtenerPreguntaPorIndice = async (mat, c, cap) => {
    setCargando(true)
    await obtenerPreguntaMateriaPorIndice(mat, c, cap)
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
          obtenerPreguntaPorIndice(matPreferida, indice, capituloSeleccionado)
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
        obtenerPreguntaPorIndice(matPreferida, indice, capituloSeleccionado)
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
        obtenerPreguntaPorIndice(matPreferida, indice, capituloSeleccionado)
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
      obtenerPreguntaPorIndice(matPreferida, indice, capituloSeleccionado)
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
            <div>
              <div>
                {cargando ? <Spinner/> :
                  <ProgressCircle progress={(totalResueltas && longitudPreguntasTotal) ? (Math.round((totalResueltas / longitudPreguntasTotal) * 100)) : 0} />
                }
              </div>
              <br></br>
              <div>
                <SelectMateria />
                <br></br>
                <label>
                  <input
                    onChange={() => setFiltrarCapitulos(!filtrarCapitulos)}
                    type='checkbox'></input>
                  Capítulos
                </label>
                <br></br>
                {filtrarCapitulos ?
                  <SelectCapitulo curso={matPreferida} cambiarCapitulo={cambiarCapitulo} />
                  : null
                }

              </div>
              <br></br>
              <div>
                <button
                  className="boton home-boton"
                  onClick={() => anterior()}>
                  {"< "}Anterior
                </button>
                <button
                  className="boton home-boton"
                  onClick={() => (random(), setShow(false))}>
                  ⚄ Aleatoria ⚄
                </button>
                <button
                  className="boton home-boton"
                  onClick={() => siguiente()
                  }>
                  <span>Siguiente{" >"}</span>
                </button>
              </div>
            </div >
            {cargando ? <CardSkeleton /> :
              <>
                {!recargar ?
                  longitudPreguntas > 0 ?
                    <>
                      {
                        preguntas?.map(p => {
                          return (
                            <div
                              style={{ textAlign: "-webkit-center" }}
                              key={p.id}>
                              <h1>
                                Pregunta Nº {current + 1} de {longitudPreguntas}:
                              </h1>
                              <div>
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
                                  className="cuadro">
                                  <Opciones
                                    p={p}
                                    num={current} />
                                </div>
                              }
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
