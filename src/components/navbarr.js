import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAuth, updateProfile } from "firebase/auth";
import { signOut } from "firebase/auth";
import style from '../modulos-css/navbarr.module.scss'
import { db } from '../firebase';
import { doc, setDoc, addDoc, getDoc } from 'firebase/firestore';

export function Nav() {

  //cambio de tema
  const selectedTheme = localStorage.getItem('selected-theme')
  useEffect(() => {
    checkTema()
  }, [])
  const getCurrentTheme = () => document.body.classList.contains('dark-theme') ? 'dark' : 'light'

  const checkTema = () => {
    const userHasDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (selectedTheme) {
      // Si se cumple la validación, preguntamos cuál fue el tema para saber si activamos o desactivamos el dark
      document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove']('dark-theme')
    } else {
      // Preguntamos si el usuario tiene tema dark en su sistema
      // En caso de que sí, lo activamos en la interfaz
      if (userHasDarkTheme) document.body.classList.add('dark-theme')
    }

  }

  const switchTema = () => {
    document.body.classList.toggle('dark-theme')
    // Guardamos el tema actual que eligió el usuario
    localStorage.setItem('selected-theme', getCurrentTheme())
  }

  //parte del usuario

  const { user, editMode, changeEditMode } = useAuth();
  const auth = getAuth();
  const [nombreUser, setNombreUser] = useState();
  const [datosUser, setDatosUser] = useState();


  const obtenerUser = async () => {
    const dbUser = doc(db, "usuarios/"+user?.uid);
    const document = await getDoc(dbUser); 

    if (!document.exists) {
      console.log('No such document!');
    } else {
      setDatosUser(document.data())
    }
  }
  
  useEffect(() => {

    obtenerUser()
  }, [user]
  )

  const logout = () => signOut(auth);
  const handleLogout = async () => {
    await logout();
  }

  const modNombre = async (nombreUser) => {

    if (nombreUser.length > 0){
      await setDoc(doc(db, "usuarios/"+user.uid), { nombre: nombreUser}, {merge: true});
      updateProfile(auth.currentUser, {
        displayName: nombreUser
      }).then(() => {
        alert("Profile updated!")
        getAuth()
        setEditUser(false)
      }).catch((error) => {
        alert("An error occurred " + error)

      }); 
    }
    
      else {
      alert("Escribe un nombre")
    }
  }
  const [editUser, setEditUser] = useState(false)

  return (
    <header className={style.contenedor}>
      {user == null ?
        <div></div>
        :
        <div
          class={style.usuario}>
          <li>
            {datosUser?.rol}:
          </li>
          <li>
            {editUser ?
              <div>
                <input
                  className={style.usermodificar}
                  placeholder={datosUser?.nombre}
                  onChange={(e) => setNombreUser(e.target.value)}
                >
                </input>
                <span>
                  <button
                    onClick={() => modNombre(nombreUser)}
                    className={style.botonconfirmar}>
                    ✓
                  </button>
                  <button
                    onClick={() => setEditUser(false)}
                    className={style.botoncancelar}>
                    ✘
                  </button>
                </span>
              </div>
              : <div>
                <span>
                  {datosUser?.nombre}
                </span>
                <button
                  onClick={() => setEditUser(true)}
                  className={style.botoneditar}>
                  &#9999;
                </button>
              </div>}
          </li>
        </div>
      }
      {user == null ? <div
        className={style.login}>
        <ul
          className={style.contenedorlista}>
          <li>
            <Link
              className={style.loginlinks}
              to={"/login"}>Login
            </Link>
          </li>
          <li>
            <Link
              className={style.loginlinks}
              to={"/register"}>Registrarse
            </Link>
          </li>
        </ul>
      </div> :
        <ul
          className={style.contenedorlista}>
          <li
            className={style.elementolista}>

            <Link
              className={style.links}
              to={"/"}>
              Home
            </Link>
          </li>
          <li
            className={style.elementolista}>
            <Link
              className={style.links}
              to={"/menu"}>
              Menú
            </Link>
          </li>
          <li
            className={style.elementolista}>
            <Link
              className={style.links}
              to={"/cursos"}>
              Cursos
            </Link>
          </li>
          <li
            className={style.elementolista}
            >
            <button
              className={editMode ? style.botonActivo : style.links}
              onClick={() => changeEditMode(datosUser?.rol)}
              >
                Editar:{editMode ? " on" : " off"}
            </button>
          </li>
          <li
            className={style.elementolista}>
            <button
              className="switchTema"
              onClick={() => switchTema()}>
            </button>
          </li>
          <li
            className={style.elementolista}>
            <button
              className={style.links}
              onClick={handleLogout}>Logout</button>
          </li>
        </ul>}
    </header>
  )
}