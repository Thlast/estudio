import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import style from '../modulos-css/navbarr.module.scss'

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

  const { user, editMode, changeEditMode, datosUser } = useAuth();
  const auth = getAuth();

  const logout = () => signOut(auth);
  const handleLogout = async () => {
    await logout();
  }

  return (
    <header className={style.contenedor}>
      {user ? 
        <div
          class={style.usuario}>
          <li>
            {datosUser?.rol}:
          </li>
          <li>
            <span>
              {datosUser?.nombre}
            </span>
          </li>
        </div>
        :
        null
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