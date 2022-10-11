import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { alertainfo, alertasuccess, alertafail } from '../alertas';
import {Link} from "react-router-dom";
import { alertaquitar } from '../alertas';

export function AnexadasExamen(props) {

  const {quitar} = props;
  const {anexadas} = props;
  const {examenid} = props;
  const {numpreguntas} = props;
  const [renderanexadas, setRenderAnexadas] = useState(anexadas)
  
  const checkRespuesta = (c, num, id) => {
    try {
    const respuesta = document.querySelector(`input[name=opciones${num}]:checked`).value;
    if(respuesta === c) {
     alertasuccess("Respuesta correcta")
      document.getElementById(`respuesta-${id}`).style.display = 'block'
    } else {
      alertafail("Respuesta incorrecta")
    }
    } catch (error) {
        alertainfo("debe seleccionar una respuesta") 
    }
  }

  const mostrar = (id) => {
    document.getElementById("respuesta-"+id).style.display = 'block';
    document.getElementById("ocultar-"+id).style.display = 'block';
    document.getElementById("mostrar-"+id).style.display = 'none';
  }
  const ocultar = (id) => {
    document.getElementById("respuesta-"+id).style.display = 'none';
    document.getElementById("mostrar-"+id).style.display = 'block';
    document.getElementById("ocultar-"+id).style.display = 'none';
  }

  const quitarAnexo = (preguntaid) => {

    const funcionquitar = async() => {
      await quitar(examenid, preguntaid);
      setRenderAnexadas(renderanexadas.filter(a => a.id !== preguntaid))
    }

    alertaquitar(funcionquitar)
  }
  

return (
  <div className='container-anexo'>
      {anexadas.length !== 0 ?
        renderanexadas.map((p, num) => {
          return (
            <div
            className='cuadro cuadro-pregunta'
            id={p.id}
            key={p.id}>
            <div
            className='quitar'>
            <button
            onClick={() => quitarAnexo(p.id)}
            className=''>
              -
            </button>
            </div>
              
            <p>
              Pregunta Nº {numpreguntas + num + 1}: {" "}
              <Link
              to={`/cursos/${p.curso}/${p.titulo}/${p.seccion}`}>
                { p.seccion}
              </Link>
              </p>
              <ReactMarkdown
              remarkPlugins={[remarkGfm]}>
              {p.pregunta}
              </ReactMarkdown>
              {p.tipo === "Normal" &&
              <div>
            <div>
            <button
              className='boton respuesta-show'
              id={"mostrar-"+p.id}
              onClick={() => mostrar(p.id)}>
              Mostrar Respuesta
            </button>
            <button
              className='boton respuesta-hide'
              id={"ocultar-"+p.id}
              onClick={() => ocultar(p.id)}>
              Ocultar Respuesta
            </button>
            </div>
            
            <div
            id={"respuesta-"+p.id}
            className='respuesta-hide show-element'>
              <hr></hr>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}>
              {p.respuesta}
            </ReactMarkdown>
            </div>            
            </div>
            }
            {p.tipo === "Multiple" &&
              <div>
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
            <button
            className='home-boton'
            onClick={() => checkRespuesta(p.correcta, num, p.id)}>
              Controlar
            </button>
            </div>
            <div
            id={`respuesta-${p.id}`}
            className='respuesta-hide show-element'>
              <p>La respuesta correcta es: {p.correcta}</p>
              <hr></hr>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}>
              {p.respuesta}
            </ReactMarkdown>
            </div>        
            </div>
            }
            </div>
          )
          })        
        : <p>No hay preguntas</p>}
        </div>  
);
}
