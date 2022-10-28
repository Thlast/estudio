import React, { useState } from "react";
import { crearVoF } from "../servicios/preguntas/crearVoF";
import { useAuth } from '../../context/AuthContext';
import { modificarVof } from "../servicios/preguntas/modificarVof";

  const defaultState = {
    pregunta: "",
    vof: "",
    respuesta: ""
  };
  
function Row({ indice, onChange, onRemove, pregunta, vof, respuesta }) {

  return (
    <div
    style={{"gap": "10px"}}
    className="cuadro">
      <div
      className="vof-enunciado">
      <p>Pregunta: {indice+1}</p>
      <textarea
        style={{"width": "100%"}}
        value={pregunta}
        onChange={e => onChange("pregunta", e.target.value)}
        placeholder="pregunta"
      />
      </div>
      <div>
      <input
        id={`verdadero${indice}`}
        name={`vof${indice}`}
        type="radio"
        value={true}
        onChange={e => onChange("vof", e.target.value)}
      />
      <label for={`verdadero${indice}`}>
        Verdadero
      </label>
      <input
        id={`falso${indice}`}
        name={`vof${indice}`}
        type="radio"
        value={false}
        onChange={e => onChange("vof", e.target.value)}
      />
     <label for={`falso${indice}`}>
      Falso
      </label>
      </div>
      <textarea
        placeholder="respuesta"
        value={respuesta}
        onChange={e => onChange("respuesta", e.target.value)}
      />
      <div
      style={{"text-align": "center"}}>
      <button 
      type="button"
      className="btn btn-danger"
      onClick={onRemove}>Eliminar</button>
      </div>
    </div>
  );
}
  
export function FormVof(props) {
  const {materias} = props
  const {examenid} = props
  const {titulo} = props
  const {seccion} = props
  const {curso} = props
  const {cancelar} = props
  const {datospregunta} = props
  const {vofModificar} = props
  const {user} = useAuth();
  const [mat, setMat] = useState(curso)
  const irModificarVof = (e) => {
    e.preventDefault()
    modificarVof(user.uid, enunciado, rows, datospregunta.id, e)

  }
  const agregarVof = (e, enunciado) => {
    e.preventDefault()
    crearVoF(user.uid, enunciado, rows, mat, seccion, titulo, examenid, e)
    // console.log(enunciado, rows)
  }
    const [rows, setRows] = useState(vofModificar || [defaultState]);
    const [enunciado, setEnunciado] = useState(datospregunta ? datospregunta.enunciado : "");
    const handleOnChange = (index, name, value) => {
      const copyRows = [...rows];
      copyRows[index] = {
        ...copyRows[index],
        [name]: value
      };
      setRows(copyRows);
    };
  
    const handleOnAdd = () => {
      setRows(rows.concat(defaultState));
    };
  
    const handleOnRemove = index => {
      const copyRows = [...rows];
      copyRows.splice(index, 1);
      setRows(copyRows);
    };
  
  return (
    <div>
      <form
      style={{"position": "relative"}}
      className="form-vof"
      >
        {curso !== undefined ? "" :
          <div
          style={{"textAlign": "center"}}>
      <select 
        required
        onChange={(e) => setMat(e.target.value)} 
        class="boton home-boton" 
        value={curso}
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
      <div className="form-vof">
      <p>Verdadero o Falso:</p>
      <label className="" for="enunciado">
      <textarea 
      onChange={(e) => setEnunciado(e.target.value)}
      value={enunciado}
      className="" 
      required 
      placeholder="Escribe una consigna" 
      name="consigna" 
      type="text" 
      >
      </textarea>
    </label>
    </div>
      {rows.map((row, index) => (
        <Row
          {...row}
          onChange={(name, value) => handleOnChange(index, name, value)}
          onRemove={() => handleOnRemove(index)}
          key={index}
          indice={index}
        />
      ))}
      <div
      className="vof-botones">
      <button 
      className="btn btn-primary"
      type="button"
      onClick={handleOnAdd}>+</button>
      
      </div>
      {vofModificar ?
      <div
      style={{"text-align": "center"}}>
        <button
      onClick={(e) => irModificarVof(e, enunciado)}
      className="home-boton btn-primary"
      type="submit">
        Modificar
      </button>
      <button
      className='home-boton btn-danger'
      onClick={() => cancelar()}
      > Cancelar
      </button>
      <button
      className='btn btn-danger form-cancelar'
      onClick={() => cancelar()}
      > X
      </button>
      </div>
      :  <button
      onClick={(e) => agregarVof(e, enunciado)}
      className="home-boton"
      type="submit">
        Confirmar
      </button>
}
      </form>
    </div>
  );
}
  