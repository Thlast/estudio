import React, { useEffect, useState } from "react"
import { buscarFiltrado, obtenerMaterias } from "./servicios/cursos/obtenerCurso";
import { Link } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Spinner } from "./Login/Spinner";
import { obtenerDatosTitulos } from "./servicios/cursos/obtenerSeccion";

export const Buscador = (props) => {

const [valor, setValor] = useState(null);
const {buscar} = props;
const [cursoDatos, setCursoDatos] = useState([]);
const [resultados, setResultados] = useState([]);
const [curso, setCurso] = useState("impuestos");
const [materias, setMaterias] = useState([]);
const [cargando, setCargando] = useState(true);
const [titulos, setTitulos] = useState([])

useEffect(() => {
  obtenerMaterias(curso)
  .then(data => setMaterias(data));

  obtenerDatosTitulos(curso)
  .then(data => setTitulos(data))
}, [])

useEffect(() => {
  setCargando(true)
    buscarFiltrado(curso)
    .then(data => (setCursoDatos(data), setCargando(false)))
    
}, [curso])


const find = (valor) => {

  const respuesta = []
  const datos = cursoDatos.map(a => a.enunciado);

  datos.map(x => 
    x.filter(y=> 
      typeof y === "string"
      
    )
  ).map((z, num) => z.filter(b => {
  if(b.includes(valor)) {
    let titus = ""
    for(let i = 0; i < titulos.length; i++) {
    if(titulos[i].secciones.indexOf(cursoDatos[num].nombre) !== -1){
      titus = titulos[i].titulo
    }
    }
  respuesta.push({
    titulo: titus,
    seccion: num, 
    enunciado: b
      }
    )
  }
return respuesta
})
)
setResultados(respuesta)

}



const cambiarCurso = (e) => {
  setResultados([]);
  setCurso(e)
}

return (
    <div>
      <div
      className="buscador">
        <div>
       <select 
        onChange={(e) => cambiarCurso(e.target.value)} 
        class="boton home-boton" 
        value={curso}
        for="materias">

    {materias.map(a => {
          return (
      <option 
      key={"materia-"+a.id}
      value={a.id}>
        {a.nombre}
      </option>      
       )
      })}
   </select>
      </div>
      <form
      className="form-buscador"
      onSubmit={(e) => buscar(valor, e)}>
      <input 
      onChange={(e) => setValor(e.target.value)}
      type="text"
      value={valor}>
      </input>
      <button
      onClick={() => find(valor)}
      className="boton-buscar">
        Buscar
      </button>
      
      </form>
      </div>
      <div
      className="contenedorpreguntas">
        {cargando ? <Spinner></Spinner> :
        
      resultados.length !== 0 &&
      resultados.map(resultado => {
        return (
          <div>
            <Link 
            to={`/cursos/impuestos/${resultado.titulo}/${cursoDatos[resultado.seccion].nombre}`}>
            {cursoDatos[resultado.seccion].nombre}
            </Link>
            
          <div
          className="cuadro">
            <ReactMarkdown >
            {resultado.enunciado}
            </ReactMarkdown>
          </div>
        </div>
        )
      })
      
      }
      </div>
    </div>
)
}