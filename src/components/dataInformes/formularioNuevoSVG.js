import { useState } from 'react'
import style from './formularioNuevoSVG.module.css'
import { crearSVG } from '../servicios/SVGservicios/crearSVG'
import { actualizarSVG } from '../servicios/SVGservicios/obtenerSVG'
import { Spinner } from '../Login/Spinner'
import { precargarSVG } from '../servicios/SVGservicios/precargarSVG'
import { alertainfo } from '../alertas'

export function SVGForm(props) {

  const { capituloId, actualizarEsquema, curso, nombreCapitulo } = props
  const [link, setLink] = useState()
  const [linkEditar, setLinkEditar] = useState()
  const [cargando, setCargando] = useState(false)
  const [paraCurso, setParaCurso] = useState(false)

  const enviarSVG = async (e) => {
    e.preventDefault()
    setCargando(true)
    try {
      await crearSVG(link, linkEditar, capituloId, paraCurso, curso).then(async data => {
        console.log(data)
        await precargarSVG(link)
        await actualizarEsquema(data.id, data.linkEditar)

        //console.log(data.id)
      })
    } catch (error) {
      alertainfo("Ya existe en diagrama para el capitulo/curso")
    }

    setCargando(false)
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
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "10px" }}>
              <label
              >
                Para todo el curso: {curso}
                <input
                  onChange={() => setParaCurso(true)}
                  value={paraCurso}
                  name='curso'
                  type='radio'>
                </input>
              </label>
              <label>
                Solo este capitulo: {nombreCapitulo}
                <input
                  onChange={() => setParaCurso(false)}
                  value={paraCurso}
                  name='curso'
                  type='radio'>
                </input>
              </label>
            </div>
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