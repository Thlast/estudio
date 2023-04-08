import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MostrarPregunta } from '../../components/preguntas/mostrarPregunta';
import { Consola } from "../consola";
import { obtenerDatosConsola, obtenerDatosSeccion } from "../../components/servicios/cursos/obtenerSeccion";
import { NavegacionCursos } from "./navegacion";
import { TextoCurso } from "./textoCurso";
import style from '../../components/modulos-css/impcaps.module.css'
import Swal from 'sweetalert2'
import { Buscador } from "../../components/buscador";
import { LinkExamen } from "./linkExamen";
import { WindowSplitter } from "./splitter";
import { MostrarNotas } from "../../components/notes/mostrarNotas";
import { CrearNota } from "../../components/notes/crearNota";
import { FormCrearDef } from "../../components/definiciones/crearDef";
import { Nota } from "../../components/notes/nota";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export function Impcaps() {

  const { sec } = useParams();
  const { titulo } = useParams();
  const [cargando, setCargando] = useState(true)
  const { materia } = useParams();
  const [dic, setDic] = useState("");
  const [seccion, setSeccion] = useState(sec);
  const [enunciado, setEnunciado] = useState()
  const [codes, setCodes] = useState(document.querySelectorAll('code'));
  const [datos, setDatos] = useState([])
  const curso = materia
  const [cargandoconsola, setCargandoConsola] = useState(false);
  const [mobile, setMobile] = useState(window.innerWidth)


  const cargarPagina = async ({ signal }) => {
    await obtenerDatosSeccion(curso, seccion, titulo, { signal })
      .then(data => (setEnunciado(data),
        setCargando(false),
        setCodes(document.querySelectorAll('code'))
      )
      );
  }

  useEffect(() => {
    function handleResize() {
      setMobile(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    setEnunciado();
    // Creamos el controlador para abortar la petición
    const controller = new AbortController()
    // Recuperamos la señal del controlador
    const { signal } = controller
    // Hacemos la petición a la API y le pasamos como options la señal
    cargarPagina({ signal })
    return () => controller.abort()
  }, [seccion])

  const cargarConsola = async () => {

    if (dic !== "") {
      cambiarBoton()
      setMostrarConsola(true)
      setCargandoConsola(true);
      await obtenerDatosConsola(curso, dic)
        .then(data => (setDatos(data),
          setCodes(document.querySelectorAll('code')),
          setCargandoConsola(false)));
    }
  }

  useEffect(() => {


    cargarConsola()


  }, [dic])

  const recargarFuncionClickcode = () => {
    setCodes(document.querySelectorAll('code'))
  }
  useEffect(() => {

    recargarFuncionClickcode()

    setTimeout(() => {
      clickCode()
    }, 2000)

  }, [mobile, cargando, dic])


  const [enconsola, setEnConsola] = useState([]);

  const eliminarDelHistorial = async (a) => {

    setEnConsola(enconsola.filter(s => s !== a))
  }

  const limpiarHistorial = () => {
    setEnConsola([])
    // 
  }

  //funcion que da funcionalidad a los codes
  const clickCode = () => {

    //console.log(codes)
    for (let i = 0; i < codes.length; i++) {
      codes[i].onclick = function (e) {
        if (enconsola.indexOf(e.target.innerHTML.toLowerCase().replace(/[-º°`'".,]/g, '')) === -1) {
          setEnConsola(enconsola.concat(e.target.innerHTML.toLowerCase().replace(/[-º°`'".,]/g, '')));
          document.getElementById("consol").scrollIntoView({ behavior: 'smooth' });
        }
        setDic(e.target.innerHTML.toLowerCase().replace(/[-º°`'".,]/g, ''));
        //setCodes(document.querySelectorAll('code'));
        //clickCode(codes)
      }
    }

    //console.log("funcion ejecutada")

  }
  clickCode()

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
    console.log(editar)
    setBuscador(false)
    setEdit(false)
    setInfo(false)
    setMostrarConsola(false)
    setMostrarNotas(false)
  }


  const ingresar = (navegarSeccion) => {

    setDic("");
    setCodes(document.querySelectorAll('code'));
    clickCode(codes);
    setSeccion(navegarSeccion);
    cambiarBoton();
    setInfo(true)
  }
  const ingresarSeccion = (proximo, navegarSeccion, volver) => {
    setDic("");
    setCodes(document.querySelectorAll('code'));
    clickCode(codes);
    // setBotonMostrar("nada");
    // setMostrarPreguntas(false);
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

  const [qpreguntas, setQpreguntas] = useState(0)
  const [qnotes, setQnotes] = useState(0)

  const obtenerQpreguntas = (q) => {
    setQpreguntas(q)
  }
  const obtenerQnotes = (q) => {
    setQnotes(q)
  }

  const limpiarConsola = () => {
    setDic("")

  }

  const [notes, setNotes] = useState([]);

  const obtenerContenidoNotas = (data) => {
    setNotes(data)
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
              enunciado={enunciado} />
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
                cargando={cargandoconsola}
                datos={datos}
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
                  seccion={seccion}
                  titulo={titulo}
                  obtenerQnotes={obtenerQnotes}
                  curso={curso} />
                <FormCrearDef curso={curso} />
                {/* <CrearNota
                  titulo={titulo}
                  curso={curso}
                  seccion={seccion}
                /> */}
              </>
            </div>

            <NavegacionCursos
              curso={curso}
              cargando={cargando}
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
                  cargando={cargando}
                  ingresarSeccion={ingresarSeccion}
                  seccion={seccion}
                  ingresar={ingresar}
                  titulo={titulo} />


              </div>

              <div>
                <TextoCurso
                  recargarFuncionClickcode={recargarFuncionClickcode}
                  seccion={seccion}
                  enunciado={enunciado} />
                  <>
                  <hr></hr>
                  <blockquote>
                  Anotaciones:
                  </blockquote>
                  
                  {notes?.map(n => {
                    return (
                      <ReactMarkdown key={"notaTexto-"+n.id}>
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
                cargando={cargandoconsola}
                datos={datos}
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
                style={{ display: `${mostrarNotas ? "block" : "none"}` }}
              >
                <MostrarNotas
                obtenerContenidoNotas= {obtenerContenidoNotas}
                  seccion={seccion}
                  titulo={titulo}
                  obtenerQnotes={obtenerQnotes}
                  curso={curso} />
                <FormCrearDef curso={curso} />
                {/* <CrearNota
                  titulo={titulo}
                  curso={curso}
                  seccion={seccion}
                /> */}

              </div>

            </div>

            }

          />
        </>
      }
    </>

  );
}




