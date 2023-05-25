import { useState } from 'react'
import style from './formularioNuevoSVG.module.css'
import { crearSVG } from '../servicios/SVGservicios/crearSVG'
import { actualizarSVG } from '../servicios/SVGservicios/obtenerSVG'
import { Spinner } from '../Login/Spinner'
import { precargarSVG } from '../servicios/SVGservicios/precargarSVG'
import { actualizarSVGEnlace } from '../servicios/SVGservicios/modificarEnlaces'

export function CambiarSVG(props) {

  const { idDiagrama, actualizarEsquema} = props
  const [link, setLink] = useState()
  const [linkEditar, setLinkEditar] = useState()
  const [cargando, setCargando] = useState()

  const modificarSVG = async (e) => {
    e.preventDefault()
    setCargando(true)
    await actualizarSVGEnlace(link, linkEditar, idDiagrama).then(async data => {
      await precargarSVG(link)
      await actualizarEsquema(data.id, data.linkEditar)
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
           
              onClick={(e) => modificarSVG(e)}
              className='btn btn-primary'
            >
              Modificar
            </button>
          </form>
        </>
      }
    </>
  )
}