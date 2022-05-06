import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';

// import {Card, Button} from 'react-bootstrap';

// import { agregarPregunta } from './Agregar';

export function AgregarPregunta(props) {

    const {idexa} = props;

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
        await agregarPregunta(user.uid, mat, preg, resp, idexa);
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


    if(loading) return <h1>Loading...</h1>

    
  
    return (
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
            </div>

    );
  }
