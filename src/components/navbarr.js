  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import { useAuth } from '../context/AuthContext';
  import { getAuth, updateProfile } from "firebase/auth";
  import {signOut} from "firebase/auth";
  import style from './modulos css/navbarr.module.css'

export function Nav() {
  
      const auth = getAuth();
      const logout = () => signOut(auth);
      const {user} = useAuth();
  
      const handleLogout = async () => {
        await logout();
      }
     
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
        alert("An error occurred")
      
      }); else {
        alert("Escribe un nombre")
      }
    }
    const [edit, setEdit] = useState(false)

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
        </ul>}
        </header>
    )
}