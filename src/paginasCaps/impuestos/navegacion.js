import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Spinner } from "../../components/Login/Spinner";
import { obtenerDatosCapitulos, obtenerDatosTitulos } from "../../components/servicios/cursos/obtenerSeccion"
import style from '../../components/modulos css/navegacion.module.css'

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
  
  setIndiceSeccion(secciones.indexOf(seccion))
}, [seccion])


useEffect(() => {
  obtenerDatosCapitulos(curso, titulo)
  .then(data => (
    setIndiceSeccion(data.caps.indexOf(seccion)),
    setSecciones(data.caps)));
  obtenerDatosTitulos(curso)
  .then(data => (setTitulos(data), 
  data.map((t, num)=> {
    switch (t.titulo){
      case titulo: if(data.length !== num+1) {
        setProximo(data[num + 1].titulo)
        setSiguienteSeccion(data[num + 1].secciones[0]);
      } else if (data.length === num+1) {
        setProximo(null)
        setSiguienteSeccion(null);
      }
      if (num !== 0) {
        setAnterior(data[num - 1].titulo)
        setAnteriorSeccion(data[num - 1].secciones[data[num - 1].secciones.length - 1])
      } else if (num === 0) {
        setAnterior(undefined)
      }; break
    }
  })))
}, [titulo])

return (
  <div>{
  cargando ? <Spinner></Spinner> :
<div class="cursos-botones">
{
        indiceSeccion === 0 ?
        anterior ? 
          <Link 
          to={"/cursos/"+curso+"/"+anterior+"/"+anteriorSeccion}
          onClick={() => ingresarSeccion(anterior, anteriorSeccion, true)}
          className={style.cambioseccion}>
          <p
          className={style.anterior}>{"< "}Anterior Capitulo </p>
          <p
            className={style.blockellipsis}>
           {anterior}
                   </p>
            </Link>
                 : <div></div>
            :
        <Link 
        to={"/cursos/"+curso+"/"+titulo+"/"+secciones[indiceSeccion-1]}
        onClick={() => ingresar(secciones[indiceSeccion-1])}
        className={style.contenedorSeccion}>
        <p
        className={style.anterior}>{"< "} Anterior</p>
        <p
            className={style.blockellipsis}>
          {secciones[indiceSeccion-1]}
         </p>
          </Link>   
}
{secciones.length === indiceSeccion+1 ? 
proximo ?
 <Link 
  to={"/cursos/"+curso+"/"+proximo+"/"+siguienteSeccion}
 onClick={() => ingresarSeccion(proximo, siguienteSeccion, false)}
 className={style.cambioseccion}>
 <p
 className={style.siguiente}>Siguiente Capitulo {" >"}</p>
 <p
          className={style.blockellipsis}>
  {proximo}
          </p>
   </Link>
   : <div>

   </div>
          :
          <Link 
          to={"/cursos/"+curso+"/"+titulo+"/"+secciones[indiceSeccion+1]}
          onClick={(e) => ingresar(secciones[indiceSeccion+1])}
          className={style.contenedorSeccion}>
          <p
          className={style.siguiente}>Siguiente {" >"}</p>
            <p
            className={style.blockellipsis}>
            {secciones[indiceSeccion+1]}
            </p>
          </Link>

}
</div>

}</div>
)

}