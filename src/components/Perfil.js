import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Buscador } from './buscador';
import { MostrarPregunta } from './preguntas/mostrarPregunta';
import { alertalimpiarHistorialUsuario } from './alertas';
import { ResueltasContext } from '../context/Resueltas'
import { MostrarNotas } from './notes/mostrarNotas';
import { MateriasContext } from '../context/MateriasContext';
import { SelectMateria } from './selectMateria';

export function Perfil() {

    const {reiniciarHistorial} = useContext(ResueltasContext)
    const {loading} = useAuth();
    const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
    const [agregar, setAgregar] = useState(false);
    const [buscador, setBuscador] = useState(false);
    const navigate = useNavigate();

    const {matPreferida} = useContext(MateriasContext);
    const {materias} = useContext(MateriasContext);
    const {preferenciaMateria} = useContext(MateriasContext);
  

    const [mostrarNotas, setMostrarNotas] = useState(false);

    const agregarPregunta = () => {
      setMostrarPreguntas(false);
      setAgregar(!agregar);
      setBuscador(false)
      setMostrarNotas(false)
    }

    const most = () => {
      setMostrarPreguntas(!mostrarPreguntas);
      setMostrarNotas(false)
      setAgregar(false);
      setBuscador(false)
    }

    const mostNotas = () => {
      setMostrarNotas(!mostrarNotas)
      setMostrarPreguntas(false);
      setAgregar(false);
      setBuscador(false)
    }

    const buscarPregunta = () => {
      setBuscador(!buscador)
      setAgregar(false)
      setMostrarPreguntas(false)
      setMostrarNotas(false)
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
              <SelectMateria />
      {/* <select 
        onChange={(e) => preferenciaMateria(e.target.value)} 
        class="boton home-boton" 
        value={matPreferida}
        name="curso"
        for="materias">
{
    materias.map(a => {
          return (
      <option 
      key={"materia-"+a.CursoId}
      value={a.CursoId}>
        {a.CursoNombre}
      </option>      
       )
      })}
   </select> */}
     </li>  
     <hr></hr>
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
              onClick={() => mostNotas()}>
                  Mis notas
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
              <hr></hr>
              <li>
            <Link 
            className='perfil-boton'
            to="/estados-contables">Estados contables
            </Link>
            </li>
            </ul>
          </nav>
          </div>
          <div>
          {
            mostrarNotas &&
            <MostrarNotas 
            curso={matPreferida}
            />
          }
          {buscador &&
          <Buscador />
          }     
          <MostrarPregunta 
          filtro={matPreferida}
          curso={matPreferida}
          perfil={true}
          agregar={agregar} 
          edit={true} 
          mostrarPreguntas={mostrarPreguntas} /> 
        </div>
      </main>
      </div>
    );
  }
