import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MostrarPregunta } from './preguntas/mostrarPregunta';

export function Perfil() {

    const {user, logout, loading} = useAuth();
    const navigate = useNavigate();
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
                    <a 
                    className='perfil-boton'
                    href="/examenes">Examenes</a>
                    <hr></hr>
                    <a 
                    className='perfil-boton'
                    href={'/misexamenes/'+user.uid}>Mis Examenes</a>
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
