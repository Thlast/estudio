import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import {Link, useParams} from "react-router-dom";
import { obtenerDetalleCurso } from './servicios/cursos/obtenerCurso';
import { obtenerDatosTitulos } from './servicios/cursos/obtenerSeccion';
import { Spinner } from './Login/Spinner';
import style from './modulos css/Curso.module.css'

export function Curso() {

    const [cargando, setCargando] = useState(true)
    const {curso} = useParams();
    const [curs, setCurs] = useState([]);
    const materia = curso;
    const {focus} = useParams();
    const [datosCaps, setDatosCaps] = useState([]);

  useEffect(() => {
            
    obtenerDetalleCurso(materia)
    .then(data => setCurs(data));
    obtenerDatosTitulos(materia)
    .then(data => (setDatosCaps(data), setCargando(false)));
    
  }, [])

  useEffect(() => {
    if(cargando === false & focus !== undefined) {
      document.getElementById(focus).scrollIntoView();
    }
  
    
  }, [cargando])

  

  const most = (e) => {
      document.getElementById("capitulo"+e).style.display = 'block';
      document.getElementById("mostrar"+e).style.display = 'none';
      document.getElementById("ocultar"+e).style.display = 'block';

    }
    const ocultar = (e) => {
      document.getElementById("capitulo"+e).style.display = 'none';
      document.getElementById("mostrar"+e).style.display = 'block';
      document.getElementById("ocultar"+e).style.display = 'none';
        
    }

    return (
    <div className="App">
        <div className={style.cursolistado}>
        <Link 
        className={style.volver}
        to={"/cursos"}>
        {"<"} Volver a cursos
        </Link>
        <div class="cursos-container">
            <div class='cursos-descripcion'>

            {curs.map((t, num) => {
              return (
                <div
              key={"curso-descripcion-"+t.nombre+num}>

              <h1>
              {t.nombre}
              </h1>

          <div class="bloque-descripcion">
            {t.descripcion}

</div>
</div>
              )
            }     
              
              )}
          <div class='block'>
          {cargando ? <Spinner></Spinner> :
          curs.map(t => 
          t.capitulo.map((c, num) => {
            return (
              <div
              id={c}
              key={"curso-"+c.nombre+num}>
              <div class="cuadro-curso">
          <div class="bloque-curso">
              <h3>
              {c}
              </h3>
          </div>
          <div class="bloque-descripcion">
          <p>Bibliografia:</p>
          <ul>
                </ul>
            </div>
            <div class="boton-curso">
                <button 
                class="show boton-curso" 
                id={"mostrar"+num} 
                onClick={() => most(num)}>
                    Expandir curso
                </button>
                <button 
                class="hide boton-curso" 
                id={"ocultar"+num}
                onClick={() => ocultar(num)}>
                    Ocultar curso
                </button>
            </div>
            <ul 
            className={style.contenedor} 
            id={"capitulo"+num}>
            {datosCaps ? 
            datosCaps.map((s) => {
              if(s.titulo === c) {
                return (s.secciones.map(sec => {
                  return (
                    <Link
                    key={'capitulo-'+sec}
                    className={style.seccion}
                      to={"/cursos/"+curso+"/"+c+"/"+sec}>
                      {sec}
                    </Link>
    )
                }))
              }
            
    }
    ) : null
}
                </ul>
            </div>
            <div class="spacer">
                <br></br>
            </div>
            </div>
                )
          })
          
            )}
            
      </div>
      </div>
    </div>
        
  </div>
</div>
    )
}