import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { AgregarPregunta } from './Agregar';
import { async } from '@firebase/util';
import { Nav } from "./navbarr";
// import {Card, Button} from 'react-bootstrap';

// import { agregarPregunta } from './Agregar';

export function Perfil() {

    const {user, logout, loading} = useAuth();
    const navigate = useNavigate();

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
// const getPreguntas = async () => {
//   const data = await getDocs(preguntasCollectionRef);
//   setPreguntas(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
//   console.log(data);
// }
    useEffect(() => {

      getMisPreguntas()
      asd()
      // getPreguntas()
      getMaterias()
    }, [])

    // render preguntas segun materias
    const [render, setRender] = useState("Contabilidad VII");

    const preguntar = async(e) => {
      setCount(0)
      await asd(e);
      setRender(e);
      setShow(false);
      console.log(e)
    }
    //almacenar en array

    const renderPreguntas = ([]);
    const renderRespuestas = ([]);

    {preguntas.map((preg) => {
                  if(preg.materia === render) {
                    renderPreguntas.push(preg.pregunta);
                    renderRespuestas.push(preg.respuesta);
                  }
              })}

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

    const agregarPregunta = (user, materia, pregunta, respuesta) => {
      addDoc(collection(db, 'preguntas'), {user, materia, pregunta, respuesta})
    }
    
    const agPreg = async () => {
      try { 
        await agregarPregunta(user.uid, mat, preg, resp);
        // setCargar("Pregunta agregada");
        alert("Pregunta agregada correctamente");
        getMisPreguntas();
      }
      catch(error) {
        // setError("Error al agregar");
        alert("error")
      }

      // getMaterias();
    }

    const [mostAgregar, setMostrarAgregar] = useState(false);

    const añadir = () => {
        setMostrarPreguntas(false);
        setMostrarAgregar(true);
        setMod(false);
    }

    const [mostrarPreguntas, setMostrarPreguntas] = useState(false);

    const mostpreg = () => {
        asd(mat);
        setMostrarPreguntas(true);
        setMostrarAgregar(false);
        setMod(false);
    }

  //eliminar pregunta

  const eliminarPregunta = async (id) => {
    await deleteDoc(doc(db, 'preguntas', id));
    getMisPreguntas();
  }


  const modificar = (id, preg, respu) => {
    setMostrarPreguntas(false);
    setMod(true);
    setPreg(preg);
    setResp(respu);
    setIdPre(id);
    console.log(preg)
  }
  const [idPre, setIdPre] = useState();
  const [mod, setMod] = useState(false);

  const modificarPregunta = async (id, materia, pregunta, respuesta) => {
    await updateDoc(doc(db, 'preguntas', id), {materia, pregunta, respuesta});
  
  }

  const modPreg = async () => {
    try {
    await modificarPregunta(idPre, mat, preg, resp);
    alert("Pregunta Modificada");
    getMisPreguntas();
    }
    catch(error) {
      alert("error")
    }
  }


  const [misPreguntas, setMisPreguntas] = useState([]);

  const getMisPreguntas = async () => {
    const data = await getDocs(preguntasCollectionRef);
    setMisPreguntas(data.docs.map((doc) => ({...doc.data(), id: doc.id})).filter(
      (doc) => {if (doc.user === user.uid) {
        return doc
      }})
    );
  }

  let [noHay, setNoHay] = useState(true);
  let [count, setCount] = useState(0);
  

  let asd = (e) => {

    misPreguntas.filter((a) => {
      if(e === a.materia) {
        setCount(count + 1)
        
      } else {
        
      } 
    }); 
}



    if(loading) return <h1>Loading...</h1>

    
  
    return (
      <div className="App">
        <Nav />
            <div>
        <main className="perfil">
        <div>
            <nav  class="menu">
              <ul>
                <li>
                    <a href="/examenes">Examenes</a>
                    <br></br>
                    <a href={'/misexamenes/'+user.uid}>Mis Examenes</a>
                </li>
                <li onClick={mostpreg}>
                   <span> Todas mis preguntas </span>
                </li>
                <li onClick={añadir}>
                   <span>Agregar Pregunta</span>
                </li>
              </ul>
            </nav>
            </div>

            {mod &&
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
            } 
            { mostAgregar &&
              <AgregarPregunta idexa={""} />
            }
            
            {mostrarPreguntas &&
            <div>
              <div>
            <select onChange={(e) => preguntar(e.target.value)} class="boton" for="materias">
                
              {materias.map((mat) => {
              return (
                <option value={mat.nombre}>
                  {mat.nombre}
                </option>
               
              );
            })}
            </select>
              </div>
          <div class="mispreguntas">
          
          {count !== 0 ? misPreguntas.filter((pr) => {
            if (render === pr.materia) 
              
              return pr;

          }).map((pre, num) => {
                return (
                    <div key={pre.id} className='cuadro' >
                        Pregunta {num + 1}:
                  <li>
                    {pre.pregunta}
                  </li>
                  <br></br>
                      Respuesta:
                      <p class="respuesta cuadro-respuesta">{pre.respuesta}</p>
                      <div>
                      <button 
                      onClick={() => modificar(pre.id, pre.pregunta, pre.respuesta)} 
                      class="btn btn-primary boton">Modificar</button>
                      <button 
                      onClick={() => eliminarPregunta(pre.id)} 
                      class="btn btn-danger boton">Eliminar</button>
                      </div>
                 </div>
              );
                
           
            }) : <p>
              No hay preguntas
            </p>
            }
          </div>
          </div>
          }
        </main>
      </div>
      </div>
    );
  }
