import { useEffect, useState } from 'react';
import { obtenerDatosTitulos } from '../servicios/cursos/obtenerSeccion';

export function AsignarSeccion(props) {

  const {datos} = props;
  const {vofhandleChange} = props;
  const [titulos, setTitulos] = useState([])
  const {cursoVof} = props;
  const curso = cursoVof || datos.datosPregunta.curso
useEffect(() => {
  obtenerDatosTitulos(curso).then(data => setTitulos(data))
}, [])

console.log(cursoVof)
  return (
    <>
    {datos.datosPregunta ?
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
        <option disabled selected>
          Seleccione una seccion
        </option>
        {titulos?.map(tit => {
          if(tit.titulo === datos.datosPregunta.titulo) {
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
          if(tit.titulo === datos.titulo) {
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
  )
}