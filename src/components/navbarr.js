  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import { useAuth } from '../context/AuthContext';
  import { getAuth, updateProfile } from "firebase/auth";
  import {signOut} from "firebase/auth";
  import style from './modulos css/navbarr.module.scss'

export function Nav() {
  
  useEffect(() => {
    checkTema()
  }, [])


      const auth = getAuth();
      const logout = () => signOut(auth);
      const {user} = useAuth();
      const handleLogout = async () => {
        await logout();
      }
    const selectedTheme = localStorage.getItem('selected-theme')
    const [nombreUser, setNombreUser] = useState();
    const modNombre = (nombreUser) => {
      if(nombreUser.length > 0)
      updateProfile(auth.currentUser, {
        displayName: nombreUser
        
      }).then(() => {
        alert("Profile updated!")
        getAuth()
        setEdit(false)
      }).catch((error) => {
        alert("An error occurred "+error)
      
      }); else {
        alert("Escribe un nombre")
      }
    }
    const [edit, setEdit] = useState(false)

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
      console.log(selectedTheme)
    }

    return (
      <header className={style.contenedor}>
        {user == null ? 
        <div></div>
        :
        <div
        class={style.usuario}>
        <li>
          Usuario: 
          </li>
          <li>
            {edit ?
            <div>
          <input 
          className={style.usermodificar}
          placeholder={user.displayName}
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
          onClick={() => setEdit(false)}
          className={style.botoncancelar}>
            ✘
          </button>
          </span>
          </div>
            : <div>
              <span>
              {user.displayName}
            </span>
            <button 
          onClick={() => setEdit(true)}
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
          to={"/perfil"}>
            Mi perfil
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
          <li
          className={style.elementolista}>
            <button 
            className="switchTema"
            onClick={() => switchTema()}>
            </button>
          </li>
        </ul>}
        </header>
    )
}