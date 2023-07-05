import { getDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Spinner } from './Login/Spinner';
import { MostrarPregunta } from './preguntas/mostrarPregunta';
import { eliminarPregunta } from './servicios/preguntas/eliminarPregunta';
import { alertainfo, alertasuccess, alertafail, alertaexamen } from './alertas';
import { obtenerAnexadas } from './servicios/preguntas/obtenerPregunta';
import { desanexarExamen } from './servicios/preguntas/modificarPregunta';

export const Examen = () => {

  const { id } = useParams();
  const [cargando, setCargando] = useState(true);
  const [examen, setExamen] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState();
  const [materia, setMateria] = useState();
  const [descripcion, setDescripcion] = useState();
  const [most, setMost] = useState(false)
  const [anexadas, setAnexadas] = useState([])

  useEffect(() => {
    async function request() {
      try {
        const document = await getDoc(doc(db, "examenes/" + id));
        setExamen(document.data());
        setMateria(document.data().materia);
        setCargando(false);
        // setMateria(document.materia);
      } catch (e) {
        console.log("error", e);
      }
    }
    request();
    obtenerAnexadas(id).then(data => setAnexadas(data))
  },
    []
  )
  const modificarNombre = (nombre) => {
    updateDoc(doc(db, "examenes", id), { nombre })
  }
  // const modificarMateria = (materia) => {
  //   updateDoc(doc(db, "examenes", id), {materia})
  // }
  const modificarDescripcion = (descripcion) => {
    updateDoc(doc(db, "examenes", id), { descripcion })
  }
  const modNombre = async (nombre) => {
    try {
      await modificarNombre(nombre)
      alertasuccess("nombre modificado")
    }
    catch (error) {
      alertafail(`error: ${error}`)
    }
  }

  const modDescripcion = async (descripcion) => {
    try {
      await modificarDescripcion(descripcion)
      alertasuccess("descripcion modificada")
    }
    catch (error) {
      alertafail(`error: ${error}`)
    }
  }

  const quitar = async (examenid, idepregunta) => {

    await desanexarExamen(examenid, idepregunta)

  }

  const eliminarExamen = async (pregs) => {
    const eliminar = async () => {
      try {
        await pregs.map((n) => eliminarPregunta(n.id));
        await anexadas.map((n) => quitar(id, n.id));
        deleteDoc(doc(db, 'examenes', id));
        navigate("/examenes/");
      }
      catch (error) {
        alertafail("error" + error)
      }
    }

    alertaexamen(eliminar)

  }

  const editar = () => {
    if (user.uid === examen.user) {
      setMost(!most);
    }
    else {
      alertainfo("solo el creador tiene permiso a editar")
    }
  }

  return (
    <div 
    class="pagina-examen">
        <div>
          <Link
            to={"/examenes/"}>
            {"< "} examenes
          </Link>
        </div>
        <div
        // style={{viewTransitionName: `examen: ${id}`}}
        >
          <button
            className='boton btn-primary'
            onClick={editar}>
            editar
          </button>
        </div>
        <div

          className='examen-descripcion'>
          <div
            className='examen-descripcion-elementos'>
            Examen: {" "}
            {most ?
              <div>
                <input
                  maxlength="51"
                  class="boton"
                  placeholder={examen.nombre}
                  onChange={(e) => setNombre(e.target.value)}>
                </input>
                <button
                  className='boton btn-primary'
                  onClick={() => modNombre(nombre)}>
                  ✓
                </button>
              </div>
              :
              <span>
                {examen.nombre}
              </span>
            }
          </div>
          <div
            className='examen-descripcion-elementos'>
            Materia:
            {most ?
              <div>
                <input
                  // onChange={(e) => setMateria(e.target.value)}
                  class="boton"
                  placeholder={examen.materia}>
                </input>
              </div>
              :
              <span>
                {examen.materia}
              </span>
            }
          </div>
          <div
            className='examen-descripcion-elementos contenedor-descripcion'>
            Descripcion: {" "}
            {most ?
              <div
                className='descripcion-editar'>
                <textarea
                  style={{ "width": "100%" }}
                  onChange={(e) => setDescripcion(e.target.value)}
                  maxlength="100"
                  class="boton"
                  value={descripcion}
                />
                <button
                  onClick={() => modDescripcion(descripcion)}
                  class="boton btn-primary">
                  ✓
                </button>
              </div>
              :
              <span>
                {examen.descripcion}
              </span>
            }

          </div>
          <p>Creado por: {examen.usernombre}</p>
          <p>fecha: {examen.fecha}</p>
        </div>
        <br></br>
        <hr></hr>
        <div class="">
          <MostrarPregunta
            quitar={quitar}
            anexadas={anexadas}
            curso={materia}
            eliminarExamen={eliminarExamen}
            examenid={id}
            agregar={most}
            edit={most}
            mostrarPreguntas={true} />
        </div>
    </div>
  )
}
