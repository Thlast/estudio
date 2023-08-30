import { useEffect, useState } from 'react';
import { Spinner } from './Login/Spinner';
import { getCapitulos } from './servicios/cursos/obtenerCurso';

export function SelectCapitulo(props) {

  const {curso, cambiarCapitulo} = props;
  const [capitulos, setCapitulos] = useState()
  const [cargando, setCargando] = useState(false)
  const [capituloSeleccionado, setCapituloSeleccionado] = useState() 

  useEffect(() => {
    setCargando(true)
    getCapitulos(curso).then(data => {
      setCapitulos(data)
      setCargando(false)
    })
  }, [curso])

  useEffect(() => {
    setCargando(true)
    getCapitulos(curso).then(data => {
      setCapitulos(data)
      setCargando(false)
    })
  }, [curso])

  return (
    <>
      {cargando ? <Spinner></Spinner> :
        <select
          onChange={(e) => cambiarCapitulo(e.target.value)}
          className="boton home-boton"
          name="capitulo">
            <option selected disabled value={null}>
                Seleccione un capitulo
            </option>
          {capitulos?.map(a => {
            return (
              <option
                key={"capitulo-" + a.CapituloId}
                value={a.CapituloId}>
                {a.CapituloNombre}
              </option>
            )
          })
          }
        </select>
      }
    </>
  )
}