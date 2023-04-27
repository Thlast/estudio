import React, { useState, useContext, useEffect } from "react"
import { buscarFiltradoNuevo } from "./servicios/cursos/obtenerCurso";
import { Link } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Spinner } from "./Login/Spinner";
import { MateriasContext } from "../context/MateriasContext";
import remarkGfm from 'remark-gfm'
import { MostrarDef } from "./definiciones/mostrarDef";
import { buscarValorSQL } from "./servicios/cursos/cursosSQL/buscarSeccion";

export const Buscador = (props) => {

  const { materias } = useContext(MateriasContext);
  const { matPreferida } = useContext(MateriasContext);
  const { cursoBuscador } = props
  const [valor, setValor] = useState(null);
  const [valorEnviado, setValorEnviado] = useState();
  const [resultados, setResultados] = useState([]);
  const [curso, setCurso] = useState(cursoBuscador || matPreferida);
  const [cargando, setCargando] = useState(false);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(50)
  const [totalResultados, setTotalResultados] = useState(0)
  const [limitEnv, setLimitEnv] = useState(0)
  const [verSQL, setVerSQL] = useState(false)
  const [resultadosSQL, setResultadosSQL] = useState([])
  const { recargarFuncionClickcode } = props;

  useEffect(() => {
    setPage(1)
  }, [curso])

  const find = async (valor, e) => {
    e.preventDefault()
    setCargando(true)
    if (e.target.value == "Siguiente página") {
      setPage(page + 1)
      await buscarFiltradoNuevo(curso, valor, page + 1, limit).then(data => (setResultados(data.datos), setLimitEnv(data.limitEnviado), setTotalResultados(data.total)));
    } else if (e.target.value == "Anterior página") {
      setPage(page - 1)
      await buscarFiltradoNuevo(curso, valor, page - 1, limit).then(data => (setResultados(data.datos), setLimitEnv(data.limitEnviado), setTotalResultados(data.total)));
    } else {
      setPage(1)
      await buscarFiltradoNuevo(curso, valor, 1, limit).then(data => (setResultados(data.datos), setLimitEnv(data.limitEnviado), setTotalResultados(data.total)));
    }
    await buscarValorSQL(curso, valor).then(data => setResultadosSQL(data))
    setValorEnviado(valor)
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
          {cursoBuscador ? null :
            <>
              <select
                onChange={(e) => cambiarCurso(e.target.value)}
                class="boton home-boton"
                value={curso}
                for="materias">
                {
                  materias.map(a => {
                    return (
                      <option
                        key={"materia-" + a.CursoId}
                        value={a.CursoId}>
                        {a.CursoNombre}
                      </option>
                    )
                  })}
              </select>
              <select
                onChange={(e) => setLimit(e.target.value)}
                class="boton home-boton">
                <option>
                  50
                </option>
                <option>
                  100
                </option>
              </select>
            </>
          }
        </div>
        <form
          onSubmit={(e) => find(valor, e)}
          className="form-buscador"
        >
          {page > 1 &&
            <button
              className="boton-buscar"
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
            onClick={() => setPage(1)}
            className="boton-buscar">
            Buscar
          </button>
          {resultados?.length == limit &&
            <button
              className="boton-buscar"
              value="Siguiente página"
              onClick={(e) => find(valor, e)}>
              Siguiente página</button>
          }
        </form>
      </div>

      {cargando ? <Spinner /> :
        <div
          className="contenedorbuscador">
          {page == 1 &&
            <>
              <MostrarDef recargarFuncionClickcode={recargarFuncionClickcode} dic={valorEnviado} curso={curso} />
            </>
          }
          <hr></hr>
          <div className="buscadorBotones">
            <button
              onClick={() => setVerSQL(false)}
              className={`${verSQL ? null : "botonmostrar"} home-boton editarcurso`}>
              Del archivo fijo
            </button>
            <button
              onClick={() => setVerSQL(true)}
              className={`${verSQL && "botonmostrar"} home-boton editarcurso`}>
              De la base de datos
            </button>
          </div>
          {cargando ? <Spinner></Spinner> :
            <>

              {verSQL ? <>
                {
                  resultadosSQL?.length !== 0 ?
                    <>{
                      resultadosSQL?.map((res, num) => {
                        return (
                          <div
                            key={res.CapituloId + res.SeccionId + num}>
                            {cursoBuscador ?
                              <a href={`/cursosSQL/${curso}/${res.CapituloId}/${res.CapituloNombre}/${res.SeccionId}`}>
                                {res.SeccionNombre}
                              </a>
                              :
                              <Link
                                to={`/cursosSQL/${curso}/${res.CapituloId}/${res.CapituloNombre}/${res.SeccionId}`}>
                                {res.SeccionNombre}
                              </Link>
                            }
                            <div
                              className="cuadro">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}>
                                {res.SeccionContenido}
                              </ReactMarkdown>
                            </div>
                          </div>
                        )
                      })


                    }
                    </> : <p>{valorEnviado ? `${valorEnviado}: sin resultados` : null}</p>}
              </> :
                <>
                  <p>Aparece en las siguientes secciones:</p>
                  <p>Mostrando resultados: {(page - 1) * limitEnv}-{page * limitEnv < totalResultados ? (page) * limitEnv : totalResultados} de un total de {totalResultados}</p>
                  {resultados?.length !== 0 ?
                    <>
                      {
                        resultados?.map((resultado, num) => {
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
                      }
                    </>
                    : <p>{valorEnviado ? `${valorEnviado}: sin resultados` : null}</p>}
                </>
              }
            </>
          }
        </div>
      }
    </div>
  )
}