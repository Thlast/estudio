import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { alertainfo, alertasuccess, alertafail } from '../alertas';
import {Link} from "react-router-dom";
import { alertaquitar } from '../alertas';
import { ResueltasContext } from '../../context/Resueltas'
import { useContext } from 'react'
import { Opciones } from './opcionesMultiples';
import { VoF } from './formVoF';

export function AnexadasExamen(props) {

  const {completadas} = useContext(ResueltasContext)
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
          {completadas.length === 0 ? <circle></circle> :
          completadas.indexOf(p.id) !== -1 ?
            <circle
            className='resuelta'>
            ✓
            </circle>
            :
            <circle>

            </circle>
          }
            <div
            className='quitar'>
            <button
            onClick={() => quitarAnexo(p.id)}
            className=''>
              -
            </button>
            </div>
              
            <div
            className='pregunta-encabezado'>
              Pregunta Nº {numpreguntas + num + 1}: {" "}
              <Link
              to={`/cursos/${p.curso}/${p.titulo}/${p.seccion}`}>
                { p.seccion}
              </Link>
              </div>
              <hr></hr>
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
            {p.tipo === "Multiple" ?
            <Opciones 
            p={p}
            num={num} 
            /> : null
          }
            {p.tipo === "vof" ? <VoF 
               p={p}
               /> : null}
            </div>
          )
          })        
        : <p>No hay preguntas</p>}
        </div>  
);
}
