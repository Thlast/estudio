import React, { useState, useEffect } from 'react';
import { eliminarPregunta } from '../servicios/preguntas/eliminarPregunta';
import { obtenerExamen, obtenerPregunta, obtenerSeccion } from '../servicios/preguntas/obtenerPregunta';
import { FormAgregarPregunta } from './formAgregarPregunta';
import { FormModificarPregunta } from './formModificarPregunta';
import { modificarPregunta } from '../servicios/preguntas/modificarPregunta';
import { crearPregunta } from '../servicios/preguntas/crearPregunta';
import { useAuth } from '../../context/AuthContext';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Spinner } from '../Login/Spinner';
import { alertafail, alertasuccess } from '../alertas';


export function MostrarPregunta(props) {

  const {examenid} = props
  const [actualizar, setActualizar] = useState(0);
  const {titulo} = props;
  const {user, loading} = useAuth();
  const {seccion} = props;
  const {curso} = props;
  let edit = props.edit;
  const mostrarPreguntas = props.mostrarPreguntas
  const [modificar, setModificar] = useState(false) 
  const [preguntaModificar, setPreguntaModificar] = useState({})
  const [cargando, setCargando] = useState(true)
  const {agregar} = props;
  const [preguntas, setPreguntas] = useState([]);
  const [misPreguntas, setMisPreguntas] = useState([]);
  const {eliminarExamen} = props

  console.log(preguntas)
  useEffect(() => {
    if(seccion) {
      obtenerSeccion(curso, seccion)
      .then(data => (setPreguntas(data), setCargando(false)));
    } else if (examenid) {
      obtenerExamen(examenid)
      .then(data => (setPreguntas(data), setCargando(false)));
    }
    else {
      obtenerPregunta(curso)
    .then(data => (setPreguntas(data), setCargando(false)));
    }
  }, [seccion, actualizar])

  const eliminar = async (idpregunta) => {
    try {
      await eliminarPregunta(idpregunta);
      console.log("eliminado")
    } catch (error) {
      console.log(error)
    }
    setActualizar(actualizar+1)
  }

  const modificarPreguntas = async (datos, idmodif, event) => {
    try {
      await modificarPregunta(datos, idmodif, event);
    } catch (error) {
      console.log(error)
    }
    setActualizar(actualizar+1)
    setModificar(!modificar)
  }
  const crearPreguntas = (preguntaCrear, event) => {
    try {
      crearPregunta(preguntaCrear, event);
      setActualizar(actualizar+1)
    } catch (error) {
      console.log(error)
    }
    
  }


    const checkRespuesta = (c, num, id) => {
        const respuesta = document.querySelector(`input[name=opciones${num}]:checked`).value;
        if(respuesta === c) {
         alertasuccess()
          document.getElementById(`respuesta-${id}`).style.display = 'block'
        } else if (respuesta === null) {
          alert("debe seleccionar una respuesta") 
        } else {
          alertafail()
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
  
    const filtrarMisPreguntas = () => {

      setPreguntas(preguntas.filter(p => p.user === user.uid))
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
          <div
          className='botonespreguntas'>
          {examenid ? "" :
          <button
          className='home-boton'
          onClick={() => filtrarMisPreguntas()}>
            Mostrar solo mis preguntas
          </button>
}
          {edit & examenid !== undefined ?
          <button
          className='eliminarexamen btn-danger'
          onClick={() => eliminarExamen(preguntas)}>
            eliminar examen
          </button>
          : ""
}
</div>
          {/* {misPreguntas !== 0 } */}
          {preguntas.length !== 0 ?
            preguntas.map((p, num) => {
							return (
                <div
                className='cuadro'
                id={p.id}
                key={p.id}>           
								<p>
                 Pregunta Nº {1 + num}:
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
							)
							})        
            : <p>No hay preguntas</p>
}
            </div>
            : ""
}

            {agregar & !modificar ?
            <FormAgregarPregunta 
              examenid={examenid}
              crearPregunta={crearPreguntas}
              titulo={titulo}
              seccion={seccion} 
              curso={curso} />
            : ""
            }
            {modificar &&
            <div>
            <FormModificarPregunta 
              examenid={examenid}
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
