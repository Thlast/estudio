import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import {Link, useParams} from "react-router-dom";
import { obtenerCursos } from './servicios/cursos/obtenerCurso';
import { Spinner } from './Login/Spinner';
import style from './modulos css/Curso.module.css'

export function Curso() {

    const [cargando, setCargando] = useState(true)
    const {id} = useParams();
    const [curs, setCurs] = useState([]);
    const curso = id;

  useEffect(() => {
            
    obtenerCursos(curso)
    .then(data => (setCurs(data), setCargando(false)))

    
  }, [])

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
            
          {cargando ? "":
          <div>
            <h1>
            {curs[0].nombre}
            
            </h1>
          <p>{curs[0].descripcion}</p>
          </div>
          }

          <div class='block'>
          {cargando ? <Spinner></Spinner> :
          curs[0].capitulos.map((c, num) => {
                 
          return (
              <div
              key={"curso-"+c.nombre+num}>
              <div class="cuadro-curso">
          <div class="bloque-curso">
              <h3
              id={c.nombre}>
              {c.nombre}
              </h3>
          </div>
          <div class="bloque-descripcion">
          <p>
            {c.descripcion}
          </p>
          <p>Bibliografia:</p>
          <ul>
          {c.bibliografia.map((biblio) => {
              return (
                  <li>
                      {biblio}
                  </li>
              )
                })}
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
            {
            c.desarrollo.map((t) => {
            return (
                <Link
                className={style.seccion}
                  to={"/cursos/"+curso+"/"+c.nombre+"/"+t.nombre}>
                  {t.nombre}
                </Link>
)
    })
}
                </ul>
            </div>
            <div class="spacer">
                <br></br>
            </div>
            </div>
                )
            })}
            
      </div>
      </div>
    </div>
        
  </div>
</div>
    )
}