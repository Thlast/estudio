import React, { useEffect, useState } from "react"
import { getSiguienteSeccion } from "../../components/servicios/cursos/obtenerSeccion";
import style from './navegacionSQL.module.css'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

export function NavegacionCursosSQL(props) {

  const { seccionId, titulo, curso, mobile } = props;

  const [anterior, setAnterior] = useState()
  const [siguiente, setSiguiente] = useState()
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    setCargando(true)
    getSiguienteSeccion(curso, seccionId).then(data => {
      setAnterior(data.anterior)
      setSiguiente(data.siguiente)
      setCargando(false)
    })
  }, [seccionId])

  const ingresarSeccion = (proximo, navegarSeccion, volver) => {
    if (volver && proximo !== titulo) {
      Swal.fire({
        title: `Regresando a: ${proximo}`,
        width: 550,
        padding: '0',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.tenor.com/rI_0O_9AJ5sAAAAj/nyan-cat-poptart-cat.gif")
        left top
        no-repeat
      `
      })
    } else if (!volver && proximo !== titulo) {
      Swal.fire({
        title: `¡Has finalizado ${titulo}! siguiente: ${proximo}`,
        width: 550,
        padding: '0',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.tenor.com/rI_0O_9AJ5sAAAAj/nyan-cat-poptart-cat.gif")
        left top
        no-repeat
      `
      })
    }

  }

  return (
    <>
      <div class="cursos-botones">
        {anterior ?
          <Link
            to={`/cursosSQL/${curso}/${anterior?.CapituloId}/${anterior?.CapituloNombre}/${anterior?.SeccionId}`}
            onClick={() => ingresarSeccion(anterior?.CapituloNombre, anterior?.SeccionNombre, true)}
            className={anterior?.CapituloNombre !== titulo ? style.cambioseccion : style.contenedorSeccion}>
            <p
              className={style.anterior}>{"< "}Anterior {anterior?.CapituloNombre !== titulo ? "Capítulo" : null} </p>
            <p
              className={style.blockellipsis}>
              {cargando
                ? <p className={style.skeleton} ></p>
                : anterior?.SeccionNombre
              }
            </p>
          </Link>
          : <div className={style.cambioseccionEmpty}></div>
        }

        {/* {mobile ? null :
              <p className={style.cambioseccionEmpty}></p>
            } */}

        {siguiente ?
          <Link
            to={`/cursosSQL/${curso}/${siguiente?.CapituloId}/${siguiente?.CapituloNombre}/${siguiente?.SeccionId}`}
            onClick={() => ingresarSeccion(siguiente?.CapituloNombre, siguiente?.SeccionNombre, false)}
            className={siguiente?.CapituloNombre !== titulo ? style.cambioseccion : style.contenedorSeccion}>
            <p
              className={style.anterior}>Siguiente {siguiente?.CapituloNombre !== titulo ? "Capítulo" : null}{" >"}</p>
            <p
              className={style.blockellipsis}>
              {cargando
                ? <p className={style.skeleton} ></p>
                : siguiente?.SeccionNombre
              }
            </p>
          </Link>
          : <div className={style.cambioseccionEmpty}></div>
        }
      </div>
    </>
  )

}