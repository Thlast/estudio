import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
            Curso:
          </h1>
          {cargando ? "...Cargando" :
          materias.map(m => {
            return (
          <div class="listado-cursos">
            <button
              value={m.id}
              className='home-boton'
              onClick={(e) => ingresar(e.target.value)}>
                {m.nombre}
            </button>
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