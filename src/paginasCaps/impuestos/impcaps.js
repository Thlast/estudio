import {useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MostrarPregunta } from '../../components/preguntas/mostrarPregunta';
import { Consola } from "../consola";
import { obtenerDatosConsola, obtenerDatosSeccion } from "../../components/servicios/cursos/obtenerSeccion";
import { NavegacionCursos } from "./navegacion";
import { TextoCurso } from "./textoCurso";
import style from '../../components/modulos css/impcaps.module.css'
    
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

  const cargarPagina = async () => {
    await obtenerDatosSeccion(curso, seccion, titulo)
    .then(data => (setEnunciado(data), 
    setCargando(false),
    setCodes(document.querySelectorAll('code'))));
  }

  useEffect(() => {
    setEnunciado();
    cargarPagina()
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
const [count, setCount] = useState(0)
const eliminarDelHistorial = async (num, a) => {

  const indice = enconsola.indexOf(a);
    await enconsola.splice(indice, 1);
    setCount(count+1)
}

const limpiarHistorial = () => {
  enconsola.splice(0, enconsola.length)
  setCount(count+1)
}

const clickCode = () => {
  // console.log(`Los codes son${codes}` ,codes, enconsola);
  for (let i = 0; i < codes.length; i++) {
   codes[i].onclick = function(e) {
    if(enconsola.indexOf(e.target.innerHTML.toLowerCase().replace(/[-º°`'".,]/g, '')) === -1) {
      enconsola.push(e.target.innerHTML.toLowerCase().replace(/[-º°`'".,]/g, ''));
      setCount(count+1)
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
  const [botoneditar, setBotonEditar] = useState("botonnomostrar")
  const [botonmostrar, setBotonMostrar] = useState("botonnomostrar")

  const editar =  () => {
    if(edit === true) {
      setBotonEditar("nada")
    } else if (edit === false) {
      setBotonEditar("botonmostrar")
    }
    setEdit(!edit)
  }

  const mostrar =  () => {
    if(mostrarPreguntas) {
      setBotonMostrar("nada");
      setMostrarPreguntas(false)
    } else if (mostrarPreguntas === false) {
      setBotonMostrar("botonmostrar")
      setMostrarPreguntas(true)
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
const ingresarSeccion = (proximo, navegarSeccion) => {
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
  alert(`Has finalizado el capitulo ${titulo}, pasando a ${proximo}`)
  // console.log(titulo)
}    

    return (
      <div>
        {/* {cargando ? "...Cargando" : */}
      <div className="capitulos">
      
         <div class="secciones">
          <div
          className={style.cursotitulo}>
            <a className="aa"
            href={"/cursos/"+curso}>
            <span>
            {curso}
            </span>          
           </a>
           <span
           className={style.titulo}>
            {titulo}
           </span>        
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
          id={botonmostrar}
          className="cursos-as mostrarpreg"
          onClick={() => mostrar()}>
            Mostrar preguntas
          </button>
          </div>
          <hr></hr>
          <Consola 
            cargando={cargandoconsola}
            datos={datos}
            dic={dic} 
            enconsola={enconsola} 
            eliminarDelHistorial={eliminarDelHistorial} 
            limpiarHistorial={limpiarHistorial} />          
          <hr></hr>
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




