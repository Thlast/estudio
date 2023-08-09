import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { alertalimpiarHistorialUsuario } from './alertas';
import { ResueltasContext } from '../context/Resueltas'
import { SelectMateria } from './selectMateria';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, updateProfile } from "firebase/auth";
import style from '../modulos-css/Perfil.module.css'
import { UserConfig } from '../context/UserConfig';
import { limpiarHistorial } from './servicios/preguntas/borrarResueltas';
import { MateriasContext } from '../context/MateriasContext';
export function Perfil() {

  const { matPreferida } = useContext(MateriasContext)
  const { mobile, switchTema } = useContext(UserConfig);
  const { limpiarResueltas } = useContext(ResueltasContext)
  const { loading, datosUser, user, obtenerUser, editMode, changeEditMode } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();
  const [editUser, setEditUser] = useState(false)
  const [nombreUser, setNombreUser] = useState();
  const [editApiKey, setEditApiKey] = useState(false);
  const [apiKey, setApiKey] = useState();

  const añadirApiKey = async (e) => {
    e.preventDefault();
    if (apiKey.length > 45) {
      await setDoc(doc(db, "usuarios/" + user.uid), { apiKey: apiKey }, { merge: true })
        .then(() => {
          alert("ApiKey updated!")
          getAuth()
          obtenerUser()
          setEditApiKey(false)
        }).catch((error) => {
          alert("An error occurred " + error)
        });
    }

    else {
      alert("Escribe una apiKey Valida")
    }
  }

  const modNombre = async (nombreUser, e) => {
    e.preventDefault()
    if (nombreUser.length > 0) {
      await setDoc(doc(db, "usuarios/" + user.uid), { nombre: nombreUser }, { merge: true });
      updateProfile(auth.currentUser, {
        displayName: nombreUser
      }).then(() => {
        alert("Profile updated!")
        getAuth()
        obtenerUser()
        setEditUser(false)
      }).catch((error) => {
        alert("An error occurred " + error)

      });
    }

    else {
      alert("Escribe un nombre")
    }
  }

  const limpiarHistorialUsuario = async () => {
    alertalimpiarHistorialUsuario(limpiarResueltas, matPreferida, user.uid)
  }



  if (loading) return <h1>Loading...</h1>

  return (
    <div >
      <main className="perfil">
        <div className='menuperfil'>
          <nav >
            <ul>
              <br></br>
              <li>
                <SelectMateria />
              </li>
              <hr></hr>
              <li>
                {matPreferida == "impuestos" ?
                  <>
                    <Link
                      draggable={false}
                      className='perfil-boton'
                      to={"/IA"}>
                      Interactuar con la IA
                    </Link>
                    <hr></hr>
                  </>
                  :
                  null
                }
              </li>
              <li>
                <Link
                  draggable={false}
                  className='perfil-boton'
                  to={"/menu/mis-notas"}>
                  Mis notas
                </Link>
              </li>
              <hr></hr>

              <li>
                <Link
                  draggable={false}
                  className='perfil-boton'
                  to="/menu/mis-preguntas">Mis preguntas
                </Link>
              </li>
              <hr></hr>
              <li>
                <Link
                  draggable={false}
                  className='perfil-boton'
                  to="/menu/buscador">Buscador
                </Link>
              </li>
              <hr></hr>
              <li>
                Enlaces:
              </li>
              <li>
                <Link
                  draggable={false}
                  className='perfil-boton'
                  to="/examenes">Examenes
                </Link>
              </li>
              <hr></hr>
              <li>
                <Link
                  draggable={false}
                  className='perfil-boton'
                  to="/calculadora-prestamos"
                > Calculadora prestamos
                </Link>
              </li>
              <hr></hr>
              <li>
                <Link
                  draggable={false}
                  className='perfil-boton'
                  to="/estados-contables">Estados contables
                </Link>
              </li>
              <hr></hr>
              <li>
                {editUser ?
                  <form>
                    <input
                      className={style.usermodificar}
                      placeholder={datosUser?.nombre}
                      onChange={(e) => setNombreUser(e.target.value)}
                    >
                    </input>
                    <span>
                      <button
                        onClick={(e) => modNombre(nombreUser, e)}
                        className={style.botonconfirmar}
                      >
                        ✓
                      </button>
                      <button
                        type='button'
                        onClick={() => setEditUser(false)}
                        className={style.botoncancelar}
                      >
                        ✘
                      </button>
                    </span>
                  </form>
                  : <div>
                    <span>
                      {datosUser?.rol}: {datosUser?.nombre}
                    </span>
                    <button
                      onClick={() => setEditUser(true)}
                      className={style.botoneditar}
                    >
                      &#9999;
                    </button>
                  </div>}
              </li>
              <hr></hr>

            
                <>
                  <button
                    className={editMode ? style.botonActivo : style.links}
                    onClick={() => changeEditMode(datosUser?.rol)}
                  >
                    Editar:{editMode ? " on" : " off"}
                  </button>
                  <button
                    className="switchTema"
                    onClick={() => switchTema()}>
                  </button>
                </>
              
              <li>
                apiKey: {datosUser?.apiKey ?
                  "✓"
                  :
                  "✘"}
                {editApiKey ?
                  <form>
                    <input
                      placeholder='introduce la apiKey'
                      onChange={(e) => setApiKey(e.target.value)}
                      value={apiKey}
                      type='text'>
                    </input>
                    <span>
                      <button
                        onClick={(e) => añadirApiKey(e)}
                        className={style.botonconfirmar}
                      >
                        ✓
                      </button>
                      <button
                        type='button'
                        onClick={() => setEditApiKey(false)}
                        className={style.botoncancelar}
                      >
                        ✘
                      </button>
                    </span>
                  </form>
                  :
                  <button
                    onClick={() => setEditApiKey(true)}
                    className={style.botoneditar}
                  >
                    &#9999;
                  </button>
                }
              </li>
              <hr></hr>
              <li>
                <Link
                  draggable={false}
                  className='perfil-boton'
                  to={"/opcionesUsuario"}
                >
                  Configuracion
                </Link>
              </li>
              <hr></hr>
              <li>
                <button
                  className='perfil-boton'
                  onClick={() => limpiarHistorialUsuario()}
                > Borrar historial
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </main>
    </div>
  );
}
