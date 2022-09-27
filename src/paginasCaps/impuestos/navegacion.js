import React, { useEffect, useState } from "react"
import { obtenerDatosCapitulos, obtenerDatosTitulos } from "../../components/servicios/cursos/obtenerSeccion"

export function NavegacionCursos(props)  {

const {curso} = props;
const {cargando} = props;
const [indiceSeccion, setIndiceSeccion] = useState()
const [secciones, setSecciones] = useState([])
const {ingresar} = props
const {seccion} = props
const {titulo} = props
const [titulos, setTitulos] = useState([])
const {ingresarSeccion} = props
const [proximo, setProximo] = useState("")
const [anterior, setAnterior] = useState("")
const [anteriorSeccion, setAnteriorSeccion] = useState("")
const [siguienteSeccion, setSiguienteSeccion] = useState("")

useEffect(() => {
  obtenerDatosCapitulos(curso, titulo)
  .then(data => (
    setIndiceSeccion(data.caps.indexOf(seccion)),
    setSecciones(data.caps)));
  setIndiceSeccion(secciones.indexOf(seccion))
}, [seccion])


useEffect(() => {
 
  obtenerDatosTitulos(curso)
  .then(data => (setTitulos(data), 
  data.map((t, num)=> {
    if (t.titulo === titulo) {
      setProximo(data[num + 1].titulo)
      setSiguienteSeccion(data[num + 1].secciones[0]);
      if (num !== 0) {
        setAnterior(data[num - 1].titulo)
        setAnteriorSeccion(data[num - 1].secciones[data[num - 1].secciones.length - 1])
      }
    }
  })))
}, [titulo])


return (
<div class="cursos-botones">
  {cargando ? "...Cargando" :

        indiceSeccion === 0 ? 
          <button 
          onClick={() => ingresarSeccion(anterior, anteriorSeccion)}
          class="cursos-as cambioseccion">
          <p>Anterior Capitulo {" >"}</p>
          <p>
           {anterior}
                   </p>
            </button>
                 
            :
        <button 
        onClick={() => ingresar(secciones[indiceSeccion-1])}
        class="cursos-as">
        <p>{"< "} Anterior</p>
         <p>
          {secciones[indiceSeccion-1]}
         </p>
          </button>   
}
{secciones.length === indiceSeccion+1 ? 
 <button 
 onClick={() => ingresarSeccion(proximo, siguienteSeccion)}
 class="cursos-as cambioseccion">
 <p>Siguiente Capitulo {" >"}</p>
 <p>
  {proximo}
          </p>
   </button>
          :
          <button 
          onClick={(e) => ingresar(secciones[indiceSeccion+1])}
          class="cursos-as">
          <p>Siguiente {" >"}</p>
            <p>
            {secciones[indiceSeccion+1]}
            </p>

            </button>

}
</div>
)

}