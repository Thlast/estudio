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
    try {
      await eliminarPregunta(idpregunta);
      // document.getElementById(idpregunta).remove()
      console.log("eliminado")
    } catch (error) {
      console.log(error)
    }
    
    setActualizar(actualizar+1)
  }

  const modificarPreguntas = async (mat, tipo, preg, resp, curso, a,b,c,d, correcta, idmodif, seccion, titulo, event) => {
    await modificarPregunta(mat, tipo, preg, resp, curso, a,b,c,d, correcta, idmodif, seccion, titulo, event);
    setActualizar(actualizar+1)
    setModificar(!modificar)
  }
  const crearPreguntas = (preguntaCrear, event) => {
    crearPregunta(preguntaCrear, event);
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
  const {agregar} = props;

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

    const cancelar = () => {
      setModificar(!modificar)
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
                className='respuesta-hide show-element'>
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
                className='hide show-element'>
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
                onClick={() => (eliminarPregunta(p.id), setActualizar(actualizar+1))}
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
            : ""
}

            {agregar & !modificar ?
            <FormAgregarPregunta 
              crearPregunta={crearPreguntas}
              titulo={titulo}
              seccion={seccion} 
              curso={curso} />
            : ""
            }
            {modificar &&
            <div>
            <FormModificarPregunta 
              cancelar={cancelar}
              titulo={titulo}
              seccion={seccion} 
              curso={curso} 
              modificarPregunta={modificarPreguntas}
              preguntaModificar={preguntaModificar}/>
            </div>
            }
            </div>
						
    );
  }
