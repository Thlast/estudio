import React from 'react';
import { AsignarSeccion } from './asignarSeccion';
import { usePreguntaForm } from './usePregunta';
import { Spinner } from '../Login/Spinner';


export function FormModificarPregunta(props) {

  const { modificarPregunta } = props;
  const { preguntaModificar } = props || {};
  const { cancelar, enviandoPregunta } = props;
  const { titulo } = props;
  const { seccion } = props;
  const { id } = preguntaModificar;
  const indice = preguntaModificar.indice

  const datosmodificar = usePreguntaForm({
    pregunta: preguntaModificar.pregunta,
    respuesta: preguntaModificar.respuesta,
    resultado: preguntaModificar.resultado,
    tipo: preguntaModificar.tipo,
    curso: preguntaModificar.curso,
    a: preguntaModificar.opciones.a,
    b: preguntaModificar.opciones.b,
    c: preguntaModificar.opciones.c,
    d: preguntaModificar.opciones.d,
    correcta: preguntaModificar.correcta,
    titulo: preguntaModificar.titulo,
    seccion: preguntaModificar.seccion,
    SeccionId: preguntaModificar.seccionId,
    CapituloId: preguntaModificar.capituloId ?? ""
  })

  return (
    <div>

      <form
        className='form-container'
        onSubmit={
          (event) => modificarPregunta(datosmodificar.datosPregunta, indice, id, event)}>
        <div
          className='form-pregunta-datos'>
          <select required
            onChange={datosmodificar.handleChangeTipo}
            class="home-boton"
            for="tipo"
            name='tipo'
            value={datosmodificar.datosPregunta.tipo}>
            <option>
              Normal
            </option>
            <option>
              Multiple
            </option>
          </select>
          <AsignarSeccion
            datos={datosmodificar}
          />
        </div>
        <div className="pyr-container">
          <label className="form-pyr" for="pregunta">
            Pregunta:
            <textarea className="form-pyr" required
              onChange={datosmodificar.handleChange}
              placeholder="Escribe una pregunta"
              name="pregunta"
              type="text"
              value={datosmodificar.datosPregunta.pregunta}>
            </textarea>
          </label>

          {datosmodificar.datosPregunta.tipo === "Normal" ?
            <div className='pregunta-resultados'>
              Resultado:
              {datosmodificar.datosPregunta?.resultado?.map((r, num) => (
                <div className='resultadosFilas'>
                  <span>
                    {`${num + 1}) `}
                  </span>
                  <input
                    key={num}
                    style={{ "width": "100%" }}
                    onChange={(e) => datosmodificar.handleChangeResultado(num, e.target.value)}
                    placeholder="Escribe un resultado (opcional)"
                    name="resultado"
                    type="number"
                    step="any"
                    value={datosmodificar.datosPregunta.resultado[num]}
                  />
                  <button className="btn btn-danger" type='button' onClick={() => datosmodificar.handleRemoveResult(num)}>x</button>
                </div>
              ))}
              <button className="btn btn-primary" type='button' onClick={datosmodificar.handleAddResult}>+</button>
            </div>
            : null}

        </div>
        {datosmodificar.datosPregunta.tipo === "Multiple" &&
          <div>
            <div
              className='opciones-container'>
              <label className="form-opciones" for="a">
                <span>Opción A:</span>
                <textarea class="" required
                  onChange={datosmodificar.handleChange}
                  placeholder="Escribe la opcion A"
                  name="a"
                  type="text"
                  value={datosmodificar.datosPregunta.a}>
                </textarea>
              </label>
              <label className="form-opciones" for="b">
                <span>Opción B:</span>
                <textarea class=""
                  required
                  onChange={datosmodificar.handleChange}
                  placeholder="Escribe la opcion B"
                  name="b"
                  type="text"
                  value={datosmodificar.datosPregunta.b}>
                </textarea>
              </label>
              <label className="form-opciones" for="c">
                <span>Opción C:</span>
                <textarea class=""
                  required
                  onChange={datosmodificar.handleChange}
                  placeholder="Escribe la opcion C"
                  name="c"
                  type="text"
                  value={datosmodificar.datosPregunta.c}>
                </textarea>
              </label>
              <label className="form-opciones" for="d">
                <span>Opción D:</span>
                <textarea className="form-opciones"
                  required
                  onChange={datosmodificar.handleChange}
                  placeholder="Escribe la opcion D"
                  name="d"
                  type="text"
                  value={datosmodificar.datosPregunta.d}>
                </textarea>
              </label>
            </div>
            <div
              className='form-correcta'>
              <p>Cual es la respuesta correcta?</p>
              <label>
                <select
                  required
                  value={datosmodificar.datosPregunta.correcta}
                  onChange={datosmodificar.handleChange}
                  name="correcta"
                  class="home-boton"
                  for="correcta">
                  <option>
                    a
                  </option>
                  <option>
                    b
                  </option>
                  <option>
                    c
                  </option>
                  <option>
                    d
                  </option>
                </select>
              </label>
            </div>
          </div>
        }

        <div className="pyr-container">
          <label
            name="resp"
            className="form-pyr"
            for="respuesta">
            Respuesta:
            <textarea className="form-pyr"
              onChange={datosmodificar.handleChange}
              placeholder="Escribe una respuesta o explicación"
              name="respuesta"
              type="text"
              value={datosmodificar.datosPregunta.respuesta}>

            </textarea>
          </label>
        </div>
        {enviandoPregunta ? <Spinner></Spinner> :
          <button
            class="boton btn-primary">
            Modificar
          </button>
        }
        <button
          className='btn btn-danger form-cancelar'
          onClick={() => cancelar()}
        > X
        </button>
      </form>
    </div>
  );
}
