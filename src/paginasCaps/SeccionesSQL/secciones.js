import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MostrarPregunta } from '../../components/preguntas/mostrarPregunta';
import { Consola } from "../consola";
import { TextoCursoSQL } from "./textoCursoSQL.js";
import style from './secciones.module.css'
import Buscador from "../../components/buscador";
import { WindowSplitter } from "../Secciones/splitter";
import { MostrarNotas } from "../../components/notes/mostrarNotas";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { NavegacionCursosSQL } from "./navegacionSQL.js";
import { useAuth } from "../../context/AuthContext";
import { ModificarSeccion } from "../../editor/modificarSeccion";
import { getSeccionPorId } from "../../components/servicios/cursos/obtenerSeccion";
import { AyudaEditor } from "../../editor/ayudaEditor";
import { modificarSeccion } from "../../components/servicios/cursos/cursosSQL/modifSeccion";
import { alertainfo } from "../../components/alertas";
import { UserConfig } from "../../context/UserConfig";
import { SVGZoom } from "../../components/dataInformes/guia";
import { ProgresoSecciones } from "../../components/progresoSecciones";

function Secciones() {

  const [ordenActual, setOrdenActual] = useState();
  const { id } = useParams();
  const { capituloId } = useParams();
  const [titulo, setTitulo] = useState();
  const [seccionNombre, setSeccionNombre] = useState();
  const { curso } = useParams();
  const { mobile } = useContext(UserConfig);
  const [dic, setDic] = useState("");
  const [codes, setCodes] = useState(document.querySelectorAll('code'));
  const [cargando, setCargando] = useState(false)
  const [contenidoSeccion, setContenidoSeccion] = useState()
  const [preview, setPreview] = useState()
  const [esquema, setEsquema] = useState(false)
  const [esquemaRight, setEsquemaRight] = useState(false)

  const [modificando, setModificando] = useState(false)//ESTE ES UN CARGANDO PARA CUANDO SE ESTA MODIFICANDO

  const navigate = useNavigate()

  //para el svg del esquema
  const containerRef = useRef(null);
  const [buscarSeccionId, setBuscarSeccionId] = useState();

  const pasarSeccionId = (seccionId) => {
    setBuscarSeccionId(seccionId)
  }
  // useEffect(() => {
  //   setEsquemaRight(false) //CUANDO SE BUSCA SECCION SE CIERRA EL ESQUEMA
  // }, [buscarSeccionId])

  const cargarPagina = async () => {

    setCargando(true)
    await getSeccionPorId(id, capituloId)
      .then(data => {
        if (data[0]) {
          setContenidoSeccion(data[0])
          setTitulo(data[0]?.CapituloNombre)
          setSeccionNombre(data[0]?.SeccionNombre)
          setOrdenActual(data[0]?.orden)
          setCargando(false)
          //console.log(data)
        }
        else {
          navigate("/Error404", { state: { mensaje: `La sección Nº${id} no existe, o no pertenece al capítulo ${capituloId} de ${curso}` } });
        }
      }
      );

    recargarFuncionClickcode()
  }
  useEffect(() => {
    cargarPagina()
  }, [id])

  const previsualizar = (contenido) => {
    setPreview(contenido)
  }

  const { editMode } = useAuth();

  //seteamos la camara arriba del todo
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [id])

  //cargar y actualizar consola PARA MOBILE
  useEffect(() => {

    if (mobile) {
      if (dic !== "" || buscarSeccionId) {
        cambiarBoton()
        setMostrarConsola(true)
      }
    }
  }, [dic, buscarSeccionId])

  //funcion para actualizar los codes
  const recargarFuncionClickcode = () => {
    setCodes(document.querySelectorAll('code'))
    // console.log("ejecutado")
  }

  useEffect(() => {
    recargarFuncionClickcode()
  }, [mobile])

  useEffect(() => {
    //funcion que da funcionalidad a los codes
    for (let i = 0; i < codes.length; i++) {
      codes[i].onclick = function (e) {
        if (enconsola.indexOf(e.target.innerHTML.toLowerCase().replace(/[-º°`'".,]/g, '')) === -1) {
          setEnConsola(enconsola.concat(e.target.innerHTML.toLowerCase().replace(/[-º°`'".,]/g, '')));
          document.getElementById("consol").scrollIntoView({ behavior: 'smooth' });
        }
        setDic(e.target.innerHTML.toLowerCase().replace(/[-º°`'".,]/g, '').trim());
        setBuscarSeccionId()
        //setEsquemaRight(false)
      }
    }

  }, [codes, id])

  //historial de consola
  const [enconsola, setEnConsola] = useState([]);
  const eliminarDelHistorial = async (a) => {
    setEnConsola(enconsola.filter(s => s !== a))
  }
  const limpiarHistorial = () => {
    setEnConsola([])
  }
  //borrar los datos actuales de la consola
  const limpiarConsola = () => {
    setDic("")
    setBuscarSeccionId()
  }

  //mostrar pregunta
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
  const [mostrarNotas, setMostrarNotas] = useState(false);
  const [edit, setEdit] = useState(false)
  const [buscador, setBuscador] = useState(false)
  const [info, setInfo] = useState(true)
  const [mostrarConsola, setMostrarConsola] = useState(false)

  const cambiarBoton = (editar) => {
    if (!editar) {
      setMostrarPreguntas(false)
    }
    if (mobile) {
      setEsquemaRight(false)
    }
    setBuscador(false)
    setEdit(false)
    setInfo(false)
    setMostrarConsola(false)
    setMostrarNotas(false)
  }

  //obtenemos la cantidad de notas y preguntas para mostrar en el boton
  const [qpreguntas, setQpreguntas] = useState(0)
  const [qnotes, setQnotes] = useState(0)

  const obtenerQpreguntas = (q) => {
    setQpreguntas(q)
  }
  const obtenerQnotes = (q) => {
    setQnotes(q)
  }

  //notas mostradas debajo de textoCurso
  const [notes, setNotes] = useState([]);
  const obtenerContenidoNotas = (data) => {
    setNotes(data);
    recargarFuncionClickcode();
  }

  const modificarActualizar = async (nombreSeccion, contenido, SeccionId, e) => {
    e.preventDefault()
    if (nombreSeccion.length >= 3) {
      setModificando(true)
      try {

        await modificarSeccion(nombreSeccion, contenido, SeccionId, e).then(response => {
          if(response) {
            setContenidoSeccion(response)
          }
          setModificando(false)
        }
        );

      } catch (error) {
        alertainfo("Error al conectar con el servidor.")
        setModificando(false)
      }
    } else {
      alertainfo("El nombre debe contener al menos 3 caracteres")
    }
  }

  const isZooming = (valor) => {
    // const container = containerRef.current;
    // if (container) {
    //   if (valor) {
    //     container.style.overflowY = 'hidden';
    //   }
    //   else {
    //     container.style.overflowY = 'scroll';
    //   }
    // }
  }
  const [cantidadDiagramas, setCantidadDiagramas] = useState(0)
  const obtenerCantidadDiagramas = (valor) => {
    setCantidadDiagramas(valor)
  }

  const esquemaDiv =
    <SVGZoom
      obtenerCantidadDiagramas={obtenerCantidadDiagramas}
      recargarFuncionClickcode={recargarFuncionClickcode}
      nombreCapitulo={titulo}
      curso={curso}
      isZooming={isZooming}
      pasarSeccionId={pasarSeccionId}
      capituloId={capituloId}
      seccion={id}
    />

  return (
    <>
      <>
        {mobile ?
          <div>
            <div>
              <button
                className={esquemaRight ? style.pinSeleccionado : style.pin}
                onClick={() => (cambiarBoton(), setEsquemaRight(!esquemaRight))}
              >
                <span>
                  {cantidadDiagramas}
                </span>
              </button>
            </div>
            <div
              className={`${style.cursotitulomobile} secciones`}>
              <Link className="aa"
                to={"/cursos/" + curso}>
                {curso}
              </Link>
              <Link
                to={"/cursos/" + curso + "/" + titulo}
                className={`${style.titulo} aa`}>
                {titulo}
              </Link>
              <span
                className={style.titulo}>
                {seccionNombre}
              </span>
            </div>
            <div
              className={style.cursointeraccion}>
              <button
                onClick={() => (cambiarBoton(), setInfo(!info))}
                className={`${info && "botonmostrar"} cursos-as editarcurso`}>
                Info
              </button>
              <button
                onClick={() => (cambiarBoton(), setMostrarConsola(!mostrarConsola))}
                className={`${mostrarConsola && "botonmostrar"} cursos-as editarcurso`}>
                Consola
              </button>
              <button
                className={`${edit && "botonmostrar"} cursos-as editarcurso`}
                onClick={() => (cambiarBoton(true), setEdit(!edit))}
              >
                Editar
              </button>
              <button
                className={`${buscador && "botonmostrar"} cursos-as editarcurso`}
                onClick={() => (cambiarBoton(), setBuscador(!buscador))}
              >
                Buscar
              </button>
              <button
                className={`${mostrarPreguntas && "botonmostrar"} cursos-as mostrarpreg`}
                onClick={() => (cambiarBoton(), setMostrarPreguntas(!mostrarPreguntas))}
              >
                Preguntas ({qpreguntas})
              </button>
              <button
                className={`${mostrarNotas && "botonmostrar"} cursos-as mostrarpreg`}
                onClick={() => (cambiarBoton(), setMostrarNotas(!mostrarNotas))}
              >
                Notas ({qnotes})
              </button>
            </div>
            <div
              style={{ display: `${info ? "block" : "none"}` }}
              class="secciones">
              {editMode ?
                <ModificarSeccion
                  modificando={modificando}
                  modificarActualizar={modificarActualizar}
                  cargando={cargando}
                  seccionModificar={contenidoSeccion}
                  capituloId={capituloId}
                  previsualizar={previsualizar} />
                :
                <TextoCursoSQL
                  cargando={cargando}
                  contenidoSeccion={contenidoSeccion}
                  recargarFuncionClickcode={recargarFuncionClickcode}
                  mobile={mobile}
                  titulo={titulo}
                />
              }

              <div >
                <hr></hr>
                <blockquote>
                  Anotaciones:
                </blockquote>
                {notes?.map(n => {
                  return (
                    <ReactMarkdown key={"notaTextoM-" + n.id}>
                      {n.contenido}
                    </ReactMarkdown>
                  )
                })}
              </div>
            </div>
            <div class="secciones">
              <div
                style={{ display: `${buscador ? "block" : "none"}` }}
              >
                <Buscador
                  capituloId={capituloId}
                  recargarFuncionClickcode={recargarFuncionClickcode}
                  cursoBuscador={curso}
                />
              </div>
              <div
                style={{ display: `${mostrarConsola ? "block" : "none"}` }}
              >
                <Consola
                  capituloId={capituloId}
                  recargarFuncionClickcode={recargarFuncionClickcode}
                  curso={curso}
                  dic={dic}
                  pasarSeccionId={pasarSeccionId}
                  buscarSeccionId={buscarSeccionId}
                  enconsola={enconsola}
                  eliminarDelHistorial={eliminarDelHistorial}
                  limpiarHistorial={limpiarHistorial} />
              </div>
              <div
                style={{ display: `${(esquemaRight && !editMode) ? "block" : "none"}` }}>
                <SVGZoom
                  obtenerCantidadDiagramas={obtenerCantidadDiagramas}
                  recargarFuncionClickcode={recargarFuncionClickcode}
                  nombreCapitulo={titulo}
                  curso={curso}
                  pasarSeccionId={pasarSeccionId}
                  capituloId={capituloId}
                  seccion={id}
                />
              </div>
              <MostrarPregunta
                obtenerQpreguntas={obtenerQpreguntas}
                titulo={titulo}
                curso={curso}
                seccionId={id}
                capituloId={capituloId}
                agregar={edit}
                edit={edit}
                mostrarPreguntas={mostrarPreguntas} />
              <div
                style={{ display: `${mostrarNotas ? "block" : "none"}` }}
              >
                <>
                  <MostrarNotas
                    obtenerContenidoNotas={obtenerContenidoNotas}
                    seccionId={id}
                    capituloId={capituloId}
                    titulo={titulo}
                    obtenerQnotes={obtenerQnotes}
                    curso={curso} />
                </>
              </div>
              <NavegacionCursosSQL
                mobile={mobile}
                seccionId={id}
                curso={curso}
                titulo={titulo} />
            </div>
          </div>
          :
          // aca si no es mobile
          <>
            <WindowSplitter Left={
              <div
                ref={containerRef}
                className="secciones">
                <ProgresoSecciones currentSection={ordenActual} currentCap={capituloId} />
                <div>
                  <div className={style.ContenedorBotonesEsquema}>
                    <button
                      className={esquemaRight ? style.pinSeleccionado : style.pin}
                      onClick={() => setEsquemaRight(!esquemaRight)}
                    >
                      <span>
                        {cantidadDiagramas}
                      </span>
                    </button>
                    <span
                      className={style.pinRight}>
                      <button
                        onClick={() => setEsquemaRight(!esquemaRight)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M9 6l6 6l-6 6"></path>
                        </svg>
                      </button>
                    </span>
                  </div>
                  <div
                    className={style.cursotitulo}>
                    <Link className="aa"
                      to={"/cursos/" + curso}>
                      {curso}
                    </Link>
                    <Link
                      to={"/cursos/" + curso + "/" + titulo}
                      className={`${style.titulo} aa`}>
                      {titulo}
                    </Link>
                    <span
                      className={style.titulo}>
                      {seccionNombre}
                    </span>
                  </div>
                  <div >
                    <NavegacionCursosSQL
                      mobile={mobile}
                      seccionId={id}
                      curso={curso}
                      titulo={titulo} />
                  </div>
                </div>

                {/* <div
                  style={{ display: `${(esquema && !editMode && !esquemaRight) ? "block" : "none"}` }}>
                  {esquemaDiv}
                </div> */}
        
                <div>
                  <div style={{ display: `${editMode ? "block" : "none"}` }}>
                    <ModificarSeccion
                      modificando={modificando}
                      modificarActualizar={modificarActualizar}
                      cargando={cargando}
                      seccionModificar={contenidoSeccion}
                      capituloId={capituloId}
                      previsualizar={previsualizar} />
                  </div>
                  <div style={{ display: `${(editMode) ? "none" : "block"}` }}>
                    <TextoCursoSQL
                      cargando={cargando}
                      contenidoSeccion={contenidoSeccion}
                      recargarFuncionClickcode={recargarFuncionClickcode}
                      mobile={mobile}
                      titulo={titulo}
                    />
                  </div>
                  <div 
                  // style={{ display: `${esquema ? "none" : "block"}` }}
                  >
                    <hr></hr>
                    <blockquote>
                      Anotaciones:
                    </blockquote>
                    <div className="footnotes">
                      {notes?.map(n => {
                        return (
                          <ReactMarkdown key={"notaTexto-" + n.id}>
                            {n.contenido}
                          </ReactMarkdown>
                        )
                      })}
                    </div>
                  </div>
                  <hr></hr>
                </div>
              </div>
            }
              Right={
                <div className="secciones">
                  {/* <div style={{ display: `${editMode ? "block" : "none"}` }}> */}
                  {editMode &&
                    <div>
                      <AyudaEditor curso={curso} preview={preview} />
                    </div>
                  }
                  <div
                    style={{ display: `${(esquemaRight && !editMode) ? "block" : "none"}` }}>
                    {esquemaDiv}
                  </div>
                  <div
                    style={{ display: `${editMode || esquemaRight ? "none" : "block"}` }}>
                    <div
                      className={style.cursointeraccion}>
                      <button
                        className="cursos-as"
                        onClick={() => limpiarConsola()}>
                        Limpiar consola
                      </button>
                      <button
                        className={`${edit && "botonmostrar"} cursos-as editarcurso`}
                        onClick={() => (cambiarBoton(true), setEdit(!edit))}
                      >
                        Editar
                      </button>
                      <button
                        className={`${buscador && "botonmostrar"} cursos-as editarcurso`}
                        onClick={() => (cambiarBoton(), setBuscador(!buscador))}
                      >
                        Buscador
                      </button>
                      <button
                        className={`${mostrarPreguntas && "botonmostrar"} cursos-as editarcurso`}
                        onClick={() => (cambiarBoton(), setMostrarPreguntas(!mostrarPreguntas))}
                      >
                        Preguntas ({qpreguntas})
                      </button>
                      <button
                        className={`${mostrarNotas && "botonmostrar"} cursos-as mostrarpreg`}
                        onClick={() => (cambiarBoton(), setMostrarNotas(!mostrarNotas))}
                      >
                        Notas ({qnotes})
                      </button>
                    </div>
                    <hr></hr>
                    {buscador ?
                      <Buscador
                        capituloId={capituloId}
                        recargarFuncionClickcode={recargarFuncionClickcode}
                        cursoBuscador={curso}
                      />
                      : null}
                    <MostrarPregunta
                      obtenerQpreguntas={obtenerQpreguntas}
                      titulo={titulo}
                      curso={curso}
                      seccionId={id}
                      capituloId={capituloId}
                      agregar={edit}
                      edit={edit}
                      mostrarPreguntas={mostrarPreguntas} />
                    <div
                      style={{ display: `${mostrarNotas ? "block" : "none"}` }}>
                      <MostrarNotas
                        obtenerContenidoNotas={obtenerContenidoNotas}
                        seccionId={id}
                        capituloId={capituloId}
                        titulo={titulo}
                        obtenerQnotes={obtenerQnotes}
                        curso={curso} />
                    </div>
                  </div>
                  <div style={{ display: `${editMode ? "none" : "block"}` }}>
                    <Consola
                      esquemaRight={esquemaRight}
                      capituloId={capituloId}
                      pasarSeccionId={pasarSeccionId}
                      recargarFuncionClickcode={recargarFuncionClickcode}
                      curso={curso}
                      dic={dic}
                      buscarSeccionId={buscarSeccionId}
                      enconsola={enconsola}
                      eliminarDelHistorial={eliminarDelHistorial}
                      limpiarHistorial={limpiarHistorial} />
                    <hr></hr>
                    </div>
                </div>
              }
            />
          </>
        }
      </>

    </>
  );
}




export default Secciones;