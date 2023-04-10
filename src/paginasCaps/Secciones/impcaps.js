import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MostrarPregunta } from '../../components/preguntas/mostrarPregunta';
import { Consola } from "../consola";
import { NavegacionCursos } from "./navegacion";
import { TextoCurso } from "./textoCurso";
import style from './impcaps.module.css'
import Swal from 'sweetalert2'
import { Buscador } from "../../components/buscador";
import { WindowSplitter } from "./splitter";
import { MostrarNotas } from "../../components/notes/mostrarNotas";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export function Impcaps() {

  const { sec } = useParams();
  const { titulo } = useParams();
  const [cargando, setCargando] = useState(true)
  const { materia } = useParams();
  const [dic, setDic] = useState("");
  const [seccion, setSeccion] = useState(sec);
  const [codes, setCodes] = useState(document.querySelectorAll('code'));
  const curso = materia
  const [mobile, setMobile] = useState(window.innerWidth)

  //funcion para detectar si es mobile
  useEffect(() => {
    function handleResize() {
      setMobile(window.innerWidth);
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
  }, [seccion])

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

  }, [codes])

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

  const ingresar = (navegarSeccion) => {
    //setDic("");
    setCodes(document.querySelectorAll('code'));
    setSeccion(navegarSeccion);
    cambiarBoton();
    setInfo(true)
  }

  const ingresarSeccion = (proximo, navegarSeccion, volver) => {
    //setDic("");
    setCodes(document.querySelectorAll('code'));
    setSeccion(navegarSeccion);
    setCargando(true)
    cambiarBoton();
    setInfo(true)
    let alert = "";
    if (volver === true) {
      alert = `Regresando a: ${proximo}`
    } else {
      alert = `Has finalizado ${titulo}!, siguiente: ${proximo}`
    }
    Swal.fire({
      title: alert,
      width: 550,
      padding: '0',
      color: '#716add',
      background: '#fff url(/images/trees.png)',
      backdrop: `
      rgba(0,0,123,0.4)
      url("https://media.tenor.com/rI_0O_9AJ5sAAAAj/nyan-cat-poptart-cat.gif")
      left top
      no-repeat
    `
    })
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

  return (
    <>
      {mobile <= 500 ?
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
            <TextoCurso
              recargarFuncionClickcode={recargarFuncionClickcode}
              seccion={seccion}
              curso={curso}
              titulo={titulo}
            />
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
              seccion={seccion}
              agregar={edit}
              edit={edit}
              mostrarPreguntas={mostrarPreguntas} />
            <div
              style={{ display: `${mostrarNotas ? "block" : "none"}` }}
            >
              <>
                <MostrarNotas
                  obtenerContenidoNotas={obtenerContenidoNotas}
                  seccion={seccion}
                  titulo={titulo}
                  obtenerQnotes={obtenerQnotes}
                  curso={curso} />
              </>
            </div>
            <NavegacionCursos
              curso={curso}
              ingresarSeccion={ingresarSeccion}
              seccion={seccion}
              ingresar={ingresar}
              titulo={titulo} />
          </div>
        </div>
        :
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
                <NavegacionCursos
                  curso={curso}
                  ingresarSeccion={ingresarSeccion}
                  seccion={seccion}
                  ingresar={ingresar}
                  titulo={titulo} />
              </div>
              <div>
                <TextoCurso
                  recargarFuncionClickcode={recargarFuncionClickcode}
                  seccion={seccion}
                  curso={curso}
                  titulo={titulo}
                />
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
            Right={<div class="secciones">
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
                seccion={seccion}
                agregar={edit}
                edit={edit}
                mostrarPreguntas={mostrarPreguntas} />
              <div
                style={{ display: `${mostrarNotas ? "block" : "none"}` }}>
                <MostrarNotas
                  obtenerContenidoNotas={obtenerContenidoNotas}
                  seccion={seccion}
                  titulo={titulo}
                  obtenerQnotes={obtenerQnotes}
                  curso={curso} />
              </div>
            </div>
            }

          />
        </>
      }
    </>

  );
}




