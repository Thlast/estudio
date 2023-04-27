import React, { useState, useEffect } from "react";
import { obtenerMaterias, getCursos } from "../components/servicios/cursos/obtenerCurso";

export const MateriasContext = React.createContext({})

export function DataProvider({ children }) {

  const [materias, setMaterias] = useState({})
  const [cargandoMaterias, setCargandoMaterias] = useState(true)
  const [matPreferida, setMatPreferida] = useState("impuestos")

  const cargarMaterias = async () => {
    setCargandoMaterias(true)
    getCursos().then(data => (setMaterias(data), setCargandoMaterias(false)));

    // obtenerMaterias()
    //   .then(data => (setMaterias( data), setCargandoMaterias(false)));
    
  }
  
  useEffect(() => {
    cargarMaterias()

  }, [])

  const preferenciaMateria = (mat) => {
    setMatPreferida(mat)
  }

  return (
    <MateriasContext.Provider value={{
      matPreferida,
      cargarMaterias,
      preferenciaMateria,
      materias,
      cargandoMaterias
    }}>
      {children}
    </MateriasContext.Provider>
  )
}