import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';
import {Nav} from "./navbarr";


export function Examenes() {

    const {user, logout, loading} = useAuth();
    const navigate = useNavigate();
    const [examenes, setExamenes] = useState([]);
    const examenesCollectionRef = collection(db, "examenes");

    const handleLogout = async () => {
      await logout();
    }

    const getExamenes = async () => {
        const data = await getDocs(examenesCollectionRef);
        setExamenes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      
      }
          useEffect(() => {
            
            getExamenes()
          }, [])

  
    const ingresar = (id) => {
        navigate("/examenes/"+id)

        console.log(id)
    }    

    const [nombre, setNombre] = useState()

    const agregarExamen = (nombre, user, usernombre) => {
      addDoc(collection(db, 'examenes'), {nombre, user, usernombre})
      
    }
 
    const agExa = async () => {
      try { 
        if(nombre.length > 2) {
        await agregarExamen(nombre, user.uid, user.displayName);
        // setCargar("Pregunta agregada");
        alert("Examen agregado correctamente");
        getExamenes();
        } else {
          alert("Al menos 3 carecteres")
        }
      } 
      catch(error) {
        // setError("Error al agregar");
        alert("error")
      }

      // getMaterias();
    }

    

    if(loading) return <h1>Loading...</h1>

    return (
        <div>
        <Nav />
            <div className='examenes'>
        <div className="cuadrilla">
            
            {examenes.map((exa) => {
                return (
                  <div onClick={() => ingresar(exa.id)} className="examen">
                  <h6 className='textos'>Examen: {exa.nombre}</h6>
                  
                  <p className='textos'>Materia: {exa.materia}</p>
                  
                  <p className='textos'>Descripcion: {exa.descripcion}</p>
              </div>
                )
            })}
  
<div className="examen">
  <input 
    required
    placeholder='Introducir un nombre' 
    onChange={(e) => setNombre(e.target.value)}>
  </input>
  <button 
    onClick={() => agExa()}>
    Agregar Exámen
  </button>
</div>
</div>
</div>
</div>
    )
}