import { useState } from 'react'
import style from './formularioNuevoSVG.module.css'
import { crearSVG } from '../servicios/SVGservicios/crearSVG'
import { actualizarSVG } from '../servicios/SVGservicios/obtenerSVG'
import { Spinner } from '../Login/Spinner'

export function SVGForm(props) {

  const { capituloId, actualizarEsquema } = props
  const [link, setLink] = useState()
  const [linkEditar, setLinkEditar] = useState()
  const [cargando, setCargando] = useState(false)

  const enviarSVG = async (e) => {
    e.preventDefault()
    setCargando(true)
    await crearSVG(link, linkEditar, capituloId).then(async data => {
      //console.log(data.id)
      await actualizarEsquema(capituloId, data.id, data.linkEditar)
      setCargando(false)
    })

  }

  return (
    <>
      {cargando ? <Spinner></Spinner> :
        <>
          <a
            className='btn btn-primary'
            style={{ width: "fit-content" }}
            target='_blank'
            href="https://app.diagrams.net"
          >
            Ir a diagrams
          </a>
          <form className={style.contenedor}>
            <label
              for="linkEditar"
              className={style.contenedorLabel}>
              Link del diagrams:
              <input
                name='linkEditar'
                onChange={(e) => setLinkEditar(e.target.value)}
                value={linkEditar}
              >
              </input>
            </label>

            <label
              for="link"
              className={style.contenedorLabel}>
              Link publicado del diagrams:
              <input
                name='link'
                onChange={(e) => setLink(e.target.value)}
                value={link}
              >
              </input>
            </label>
            <button
              onClick={(e) => enviarSVG(e)}
              className='btn btn-primary'
            >
              Añadir
            </button>
          </form>
        </>
      }
    </>
  )
}