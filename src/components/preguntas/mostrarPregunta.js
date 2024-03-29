import React, { useState, useEffect, useContext } from 'react';
import { eliminarPregunta } from '../servicios/preguntas/eliminarPregunta';
import { obtenerExamen, obtenerPregunta, obtenerSeccion, obtenerUsuario, getPreguntaSeccionId } from '../servicios/preguntas/obtenerPregunta';
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
import { MateriasContext } from '../../context/MateriasContext';
import { CardSkeleton, CuadroSkeleton } from '../../modulos-css/esqueletoSeccion';
export function MostrarPregunta(props) {

  const { quitar } = props;
  const { anexadas } = props;
  const { examenid } = props
  const { titulo } = props;
  //puede agregarse a una seccion(nombre) o a la seccionId(uno viene de archivos fijos y otro de la base de datos)
  const { seccion } = props;
  const { seccionId, capituloId } = props;
  const { user } = useAuth();
  const { matPreferida } = useContext(MateriasContext)
  const curso = props?.curso || matPreferida;
  let edit = props.edit;
  const mostrarPreguntas = props.mostrarPreguntas
  const [enviandoPregunta, setEnviandoPregunta] = useState(false)
  const [modificar, setModificar] = useState(false)
  const [modificarVof, setModificarVof] = useState(false)
  const [preguntaModificar, setPreguntaModificar] = useState()
  const [cargandoPreguntas, setCargandoPreguntas] = useState(true)
  const { agregar } = props;
  const [preguntas, setPreguntas] = useState([]);
  const { eliminarExamen } = props
  const { perfil } = props
  const [datosVof, setDatosVof] = useState()
  const {page, perPage} = props; //DESDE MISPREGUNTAS
  const [filtroUser, setFiltroUser] = useState(false)
  const { obtenerQpreguntas } = props;

  useEffect(() => {
    if (seccion || seccionId) {
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
      obtenerUsuario(curso, user.uid, page, perPage)
        .then(data => (setPreguntas(data), setCargandoPreguntas(false)));
    } else if (seccionId) {
      getPreguntaSeccionId(seccionId, { signal })
        .then(data => (setPreguntas(data), setCargandoPreguntas(false)));
    } else {
      obtenerPregunta(curso)
        .then(data => (setPreguntas(data), setCargandoPreguntas(false)));
    }
  }, [seccion, seccionId, curso, page, perPage])

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
    setEnviandoPregunta(true)
    try {
      let preguntamodif = null
      await modificarPregunta(datos, idmodif, event).then(response => {
        if (response) {
          preguntamodif = { ...response, id: idmodif }
          preguntas.splice(indice, 1, preguntamodif)
          setEnviandoPregunta(false)
          //document.getElementById(idmodif).scrollIntoView()
        }
      }
      );
    } catch (error) {
      console.log(error)
      setEnviandoPregunta(false)
    }
    setModificar(!modificar)
  }

  const crearPreguntas = async (preguntaCrear, event) => {
    setEnviandoPregunta(true)
    try {
      await crearPregunta(preguntaCrear, event).then(response => {
        if (response) {
          setPreguntas(preguntas.concat(response))
          setEnviandoPregunta(false)
        }
      }
      )
    } catch (error) {
      console.log(error)
      setEnviandoPregunta(false)
    }
  }
  //vof
  const modificarPreguntasVoF = async (user, enunciado, rows, id, indice, titulo, seccion, seccionId, capituloId, event) => {
    setEnviandoPregunta(true)
    try {
      let preguntamodif = null
      await serverModificarVof(user, enunciado, rows, id, titulo, seccion, seccionId, capituloId, event).then(response => {
        if (response) {
          preguntamodif = { ...response, id: id }
          preguntas.splice(indice, 1, preguntamodif)
          setEnviandoPregunta(false)
        }
      }
      );
    } catch (error) {
      console.log(error)
      setEnviandoPregunta(false)
    }
    setModificarVof(false)
  }

  const crearPreguntasVoF = async (user, enunciado, rows, mat, seccion, seccionId, capituloId, titulo, examenid, event) => {
    event.preventDefault()
    setEnviandoPregunta(true)
    try {
      await crearVoF(user, enunciado, rows, mat, seccion, seccionId, capituloId, titulo, examenid, event).then(response => {
        if (response) {
          setPreguntas(preguntas.concat(response))
          setEnviandoPregunta(false)
        }
      }
      );
    } catch (error) {
      console.log(error)
      setEnviandoPregunta(false)
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
      <div>
        {mostrarPreguntas & !modificar & !modificarVof ?

          <div
            style={{ minHeight: preguntas.length > 0 ? 600 : 200 }}
            className={"contenedorpreguntas"}>
            {
              cargandoPreguntas ? <CuadroSkeleton /> :
                <>
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
                    filtroUser ? preguntas?.map((p, num) => {
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
                              isLink={seccion || seccionId}
                            />
                            <hr></hr>
                          </div>
                        )

                      }
                    }) :
                      preguntas?.map((p, num) => {

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
                              isLink={seccion || seccionId}
                            />
                            <hr></hr>
                          </div>
                        )


                      })

                    : <p>No hay preguntas</p>
                  }
                  {anexadas &&
                    <AnexadasExamen
                      quitar={quitar}
                      examenid={examenid}
                      numpreguntas={preguntas.length}
                      anexadas={anexadas} />
                  }
                </>
            }
          </div>
          : ""
        }

        {agregar & !modificar & !modificarVof ?
          <FormAgregarPregunta
            enviandoPregunta={enviandoPregunta}
            crearPreguntasVoF={crearPreguntasVoF}
            examenid={examenid}
            crearPreguntas={crearPreguntas}
            titulo={titulo}
            seccion={seccion}
            seccionId={seccionId}
            capituloId={capituloId}
            curso={curso}
          />
          : ""
        }
        {modificar &&
          <div>
            <FormModificarPregunta
              enviandoPregunta={enviandoPregunta}
              examenid={examenid}
              cancelar={cancelar}
              titulo={titulo}
              seccion={seccion}
              seccionId={seccionId}
              curso={curso}
              modificarPregunta={modificarPreguntas}
              preguntaModificar={preguntaModificar} />
          </div>
        }
        {modificarVof &&
          <div>
            <FormVof
              enviandoPregunta={enviandoPregunta}
              modificarPreguntasVoF={modificarPreguntasVoF}
              cancelar={cancelar}
              datospreguntas={datosVof}
              seccionId={seccionId}
              capituloId={capituloId}
              vofModificar={preguntaModificar}
            />
          </div>
        }
      </div>
    </>
  );
}
