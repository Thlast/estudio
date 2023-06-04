import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { obtenerRTCompleta } from "./servicios/consola/buscarRT"

export function VerRT() {

  const { rt } = useParams()
  const [contenidoHTML, setContenidoHTML] = useState()

  useEffect(() => {
    obtenerRTCompleta(rt).then(data => {
      setContenidoHTML(data)
    })
  }, [])

  return (
    <>
      <div
        style={{padding:"30px"}}
        dangerouslySetInnerHTML={{ __html: `${contenidoHTML}` }}
      >
      </div>

    </>
  )
}