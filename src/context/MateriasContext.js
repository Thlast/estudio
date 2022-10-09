import React, {useState, useEffect} from "react";
import { obtenerMaterias } from "../components/servicios/cursos/obtenerCurso";

export const MateriasContext = React.createContext({})

export function DataProvider ({ children }) {

  const [materias, setMaterias] = useState({})

  useEffect(() => {
    obtenerMaterias()
    .then(data => (setMaterias(data)));
    
  }, [])
  
console.log(materias)
return (
    <MateriasContext.Provider value={materias}>
      { children }
    </MateriasContext.Provider>
)
}