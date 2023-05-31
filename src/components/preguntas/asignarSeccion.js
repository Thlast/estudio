import { useEffect, useState } from 'react';
import { obtenerDatosTitulos } from '../servicios/cursos/obtenerSeccion';
import { getCapitulos, getSecciones } from '../servicios/cursos/obtenerCurso';

export function AsignarSeccion(props) {

  const { datos } = props;
  const { vofhandleChange } = props;
  const [titulos, setTitulos] = useState([])
  const [capitulosSQL, setCapitulosSQL] = useState([])
  const [seccionesSQL, setSeccionesSQL] = useState([])
  const [verSQL, setVerSQL] = useState(false)
  const { cursoVof } = props;
  const curso = cursoVof || datos.datosPregunta.curso

  useEffect(() => {
    obtenerDatosTitulos(curso).then(data => setTitulos(data))

  }, [])

  useEffect(() => {

    //setCargando(true)
    getCapitulos(curso)
      .then(data => {
        setCapitulosSQL(data)

      });
    getSecciones(curso)
      .then(data => {
        setSeccionesSQL(data)
      }
      )

  }, [])

  // console.log(datos.datosPregunta.CapituloId )
  return (
    <>
      <div className="buscadorBotones">
        <button
          type="button"
          onClick={() => setVerSQL(false)}
          className={`${verSQL ? null : "botonmostrar"} home-boton editarcurso`}>
          Del archivo fijo
        </button>
        <button
          type="button"
          onClick={() => setVerSQL(true)}
          className={`${verSQL && "botonmostrar"} home-boton editarcurso`}>
          De la base de datos
        </button>
      </div>

      {
        verSQL ?
          <>
            {capitulosSQL?.length > 0 ?
              datos.datosPregunta ?
              //para NORMAL-MULTIPLE en SQL
                <>
                  <select
                    value={datos.datosPregunta.CapituloId}
                    onChange={datos.handleChange}
                    name="CapituloId"
                    className='home-boton'>
                    <option
                      value=""
                      disabled
                      selected>
                      Seleccione un capitulo
                    </option>
                    {capitulosSQL?.map(cap => {
                      return (
                        <option
                          key={"capituloSQL-" + cap.CapituloId}
                          value={cap.CapituloId}
                        >
                          {cap.CapituloNombre}
                        </option>
                      )
                    })
                    }
                  </select>
                  {datos.datosPregunta.CapituloId ?
                    <select
                      value={datos.datosPregunta.SeccionId}
                      onChange={datos.handleChange}
                      name="SeccionId"
                      className='home-boton'>
                      <option
                        disabled selected>
                        Seleccione una seccion
                      </option>
                      {seccionesSQL?.map(sec => {
                        if (sec.CapituloId == datos.datosPregunta.CapituloId) {
                          return (
                            <option
                              key={"seccionSQL" + sec.SeccionId}
                              value={sec.SeccionId}>
                              {sec.SeccionNombre}
                            </option>

                          )
                        }
                      })
                      }
                    </select>
                    : null
                  }
                </>
                :   
                //para VOF en SQL
                <>
                <select
                  value={datos.CapituloId}
                  onChange={vofhandleChange}
                  name="CapituloId"
                  className='home-boton'>
                  <option
                    value=""
                    disabled
                    selected>
                    Seleccione un capitulo
                  </option>
                  {capitulosSQL?.map(cap => {
                    return (
                      <option
                        key={"capituloSQL-" + cap.CapituloId}
                        value={cap.CapituloId}
                      >
                        {cap.CapituloNombre}
                      </option>
                    )
                  })
                  }
                </select>
                {datos.CapituloId ?
                  <select
                    value={datos.SeccionId}
                    onChange={vofhandleChange}
                    name="SeccionId"
                    className='home-boton'>
                    <option
                      disabled selected>
                      Seleccione una seccion
                    </option>
                    {seccionesSQL?.map(sec => {
                      if (sec.CapituloId == datos.CapituloId) {
                        return (
                          <option
                            key={"seccionSQL" + sec.SeccionId}
                            value={sec.SeccionId}>
                            {sec.SeccionNombre}
                          </option>

                        )
                      }
                    })
                    }
                  </select>
                  : null
                }
              </>

              : null
            }
          </>

          :
          <>

            {
              datos.datosPregunta ?
                <>
                  <select
                    value={datos.datosPregunta.titulo}
                    onChange={datos.handleChange}
                    name="titulo"
                    className='home-boton'>
                    <option
                      disabled selected>
                      Seleccione un capitulo
                    </option>
                    {titulos?.map(tit => {
                      return (
                        <option>
                          {tit.titulo}
                        </option>
                      )
                    })
                    }
                  </select>
                  {datos.datosPregunta.titulo ?
                    <select
                      value={datos.datosPregunta.seccion}
                      onChange={datos.handleChange}
                      name="seccion"
                      className='home-boton'>
                      <option
                        value=""
                        disabled selected>
                        Seleccione una seccion
                      </option>
                      {titulos?.map(tit => {
                        if (tit.titulo === datos.datosPregunta.titulo) {
                          return (
                            tit.secciones.map(s => {
                              return (
                                <option
                                  value={s}>
                                  {s}
                                </option>
                              )
                            })
                          )
                        }
                      })
                      }
                    </select>
                    : null
                  }
                </>
                : 
                <>
                  <select
                    value={datos.titulo}
                    onChange={vofhandleChange}
                    name="titulo"
                    className='home-boton'>
                    <option
                      disabled selected>
                      Seleccione un capitulo
                    </option>
                    {titulos?.map(tit => {
                      return (
                        <option>
                          {tit.titulo}
                        </option>
                      )
                    })
                    }
                  </select>
                  {datos.titulo ?
                    <select
                      value={datos.seccion}
                      onChange={vofhandleChange}
                      name="seccion"
                      className='home-boton'>
                      <option disabled selected>
                        Seleccione una seccion
                      </option>
                      {titulos?.map(tit => {
                        if (tit.titulo === datos.titulo) {
                          return (
                            tit.secciones.map(s => {
                              return (
                                <option
                                  value={s}>
                                  {s}
                                </option>
                              )
                            })
                          )
                        }
                      })
                      }
                    </select>
                    : null
                  }
                </>
            }
          </>
      }
    </>
  )
}