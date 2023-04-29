import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MostrarPregunta } from '../../components/preguntas/mostrarPregunta';
import { Consola } from "../consola";
import { TextoCursoSQL } from "./textoCursoSQL.js";
import style from './secciones.module.css'
import { Buscador } from "../../components/buscador";
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

export function Secciones() {

  const { id } = useParams();
  const { capituloId } = useParams();
  const [titulo, setTitulo] = useState();
  const { curso } = useParams();
  const [dic, setDic] = useState("");
  const [codes, setCodes] = useState(document.querySelectorAll('code'));
  const [mobile, setMobile] = useState(window.innerWidth <= 500)
  const [cargando, setCargando] = useState(false)

  const [contenidoSeccion, setContenidoSeccion] = useState()
  const [preview, setPreview] = useState()

  const cargarPagina = async () => {

    setCargando(true)
    await getSeccionPorId(id)
      .then(data => {
        setContenidoSeccion(data[0])
        setTitulo(data[0]?.CapituloNombre)
        setCargando(false)
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
  //funcion para detectar si es mobile
  useEffect(() => {
    function handleResize() {
      setMobile(window.innerWidth <= 500);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //seteamos la camara arriba del todo
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [id])

  //cargar y actualizar consola
  useEffect(() => {

    if (dic !== "") {
      cambiarBoton()
      setMostrarConsola(true)
    }

  }, [dic])

  //funcion para actualizar los codes
  const recargarFuncionClickcode = () => {
    setCodes(document.querySelectorAll('code'))
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
        setDic(e.target.innerHTML.toLowerCase().replace(/[-º°`'".,]/g, ''));
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
      try {
  
        await modificarSeccion(nombreSeccion, contenido, SeccionId, e).then(response =>
          setContenidoSeccion(response)
        );
      
      } catch (error) {
        console.log(error)
      }
    } else {
      alertainfo("El nombre debe contener al menos 3 caracteres")
    }
  }

  return (
    <>
      <>
        {mobile ?
          <div>
            <div
              className={`${style.cursotitulo} secciones`}>
              <Link className="aa"
                to={"/cursos/" + curso}>
                {curso}
              </Link>
              <Link
                to={"/cursos/" + curso + "/" + titulo}
                className={style.titulo}>
                {titulo}
              </Link>
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
              <>
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
              </>
            </div>
            <div class="secciones">
              {buscador ?
                <Buscador
                  recargarFuncionClickcode={recargarFuncionClickcode}
                  cursoBuscador={curso}
                />
                : null}

              <div
                style={{ display: `${mostrarConsola ? "block" : "none"}` }}
              >
                <Consola
                  recargarFuncionClickcode={recargarFuncionClickcode}
                  curso={curso}
                  dic={dic}
                  enconsola={enconsola}
                  eliminarDelHistorial={eliminarDelHistorial}
                  limpiarHistorial={limpiarHistorial} />
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
              <div class="secciones">
                <div>
                  <div
                    className={style.cursotitulo}>
                    <Link className="aa"
                      to={"/cursos/" + curso}>
                      {curso}
                    </Link>
                    <Link
                      to={"/cursos/" + curso + "/" + titulo}
                      className={style.titulo}>
                      {titulo}
                    </Link>
                  </div>
                  <NavegacionCursosSQL
                    mobile={mobile}
                    seccionId={id}
                    curso={curso}
                    titulo={titulo} />
                </div>
                <div>
                  {editMode ?
                    <ModificarSeccion
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
                  <>
                    <hr></hr>
                    <blockquote>
                      Anotaciones:
                    </blockquote>
                    {notes?.map(n => {
                      return (
                        <ReactMarkdown key={"notaTexto-" + n.id}>
                          {n.contenido}
                        </ReactMarkdown>
                      )
                    })}
                  </>
                  <hr></hr>
                </div>
              </div>
            }
              Right={
                editMode ?
                  <><AyudaEditor preview={preview} /></>
                  :
                  <>
                    <div class="secciones">

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
                          Mostrar preguntas ({qpreguntas})
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
                          recargarFuncionClickcode={recargarFuncionClickcode}
                          cursoBuscador={curso}
                        />
                        : null}
                      <Consola
                        recargarFuncionClickcode={recargarFuncionClickcode}
                        curso={curso}
                        dic={dic}
                        enconsola={enconsola}
                        eliminarDelHistorial={eliminarDelHistorial}
                        limpiarHistorial={limpiarHistorial} />
                      <hr></hr>
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
                  </>
              }

            />
          </>
        }
      </>

    </>
  );
}




