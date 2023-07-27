import React, {useContext} from 'react';
import { usePreguntaForm } from './usePregunta';
import { MateriasContext } from '../../context/MateriasContext';
import { useAuth } from '../../context/AuthContext';
import { FormVof } from './VoF';
import { TextoaTabla } from './texto-a-tabla';
import { Spinner } from '../Login/Spinner';

export function FormAgregarPregunta(props) {

  const { titulo } = props;
  const { crearPreguntas } = props;
  const { seccion } = props;
  const { seccionId, capituloId, enviandoPregunta } = props;
  const { curso } = props;
  const { examenid } = props;
  const { matPreferida } = useContext(MateriasContext)
  const { materias } = useContext(MateriasContext)
  const { user } = useAuth();
  const { crearPreguntasVoF } = props


  const preguntaCrear = usePreguntaForm({
    preg: "",
    resp: "",
    resultado: "",
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
    seccionId: seccionId,
    capituloId: capituloId,
    examen: examenid,
    user: user.uid
  })


  return (
    <div
      style={{ "padding": "10px" }}>
      <p>Agregar Pregunta:</p>
      <TextoaTabla />
      <div
        style={{ "textAlign": "center" }}>
        <select required
          onChange={preguntaCrear.handleChangeTipo}
          class="home-boton"
          name='tipo'
          for="tipo"
          value={preguntaCrear.tipo}>
          <option
            value={"Normal"}>
            Normal
          </option>
          <option
            value={"Multiple"}>
            Multiple
          </option>
          <option
            value={"vof"}>
            vof
          </option>
        </select>
      </div>
      {preguntaCrear.datosPregunta.tipo === "vof" ?
        <FormVof
          crearPreguntasVoF={crearPreguntasVoF}
          materias={materias}
          examenid={examenid}
          titulo={titulo}
          seccion={seccion}
          seccionId={seccionId}
          capituloId={capituloId}
          curso={curso}
        />
        :
        <div>
          <form
            className='form-container'
            onSubmit={
              // preguntaCrear.handleSubmit}
              (event) =>
                crearPreguntas(preguntaCrear.datosPregunta, event)
              // preguntaCrear.handleSubmit
            }
          >
            {seccion || examenid || seccionId ? null :
              <div>
                <select
                  required
                  onChange={preguntaCrear.handleChange}
                  class="boton home-boton"
                  value={preguntaCrear.curso}
                  name="curso"
                  for="curso">
                  <option
                    value=""
                    disabled
                    selected>
                    Selecciona un curso
                  </option>
                  {materias.map(a => {
                    return (
                      <option
                        key={"curso-" + a.CursoId}
                        value={a.CursoId}>
                        {a.CursoNombre}
                      </option>
                    )
                  })}
                </select>
              </div>
            }

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
              <div>
                Resultado:
                <input
                  style={{ "width": "100%" }}
                  onChange={preguntaCrear.handleChange}
                  placeholder="Escribe un resultado (opcional)"
                  name="resultado"
                  type="number"
                  value={preguntaCrear.resultado} />
              </div>
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
            {enviandoPregunta ? <Spinner></Spinner> :
            <button
              type='submit'
              class="boton btn-primary" >
              Agregar
            </button>
            }
          </form>
        </div>}
    </div>
  );
}
