import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eliminarPregunta } from '../servicios/preguntas/eliminarPregunta';
import { obtenerPregunta, obtenerSeccion } from '../servicios/preguntas/obtenerPregunta';
import { FormAgregarPregunta } from './formAgregarPregunta';
import { FormModificarPregunta } from './formModificarPregunta';
import { modificarPregunta } from '../servicios/preguntas/modificarPregunta';
import { crearPregunta } from '../servicios/preguntas/crearPregunta';
import { useAuth } from '../../context/AuthContext';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Spinner } from '../Login/Spinner';
import { async } from '@firebase/util';

export function MostrarPregunta(props) {

  const [actualizar, setActualizar] = useState(0);

  const eliminar = async (idpregunta) => {
    await eliminarPregunta(idpregunta);
    setActualizar(actualizar+1)
  }

  const modificarPreguntas = async (mat, tipo, preg, resp, curso, a,b,c,d, correcta, idmodif, seccion, titulo, event) => {
    await modificarPregunta(mat, tipo, preg, resp, curso, a,b,c,d, correcta, idmodif, seccion, titulo, event);
    setActualizar(actualizar+1)
    setModificar(!modificar)
  }
  const crearPreguntas = (mat, tipo, preg, resp, curso, a,b,c,d, correcta, seccion, titulo, event) => {
    crearPregunta(mat, tipo, preg, resp, curso, a,b,c,d, correcta, seccion, titulo, event);
    setActualizar(actualizar+1)
  }
  const {titulo} = props;
  const {loading} = useAuth();
  const {seccion} = props;
  const {curso} = props;
  let edit = props.edit;
  const mostrarPreguntas = props.mostrarPreguntas
  const [modificar, setModificar] = useState(false) 
  const [preguntaModificar, setPreguntaModificar] = useState({})
  const [cargando, setCargando] = useState(true)

		useEffect(() => {
      if(seccion) {
        obtenerSeccion(curso, seccion)
        .then(data => (setPreguntas(data), setCargando(false)));
      } else {
        obtenerPregunta(curso)
			.then(data => (setPreguntas(data), setCargando(false)));
      }
		}, [seccion, actualizar])

		const [preguntas, setPreguntas] = useState([]);

    const checkRespuesta = (c, num, id) => {
        const respuesta = document.querySelector(`input[name=opciones${num}]:checked`).value;
        if(respuesta === c) {
          alert("respuesta correcta");
          document.getElementById(id).style.display = 'block'
        } else if (respuesta === null) {
          alert("debe seleccionar una respuesta") 
        } else {
          alert("respuesta incorrecta")
        }
        // console.log(respuesta)
      }

    const irModificarPregunta = (p) => {
      setModificar(!modificar)
      setPreguntaModificar(p)
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
    if(loading) return <h1>Loading...</h1>

    return (
      <div>
        
          
        {mostrarPreguntas & !modificar ?
        cargando ? <Spinner></Spinner> :
        <div 
        className={"contenedorpreguntas"}>
          {preguntas.length !== 0 ?
            preguntas.map((p, num) => {
							return (
                <div
                className='cuadro'
                id={p.id}
                key={p.id}>           
                  {p.tipo === "Normal" &&
                  <div
                  >
								<p>
                 Pregunta Nº {1 + num}:
                 </p>
                 <ReactMarkdown
                  remarkPlugins={[remarkGfm]}>
									{p.pregunta}
                  </ReactMarkdown>
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
                className='respuesta-hide'>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}>
                  {p.respuesta}
                </ReactMarkdown>
                </div>
                {edit &&
                <div
                className='botones-editar'>
                <button
                onClick={() => irModificarPregunta(p)}
                className='btn btn-primary'>
                  Modificar
                </button>
                <button
                onClick={() => (eliminar(p.id))}
                className='btn btn-danger'>
                  Eliminar
                </button>
                </div> 
            }
                
                </div>
                }
                {p.tipo === "Multiple" &&
                  <div>
								<p>
                Pregunta Nº {1 + num}:
                </p>
                <ReactMarkdown
                remarkPlugins={[remarkGfm]}>
									{p.pregunta}
                </ReactMarkdown>
                <div
                className='opciones'>
                  <div>
                <input name={`opciones${num}`} type="radio" value="a"/>
                {`a) ${p.opciones.a}`}  
                </div>
                <div>           
                <input name={`opciones${num}`} type="radio" value="b"/>
                {`b) ${p.opciones.b}`}
                  </div>   
                  <div>          
                <input name={`opciones${num}`} type="radio" value="c"/>
                {`c) ${p.opciones.c}`}
                </div>
                <div>
                <input name={`opciones${num}`} type="radio" value="d"/>
                {`d) ${p.opciones.d}`}
                </div>
                <button
                className='home-boton'
                onClick={() => checkRespuesta(p.correcta, num, p.id)}>
                  Controlar
                </button>
                </div>
                <div
                className='hide'>
                  <p>La respuesta correcta es: {p.correcta}</p>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}>
                  {p.respuesta}
                </ReactMarkdown>
                </div>
                {edit &&
                <div
                className='botones-editar'>
                <button
                onClick={() => irModificarPregunta(p)}
                className='btn btn-primary'>
                  Modificar
                </button>
                <button
                onClick={() => eliminarPregunta(p.id)}
                className='btn btn-danger'>
                  Eliminar
                </button>
                </div> 
            }
                
                </div>
                }
                </div>
							)
							})        
            : <p>No hay preguntas</p>
}
            </div>
            : <p></p>
}

            {edit & !modificar ?
            <FormAgregarPregunta 
              crearPregunta={crearPreguntas}
              titulo={titulo}
              seccion={seccion} 
              curso={curso} />
            : <p></p>
            }
            {modificar &&
            <div>
            <FormModificarPregunta 
              titulo={titulo}
              seccion={seccion} 
              curso={curso} 
              modificarPregunta={modificarPreguntas}
              preguntaModificar={preguntaModificar}/>
            <button
            className='btn btn-danger'
            onClick={() => setModificar(!modificar)}
            > Cancelar
            </button>
            </div>
            }
            </div>
						
    );
  }
