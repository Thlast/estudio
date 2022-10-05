
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { obtenerPreguntaMateria } from './servicios/preguntas/obtenerPregunta';
import { obtenerMaterias } from './servicios/cursos/obtenerCurso';
import { Spinner } from './Login/Spinner';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { alertafail, alertasuccess } from './alertas';

export function HomeMongo() {
  const MySwal = withReactContent(Swal)
 
  const [preguntas, setPreguntas] = useState([]);
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  const [curso, setCurso] = useState("impuestos");
  const [cargando, setCargando] = useState(true);
  const [materias, setMaterias] = useState([]);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  useEffect(() => {
    obtenerMaterias(curso)
    .then(data => (setMaterias(data)));
    
  }, [])
  

  useEffect(() => {
    obtenerPreguntaMateria(curso)
    .then(data => (setPreguntas(data), setCargando(false)));
    
  }, [curso])

  const checkRespuesta = (c, num, id) => {
    const respuesta = document.querySelector(`input[name=opciones${num}]:checked`).value;
    if(respuesta === c) {
      alertasuccess();
      setShow(true)
    } else if (respuesta === null) {
      alert("debe seleccionar una respuesta") 
    } else {
      alertafail()
    }
    // console.log(respuesta)
  }
  
  const useHistorial = () => {
    const [historial, setHistorial] = useState([0]);
    const agregar = (i) => { 
      if(historial.indexOf(i) === -1) {
      setHistorial(historial.concat(i))}
    }
    const reiniciarh = () => setHistorial([current])
  
    return {
      historial,
      agregar,
      reiniciarh
    }
  }
  const historialImp = useHistorial([0])
  const historialConta = useHistorial([0])
  const historialFinanzas = useHistorial([0])
  const historialJudicial = useHistorial([0])
  const historialAuditoria = useHistorial([0])
  const historialConta9 = useHistorial([0])

  const reiniciar = () => {

    swalWithBootstrapButtons.fire({
      title: 'Desea reiniciar el contador?',
      text: "Ya has visto todas las preguntas de esta sección!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, reiniciar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        switch (curso) {
          case "impuestos": historialImp.reiniciarh(); break
          case "conta7": historialConta.reiniciarh(); break
          case "finanzas": historialFinanzas.reiniciarh(); break
          case "judicial": historialJudicial.reiniciarh(); break
          case "auditoria": historialAuditoria.reiniciarh(); break
          case "conta9": historialConta9.reiniciarh(); break;}

        swalWithBootstrapButtons.fire(
          'Reiniciado!',
          'Ya puedes volver a sortear preguntas :)',
          'success'
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La funcion aleatorio no funcionara :(',
          'error'
        )
      }
    })
      
      }
 
  const random = () => {
    const indice = Math.floor(Math.random() * preguntas.length)
    let record = []
    switch(curso) {
      case "impuestos": record = historialImp.historial; break;
      case "conta7": record = historialConta.historial; break;
      case "finanzas": record = historialFinanzas.historial; break;
      case "judicial": record = historialJudicial.historial; break;
      case "auditoria": record = historialAuditoria.historial; break;
      case "conta9": record = historialConta9.history; break;
    }
      if (record.indexOf(indice) === -1 && preguntas.length !== record.length) {
        switch(curso) {
          case "impuestos": historialImp.agregar(indice); break;
          case "conta7": historialConta.agregar(indice); break;
          case "finanzas": historialFinanzas.agregar(indice); break;
          case "judicial": historialJudicial.agregar(indice); break;
          case "auditoria": historialAuditoria.agregar(indice); break;
          case "conta9": historialConta9.agregar(indice); break;
        }
        setCurrent(indice)
      } else if (record.indexOf(indice) !== -1 && preguntas.length !== record.length) {
        random()
      } else if (preguntas.length === record.length) {
        reiniciar()
      }
    } 

  const siguiente = () => {
    const indice = current + 1
    if(indice !== preguntas.length) {
      switch(curso) {
        case "impuestos": historialImp.agregar(indice); break;
        case "conta7": historialConta.agregar(indice); break;
        case "finanzas": historialFinanzas.agregar(indice); break;
        case "judicial": historialJudicial.agregar(indice); break;
        case "auditoria": historialAuditoria.agregar(indice); break;
        case "conta9": historialConta9.agregar(indice); break;
      }
      setCurrent(indice);
    } else if(indice >= preguntas.length) {
      MySwal.fire({icon: 'info', title: <p>No hay mas preguntas</p> });
    } 
    setShow(false);   
  }

  const anterior = () => {
    const indice = current - 1
    if(indice !== -1) {
      switch(curso) {
        case "impuestos": historialImp.agregar(indice); break;
        case "conta7": historialConta.agregar(indice); break;
        case "finanzas": historialFinanzas.agregar(indice); break;
        case "judicial": historialJudicial.agregar(indice); break;
        case "auditoria": historialAuditoria.agregar(indice); break;
        case "conta9": historialConta9.agregar(indice); break;
      } setCurrent(indice);
    } else if(indice <= 0) {
      
    } 
    setShow(false);
  }

  const cambiarCurso = (e) => {
    setCurso(e);
    switch(e) {
      case "impuestos": setCurrent(historialImp.historial[historialImp.historial.length-1]); break;
      case "conta7": setCurrent(historialConta.historial[historialConta.historial.length-1]); break;
      case "finanzas": setCurrent(historialFinanzas.historial[historialFinanzas.historial.length-1]); break;
      case "judicial": setCurrent(historialJudicial.historial[historialJudicial.historial.length-1]); break;
      case "auditoria": setCurrent(historialAuditoria.historial[historialAuditoria.historial.length-1]); break;
      case "conta9": setCurrent(historialConta9.historial[historialConta9.historial.length-1]); break;
    };
  }

  console.log(preguntas)
  const {loading} = useAuth()

    return (
    <div className="App">
    
      <main className="HomeMongo">
          {loading ? <h1>Loading...</h1>
      :
      <div>
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
            Pregunta aleatoria ⚄
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
                <div>           
              <div
                className='home-pregunta'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}>
                {p.pregunta}              
              </ReactMarkdown>
              </div>
              
              <button
              className='boton home-boton'
              onClick={() => setShow(!show)}>
                {show ? "Ocultar Respuesta" : "Mostrar Respuesta" }
              </button>
              <div>
                </div>
        </div>
              <hr></hr> 
              </div>
              }
              {p.tipo === "Multiple" &&
              <div>
              <div
                className='home-pregunta'> 
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}>
                {p.pregunta}              
              </ReactMarkdown>
              </div>
              <hr></hr>
              <div>
              <p>
                  Selecciona la opción correcta:
                </p>
              <div
              className="home-pregunta">
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
              </div>
        </div>
        <br></br>
        <button
              className='boton home-boton'
              onClick={() => checkRespuesta(p.correcta, num)}>
                Controlar Respuesta
              </button>
              <hr></hr> 
              </div>
              }
              {show &&
              <div>
               <p>
               La respuesta correcta es: {p.correcta}
             </p>
              <div
              className="show-element home-pregunta">
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
