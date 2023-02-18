import React, { useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { AsignarSeccion } from "./asignarSeccion";


const defaultState = {
  pregunta: null,
  vof: null,
  respuesta: null
};

//renderiza las preguntas del vof para modificar o agregar
function Row({ indice, onChange, onRemove, pregunta, vof, respuesta }) {

  return (
    <div
      style={{ "gap": "10px" }}
      className="cuadro">
      <div
        className="vof-enunciado">
        <p>Pregunta: {indice + 1}</p>
        <textarea
          required
          minlength="5"
          style={{ "width": "100%" }}
          value={pregunta}
          onChange={e => onChange("pregunta", e.target.value)}
          placeholder="pregunta"
        />
      </div>
      <div>
        <input
          checked={vof == "true"}
          required
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
          checked={vof == "false"}
          required
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
        style={{ "text-align": "center" }}>
        <button
          type="button"
          className="btn btn-danger"
          onClick={onRemove}>Eliminar</button>
      </div>
    </div>
  );
}

//renderiza para crear o modificar vof:
export function FormVof(props) {
  const { materias } = props
  const { examenid } = props
  const { titulo } = props
  const { seccion } = props
  const { curso } = props
  const { cancelar } = props
  const { datospreguntas } = props
  const { vofModificar } = props
  const { user } = useAuth();
  const [mat, setMat] = useState(curso)
  const { crearPreguntasVoF } = props
  const { modificarPreguntasVoF } = props

  const [datospregunta, setDatosPregunta] = useState(datospreguntas)
  const vofhandleChange = ({ target }) => {
    setDatosPregunta({
      ...datospregunta,
      [target.name]: target.value
    })
  }
  const [rows, setRows] = useState(vofModificar || [defaultState]);
  const [enunciado, setEnunciado] = useState(datospregunta ? datospregunta.enunciado : null);
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
        onSubmit={(event) => crearPreguntasVoF(user.uid, enunciado, rows, mat, seccion, titulo, examenid, event)}
        style={{ "position": "relative" }}
        className="form-vof"
      >
      {seccion ? null :
        <div style={{ "textAlign": "center" }}>
          <div>
            {materias ? 
              <div>
                <select
                  required
                  onChange={(e) => setMat(e.target.value)}
                  class="boton home-boton"
                  value={mat}
                  name="curso"
                  for="materias">
                  <option
                    value=""
                    disabled
                    selected>
                    Selecciona un curso
                  </option>
                  {materias.map(a => {
                    return (
                      <option
                        key={"materia-" + a.id}
                        value={a.id}>
                        {a.nombre}
                      </option>
                    )
                  })}
                </select>
              </div>

              : null
            }</div>

        </div>
        }
        <div className="form-vof">
          {datospregunta ?
            <AsignarSeccion
              cursoVof={datospregunta.curso}
              vofhandleChange={vofhandleChange}
              datos={datospregunta} />
            : null
          }
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
              minlength="3"
            ></textarea>
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
            style={{ "text-align": "center" }}>
            <button
              onClick={(e) => modificarPreguntasVoF(user.uid, enunciado, rows, datospregunta.id, datospregunta.indice, datospregunta.titulo, datospregunta.seccion, e)}
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
          : <button
            className="home-boton"
            type="submit">
            Confirmar
          </button>
        }
      </form>
    </div>
  );
}
