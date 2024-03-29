import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Spinner } from './Login/Spinner';
import { alertasuccess, alertafail } from './alertas';
import { MateriasContext } from '../context/MateriasContext';
import { CardSkeleton, CuadroSkeleton } from '../modulos-css/esqueletoSeccion';


export function Examenes() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [examenes, setExamenes] = useState([]);
  const [misExamenes, setMisExamenes] = useState([]);
  const [mostrarMisExamenes, setMostrarMisExamenes] = useState(false);
  const examenesCollectionRef = collection(db, "examenes");
  const [cargando, setCargando] = useState(true)
  const [curso, setCurso] = useState()
  const { materias } = useContext(MateriasContext);
  const [examenBuscar, setExamenBuscar] = useState("")
  const [examenesRender, setExamenesRender] = useState()

  const getExamenes = async () => {
    const data = await getDocs(examenesCollectionRef);
    setExamenes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    setExamenesRender(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setCargando(false);
  }

  useEffect(() => {
    getExamenes()
  }, [])

  useEffect(() => {
    setCurso(examenBuscar)
  }, [examenBuscar])

  const [nombre, setNombre] = useState()
  const agregarExamen = async (nombre, user, usernombre, materia, fecha) => {
    const docRef = await addDoc(collection(db, 'examenes'), { nombre, user, usernombre, materia, fecha })
    return docRef
  }

  const agExa = async (e, materia) => {
    e.preventDefault();

    try {
      if (nombre.length > 2) {
        let fecha = new Date().toLocaleDateString();
        await agregarExamen(nombre, user.uid, user.displayName, materia, fecha).then(docRef =>
        (alertasuccess("Examen agregado correctamente"),
          navigate(`/examenes/${docRef.id}`))
        )
      } else {
        alertafail("Al menos 3 caracteres")
      }
    }
    catch (error) {
      alert("error" + error)
    }
  }

  const filtrarExamenes = () => {
    if (examenBuscar !== "") {
      setMisExamenes(examenes.filter(examen => {
        if (examen.user === user.uid && examen.materia === examenBuscar) {
          return examen
        }
      }
      ));
    } else {
      setMisExamenes(examenes.filter(examen => examen.user === user.uid))
    }
    setMostrarMisExamenes(!mostrarMisExamenes)
  }

  const buscarExamen = (e) => {
    e.preventDefault()
    setExamenBuscar(e.target.value)
    setExamenesRender(examenes.filter(exa => exa.materia === e.target.value))
    setMisExamenes(examenes.filter(examen => {
      if (examen.user === user.uid && examen.materia === e.target.value) {
        return examen
      }
    }
    ));
  }
  const limpiarBusqueda = (e) => {
    e.preventDefault()
    setExamenBuscar("")
    setExamenesRender(examenes)
    setMisExamenes(examenes)
    setMostrarMisExamenes(false)
  }

  return (
    <div className='menuContenedor'>
      <div

        className='examenes'>
        <div>
          <div>
            <div
              className='examen-filtrar'>
              <button
                className='home-boton'
                onClick={() => filtrarExamenes()}>
                {mostrarMisExamenes ? "Mostrando solo mis exámenes" : "Mostrando todos"}
              </button>
            </div>
            <div>
              <form
                className='homebuscar'>
                <div>
                  <span>
                    Buscar por curso: {" "}
                  </span>
                  <select
                    onChange={(e) => buscarExamen(e)}
                    value={examenBuscar}
                    name="curso"
                    for="materias">
                    <option
                      disabled
                      value={""}
                      selected="selected">
                      Selecciona un curso
                    </option>
                    {materias.map(a => (
                     
                        <option
                          key={"materia-" + a.CursoId}
                          value={a.CursoId}>
                          {a.CursoNombre}
                        </option>
                      
                    ))}

                  </select>
                  <button
                    className='examenesbuscar'
                    onClick={(e) => limpiarBusqueda(e)}>
                    ✘
                  </button>
                </div>
              </form>
            </div>
          </div>
          <hr></hr>
          <div className="cuadrilla">
            {cargando ? <CuadroSkeleton /> :
            <>{

              mostrarMisExamenes &&
              misExamenes?.map((exa) =>  (
                  // <div style={{viewTransitionName: `examen: ${exa.id}`}}>
                  <Link
                    to={"/examenes/" + exa.id} className="examen">
                    <div className='textos'>
                      <h6 >{exa.materia || "-  "}: {exa.nombre}</h6>
                      Descripcion:
                      <br></br>
                      <div className='contenedor-descripcion'>
                        <span className='examenes-descripcion'>{exa.descripcion}</span>
                      </div>
                    </div>
                    <div
                      className='examenfecha'>
                      <span>{exa.usernombre}</span>
                      <span>{exa.fecha}</span>
                    </div>
                  </Link>
                  // </div>
                )
              )}
            {!mostrarMisExamenes &&
              examenesRender?.map((exa) => (
                  // <div style={{viewTransitionName: `examen: ${exa.id}`}}>
                  <Link
                    to={"/examenes/" + exa.id} className="examen">
                    <div className='textos'>
                      <h6 >{exa.materia || "-  "}: {exa.nombre}</h6>
                      Descripcion:
                      <br></br>
                      <div className='contenedor-descripcion'>
                        <span className='examenes-descripcion'>{exa.descripcion}</span>
                      </div>
                    </div>
                    <div
                      className='examenfecha'>
                      <span>{exa.usernombre}</span>
                      <span>{exa.fecha}</span>
                    </div>
                  </Link>
                  // </div>
                )
              )}
   
              <form
                onSubmit={(e) => agExa(e, curso)}
                className="examen-agregar">
                <input
                  className='home-boton'
                  required
                  maxlength="51"
                  placeholder='Introducir un nombre'
                  onChange={(e) => setNombre(e.target.value)}>
                </input>

                <select
                  className='home-boton'
                  required
                  onChange={(e) => setCurso(e.target.value)}
                  value={curso}
                  name="curso"
                  for="materias">
                  <option
                    value=""
                    disabled
                    selected="selected">
                    Selecciona un curso
                  </option>
                  {materias?.map(a => (
                      <option
                        key={"materia-" + a.CursoId}
                        value={a.CursoId}>
                        {a.CursoNombre}
                      </option>
                    )
                  )}
                </select>

                <button
                  className='home-boton'
                // onClick={() => agExa()}
                >
                  Agregar Exámen
                </button>
              </form>
            
            </>
}
          </div>
        </div>

      </div>
    </div>
  )
}