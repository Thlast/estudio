
import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { obtenerPreguntaMateria } from './servicios/preguntas/obtenerPregunta';
import { Spinner } from './Login/Spinner';
import { Link } from 'react-router-dom';
import { alertafail, alertainfo, alertareiniciar, alertasuccess } from './alertas';
import { useHistorial } from './useHistorial';
import { MateriasContext } from '../context/MateriasContext';

export function HomeMongo() {
 
  const [preguntas, setPreguntas] = useState([]);
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  const [curso, setCurso] = useState("impuestos");
  const [cargando, setCargando] = useState(true);
  const materias = useContext(MateriasContext);
  const {loading} = useAuth()
  const [numeroBuscar, setNumeroBuscar] = useState(1)
console.log(materias)

  useEffect(() => {
    obtenerPreguntaMateria(curso)
    .then(data => (setPreguntas(data), setCargando(false)));
    
  }, [curso])

  const checkRespuesta = (c, num) => {
    const respuesta = document.querySelector(`input[name=opciones${num}]:checked`).value;
    if(respuesta === c) {
      alertasuccess("Respuesta correcta");
      setShow(true)
    } else if (respuesta === null) {
      alert("debe seleccionar una respuesta") 
    } else {
      alertafail("Respuesta incorrecta")
    }
  }
  
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
    {materias.map(a => {
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
            Siguiente{" >"}
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
              De la seccion: {" "}
              <Link
              to={`/cursos/${p.curso}/${p.titulo.replaceAll(" ", "%20")}/${p.seccion.replaceAll(" ", "%20")}`}
              className='home-seccion'>
                {p.seccion}
              </Link>
                </div>
                : ""
        }
              {p.tipo === "Normal" &&
              <div>                   
              <div
                className='home-pregunta cuadro'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}>
                {p.pregunta}              
              </ReactMarkdown>
              </div>
              <br></br>
              <button
              className='boton home-boton'
              onClick={() => setShow(!show)}>
                {show ? "Ocultar Respuesta" : "Mostrar Respuesta" }
              </button>      
              <hr></hr> 
              </div>
              }
              {p.tipo === "Multiple" &&
              <div>
              <div
                className='home-pregunta cuadro'> 
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}>
                {p.pregunta}              
              </ReactMarkdown>
              </div>
              <hr></hr>
              <div
              className="home-multiple cuadro">
              <p>
                  Selecciona la opción correcta:
                </p>
              <div
              className='opciones'>
                <label>
                <input name={`opciones${num}`} type="radio" value="a"/>
                {`a) ${p.opciones.a}`}   
                </label>        
                <label>  
                <input name={`opciones${num}`} type="radio" value="b"/>
                {`b) ${p.opciones.b}`}               
                </label>
                <label>
                <input name={`opciones${num}`} type="radio" value="c"/>
                {`c) ${p.opciones.c}`}
                </label>
                <label>
                <input name={`opciones${num}`} type="radio" value="d"/>
                {`d) ${p.opciones.d}`}
                </label>
                </div> 
        <button
              className='boton home-boton'
              onClick={() => checkRespuesta(p.correcta, num)}>
                Controlar Respuesta
              </button>
        </div>
        <hr></hr>
              </div>    
              } 
              {show &&
              <div>
               <p>
               La respuesta correcta es: {p.correcta}
             </p>
              <div
              className="show-element home-pregunta cuadro">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}>
                {p.respuesta}             
              </ReactMarkdown>
              </div>
              </div>
        }
            </div>
          )  
        }
        })}</div>}
      </main>
      
    </div>
    );
  }
