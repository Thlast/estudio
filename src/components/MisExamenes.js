import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';
import {useParams} from "react-router-dom";
import { Spinner } from './Login/Spinner';

export function MisExamenes() {

    const {id} = useParams();
    const {user, logout, loading} = useAuth();
    const [examenes, setExamenes] = useState([]);
    const examenesCollectionRef = collection(db, "examenes");
    const [cargando, setCargando] = useState(true);

    const getExamenes = async () => {
        const data = await getDocs(examenesCollectionRef);
        setExamenes(data.docs.map((doc) => ({...doc.data(), id: doc.id}), setCargando(false)));
      
      }
          useEffect(() => {
            
            getExamenes()
          }, [])


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
    <div className='examenes'>
      {cargando ? <Spinner></Spinner> :
      
        <div className="cuadrilla">
            {examenes.filter((examen) => {
              if(user.uid === examen.user) {
                  return examen.nombre
                }
              }).map((exa) => {
                return (
                  <Link 
                    to={"/examenes/"+exa.id} className="examen">
                      <h6 className='textos'>Examen: {exa.nombre}</h6>
                        
                      <p className='textos'>Materia: {exa.materia}</p>
                        
                      <p className='textos'>Descripcion: {exa.descripcion}</p>
                  </Link>
                );
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
      }

    </div>
</div>
    )
}