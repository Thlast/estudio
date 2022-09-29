import { collection, getDoc, addDoc, deleteDoc, doc, getDocs, updateDoc} from 'firebase/firestore';
import React, {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import { db } from "../firebase";
import { AgregarPregunta } from './Agregar';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Spinner } from './Login/Spinner';


 export const Examen = () => {
  
    const {id} = useParams();
    const [cargando, setCargando] = useState(true);
    const [examen, setExamen] = useState({});
    const examenesCollectionRef = collection(db, "examenes");
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    
    useEffect(
        ()=>{
            async function request(){
                try {
                    const document = await getDoc(doc(db, "examenes/"+id)); 
                    setCargando(false);
                    setExamen(document.data());
                    
                } catch (e){
                    console.log("error", e);
                }
                
            }
            request();
        },
        []
    )

    const [materias, setMaterias] = useState([]);
    const materiasCollectionRef = collection(db, "materias");

    const [preguntas, setPreguntas] = useState([]);
    const preguntasCollectionRef = collection(db, "preguntas");
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


    const eliminarPregunta = async (id) => {
        await deleteDoc(doc(db, 'preguntas', id));
        getPreguntas();
      }
    

      const mostrar = (num) => {
        document.getElementById(num).style.display = 'block';
        document.getElementById("mostrar"+num).style.display = 'none';
        document.getElementById("ocultar"+num).style.display = 'block';
        
      }
      const ocultar = (num) => {
        document.getElementById(num).style.display = 'none';
        document.getElementById("mostrar"+num).style.display = 'block';
        document.getElementById("ocultar"+num).style.display = 'none';
       
      }

      const [nombre, setNombre] = useState();
      const [materia, setMateria] = useState();
      const [descripcion, setDescripcion] = useState();

      const [idPre, setIdPre] = useState();
      const [preg, setPreg] = useState();
      const [resp, setResp] = useState();
      const [mat, setMat] = useState("Contabilidad VII");

      const [mod, setMod] = useState(false);
      const [agregarpregunta, setAgregarPregunta] = useState(true);

      const modificar = (id, preg, respu) => {
        setPreg(preg);
        setResp(respu);
        setIdPre(id);
        setMod(!mod);
        setAgregarPregunta(!agregarpregunta);
        
      }
      const modificarNombre = (nombre) => {
        updateDoc(doc(db, "examenes", id), {nombre})
      }
      const modificarMateria = (materia) => {
        updateDoc(doc(db, "examenes", id), {materia})
      }
      const modificarDescripcion = (descripcion) => {
        updateDoc(doc(db, "examenes", id), {descripcion})
      }

      const modNombre = async(nombre) => {
        try {
        await modificarNombre(nombre)
        alert("nombre modificado")
        }
        catch(error) {
          alert("error")
        }
      }
      const modMateria = async(materia) => {
        try {
        await modificarMateria(materia)
        alert("materia modificada")
        }
        catch(error) {
          alert("error")
        }
      }

      const modDescripcion = async(descripcion) => {
        try {
        await modificarDescripcion(descripcion)
        alert("descripcion modificada")
        }
        catch(error) {
          alert("error")
        }
      }

      const modificarPregunta = async (id, materia, pregunta, respuesta) => {
        await updateDoc(doc(db, 'preguntas', id), {materia, pregunta, respuesta});
      
      }
    
      const modPreg = async () => {
        try {
        await modificarPregunta(idPre, mat, preg, resp);
        alert("Pregunta Modificada");
        getPreguntas();
        setAgregarPregunta(true);
        setMod(false);
        }
        catch(error) {
          alert("error")
        }
      }

      const eliminarExamen = async() => {
        try{
        await renderId.map((n) => eliminarPregunta(n));
        deleteDoc(doc(db, 'examenes', id));
        alert("Examen Eliminado");
        navigate("/misexamenes/"+user)
        // getPreguntas();  
        }
        catch(error) {
          alert("error")
        }
        
      }
    
    const renderPreguntas = ([]);
    const renderRespuestas = ([]);
    const renderId = ([]);
    
    {preguntas.map((exa) => {
                  if(exa.examen === id) {
                    renderPreguntas.push(exa.pregunta);
                    renderRespuestas.push(exa.respuesta);
                    renderId.push(exa.id);
                  }
              })}

    const [most, setMost] = useState(false)

    const editar = () => {
      if (user.uid === examen.user) {
        setMod(false);
        setMost(!most);
        setAgregarPregunta(true);
      }
      else {
        alert("solo el creador tiene permiso a editar")
      }
    }
    
        return(
            <div class="pagina-examen">
              {cargando ? <Spinner></Spinner> :
              <div>
                <div>
                  <Link to={"/misexamenes/"+user.uid}>
                    volver
                  </Link>
                </div>
                <div>
                  <button 
                  className='boton btn-primary'
                  onClick={editar}>
                    editar
                  </button>
                </div>
                <div>
                 Examen: {" "}
                 {most ?
                <input 
                  class="boton" 
                  placeholder={examen.nombre}
                  onChange={(e) => setNombre(e.target.value)}>
                </input> : 
                  <span>
                  {examen.nombre}
                  </span>
 }
                {most &&
                    <button 
                      className='boton btn-primary'
                      onClick={() => modNombre(nombre)}>
                      modificar
                    </button> 
    }
                 </div>
                
                 <div>
                 Materia: 
                 {most ? 
                  <input 
                    onChange={(e) => setMateria(e.target.value)}
                    class="boton" 
                    placeholder={examen.materia}>
                  </input> : 
                  <span>
                  {examen.materia}
                  </span>
 }
                  {most &&
                 <button 
                 onClick={() => modMateria(materia)}
                 class="boton btn-primary">
                   modificar
                 </button>
    }
                 </div>
                 <div>
                 Descripcion: 
                 {most ? 
                  <input 
                    onChange={(e) => setDescripcion(e.target.value)}
                    class="boton" 
                    placeholder={examen.descripcion}>
                  </input> : 
                  <span>
                  {examen.descripcion}
                  </span>
 }
                  {most &&
                 <button 
                 onClick={() => modDescripcion(descripcion)}
                 class="boton btn-primary">
                   modificar
                 </button>
    }
                 </div>
                 Creado por: {examen.usernombre}
                 <div>
                 {most &&
                   <button 
                   onClick={() => eliminarExamen()}
                   className='boton btn-danger'>
                     Eliminar Examen
                   </button>
    }
                 </div>
                 <br></br>
               <div class="">
          {preguntas.filter((exa) => {
              if(id === exa.examen) {
                  return exa.pregunta
                }
              }).map((pre, num) => {
                return (
                    <div key={pre.id} className='cuadro' >
                        Pregunta {num + 1}:
                  <li>
                    {pre.pregunta}
                  </li>
                  <br></br>
                      Respuesta:
                      <div>
                      <button 
                        id={"ocultar"+num}
                        onClick={() => ocultar(num)} 
                        class="boton botonocultar">
                          Ocultar Respuesta
                      </button>
                      <button 
                        id={"mostrar"+num}
                        onClick={() => mostrar(num)} 
                        class="boton">
                          Mostrar Respuesta
                      </button>
                      </div>
              
                      <p 
                      id={num}
                      // style="display:none"
                      class="respuestaa respuesta">
                        {pre.respuesta}
                        </p>
                      {most &&
                      <div>
                      <button
                      class="boton btn-primary"
                     
                      onClick={() => modificar(pre.id, pre.pregunta, pre.respuesta)}
                      >
                        <a href="#modificar">
                          Modificar
                          </a>
                        </button>
                      <button 
                      onClick={() => eliminarPregunta(pre.id)} 
                      class="boton btn-danger">Eliminar</button>
                      </div>
              }           
                 </div>
              );
            })}
             {mod &&
             <div 
             id='modificar'
             class="pagina-examen-agregar-preg">
            <div className="AgregarPregunta">
         
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
                  <textarea class="agregar" required onChange={ e => setPreg(e.target.value)} placeholder="Escribe una pregunta" name="pregunta" type="text">{preg}</textarea>
                </label>
                </div>
                <div>
                <label 
                  class="agregar" 
                  for="respuesta">
                  <textarea 
                    class="agregar" 
                    onChange={ e => setResp(e.target.value)} 
                    placeholder="Escribe una respuesta" 
                    name="respuesta" type="text">
                      {resp}
                    </textarea>
                </label>
                </div>
                <button 
                class="boton btn-primary" 
                onClick={modPreg}>Modificar</button>
                </div>
                </div>
                </div>
            } 
            {most &&
            agregarpregunta &&
            <div class="pagina-examen-agregar-preg">
              <AgregarPregunta idexa={id} />
            </div>
            }
          
          </div>
                </div>}
            </div>
        )
    }
