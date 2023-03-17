import React, { useState, useContext, useEffect } from "react"
import { buscarFiltradoNuevo } from "./servicios/cursos/obtenerCurso";
import { Link } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Spinner } from "./Login/Spinner";
import { MateriasContext } from "../context/MateriasContext";
import remarkGfm from 'remark-gfm'

export const Buscador = (props) => {

  const { cursoBuscador } = props
  const [valor, setValor] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [curso, setCurso] = useState(cursoBuscador || "impuestos");
  const { materias } = useContext(MateriasContext);
  const [cargando, setCargando] = useState(false);
  const [valorBuscado, setValorBuscado] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(50)
  const [totalResultados, setTotalResultados] = useState(0)

  useEffect(() => {
    setPage(1)
  }, [curso, valor])

  const find = async (valor, e) => {
    e.preventDefault()
    
    if (e.target.value == "Siguiente página") {
      setPage(page + 1)
      await buscarFiltradoNuevo(curso, valor, page+1, limit).then(data => (setResultados(data.datos), setTotalResultados(data.total)));
    } else if (e.target.value == "Anterior página") {
      setPage(page - 1)
      await buscarFiltradoNuevo(curso, valor, page-1, limit).then(data => (setResultados(data.datos), setTotalResultados(data.total)));
    } else {
      await buscarFiltradoNuevo(curso, valor, 1, limit).then(data => (setResultados(data.datos), setTotalResultados(data.total)));
    }

    setValorBuscado(valor)
    setCargando(true)
    setCargando(false)

  }

  const cambiarCurso = (e) => {
    setResultados([]);
    setCurso(e)
  }

  console.log(resultados)
  return (
    <div>
      <div
        className="buscador">
        <div>
          {cursoBuscador ? null :
            <select
              onChange={(e) => cambiarCurso(e.target.value)}
              class="boton home-boton"
              value={curso}
              for="materias">
              {
                materias.map(a => {
                  return (
                    <option
                      key={"materia-" + a.id}
                      value={a.id}>
                      {a.nombre}
                    </option>
                  )
                })}
            </select>
          }
        </div>
        <form
          onSubmit={(e) => find(valor, e)}
          className="form-buscador"
        >
          {page > 1 &&
            <button
              value="Anterior página"
              onClick={(e) => find(valor, e)}>
              Anterior página</button>
          }
          <input
            required
            onChange={(e) => setValor(e.target.value)}
            type="text"
            value={valor}>
          </input>

          <button
            onClick={() => setPage(1)
            }
            className="boton-buscar">
            Buscar
          </button>
          {resultados.length == limit &&
            <button
              value="Siguiente página"
              onClick={(e) => find(valor, e)}>
              Siguiente página</button>
          }
        </form>
      </div>
      {resultados.length !== 0 &&
        <p>Mostrando resultados: {(page-1) * limit}-{page * limit < totalResultados ? page * limit : totalResultados} de un total de {totalResultados}</p>
      }


      <div
        className="contenedorbuscador">
        {cargando ? <Spinner></Spinner> :
          resultados.length !== 0 ?
            resultados.map((resultado, num) => {
              return (
                <div
                  key={resultado.titulo + resultado.seccion + num}>
                  {cursoBuscador ?
                    <a href={`/cursos/${curso}/${resultado.titulo}/${resultado.seccion}`}>
                      {resultado.seccion}
                    </a>
                    :
                    <Link
                      to={`/cursos/${curso}/${resultado.titulo}/${resultado.seccion}`}>
                      {resultado.seccion}
                    </Link>
                  }
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