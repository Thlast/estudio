import { useEffect, useState } from 'react';
import { obtenerDatosTitulos } from '../servicios/cursos/obtenerSeccion';
import { getCapitulos, getSecciones } from '../servicios/cursos/obtenerCurso';

export function AsignarSeccionNota(props) {


  const { notaInicial } = props;
  const [titulos, setTitulos] = useState([])
  const [capitulosSQL, setCapitulosSQL] = useState([])
  const [seccionesSQL, setSeccionesSQL] = useState([])
  const [verSQL, setVerSQL] = useState(false)

  useEffect(() => {
    obtenerDatosTitulos(notaInicial.datosNota.curso).then(data => setTitulos(data))
  }, [])

  useEffect(() => {

    //setCargando(true)
    getCapitulos(notaInicial.datosNota.curso)
      .then(data => {
        setCapitulosSQL(data)

      });
    getSecciones(notaInicial.datosNota.curso)
      .then(data => {
        setSeccionesSQL(data)
      }
      )

  }, [])

 
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
            {
              capitulosSQL?.length > 0 ?
                <>
                  <select
                    value={notaInicial.datosNota.CapituloId}
                    onChange={notaInicial.handleChange}
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
                  {notaInicial.datosNota.CapituloId ?
                    <select
                      value={notaInicial.datosNota.SeccionId}
                      onChange={notaInicial.handleChange}
                      name="SeccionId"
                      className='home-boton'>
                      <option
                        disabled selected>
                        Seleccione una seccion
                      </option>
                      {seccionesSQL?.map(sec => {
                        if (sec.CapituloId == notaInicial.datosNota.CapituloId) {
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
            {notaInicial.datosNota ?
              <>
                <select
                  value={notaInicial.datosNota.capitulo}
                  onChange={notaInicial.handleChange}
                  name="capitulo"
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
                {notaInicial.datosNota.capitulo ?
                  <select
                    value={notaInicial.datosNota.seccion}
                    onChange={notaInicial.handleChange}
                    name="seccion"
                    className='home-boton'>
                    <option
                      value=""
                      disabled
                      selected>
                      Seleccione una seccion
                    </option>
                    {titulos?.map(tit => {
                      if (tit.titulo === notaInicial.datosNota.capitulo) {
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
              : null
            }
          </>
      }
    </>
  )
}