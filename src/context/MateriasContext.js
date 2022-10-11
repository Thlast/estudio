import React, {useState, useEffect} from "react";
import { obtenerMaterias } from "../components/servicios/cursos/obtenerCurso";

export const MateriasContext = React.createContext({})

export function DataProvider ({ children }) {

  const [materias, setMaterias] = useState({})
  const [cargandoMaterias, setCargandoMaterias] = useState(true)

  useEffect(() => {
    obtenerMaterias()
    .then(data => (setMaterias(data), setCargandoMaterias(false)));
    
  }, [])

return (
    <MateriasContext.Provider value={{
      materias,
      cargandoMaterias
    }}>
      { children }
    </MateriasContext.Provider>
)
}