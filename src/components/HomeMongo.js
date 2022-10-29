import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { obtenerPreguntaMateria } from './servicios/preguntas/obtenerPregunta';
import { Spinner } from './Login/Spinner';
import { Link } from 'react-router-dom';
import { alertainfo, alertareiniciar } from './alertas';
import { useHistorial } from './useHistorial';
import { MateriasContext } from '../context/MateriasContext';
import { Preguntas } from './preguntas/preguntas';
import { Opciones } from './preguntas/opcionesMultiples';
import { VoF } from './preguntas/formVoF';


export function HomeMongo() {
 
  const [preguntas, setPreguntas] = useState([]);
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  const [curso, setCurso] = useState("impuestos");
  const [cargando, setCargando] = useState(true);
  const {materias} = useContext(MateriasContext);
  const {cargandoMaterias} = useContext(MateriasContext);
  const {loading} = useAuth()
  const [numeroBuscar, setNumeroBuscar] = useState(1)

  useEffect(() => {
    obtenerPreguntaMateria(curso)
    .then(data => (setPreguntas(data), setCargando(false)));
    
  }, [curso])


  const historialImp = useHistorial([0])
  const historialConta = useHistorial([0])
  const historialFinanzas = useHistorial([0])
  const historialJudicial = useHistorial([0])
  const historialAuditoria = useHistorial([0])
  const historialConta9 = useHistorial([0])

  const identificarCurso = async (e) => {
    let evaluar = e || curso;
    switch (evaluar) {
      case "impuestos": return historialImp; 
      case "conta7": return historialConta; 
      case "finanzas": return historialFinanzas; 
      case "judicial": return historialJudicial; 
      case "auditoria": return historialAuditoria; 
      case "conta9": return historialConta9;
    }
  }

  const funcionreiniciar = async () => {
    await identificarCurso().then(resp => resp.reiniciarh(current))
  }

  const reiniciar = () => {
    alertareiniciar(funcionreiniciar)
  }
 
  const random = async () => {
    const indice = Math.floor(Math.random() * preguntas.length)
    await identificarCurso().then(resp => {

      if (resp.historial.indexOf(indice) === -1 && preguntas.length !== resp.historial.length) {
        resp.agregar(indice)
        setCurrent(indice)
      } else if (resp.historial.indexOf(indice) !== -1 && preguntas.length !== resp.historial.length) {
        random()
      } else if (preguntas.length === resp.historial.length) {
        reiniciar()
      }})
    } 

  const siguiente = async () => {
    const indice = current + 1
    if(indice !== preguntas.length) {
      await identificarCurso().then(resp => resp.agregar(indice));
      setCurrent(indice);
    } else if(indice >= preguntas.length) {
      alertainfo("No hay mas preguntas")
    } 
    setShow(false);   
  }
  const anterior = async () => {
    const indice = current - 1
    if(indice !== -1) {
      await identificarCurso().then(resp => resp.agregar(indice));
      setCurrent(indice);
    } else if(indice <= 0) { 

    } 
    setShow(false);
  }
  
  const cambiarCurso = async (e) => {
    setCurso(e);
    await identificarCurso(e).then(resp => setCurrent(resp.historial[resp.historial.length-1]))
  }

  const buscarPregunta = async (event, numeroBuscar) => {
    event.preventDefault();
    const indice = parseInt(numeroBuscar) - 1
    if(indice < preguntas.length & indice >= 0) {
      await identificarCurso().then(resp => resp.agregar(indice));
      setCurrent(indice);
    } else if(indice >= preguntas.length) {
      alertainfo("No existe la pregunta número "+ numeroBuscar + ", número máximo "+ preguntas.length)
    } 
    setShow(false);   
  }
  const mostrarRespuesta = (id) => {
    let estado = document.getElementById(`respuesta-${id}`).style.display

    if(estado === 'block') {
      document.getElementById(`respuesta-${id}`).style.display = 'none'
      setShow(false)
    } else {
      document.getElementById(`respuesta-${id}`).style.display = 'block'
      setShow(true)
    }
  }

    return (
    <div className="App">
      <main className="HomeMongo">
          {loading ? <Spinner></Spinner>
      :
      <div>
        <form
        className='homebuscar'>
          <div>
            <span>
              Buscar por Nº {" "}
            </span>
        <input
        min={1}
        max={preguntas.length}
        onChange={(e) => setNumeroBuscar(e.target.value)}
        value={numeroBuscar}
        type="number">
        </input>
        <button
        className='home-botonbuscar'
        onClick={(event) => buscarPregunta(event, numeroBuscar)}>
          🔎
        </button>
        </div>
        </form>
        <br></br>
    <div>
      <select 
        onChange={(e) => cambiarCurso(e.target.value)} 
        class="boton home-boton" 
        value={curso}
        name="curso"
        for="materias">
{cargandoMaterias ? <Spinner></Spinner> :
    materias.map(a => {
          return (
      <option 
      key={"materia-"+a.id}
      value={a.id}>
        {a.nombre}
      </option>      
       )
      })}
   </select>
     </div>        
     <br></br>
      <div>
          <button 
          class="boton home-boton" 
          onClick={() => anterior()}>
            {"< "}Anterior
          </button>  
          <button 
          class="boton home-boton" 
          onClick={() => (random(), setShow(false))}>
            ⚄ Aleatoria ⚄
          </button>
          <button 
          class="boton home-boton" 
          onClick={() => siguiente()
          }>
            <span>Siguiente{" >"}</span>
          </button>
          </div>
          {cargando ? <Spinner></Spinner> : 
        preguntas.map((p, num) => {
          if (preguntas.indexOf(p) === current){
          return (
          <div
          key={p.id}>
            <h1>
              Pregunta Nº {num+1}:
            </h1>
            {p.titulo ?
            <div>
            <span>De la seccion: {" "}</span>
            <Link
            to={`/cursos/${p.curso}/${p.titulo.replaceAll(" ", "%20")}/${p.seccion.replaceAll(" ", "%20")}`}
            className='home-seccion'>
              {p.seccion}
            </Link>
              </div>
              : ""
              }
              <Preguntas 
              edit={false}
              p={p}
              num={num}
              />
            <div>                   
            <br></br>
            {p.tipo === "Normal" &&
            <button
            className='boton home-boton'
            onClick={() => mostrarRespuesta(p.id)}>
              {show ? "Ocultar Respuesta" : "Mostrar Respuesta" }
            </button>}   
            <hr></hr> 
            </div>
            {p.tipo === "Multiple" &&
            <div
            className="home-multiple cuadro">
              <Opciones 
              p={p}
              num={num}/>            
            </div>}
            {p.tipo === "vof" &&
            <div
            style={{"text-align": "left"}}
            className="home-multiple cuadro">
              <VoF 
              p={p}
              num={num}/>            
            </div>}
          
          <div
          className='hide'
          id={"respuesta-"+p.id}>
            <div>
            <p style={{"color": "green"}} className='hide' id={`correcto-${p.id}`}>✓</p>
            <p>
            La respuesta correcta es: {p.correcta || p.resultado}
          </p>
          </div>
          <div
          className="show-element home-pregunta cuadro">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}>
            {p.respuesta}             
          </ReactMarkdown>
          </div>
          </div>
      
            </div>
          )  
        }
        })}</div>}
      </main>
      
    </div>
    );
  }
