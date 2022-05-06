  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from '../context/AuthContext';
  import { db } from '../firebase';
  import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
  
  import { getAuth, updateProfile } from "firebase/auth";
  
  
export function Nav() {
  
      const auth = getAuth();
    
      const {user, logout, loading} = useAuth();
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

    return (
      <header className='nav-bar'>
      <navbar>
        <li class="usuario">
          Usuario: 
          
          <input 
          class="userNombre"
          placeholder={user.displayName}
          onChange={(e) => setNombreUser(e.target.value)}
          >
            </input> 
          <button 
          onClick={() => modNombre(nombreUser)}
          className='boton btn-primary'>
            editar
          </button>
        </li>
      </navbar>
        <navbar><ul>
          <li>
            <a href={"/"}>Home</a>
          </li>
          <li>
            <a href={"/perfil"}>Mi perfil</a>
          </li>
          <li>
            <a href={"/cursos"}>Cursos</a>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
        </navbar>
        </header>
    )
}