import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MostrarPregunta } from './preguntas/mostrarPregunta';

export function Perfil() {

    const {user, logout, loading} = useAuth();
    const [mostrarPreguntas, setMostrarPreguntas] = useState(false)
    const [edit, setEdit] = useState(false)

    const agregarPregunta = () => {
      setMostrarPreguntas(false);
      setEdit(!edit);
    }


    if(loading) return <h1>Loading...</h1>
  
    return (
      <div className="App">
            <div>
        <main className="perfil">
        <div className='menuperfil'>
            <nav  class="menu">
              <ul>
              <hr></hr>
                    <Link 
                    className='perfil-boton'
                    to="/examenes">Examenes</Link>
                    <hr></hr>
                    <Link 
                    className='perfil-boton'
                    to={'/misexamenes/'+user.uid}>Mis Examenes</Link>
                <hr></hr>
                <button 
                className='perfil-boton'
                onClick={() => (setMostrarPreguntas(!mostrarPreguntas), setEdit(false))}>
                   Todas mis preguntas
                </button>
                <hr></hr>
                <button
                className='perfil-boton'
                onClick={() => agregarPregunta()}
                >
                   Agregar Pregunta
                </button>
              </ul>
            </nav>
            </div>
             <MostrarPregunta edit={edit} mostrarPreguntas={mostrarPreguntas} />       
      </main>
      </div>
      </div>
    );
  }
