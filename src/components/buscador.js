import React, { useState, useContext, useEffect } from "react"
import { buscarFiltradoNuevo } from "./servicios/cursos/obtenerCurso";
import { Link } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Spinner } from "./Login/Spinner";
import { MateriasContext } from "../context/MateriasContext";
import remarkGfm from 'remark-gfm'
import { MostrarDef } from "./definiciones/mostrarDef";
import { buscarValorSQL } from "./servicios/cursos/cursosSQL/buscarSeccion";
import { Articulos } from "./dataInformes/articulos";

export const Buscador = (props) => {

  const { materias, matPreferida } = useContext(MateriasContext);
  const { cursoBuscador, capituloId } = props
  const { perfil } = props
  const [valor, setValor] = useState(null);
  const [valorEnviado, setValorEnviado] = useState();
  const [valorAlternativo, setValorAlternativo] = useState();
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
  const [mostrarArticulos, setMostrarArticulos] = useState(false)
  const [ley, setLey] = useState(capituloId || 1)

  useEffect(() => {
    setPage(1)
  }, [curso])

  const find = async (valor, e) => {
    e.preventDefault()
    valor?.toLowerCase().replace(/[-º°`'".,]/g, '')
    setCargando(true)
    if (e.target.value == "Siguiente página") {
      setPage(page + 1)
      await buscarFiltradoNuevo(curso, valor, page + 1, limit).then(data => {
        setResultados(data.datos)
        setLimitEnv(data.limitEnviado)
        setTotalResultados(data.total)
      });
    } else if (e.target.value == "Anterior página") {
      setPage(page - 1)
      await buscarFiltradoNuevo(curso, valor, page - 1, limit).then(data => {
        setResultados(data.datos)
        setLimitEnv(data.limitEnviado)
        setTotalResultados(data.total)
      });
    } else {
      setPage(1)
      await buscarFiltradoNuevo(curso, valor, 1, limit).then(data => {
        setResultados(data.datos)
        setLimitEnv(data.limitEnviado)
        setTotalResultados(data.total)
      });
    }
    await buscarValorSQL(curso, valor).then(data => {

      setResultadosSQL(data.resultados)
      setValorAlternativo(data.valorAlternativo)
    })
    setValorEnviado(valor)

    if (valor.startsWith("articulo") || valor.startsWith("artículo") || valor.startsWith("rt")) {
      setMostrarArticulos(true)
    } else {
      setMostrarArticulos(false)
    }
    setCargando(false)
  }
  const cambiarCurso = (e) => {
    setResultados([]);
    setCurso(e)
  }

  const CustomEm = ({ node, children, ...props }) => {
    const valueToHighlight = valorEnviado.toLowerCase();

    if (typeof children[0] === 'string') {
      if (children[0].toLowerCase().includes(valueToHighlight))
        return <em className="resaltarValorBuscado">{children[0].replaceAll("*", "")}</em>;

      if (children[0].toLowerCase().includes(valorAlternativo.toLowerCase()))
        return <em className="resaltarValorBuscado">{children[0].replaceAll("*", "")}</em>;
    }

    if (typeof children[1] === 'string') {
      if (children[1].toLowerCase().includes(valueToHighlight))
        return <em className="resaltarValorBuscado">{children[1].replaceAll("*", "")}</em>;

      if (children[1].toLowerCase().includes(valorAlternativo.toLowerCase()))
        return <em className="resaltarValorBuscado">{children[1].replaceAll("*", "")}</em>;
    }

    return <em>{children}</em>;
  };


  const CustomCode = ({ node, children, ...props }) => {
    const valueToHighlight = valorEnviado;

    if (typeof children[0] === "string") {
      if (children[0].toLowerCase().includes(valueToHighlight.toLowerCase())) {
        return <code className={"resaltarValorBuscado"} style={{ color: 'red' }}>{children[0].replaceAll("*", "")}</code>;
      }

      if (children[0].toLowerCase().includes(valorAlternativo.toLowerCase())) {
        return <code className={"resaltarValorBuscado"} style={{ color: 'red' }}>{children[0].replaceAll("*", "")}</code>;
      }

    }

    return <code>{children}</code>;
  };
  const regexValorEnviado = new RegExp(`(${valorEnviado})`, 'gi');
  const regexValorAlternativo = new RegExp(`(${valorAlternativo})`, 'gi');

  return (
    <div className={perfil ? "menuContenedor" : ""}>
      <div
        className="buscador">
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", alignItems: "center" }}>
          {cursoBuscador ? null :
            <>
              <select
                onChange={(e) => cambiarCurso(e.target.value)}
                style={{ width: "fit-content" }}
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
            </>
          }
          {valor?.toLowerCase().replace(/[-º°`'".,]/g, '')?.startsWith("artículo") || valor?.toLowerCase().replace(/[-º°`'".,]/g, '')?.startsWith("articulo") ?
            <select
              class="boton home-boton"
              value={ley}
              onChange={(e) => setLey(e.target.value)}
            >
              <option
                value={1}>
                Impuesto a las ganancias
              </option>
              <option
                value={3}>
                IVA
              </option>
              <option
                value={4}>
                Bienes personales
              </option>
            </select>
            : null}
          <div>
            Limite de resultados: {" "}
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
          </div>
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
              {mostrarArticulos ?
                <Articulos articulo={valorEnviado} recargarFuncionClickcode={recargarFuncionClickcode} capituloId={ley} />
                :
                <MostrarDef recargarFuncionClickcode={recargarFuncionClickcode} dic={valorEnviado} curso={curso} />
              }
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
                    <div className="container-centrarResultados">
                      {
                        resultadosSQL?.map((res, num) => {
                          return (
                            <div
                              className="resultadosBuscador"
                              key={res.CapituloId + res.SeccionId + num}>
                                <span>
                                  {res.CapituloNombre}{"→ "}
                                </span>
                              <Link
                                to={`/cursosSQL/${curso}/${res.CapituloId}/${res.CapituloNombre}/${res.SeccionId}`}>
                                {res.SeccionNombre}
                              </Link>

                              <div
                                className="cuadro">
                                <ReactMarkdown
                                  components={{
                                    h1: 'h2',
                                    em: CustomEm,
                                    code: CustomCode

                                  }}
                                  remarkPlugins={[remarkGfm]}
                                >
                                  {res.SeccionContenido.replace(regexValorEnviado, '*$1*')
                                  // .replace(regexValorAlternativo, '*$1*')
                                  }

                                </ReactMarkdown>

                              </div>
                            </div>
                          )
                        })
                      }
                    </div> 
                    : <p>{valorEnviado ? `${valorEnviado}: sin resultados` : null}</p>
                }
              </> :
                <>
                  <p>Aparece en las siguientes secciones:</p>
                  <p>Mostrando resultados: {(page - 1) * limitEnv}-{page * limitEnv < totalResultados ? (page) * limitEnv : totalResultados} de un total de {totalResultados}</p>
                  {resultados?.length !== 0 ?
                    <div className="container-centrarResultados">
                      {
                        resultados?.map((resultado, num) => {
                          return (
                            <div
                              className="resultadosBuscador"
                              key={resultado.titulo + resultado.seccion + num}>

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
                      }
                    </div>
                    : <p>{valorEnviado ? `${valorEnviado}: sin resultados` : null}</p>}
                </>
              }
            </>
          }
        </div>
      }
      <hr></hr>
    </div>
  )
}