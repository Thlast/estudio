import React, { useState, useEffect } from 'react';
import { eliminarPregunta } from '../servicios/preguntas/eliminarPregunta';
import { obtenerExamen, obtenerPregunta, obtenerSeccion, obtenerUsuario } from '../servicios/preguntas/obtenerPregunta';
import { FormAgregarPregunta } from './formAgregarPregunta';
import { FormModificarPregunta } from './formModificarPregunta';
import { anexarExamen, modificarPregunta } from '../servicios/preguntas/modificarPregunta';
import { crearPregunta } from '../servicios/preguntas/crearPregunta';
import { useAuth } from '../../context/AuthContext';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Spinner } from '../Login/Spinner';
import { alertafail, alertainfo, alertasuccess } from '../alertas';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { AnexadasExamen } from './renderAnexo';

export function MostrarPregunta(props) {

  const {anexadas} = props;
  const {examenid} = props
  const {titulo} = props;
  const {user} = useAuth();
  const {seccion} = props;
  const {curso} = props;
  let edit = props.edit;
  const mostrarPreguntas = props.mostrarPreguntas
  const [modificar, setModificar] = useState(false) 
  const [preguntaModificar, setPreguntaModificar] = useState()
  const [cargando, setCargando] = useState(true)
  const {agregar} = props;
  const [preguntas, setPreguntas] = useState([]);
  const {eliminarExamen} = props
  const {perfil} = props
  const examenesCollectionRef = collection(db, "examenes");


  useEffect(() => {
    if(seccion) {
      obtenerSeccion(curso, seccion)
      .then(data => (setPreguntas(data), setCargando(false)));
    } else if (examenid) {
      obtenerExamen(examenid)
      .then(data => (setPreguntas(data), setCargando(false)));
    } else if (perfil) {
      obtenerUsuario(user.uid).
      then(data => (setPreguntas(data), setCargando(false)));
    } else {
      obtenerPregunta(curso)
    .then(data => (setPreguntas(data), setCargando(false)));
    };
   
  }, [seccion])

  const eliminar = async (idpregunta) => {
    try {
      await eliminarPregunta(idpregunta);
      setPreguntas(preguntas.filter(a => a.id !== idpregunta))
      console.log("eliminado")
    } catch (error) {
      console.log(error)
    }
  }

  const modificarPreguntas = async (datos, indice, idmodif, event) => {
    try {
      let preguntamodif = null
      await modificarPregunta(datos, idmodif, event).then(response =>
          preguntamodif = {...response, id: idmodif}
        );
      preguntas.splice(indice, 1, preguntamodif)
    } catch (error) {
      console.log(error)
    }
    setModificar(!modificar)
  }

  const crearPreguntas = async (preguntaCrear, event) => {
    try {
      await crearPregunta(preguntaCrear, event).then(response =>
        setPreguntas(preguntas.concat(response)))
    } catch (error) {
      console.log(error)
    } 
  }

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
      
    const cancelar = () => {
      setModificar(!modificar)
    }
    const irModificarPregunta = (p, num) => {
      setModificar(!modificar)
      setPreguntaModificar({...p, indice: num})
      
    }
    const filtrarMisPreguntas = () => {
      setPreguntas(preguntas.filter(p => (p.user === user.uid)))
    }

    const [misExamenes, setMisExamenes] = useState([])

    const getExamenes = async () => {

      const data = await getDocs(examenesCollectionRef);
      const misdatos = await data.docs.map((doc) => ({...doc.data(), id: doc.id})).filter(
        exa => exa.user === user.uid);
        if(misdatos.length === 0) {
          alertainfo("crea un examen en perfil")
        } else {
          setMisExamenes(misdatos)
        }
  
    }

    const anexarPregunta = async (id) => {  
      if(misExamenes.length === 0) {
        await getExamenes();
        document.getElementById(`anexo-${id}`).style.visibility = 'visible'
      } else {
        document.getElementById(`anexo-${id}`).style.visibility = 'visible'
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

    const anexar = (examenid, pregunta) => {

      if(pregunta.examenes.indexOf(examenid) === -1) {
        anexarExamen(examenid, pregunta.id)
      } else {
        alertainfo("La pregunta ya se encuentra en el examen")
      }
    }

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
            {anexadas &&
              <AnexadasExamen anexadas={anexadas} />
            }

          {preguntas.length !== 0 ?
            preguntas.map((p, num) => {
							return (
                <div
                className='cuadro cuadro-pregunta'
                id={p.id}
                key={p.id}>
                  <div
                  className='anexo-pregunta'>
                  <div
                  id={`anexo-${p.id}`}
                  className='anexo-examen'>

                  <select
                  onChange={(e) => anexar(e.target.value, p)}
                  name='anexar'
                  value={null}>
                    <option
                    selected="selected">
                      elegir examen
                    </option>
                    {misExamenes.map(exa => {
                      return (
                  <option
                  name='anexar'
                  value={exa.id}>
                    {exa.nombre}
                  </option>
                      )
                    })}
                  </select>   
     
                  </div>
                  <button
                  onClick={() => anexarPregunta(p.id)}
                  className=''>
                    +
                  </button>
                  </div>
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
                onClick={() => irModificarPregunta(p, num)}
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
              crearPreguntas={crearPreguntas}
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
