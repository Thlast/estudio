import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export function CrearNota(props) {

  const { titulo } = props;
  const { seccion } = props;
  const { curso } = props;
  const { notaModificada } = props;
  const { notaModificar } = props;
  const { notaCreada } = props;
  const { user } = useAuth();
  const [contenido, setContenido] = useState(notaModificar ? notaModificar.contenido : null)
  const [notaName, setNotaName] = useState(notaModificar ? notaModificar.name : null)
  const [privateStatus, setPrivateStatus] = useState(notaModificar ? notaModificar.privateStatus : "true")
  const { cancelarModificar } = props;


  return (
    <>
      <form
        className='form-container'
        //onSubmit={(event) => console.log(privateStatus, curso, titulo, seccion, contenido, notaName, user.uid, event)}
      >
        <div
          style={{ paddingBottom: "20px" }}
          className='form-pregunta-datos'>
          {notaModificar ?
            <button
            className='btn btn-danger form-cancelar'
              onClick={() => cancelarModificar()}
            >X</button>
            : null
          }
          <h3 style={{textAlign: "center"}}>
          {notaModificar ? "Modificar nota:" : "Nueva nota:"}
          </h3>
              <div
                      className='vof-inputs'>
                      <div
                        className='vof-vf'>
                        <input
                        checked={privateStatus == "true"}
                        required
                        onChange={e => setPrivateStatus("true")}
                          id={notaModificar ? "privadoTrue"+notaModificar.id : "privadoTrue"}
                          value={true}
                          name={notaModificar ? `private`+notaModificar.id : "private"}
                          type="radio" />
                          
                        <label for={notaModificar ? "privadoTrue"+notaModificar.id : "privadoTrue"}>
                          {"  "}Privado
                        </label>
                      </div>
                      <div
                        className='vof-vf'>
                        <input
                        checked={privateStatus == "false"}
                        id={notaModificar ? "privadoFalse"+notaModificar.id : "privadoFalse"}
                        onChange={e => setPrivateStatus("false")}
                          value={false}
                          name={notaModificar ? `private`+notaModificar.id : "private"}
                          type="radio" />
                        <label for={notaModificar ? "privadoFalse"+notaModificar.id : "privadoFalse"}>
                          {"  "}Publico
                        </label>
                      </div>
                    </div>
                                            {/* por ahora cancelado por que no se permite modificar */}
          <div style={{display:"none"}}>
          {/* Curso: */}
          <select
            className='home-boton'
          >
            <option
              selected
              value={curso}
            >
              {curso}
            </option>
          </select>


          {/* Capitulo: */}
          <select
            className='home-boton'
          >
            <option
              selected
              value={titulo}
            >{titulo}</option>
          </select>


          {/* Seccion: */}
          <select
            className='home-boton'
          >
            <option
              selected
              value={seccion}
            >{seccion}</option>
          </select>
          </div>
        </div>
        {/* Nombre de la nota: */}
        <input
          placeholder='Escribe un título'
          style={{ width: "90%" }}
          onChange={(e) => setNotaName(e.target.value)}
          value={notaName}
          type="text"
        >
        </input>
        {/* Nota: */}
        <textarea
          placeholder='Escribe la anotación'
          style={{ width: "90%" }}
          onChange={(e) => setContenido(e.target.value)}
          value={contenido}
        >

        </textarea>
        {
          notaModificar ?
            <button
              className='home-boton'
              onClick={(e) => notaModificada(privateStatus, user.uid, curso, notaName, titulo, seccion, contenido, notaModificar.id, notaModificar.indice, e)}
              type='submit'
            >
              Modificar nota
            </button>
            :
            <button
              className='home-boton'

              onClick={(e) => notaCreada(privateStatus, curso, titulo, seccion, contenido, notaName, user.uid, e)}
              type='submit'
            >
              Agregar nota
            </button>
        }

      </form>
      <hr></hr>
    </>
  );
}