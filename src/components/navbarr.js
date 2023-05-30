import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import style from '../modulos-css/navbarr.module.scss'
import { UserConfig } from '../context/UserConfig';

export function Nav() {

  const { user, editMode, changeEditMode, datosUser } = useAuth();
  const auth = getAuth();
  const { mobile, switchTema } = useContext(UserConfig);

  const logout = () => signOut(auth);
  const handleLogout = async () => {
    await logout();
  }

  return (
    <>
      {mobile ?
        <header className={style.contenedorMobile}>
          {user ?
            <div
              class={style.usuario}>
              <li>
                <span>
                  {datosUser?.nombre}
                </span>
              </li>
            </div>
            :
            null
          }
          {user == null ?
            //para registrarse o loguearse
            <div
            //className={style.login}
            >
              <ul
                className={style.contenedorLoginMobile}>
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
            //barra para navegador ya logueado
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
                className={style.elementolista}>
                <button
                  className={style.links}
                  onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          }
        </header>
        :
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
          {user == null ?
            //para registrarse o loguearse
            <div
            //className={style.login}
            >
              <ul
                className={style.contenedorlista}
                >
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
            //barra para navegador ya logueado
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
            </ul>
          }
        </header>
      }
    </>
  )
}