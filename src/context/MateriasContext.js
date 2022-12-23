import React, {useState, useEffect} from "react";
import { obtenerMaterias } from "../components/servicios/cursos/obtenerCurso";

export const MateriasContext = React.createContext({})

export function DataProvider ({ children }) {

  const [materias, setMaterias] = useState({})
  const [cargandoMaterias, setCargandoMaterias] = useState(true)
  const [matPreferida, setMatPreferida] = useState("impuestos")

  useEffect(() => {
    obtenerMaterias()
    .then(data => (setMaterias(data), setCargandoMaterias(false)));
    
  }, [])

  const preferenciaMateria = (mat) => {
    setMatPreferida(mat)
  }

return (
    <MateriasContext.Provider value={{
      matPreferida,
      preferenciaMateria,
      materias,
      cargandoMaterias
    }}>
      { children }
    </MateriasContext.Provider>
)
}