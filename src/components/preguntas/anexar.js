import { useState } from 'react';
import { alertainfo } from '../alertas';
import { getDocs, collection } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { anexarExamen } from '../servicios/preguntas/modificarPregunta';
import { db } from '../../firebase';

export function Anexar(props) {

  const examenesCollectionRef = collection(db, "examenes");
  const {user} = useAuth();
  const {p} = props
  const [misExamenes, setMisExamenes] = useState([])

  const getExamenes = async () => {

    const data = await getDocs(examenesCollectionRef);
    const misdatos = await data.docs.map((doc) => ({...doc.data(), id: doc.id})).filter(
      exa => exa.user === user.uid);
      if(misdatos.length === 0) {
        alertainfo("crea un examen en menu/examenes")
      } else {
        setMisExamenes(misdatos)
      }

  }

  const anexarPregunta = async (id) => {  
    if(misExamenes.length === 0) {
      await getExamenes();
      document.getElementById(`anexo-${id}`).style.visibility = 'visible'
    } else {
      document.getElementById(`anexo-${id}`).style.visibility = 'visible'
    }
  } 

  const anexar = async (examenid, pregunta, e) => {
    
    if (examenid === "elegir examen") {
      alertainfo("Debe seleccionar un examen")
    } else if(pregunta.examenes.indexOf(examenid) === -1 & pregunta.examen !== examenid) {
      await anexarExamen(examenid, pregunta.id)
      for(let i = 0; e.target.length > i; i++) {
        if (e.target[i].value === examenid) {
          e.target[i].style.display = 'none'
        }
      }
    } else if (pregunta.examen === examenid) {
      alertainfo("La pregunta ya se encuentra en el examen")
    }
    else {
      alertainfo("La pregunta ya se encuentra en el examen")
    }
  }


  return (
      <div
      className='anexo-pregunta'>
      <div
      id={`anexo-${p.id}`}
      className='anexo-examen'>
      <select
      onChange={(e) => anexar(e.target.value, p, e)}
      name='anexar'
      value="">
        <option
        disabled
        value=""
        selected>
          elegir examen
        </option>
        {misExamenes.map((exa, num) => {
          if(exa.materia === p.curso)
          return (
      <option
      id={`anexo-${num}`+exa.id}
      key={`anexo-${num}`+exa.id}
      name='anexar'
      value={exa.id}>
        {exa.nombre}
      </option>
          )
        })}
      </select>   

      </div>
      <button
      onClick={() => anexarPregunta(p.id)}
      className=''>
        +
      </button>
      </div>
  )
}