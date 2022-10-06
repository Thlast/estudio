import React, { useState, useEffect } from 'react';
import { usePreguntaForm } from './usePregunta';
import { obtenerMaterias } from '../servicios/cursos/obtenerCurso';
import { useAuth } from '../../context/AuthContext';

export function FormAgregarPregunta(props) {

    const {titulo} = props;
    const {crearPregunta} = props;
    const {seccion} = props;
    const {curso} = props;
    const {examenid} = props;
    const [materias, setMaterias] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
      obtenerMaterias()
      .then(data => (setMaterias(data)));
      
    }, [])
    
   const preguntaCrear = usePreguntaForm({
    preg: "",
    resp: "",
    tipo: "Normal",
    // id: "",
    curso: curso,
    //opciones:
      a: "",
      b: "",
      c: "",
      d: "",
    correcta: "a",
    titulo: titulo,
    seccion: seccion,
    examen: examenid,
    user: user.uid
   })

    return (
      <form
      className='form-container'
      onSubmit={
        // preguntaCrear.handleSubmit}
        (event) =>
        crearPregunta(preguntaCrear.datosPregunta, event)
        // preguntaCrear.handleSubmit
      }
        >
          {examenid || seccion !== undefined ? "" :
          <div>
      <select 
        required
        onChange={preguntaCrear.handleChange} 
        class="boton home-boton" 
        value={preguntaCrear.curso}
        name="curso"
        for="materias">
          <option
          selected="selected">
            Selecciona un curso
          </option>
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
     }  
        <div>
        <select required 
        onChange={preguntaCrear.handleChangeTipo}
        class="home-boton" 
        name='tipo'
        for="tipo" 
        value={preguntaCrear.tipo}>
              <option>
                Normal
              </option>
              <option>
                Multiple
              </option>
          </select>
        </div>
          <div className="pyr-container">
          <label className="form-pyr" for="preg">
            Pregunta:
            <textarea className="form-pyr" 
            required 
            onChange={preguntaCrear.handleChange} 
            placeholder="Escribe una pregunta" 
            name="preg" 
            type="text" 
            value={preguntaCrear.preg}>

            </textarea>
          </label>
          </div>
    {preguntaCrear.habilitarMultiple &&
            <div>
              <div
              className='opciones-container'>
              <label className="form-opciones" for="a">
              <span>Opción A:</span>
            <textarea class="" required 
              onChange={preguntaCrear.handleChange} 
              placeholder="Escribe la opcion A" 
              name="a" type="text" 
              value={preguntaCrear.a}>
            </textarea>
          </label>
          <label className="form-opciones" for="b">
          <span>Opción B:</span>
            <textarea class="" 
              required 
              onChange={preguntaCrear.handleChange} 
              placeholder="Escribe la opcion B" 
              name="b" 
              type="text" 
              value={preguntaCrear.b}>
            </textarea>
          </label>
          <label className="form-opciones" for="c">
          <span>Opción C:</span>
            <textarea class="" 
              required 
              onChange={preguntaCrear.handleChange} 
              placeholder="Escribe la opcion C" 
              name="c" 
              type="text" 
              value={preguntaCrear.c}>
            </textarea>
          </label>
          <label className="form-opciones" for="d">
          <span>Opción D:</span>
            <textarea
              required 
              onChange={preguntaCrear.handleChange} 
              placeholder="Escribe la opcion D" 
              name="d" 
              type="text" 
              value={preguntaCrear.d}>    
            </textarea>
          </label>
          </div>
          <div
          className='form-correcta'>
          <p>Cual es la respuesta correcta?</p>
          <label>
          <select required 
          value={preguntaCrear.correcta} 
          onChange={preguntaCrear.handleChange} 
          class="" 
          name='correcta'
          for="correcta">
              <option
              >
                  a
              </option>
              <option
              >
                  b
              </option>
              <option
              >
                  c
              </option>
              <option
              >
                  d
              </option>
          </select>
          </label>
        </div>
            </div>       
          }          
          <div className="pyr-container">
          <label className="form-pyr" for="respuesta">
          Respuesta:
            <textarea className="form-pyr" 
            onChange={preguntaCrear.handleChange} 
            placeholder="Escribe una respuesta o explicación" 
            name="resp" 
            type="text" 
            value={preguntaCrear.resp}>

            </textarea>
          </label>
          </div>    
         <button 
            type='submit'
            class="boton btn-primary" >
            Agregar
          </button>            
          </form>
    );
  }
