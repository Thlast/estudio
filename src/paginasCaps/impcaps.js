import {Navigate, useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';
import { datosCurso } from "../Contacurso/json";
import { async } from "@firebase/util";
import { Nav } from "../components/navbarr";
import { datosCursoImpuestos } from "../Contacurso/impuestos";

export function Impcaps(props) {

    const curso = "impuestos";

    const {id} = useParams();
    const [curs, setCurs] = useState(datosCursoImpuestos);

    const {user, logout, loading} = useAuth();
    const navigate = useNavigate();

    const [materias, setMaterias] = useState([]);
    const materiasCollectionRef = collection(db, "materias");

    const [preguntas, setPreguntas] = useState([]);
    const preguntasCollectionRef = collection(db, "preguntas");

    const capi = [];

    const extraer =  () => {
  
      curs[0].capitulos.map((a) => {
          a.desarrollo.map((b) => {
            capi.push(b.nombre)
          })
          
      })
  }
  
  extraer()
//Cargar la base de datos:
const getMaterias = async () => {
  const data = await getDocs(materiasCollectionRef);
  setMaterias(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  // console.log(data);
}
const getPreguntas = async () => {
  const data = await getDocs(preguntasCollectionRef);
  setPreguntas(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  // console.log(data);
}
    useEffect(() => {

      getPreguntas()
      getMaterias()
    }, [])

    // render preguntas segun materias
    const [render, setRender] = useState("Contabilidad VII");

    const preguntar = (e) => {
      const valor = e.target.value;
      setRender(valor);
      setCurrent(0);
      setShow(false);
    }

    const [current, setCurrent] = useState(1); 
    //mostrar respuesta
    const [show, setShow] = useState(false);
    //mostrar agregar pregunta
    const [mostrar, setMostrar] = useState(false);

    const handleLogout = async () => {
      await logout();
    }
    
    //agregar pregunta
    const [preg, setPreg] = useState();
    const [resp, setResp] = useState();
    const [mat, setMat] = useState("Contabilidad VII");

    const agregarPregunta = (user, materia, pregunta, respuesta, examen) => {
      addDoc(collection(db, 'preguntas'), {user, materia, pregunta, respuesta, examen})
      
    }
    // const [error, setError] = useState("");
    // const [cargar, setCargar] = useState("");
    const [mostAgregar, setMostrarAgregar] = useState(false);

    const añadir = () => {
        setMostrarPreguntas(false);
        setMostrarAgregar(true);
    }
    const agPreg = async () => {
      try { 
        await agregarPregunta(user.uid, mat, preg, resp);
        // setCargar("Pregunta agregada");
        alert("Pregunta agregada correctamente");
        getPreguntas();
      }
      catch(error) {
        // setError("Error al agregar");
        alert("error")
      }

      // getMaterias();
    }

    const [mostrarPreguntas, setMostrarPreguntas] = useState(false);

    const mostpreg = () => {
        setMostrarPreguntas(true);
        setMostrarAgregar(false);
    }

  //eliminar pregunta

  const eliminarPregunta = async (id) => {
    await deleteDoc(doc(db, 'preguntas', id));
    getPreguntas();
  }

  const most =  () => {
     setMostrar(!mostrar)
  }

  const [seccion, setSeccion] = useState();

  const bloques = [];
  console.log(bloques)
  console.log(capi)
  const filter = () => {
    curs[0].capitulos.map((c) => c.desarrollo).map((a) => {
      a.map((b) => { bloques.push(b)})
      
    })
  }
  filter()

  const siguienteSeccion = capi[capi.indexOf(id) + 1];
  const anteriorSeccion = capi[capi.indexOf(id) - 1];
  

  const ingresar = (siguienteSeccion) => {
        
    navigate("/cursos/impuestos/"+siguienteSeccion)
}    
  

    if(loading) return <h1>Loading...</h1>

    
  
    return (
      <div>
        <Nav />
      <div className="capitulos">
      
         <div class="secciones">
           <a href={"/cursos/"+curso}>
            Volver al curso
           </a>
            <h1>
                {id}
            </h1>
            {/* <button
            onClick={most}>
            Editar
        </button> */}
        <div>
          {bloques.map((a) => {
            if(a.nombre === id) {
              return (
                <div>
                  {a.enunciado.map((b) => {
                    if(typeof b === "string") {
                      return (
                        <div class="seccion"> 
                          {b}
                          <br></br>
                        </div>                       
                      )
                    } else {
                      return (
                        <div class="destacar">
                          {b.destacar}
                          <br></br>
                        </div>    
                      )
                    }                 
                    
                  })}
                  
                  </div>
              )
            }
          })
        }
        <br></br>
        <div class="cursos-botones">
        {capi.indexOf(id) > 0 ?
        <div class="cursos-as">
        <p>Anterior</p>
        
          <a href={"/cursos/"+curso+"/"+anteriorSeccion}>
          {anteriorSeccion}
          </a>
          
          </div>
          : 
          <div></div>
}
          
          {capi.indexOf(id)+1 <= capi.length ?
          <div 
          // onClick={() => ingresar()}
          class="cursos-as">
          <p>Siguiente</p>
          
            <a href={"/cursos/"+curso+"/"+siguienteSeccion}>
            {siguienteSeccion}
            </a>
            
            
            </div>
            : 
            <div></div>
}
</div>
        </div>
        </div>
        <div class="reflex-spliter">

        </div>
        <div class="secciones">
        {mostrar &&
        <div>
          <select required onChange={ e => setMat(e.target.value)} class="dropdown" for="materias">
              {materias.map((mat) => {
              return (
                <option value={mat.nombre}>
                  {mat.nombre}
                </option>
              );
            })}
            </select>
            <div>
            <label class="agregar" for="pregunta">
              <textarea class="agregar" required onChange={ e => setPreg(e.target.value)} placeholder="Escribe una pregunta" name="pregunta" type="text"></textarea>
            </label>
            </div>
            <div>
            <label class="agregar" for="respuesta">
              <textarea class="agregar" onChange={ e => setResp(e.target.value)} placeholder="Escribe una respuesta" name="respuesta" type="text"></textarea>
            </label>
            </div>
            <button class="boton btn-primary" onClick={agPreg}>Agregar</button>
            </div>
}
{mostrar &&
        <div>
          
            <div>
            <label class="agregar" for="pregunta">
              <textarea class="agregar" required onChange={ e => setSeccion(e.target.value)} placeholder="Escribe una seccion" name="seccion" type="text"></textarea>
            </label>
            </div>
            
            <button class="boton btn-primary" onClick={agPreg}>Agregar</button>
            </div>
}

</div>
            </div>
            </div>

    );
  }




