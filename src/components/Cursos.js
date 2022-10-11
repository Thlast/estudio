import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MateriasContext } from '../context/MateriasContext';
import { Spinner } from './Login/Spinner';

export function Cursos() {

    const {materias} = useContext(MateriasContext)
    const {cargandoMaterias} = useContext(MateriasContext)


return (
  <div className="App">
   
    <div className='cursos'>
      <div class="cursos-container">
        <div class='cursos-descripcion'>
          <h1>
            Cursos:
          </h1>
          {cargandoMaterias ? <Spinner></Spinner> :
          materias.map(m => {
            return (
          <div class="listado-cursos">
            <Link 
            className='home-boton'
            to={`/cursos/${m.id}`}>{m.nombre}</Link>
          </div>
            )
          })
          }
        </div>
      </div>   
    </div>
  
</div>
    )
}