import {useParams} from "react-router-dom";
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

export function Impcaps() {

  const {sec} = useParams();
  const {titulo} = useParams();
  const [cargando, setCargando] = useState(true)
  const {materia} = useParams();
  const [dic, setDic] = useState("");
  const [seccion, setSeccion] = useState(sec);
  const [enunciado, setEnunciado] = useState()
  const [codes, setCodes] = useState(document.querySelectorAll('code'));
  const [datos, setDatos] = useState([]) 
  const curso = materia
  const [cargandoconsola, setCargandoConsola] = useState(false);
  
  const cargarPagina = async ({ signal }) => {
    await obtenerDatosSeccion(curso, seccion, titulo, { signal })
    .then(data => (setEnunciado(data), 
    setCargando(false),
    setCodes(document.querySelectorAll('code'))));
  }

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

  useEffect(() => {
    
    if(cargando === false) {
      clickCode()
    }
    
  }, [cargando, dic])

  
const [enconsola, setEnConsola] = useState([]);

const eliminarDelHistorial = async (a) => {

  setEnConsola(enconsola.filter(s => s !== a))
}

const limpiarHistorial = () => {
  setEnConsola([])
  // 
}

const clickCode = () => {
  // console.log(`Los codes son${codes}` ,codes, enconsola);
  for (let i = 0; i < codes.length; i++) {
   codes[i].onclick = function(e) {
    if(enconsola.indexOf(e.target.innerHTML.toLowerCase().replace(/[-º°`'".,]/g, '')) === -1) {
      setEnConsola(enconsola.concat(e.target.innerHTML.toLowerCase().replace(/[-º°`'".,]/g, '')));
      document.getElementById("consol").scrollIntoView({behavior: 'smooth'});
     }
    setDic(e.target.innerHTML.toLowerCase().replace(/[-º°`'".,]/g, ''));
    setCodes(document.querySelectorAll('code'));
    clickCode(codes)
     
   }      
 }  
//  console.log("funcion ejecutada")
}
clickCode()

  //mostrar pregunta
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
  const [edit, setEdit] = useState(false)
  const [buscador, setBuscador] = useState(false)
  const [botoneditar, setBotonEditar] = useState("botonnomostrar")
  const [botonmostrar, setBotonMostrar] = useState("botonnomostrar")
  const [botonbuscador, setBotonBuscador] = useState("botonnomostrar")

  const editar =  () => {
    if(edit === true) {
      setBotonEditar("nada")
    } else if (edit === false) {
      setBotonEditar("botonmostrar")
    }
    if(buscador) {
      mostrarbuscador()
    }
    
    setEdit(!edit)
  }

  const mostrar = async() => {
    if(mostrarPreguntas) {
      setBotonMostrar("nada");
      setMostrarPreguntas(false)
    } else if (mostrarPreguntas === false) {
      setBotonMostrar("botonmostrar")
      await setMostrarPreguntas(true)
    }

  }

  const ingresar =  (navegarSeccion) => {
    
    setDic("");
    setCodes(document.querySelectorAll('code'));
    clickCode(codes);
    setBotonMostrar("nada");
    setMostrarPreguntas(false);
    setSeccion(navegarSeccion);
    if(edit) {
      editar()
    }
}    
const ingresarSeccion = (proximo, navegarSeccion, volver) => {
  setDic("");
  setCodes(document.querySelectorAll('code'));
  clickCode(codes);
  setBotonMostrar("nada");
  setMostrarPreguntas(false);
  setSeccion(navegarSeccion);
  setCargando(true)
  if(edit) {
    editar()
  }
  let alert = "";
  if(volver === true) {
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
const mostrarbuscador = () => {
  if(buscador === true) {
    setBotonBuscador("nada")
  } else if (buscador === false) {
    setBotonBuscador("botonmostrar")
  }
  setBuscador(!buscador)
}

    return (
      <div>
      <div className="capitulos">
      
         <div class="secciones">
          <div
          className={style.cursotitulo}>
            <Link className="aa"
            to={"/cursos/"+curso}>
            {curso}  
          </Link>
           <Link
           to={"/cursos/"+curso+"/"+titulo}
           className={style.titulo}>
            {titulo}
            </Link>        
        </div>
        <hr></hr>
        <div
        className="show-element">
        <NavegacionCursos 
        curso={curso}
        cargando={cargando}
        ingresarSeccion={ingresarSeccion}
        seccion={seccion} 
        ingresar={ingresar} 
        titulo={titulo} />
        <hr></hr>
        <TextoCurso 
        seccion={seccion} 
        enunciado={enunciado} />
          <hr></hr>
        </div>
        </div>
        <div class="reflex-spliter">
        </div>
        <div class="secciones">
          <div
          className={style.cursointeraccion}>
          <button
          className="cursos-as"
          onClick={() => setDic("")}>
          Limpiar consola
        </button>
        <button
           id={botoneditar}
            className="cursos-as editarcurso"
            onClick={() => editar()}>
            Editar
        </button>    
        <button
           id={botonbuscador}
            className="cursos-as editarcurso"
            onClick={() => mostrarbuscador()}>
            Buscador
        </button>   
        <button
          id={botonmostrar}
          className="cursos-as mostrarpreg"
          onClick={() => mostrar()}>
            Mostrar preguntas
          </button>
          </div>
          <hr></hr>
          {buscador ? 
          <Buscador 
          cursoBuscador={curso}
          />
          : null}
          <hr></hr>
          <Consola 
            cargando={cargandoconsola}
            datos={datos}
            dic={dic} 
            enconsola={enconsola} 
            eliminarDelHistorial={eliminarDelHistorial} 
            limpiarHistorial={limpiarHistorial} />          
          <hr></hr>
          {edit ? <><LinkExamen /> <hr></hr></>: null}
          
            <MostrarPregunta 
            titulo={titulo}
            curso={curso} 
            seccion={seccion} 
            agregar={edit} 
            edit={edit} 
            mostrarPreguntas={mostrarPreguntas} />      


      </div>
    </div>
    
</div>

    );
  }




