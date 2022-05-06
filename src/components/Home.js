
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';

import { getAuth, updateProfile } from "firebase/auth";
import { Nav } from "./navbarr"
import { async } from '@firebase/util';

// import { agregarPregunta } from './Agregar';



export function Home() {

    const auth = getAuth();
  
    const {user, logout, loading} = useAuth();
    const navigate = useNavigate();
    
    const [materias, setMaterias] = useState([]);
    const materiasCollectionRef = collection(db, "materias");

    const [preguntas, setPreguntas] = useState([]);
    const preguntasCollectionRef = collection(db, "preguntas");

    const [comentarios, setComentarios] = useState([]);
    const comentariosCollectionRef = collection(db, "comentarios");

//Cargar la base de datos:
const getMaterias = async () => {
  const data = await getDocs(materiasCollectionRef);
  setMaterias(data.docs.map((doc) => ({...doc.data(), id: doc.id})));

}
const getPreguntas = async () => {
  const data = await getDocs(preguntasCollectionRef);
  setPreguntas(data.docs.map((doc) => ({...doc.data(), id: doc.id})));

}
const getComentarios = async () => {
  const data = await getDocs(comentariosCollectionRef);
  setComentarios(data.docs.map((doc) => ({...doc.data(), id: doc.id})));

}

    useEffect(() => {

    
      getComentarios()
      getPreguntas()
      getMaterias()
    }, [])

    // render preguntas segun materias
    const [render, setRender] = useState("Contabilidad VII");
    const [current, setCurrent] = useState(0); 

    const preguntar = (e) => {
     
      setRender(e);
      setCurrent(0);
      setShow(false);
      console.log(e)
    }
    //almacenar en array

    const renderPreguntas = ([]);
    const renderRespuestas = ([]);
    const renderId = ([]);
    
    
    preguntas.map((preg) => {
                  if(preg.materia === render) {
                    renderPreguntas.push(preg.pregunta);
                    renderRespuestas.push(preg.respuesta);
                    renderId.push(preg.id);
                    
                  }
              })


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
    // const [error, setError] = useState("");
    // const [cargar, setCargar] = useState("");
    const agPreg = async () => {
      try { 
        await agregarPregunta(user.uid, mat, preg, resp);
        // setCargar("Pregunta agregada");
        alert("Pregunta agregada correctamente");
        
      }
      catch(error) {
        // setError("Error al agregar");
        alert("error")
      }

      // getMaterias();
    }

    const [mostComent, setMostComent] = useState(false)
    const [comentario, setComentario] = useState("");

    const comentar = () => {
      setMostComent(true)
    }

    const agregarComentario = async (idpreg, user, iduser, comentario) => {
      await addDoc(collection(db, 'comentarios'), {idpreg, user, iduser, comentario});
    
    }

  const agComent = async (idpreg) => {
    if (comentario.length > 0)
    try {
    await agregarComentario(idpreg, user.displayName, user.uid, comentario);
    alert("Comentario Agregado");
    getPreguntas();
    getComentarios()
    }
    catch(error) {
      alert("error")
    } else {
      alert("Debe introducir un comentario")
    }
  }

  const eliminar = async (id) => {
    await deleteDoc(doc(db, 'comentarios', id));
    getComentarios();
  }

  const [nombreUser, setNombreUser] = useState();

  const modNombre = (nombreUser) => {
    updateProfile(auth.currentUser, {
      displayName: nombreUser
      
    }).then(() => {
      alert("Profile updated!")
      getAuth()
    }).catch((error) => {
      alert("An error occurred")
    
    });
  }
  
  let comentFiltrados = ([]);

  const comentFiltrado = () => {
    comentarios.filter((comen) => {
      if(comen.idpreg === renderId[current]) {
        comentFiltrados.push(comen);
        }
      })
  }
  comentFiltrado()
  
    if(loading) return <h1>Loading...</h1>
    
  
    return (
      <div className="App">
        <Nav />
        <main className="Inicio">
            
          <div>
            <select 
              onChange={(e) => preguntar(e.target.value)} 
              class="boton" 
              for="materias">
              {materias.map((mat) => {
              return (
                <option value={mat.nombre}>
                  {mat.nombre}
                </option>
               
              );
            })}
            </select>
              </div>
              <div>
          <button 
          class="boton" 
          onClick={() => current === 0 ? null 
          : (setCurrent(current - 1), 
          setMostComent(false), 
          setShow(false))}>
            Anterior
          </button>  
          <button 
          class="boton" 
          onClick={() => (setCurrent(Math.floor(Math.random() * renderPreguntas.length)), setMostComent(false), setShow(false))}>Pregunta aleatoria
          </button>
          <button 
          class="boton" 
          onClick={() => current + 1 >= renderPreguntas.length 
            ? null 
          : (setCurrent(current + 1), 
          setMostComent(false), 
          setShow(false)
          )}>
            Siguiente
          </button>
          </div>
          <div class="home">
            <p key={renderId[current]} class="cuadro">Pregunta {current+1}:<br></br>{renderPreguntas[current]}</p>
          </div>
          
          <button 
            class="boton" 
            onClick={() => setShow(!show)}>
              {show ? "Ocultar" : "Mostrar Respuesta"}
              </button>
          {show && 
          <div class="home respuesta">
          <p 
          key={renderId[current]} 
          class="show-element">
            Respuesta:
            <br></br>
            {renderRespuestas[current]}
            </p>
            {!mostComent &&
            <button class="boton" onClick={comentar}>
              Comentar
            </button>
}
            <br></br>
            <p>
            Comentarios:
            </p>
            {renderId.length !== 0 ?
            comentFiltrados.length !== 0 ? comentarios.filter((comen) => {
                  if(comen.idpreg === renderId[current]) {
                    return comen.comentario
                    }
                  }).map((com) => {
                    return (
                      <div className='cuadro respuesta comentario'>
                        <div>
                          <p>{com.user}</p>
                          {(com.iduser === user.uid) &&
                          <div>
                            <button 
                            onClick={() => eliminar(com.id)}
                            className='boton btn-danger'>
                              Eliminar
                            </button>
                          </div>
                        }
                        </div>
                        <br></br>
                        
                        {com.comentario}
                      </div>
                    );
              }) : <p>No hay comentarios</p>
            : <p>No hay comentarios</p>
          }
            { mostComent &&
            <div className='comentar'>
              
            <textarea 
            onChange={(e) => setComentario(e.target.value)}
            className='agregar' 
            placeholder='Introducir un comentario'>
            </textarea>
            <br></br>
            <button 
              className='boton'
              onClick={() => agComent(renderId[current])}>
              Comentar
              </button>
            </div>
}
            </div>
            }                 
        </main>
      </div>
    );
  }
