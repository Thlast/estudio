import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Buscador } from './buscador';
import { MostrarPregunta } from './preguntas/mostrarPregunta';
import { alertalimpiarHistorialUsuario } from './alertas';
import { ResueltasContext } from '../context/Resueltas'

export function Perfil() {

    const {reiniciarHistorial} = useContext(ResueltasContext)
    const {loading} = useAuth();
    const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
    const [agregar, setAgregar] = useState(false);
    const [buscador, setBuscador] = useState(false);
    const navigate = useNavigate();

    const agregarPregunta = () => {
      setMostrarPreguntas(false);
      setAgregar(!agregar);
      setBuscador(false)
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
    const limpiarHistorialUsuario = () => {

      alertalimpiarHistorialUsuario(reiniciarHistorial)
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
                   Mis preguntas
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
                <hr></hr>
                <li>
                <button
                className='perfil-boton'
                onClick={() => limpiarHistorialUsuario()}
                > Borrar historial
                </button>
                </li>
                <hr></hr>
                <li>
                <button
                className='perfil-boton'
                onClick={() => navigate("/calculadora-prestamos")}
                > Calculadora prestamos
                </button>
                </li>
              </ul>
            </nav>
            </div>
            <div>
            {buscador &&
            <Buscador />
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
