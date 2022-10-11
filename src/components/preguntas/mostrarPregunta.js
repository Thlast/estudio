import React, { useState, useEffect } from 'react';
import { eliminarPregunta } from '../servicios/preguntas/eliminarPregunta';
import { obtenerExamen, obtenerPregunta, obtenerSeccion, obtenerUsuario } from '../servicios/preguntas/obtenerPregunta';
import { FormAgregarPregunta } from './formAgregarPregunta';
import { FormModificarPregunta } from './formModificarPregunta';
import { modificarPregunta } from '../servicios/preguntas/modificarPregunta';
import { crearPregunta } from '../servicios/preguntas/crearPregunta';
import { useAuth } from '../../context/AuthContext';
import { Spinner } from '../Login/Spinner';
import { Respuesta } from './respuesta';
import { AnexadasExamen } from './renderAnexo';
import { Preguntas } from './preguntas';
import { Opciones } from './opcionesMultiples';

export function MostrarPregunta(props) {

  const {quitar} = props;
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


    return (
      <div>
        {mostrarPreguntas & !modificar ?
        cargando ? <Spinner></Spinner> :
        <div 
        className={"contenedorpreguntas"}>
          <div
          className='botonespreguntas'>
          {seccion &&
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
          {preguntas.length !== 0 ?
            preguntas.map((p, num) => {
							return (
                <div>
                <Preguntas 
                edit={edit}
                irModificarPregunta={irModificarPregunta}
                eliminar={eliminar}
                p={p}
                num={num}
                integral={true}
                />
                
                </div>
							)
							})        
            : <p>No hay preguntas</p>
} {anexadas &&
              <AnexadasExamen 
              quitar={quitar}
              examenid={examenid}
              numpreguntas={preguntas.length}
              anexadas={anexadas} />
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
