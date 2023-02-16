import React, { useState, useEffect, useContext } from 'react';
import { eliminarPregunta } from '../servicios/preguntas/eliminarPregunta';
import { obtenerExamen, obtenerPregunta, obtenerSeccion, obtenerUsuario } from '../servicios/preguntas/obtenerPregunta';
import { FormAgregarPregunta } from './formAgregarPregunta';
import { FormModificarPregunta } from './formModificarPregunta';
import { modificarPregunta } from '../servicios/preguntas/modificarPregunta';
import { crearPregunta } from '../servicios/preguntas/crearPregunta';
import { useAuth } from '../../context/AuthContext';
import { Spinner } from '../Login/Spinner';
import { AnexadasExamen } from './renderAnexo';
import { Preguntas } from './preguntas';
import { FormVof } from './VoF';
import { alertainfo } from '../alertas';
import { serverModificarVof } from "../servicios/preguntas/modificarVof";
import { crearVoF } from "../servicios/preguntas/crearVoF";

export function MostrarPregunta(props) {

  const { quitar } = props;
  const { anexadas } = props;
  const { examenid } = props
  const { titulo } = props;
  const { user } = useAuth();
  const { seccion } = props;
  const { curso } = props;
  let edit = props.edit;
  const mostrarPreguntas = props.mostrarPreguntas
  const [modificar, setModificar] = useState(false)
  const [modificarVof, setModificarVof] = useState(false)
  const [preguntaModificar, setPreguntaModificar] = useState()
  const [cargandoPreguntas, setCargandoPreguntas] = useState(true)
  const { agregar } = props;
  const [preguntas, setPreguntas] = useState([]);
  const { eliminarExamen } = props
  const { perfil } = props
  const [datosVof, setDatosVof] = useState()
  const { filtro } = props
  const [filtroUser, setFiltroUser] = useState(false)
  const { obtenerQpreguntas } = props;

  useEffect(() => {
    if (seccion) {
      obtenerQpreguntas(preguntas.length)
    }

  }, [preguntas])
  useEffect(() => {
    // Creamos el controlador para abortar la petición
    const controller = new AbortController()
    // Recuperamos la señal del controlador
    const { signal } = controller
    // Hacemos la petición a la API y le pasamos como options la señal
    if (seccion) {
      obtenerSeccion(curso, seccion, { signal })
        .then(data => (setPreguntas(data), setCargandoPreguntas(false), obtenerQpreguntas(data.length)));
      return () => controller.abort()
    } else if (examenid) {
      obtenerExamen(examenid)
        .then(data => (setPreguntas(data), setCargandoPreguntas(false)));
    } else if (perfil) {
      obtenerUsuario(user.uid)
        .then(data => (setPreguntas(data), setCargandoPreguntas(false)));
    } else {
      obtenerPregunta(curso)
        .then(data => (setPreguntas(data), setCargandoPreguntas(false)));
    }
  }, [seccion])

  const eliminar = async (idpregunta, usuario) => {
    if (usuario === user.uid) {
      try {
        await eliminarPregunta(idpregunta);
        setPreguntas(preguntas.filter(a => a.id !== idpregunta))
        console.log("eliminado")
      } catch (error) {
        console.log(error)
      }
    } else {
      alertainfo("No tienes permiso")
    }
  }
  //normal-multiple
  const modificarPreguntas = async (datos, indice, idmodif, event) => {
    try {
      let preguntamodif = null
      await modificarPregunta(datos, idmodif, event).then(response =>
        preguntamodif = { ...response, id: idmodif }
      );
      preguntas.splice(indice, 1, preguntamodif)
      document.getElementById(idmodif).scrollIntoView()
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
  //vof
  const modificarPreguntasVoF = async (user, enunciado, rows, id, indice, titulo, seccion, event) => {
    try {
      let preguntamodif = null
      await serverModificarVof(user, enunciado, rows, id, titulo, seccion, event).then(response =>
        preguntamodif = { ...response, id: id }
      );
      preguntas.splice(indice, 1, preguntamodif)
    } catch (error) {
      console.log(error)
    }
    setModificarVof(false)
  }

  const crearPreguntasVoF = async (user, enunciado, rows, mat, seccion, titulo, examenid, event) => {
    event.preventDefault()
    try {
      await crearVoF(user, enunciado, rows, mat, seccion, titulo, examenid, event).then(response =>
        setPreguntas(preguntas.concat(response))
      );

    } catch (error) {
      console.log(error)
    }
  }

  const cancelar = () => {
    setModificar(false)
    setModificarVof(false)
  }
  const irModificarPregunta = (p, num) => {
    setModificar(!modificar)
    setPreguntaModificar({ ...p, indice: num })
  }

  const irModificarVof = (p, num) => {
    setModificarVof(!modificarVof)
    setPreguntaModificar(p.arrayPreguntas)
    setDatosVof({ ...p, id: p.id, enunciado: p.pregunta, indice: num })
    console.log(p.id, p.pregunta)
  }


  const filtrarUser = () => {
    setFiltroUser(!filtroUser)
  }

  return (
    <>
      {mostrarPreguntas & !modificar & !modificarVof ?
        cargandoPreguntas ? <Spinner></Spinner> :
          <div
            style={{ minHeight: preguntas.length > 0 ? 600 : 200 }}
            className={"contenedorpreguntas"}>
            <div
              style={{ alignSelf: "center" }}
              className='botonespreguntas'>
              {seccion &&
                <button

                  className='home-boton'
                  onClick={() => filtrarUser()}>
                  {filtroUser ? "✓ filtrar mis preguntas" : "✘ filtrar mis preguntas"}
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
            {/* con filtro */}
            {preguntas.length !== 0 ?
              filtroUser ? preguntas.map((p, num) => {
                if ((user.uid === p.user)) {
                  return (
                    <div
                      key={'mostrar-' + p.id}>
                      <Preguntas
                        irModificarVof={irModificarVof}
                        edit={edit}
                        irModificarPregunta={irModificarPregunta}
                        eliminar={eliminar}
                        p={p}
                        num={num}
                        integral={true}
                      />
                      <hr></hr>
                    </div>
                  )

                }
              }) :
                preguntas.map((p, num) => {
                  if ((filtro === p.curso || filtro === undefined)) {
                    return (
                      <div
                        key={'mostrar-' + p.id}>
                        <Preguntas
                          irModificarVof={irModificarVof}
                          edit={edit}
                          irModificarPregunta={irModificarPregunta}
                          eliminar={eliminar}
                          p={p}
                          num={num}
                          integral={true}
                        />
                        <hr></hr>
                      </div>
                    )

                  }
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

      {agregar & !modificar & !modificarVof ?
        <FormAgregarPregunta
          crearPreguntasVoF={crearPreguntasVoF}
          examenid={examenid}
          crearPreguntas={crearPreguntas}
          titulo={titulo}
          seccion={seccion}
          curso={curso}
        />
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
            preguntaModificar={preguntaModificar} />
        </div>
      }
      {modificarVof &&
        <div>
          <FormVof
            modificarPreguntasVoF={modificarPreguntasVoF}
            cancelar={cancelar}
            datospreguntas={datosVof}
            vofModificar={preguntaModificar}
          />
        </div>
      }
    </>

  );
}
