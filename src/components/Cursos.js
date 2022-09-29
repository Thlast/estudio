import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from './Login/Spinner';
import { obtenerMaterias } from './servicios/cursos/obtenerCurso';

export function Cursos() {

    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate();
    const [materias, setMaterias] = useState()

    useEffect(() => {
      obtenerMaterias()
      .then(data => (setMaterias(data), setCargando(false)))
    }, [])

      const ingresar = (e) => {
        navigate("/cursos/"+e)
        
    }    
    console.log(materias)

return (
  <div className="App">
   
    <div className='cursos'>
      <div class="cursos-container">
        <div class='cursos-descripcion'>
          <h1>
            Cursos:
          </h1>
          {cargando ? <Spinner></Spinner> :
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