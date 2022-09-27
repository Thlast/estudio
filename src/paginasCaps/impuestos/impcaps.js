import {Navigate, useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MostrarPregunta } from '../../components/preguntas/mostrarPregunta';
import { Consola } from "../consola";
import { obtenerDatosConsola, obtenerDatosSeccion } from "../../components/servicios/cursos/obtenerSeccion";
import { NavegacionCursos } from "./navegacion";
import { TextoCurso } from "./textoCurso";
    
export function Impcaps(props) {
  
  const {sec} = useParams();
  const {titulo} = useParams();
  const [cargando, setCargando] = useState(true)
  const {materia} = useParams();
  const [dic, setDic] = useState("sin datos");
  const [seccion, setSeccion] = useState(sec);
  const navigate = useNavigate();
  const [enunciado, setEnunciado] = useState()
  const [codes, setCodes] = useState(document.querySelectorAll('code'));
  const [datos, setDatos] = useState([]) 
  const curso = materia
  
  const cargarPagina = async () => {

    await obtenerDatosSeccion(curso, seccion, titulo)
    .then(data => (setEnunciado(data), 
    setCargando(false),
    setCodes(document.querySelectorAll('code'))));

  }

  useEffect(() => {

    cargarPagina()
  }, [seccion])

  const cargarConsola = async () => {
    await obtenerDatosConsola(curso, dic)
    .then(data => (setDatos(data), 
    setCodes(document.querySelectorAll('code'))));
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
  console.log(`Los codes son${codes}` ,codes, enconsola);
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
 console.log("funcion ejecutada")
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
      setMostrarPreguntas(!mostrarPreguntas)
    } else if (mostrarPreguntas === false) {
      setBotonMostrar("botonmostrar")
      setMostrarPreguntas(!mostrarPreguntas)
    }

  }

  const ingresar = async (navegarSeccion) => {
    
    setDic("");
    await navigate("/cursos/"+curso+"/"+titulo+"/"+navegarSeccion);
    setCodes(document.querySelectorAll('code'));
    clickCode(codes);
    mostrar();
    setSeccion(navegarSeccion);
    if(edit) {
      editar()
    }
}    
const ingresarSeccion = async (siguienteTitulo, navegarSeccion) => {

  setDic("");
  await navigate("/cursos/"+curso+"/"+siguienteTitulo+"/"+navegarSeccion);
  setCodes(document.querySelectorAll('code'));
  clickCode(codes);
  mostrar();
  setSeccion(navegarSeccion);
  if(edit) {
    editar()
  }
}    

    return (
      <div>
        {cargando ? "...Cargando" :
      <div className="capitulos">
      
         <div class="secciones">
          <div
          className="encabezadocursos">
            <a className="aa"
            href={"/cursos/"+curso}>
            <span>
            {curso}
            </span>          
           </a>
           <span>
            {titulo}
           </span>
           <button
           id={botoneditar}
            className="cursos-as editarcurso"
            onClick={() => editar()}>
            Editar
        </button>            
        </div>
        <hr></hr>
        <div>
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
cargando={cargando} 
enunciado={enunciado} />
        <br></br>
              <hr></hr>
        </div>
        </div>
        <div class="reflex-spliter">
        </div>
        <div class="secciones">
          <div
          class="encabezadocursos">
          <button
          className="cursos-as"
          onClick={() => setDic("sin datos")}>
          Limpiar consola
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
            cargando={cargando}
            datos={datos}
            clickCode={clickCode}
            dic={dic} 
            enconsola={enconsola} 
            eliminarDelHistorial={eliminarDelHistorial} 
            limpiarHistorial={limpiarHistorial} />          
          <hr></hr>
            <MostrarPregunta 
            titulo={titulo}
            curso={curso} 
            seccion={seccion} 
            edit={edit} 
            mostrarPreguntas={mostrarPreguntas} />      
            
      </div>
    </div>
    }
</div>

    );
  }




