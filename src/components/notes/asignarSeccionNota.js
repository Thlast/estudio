import { useEffect, useState } from 'react';
import { obtenerDatosTitulos } from '../servicios/cursos/obtenerSeccion';

export function AsignarSeccionNota(props) {


  const { notaInicial } = props;
  const [titulos, setTitulos] = useState([])
  
  useEffect(() => {
    obtenerDatosTitulos(notaInicial.datosNota.curso).then(data => setTitulos(data))
  }, [])


  return (
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
        : <>
          {/* <select
            value={titulo}
            //onChange={vofhandleChange} 
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
          {titulo ?
            <select
              value={seccion}
              //onChange={vofhandleChange} 
              name="seccion"
              className='home-boton'>
              <option disabled selected>
                Seleccione una seccion
              </option>
              {titulos?.map(tit => {
                if (tit.titulo === titulo) {
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
          } */}
        </>
      }
    </>
  )
}