import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MostrarPregunta} from './preguntas/mostrarPregunta'

export function AgregarMongo() {

	const {user, logout, loading} = useAuth();
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false)
  const [modificar, setModificar] = useState(false);
  const [edit, setEdit] = useState(false)
    const editar = () => {
      setEdit(!edit)
      setModificar(false)
    }
  


    if(loading) return <h1>Loading...</h1>
  
    return (
      <div className="">
        <button
        onClick={editar}
        >Editar
        </button>
				<button
					onClick={() => setMostrarPreguntas(!mostrarPreguntas)}
					>
						{mostrarPreguntas ? "Ocultar Preguntas" : "Mostrar Preguntas"}
				</button>
          <MostrarPregunta edit={edit} mostrarPreguntas={mostrarPreguntas} />
        </div>

    );
  }
