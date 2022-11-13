import React, { useState, useContext } from "react"
import { buscarFiltradoNuevo } from "./servicios/cursos/obtenerCurso";
import { Link } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Spinner } from "./Login/Spinner";
import { MateriasContext } from "../context/MateriasContext";
import remarkGfm from 'remark-gfm'

export const Buscador = () => {

const [valor, setValor] = useState(null);
const [resultados, setResultados] = useState([]);
const [curso, setCurso] = useState("impuestos");
const {materias} = useContext(MateriasContext);
const [cargando, setCargando] = useState(false);
const [valorBuscado, setValorBuscado] = useState("")


const find = async (valor, e) => {
  e.preventDefault()
  setValorBuscado(valor)
  setCargando(true)
  await buscarFiltradoNuevo(curso, valor).then(data => setResultados(data));
  setCargando(false)
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
      onSubmit={(e) => find(valor, e)}
      className="form-buscador"
      >
      <input 
      required
      onChange={(e) => setValor(e.target.value)}
      type="text"
      value={valor}>
      </input>
      <button
      className="boton-buscar">
        Buscar
      </button>
      
      </form>
      </div>
      {resultados.length !== 0 &&
      <p>Se encontraron {resultados.length} resultados</p>
      }
      

      <div
      className="contenedorbuscador">
        {cargando ? <Spinner></Spinner> :
      resultados.length !== 0 ?
      resultados.map((resultado, num) => {
        return (
          <div
          key={resultado.titulo+resultado.seccion+num}>
            <Link 
            to={`/cursos/${curso}/${resultado.titulo}/${resultado.seccion}`}>
            {resultado.seccion}
            </Link>
            
          <div
          className="cuadro">
            <ReactMarkdown 
            remarkPlugins={[remarkGfm]}>
            {resultado.enunciado}
            </ReactMarkdown>
          </div>
        </div>
        )
      })
      : `${valorBuscado}: sin resultados`
      }
      </div>
    </div>
)
}