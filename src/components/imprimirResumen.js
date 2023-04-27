import { useParams } from "react-router-dom"
import { TextoCurso } from "../paginasCaps/Secciones/textoCurso"
import { useState, useEffect } from "react"
import { obtenerResumen } from "./servicios/cursos/obtenerSeccion"
import { Spinner } from "./Login/Spinner"
import { TextoParaImprimir } from "../paginasCaps/Secciones/textoParaImprimir"

export function ImprimirHTML() {

  const [secciones, setSecciones] = useState()
  const {curso} = useParams()
  const [cargando, setCargando] = useState(true);
  const [cargando2, setCargando2] = useState(false);

  const imp = () => {
    setTimeout(() => {
      window.print()
    }, 2000)
  }
  useEffect(() => {
    obtenerResumen(curso).then(data => {
      if(data == "error del servidor"){
        setCargando2(true)
        //console.log(data)
      } else { 
        setSecciones(data) 
        setCargando(false) 
        setCargando2(true) 
        imp()
      }

    })
  }, [])

  
  
  return (
    <>
    {cargando2 ? <p style={{textAlign: "center"}}>error del servidor</p> : <p style={{textAlign: "center"}}>renderizando contenido</p>}
      {cargando ?
  <Spinner /> :
    <div className="imprimirResumen">
      
      {
      secciones.map(sec => 
        {return (
          <>
          <h1 style={{paddingTop:"50px"}}>{sec.titulo}</h1>
          <hr></hr>
          {sec.desarrollo.map(cap => {
          return (
            <>
            
            <TextoParaImprimir seccion={cap.nombre} enunciado={[cap]} />
            </>
          )
        })}
          </>
        )}
       
      )
      
      }
      </div>
      }
      </>
    
  )

}

