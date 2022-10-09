import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Buscador } from './buscador';
import { MostrarPregunta } from './preguntas/mostrarPregunta';
import { filtrarPregunta } from './servicios/preguntas/obtenerPregunta';


export function Perfil() {

    const {loading} = useAuth();
    const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
    const [agregar, setAgregar] = useState(false);
    const [buscador, setBuscador] = useState(false);

    const agregarPregunta = () => {
      setMostrarPreguntas(false);
      setAgregar(!agregar);
      setBuscador(false)
    }

    const buscar = (valor, e) => {
      e.preventDefault();
      filtrarPregunta(valor)
      .then(data => console.log(data))
      console.log(valor)
    }
    const most = () => {
      setMostrarPreguntas(!mostrarPreguntas);
      setAgregar(false);
      setBuscador(false)
    }

    const buscarPregunta = () => {
      setBuscador(!buscador)
      setAgregar(false)
      setMostrarPreguntas(false)
    }
    
    if(loading) return <h1>Loading...</h1>
  
    return (
      <div className="App">
        <main className="perfil">
        <div className='menuperfil'>
            <nav >
              <ul>
                <li>
              <Link 
              className='perfil-boton'
              to="/examenes">Examenes
              </Link>
              </li>
                <hr></hr>
                <li>
                <button 
                className='perfil-boton'
                onClick={() => most()}>
                   Mostrar preguntas
                </button>
                </li>
                <hr></hr>
                <li>
                <button
                className='perfil-boton'
                onClick={() => agregarPregunta()}
                >
                   Agregar Pregunta
                </button>
                </li>
                <hr></hr>
                <li>
                <button
                className='perfil-boton'
                onClick={() => buscarPregunta()}
                >
                   Buscador
                </button>
                </li>
              </ul>
            </nav>
            </div>
            <div>
            {buscador &&
            <Buscador 
            buscar={buscar} />
            }     
            <MostrarPregunta 
            perfil={true}
            agregar={agregar} 
            edit={true} 
            mostrarPreguntas={mostrarPreguntas} /> 
            </div>
      </main>
      </div>
    );
  }
