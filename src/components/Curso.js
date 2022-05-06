import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';
import {Nav} from "./navbarr";
import { datosCurso } from '../Contacurso/json';
import {Navigate, useParams} from "react-router-dom";
import { datosCursoImpuestos } from '../Contacurso/impuestos';
import { datosCursoFinanzas } from '../Contacurso/Finanzas';


export function Curso() {


    const {id} = useParams();
    const {user, logout, loading} = useAuth();
    const navigate = useNavigate();
    const [examenes, setExamenes] = useState([]);
    const examenesCollectionRef = collection(db, "examenes");

    const [curs, setCurs] = useState(datosCurso);
    const getCurso = () => {
        if (id === "impuestos") {
            setCurs(datosCursoImpuestos)
        } else if (id === "finanzas") {
            setCurs(datosCursoFinanzas)
        }
    }
    
    

    const handleLogout = async () => {
      await logout();
    }

    const getExamenes = async () => {
        const data = await getDocs(examenesCollectionRef);
        setExamenes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      
      }
          useEffect(() => {
            getCurso()
            getExamenes()
          }, [])

  
 

    const [nombre, setNombre] = useState()

    const agregarExamen = (nombre, user, usernombre) => {
      addDoc(collection(db, 'examenes'), {nombre, user, usernombre})
      
    }
 
    const agExa = async () => {
      try { 
        if(nombre.length > 2) {
        await agregarExamen(nombre, user.uid, user.displayName);
        // setCargar("Pregunta agregada");
        alert("Examen agregado correctamente");
        getExamenes();
        } else {
          alert("Al menos 3 carecteres")
        }
      } 
      catch(error) {
        // setError("Error al agregar");
        alert("error")
      }

      // getMaterias();
    }

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


      const ingresar = (tema) => {
        
        navigate("/cursos/"+curso+"/"+tema)

        
    }    


    const curso = id;

    const capitulos = [];
   

    const cursoImpuestos = datosCursoImpuestos;

    const filtrar = () => {
        curs.filter((a) => {
            capitulos.push(a.capitulos);
            
    } 
    ) 
    }
    filtrar()
    
    if(loading) return <h1>Loading...</h1>

    return (
        <div>
             <Nav />
            <div className='cursos'>
            <a href="/cursos">
            Volver a cursos
           </a>
                <div class="cursos-container">
                
                    <div class='cursos-descripcion'>
                    <h1>
                    Curso: {curso}
                    
                    </h1>
                    

                    {curs.map((a) => {
                        
                        return (
                            <p>
                                {a.descripcion}
                            </p>
                        )})
}

                    <div class='block'>
                        
                        {capitulos[0].map((c, num) => {
                            
                            return (
                                <div>
                                <div class="cuadro-curso">
                            <div class="bloque-curso">
                                <h3>
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
                                <button class="show boton-curso" id={"mostrar"+num} onClick={() => most(num)}>
                                    Expandir curso
                                </button>
                                <button class="hide boton-curso" id={"ocultar"+num} onClick={() => ocultar(num)}>
                                    Ocultar curso
                                </button>
                            </div>
                            <ul id={"capitulo"+num} class="hide">
                            {
                    c.desarrollo.map((t) => {
                        return (
                            <div>
                                        <li 
                                        onClick={() => ingresar(t.nombre)}
                                        class="tema">
                                            <a>
                                            {t.nombre}
                                            </a>
                                        </li>
                                    
                                </div>
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