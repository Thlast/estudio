  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from '../context/AuthContext';
  import { getAuth, updateProfile } from "firebase/auth";
  import {signOut} from "firebase/auth";
  
export function Nav() {
  
      const auth = getAuth();

      const logout = () => signOut(auth);

      const {user} = useAuth();
      const navigate = useNavigate();
  
  
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
      }).catch((error) => {
        alert("An error occurred")
      
      }); else {
        alert("Escribe un nombre")
      }
    }

    const [boton, setBoton] = useState("botonnomostrar");
    const [botonPerfil, setBotonPerfil] = useState("botonnomostrar");
    const [botonCursos, setBotonCursos] = useState("botonnomostrar");
    const navegar = (e) => {
      if(e == "") {
        setBoton("botonmostrar");
        setBotonPerfil("nada");
        setBotonCursos("nada");
      } else if (e == "perfil") {
        setBoton("nada");
        setBotonPerfil("botonmostrar");
        setBotonCursos("nada");
      } else if (e == "cursos") {
        setBoton("nada");
        setBotonPerfil("nada");
        setBotonCursos("botonmostrar");
      }
      console.log(e)
      navigate(`/${e}`)
    }

    // if(loading) return <h1></h1>
    
    console.log(user)
    return (
      <header className='nav-bar'>
        {user == null ? "Login" :
        <div
        class="usuario">
        <li>
          Usuario: 
          </li>
          <li>
          <input 
          class="userNombre"
          placeholder={user.displayName}
          onChange={(e) => setNombreUser(e.target.value)}
          >
            </input> 
          <button 
          onClick={() => modNombre(nombreUser)}
          className='boton-editar'>
            &#9999;
          </button>
          </li>
        </div>
}
        <ul>
          <li>
          <button
          id={boton}
          className='nav-boton'
          onClick={() => navegar("")}>
            Home
          </button>
          </li>
          <li>
          <button
          id={botonPerfil}
          className='nav-boton'
          onClick={() => navegar("perfil")}>
            Mi perfil
          </button>
          </li>
          <li>
          <button
          id={botonCursos}
          className='nav-boton'
          onClick={() => navegar("cursos")}>
            Cursos
          </button>
          </li>
          <li>
            <button 
            className='nav-boton'
            onClick={handleLogout}>Logout</button>
          </li>
        </ul>
        </header>
    )
}