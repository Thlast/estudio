import React, { useState, useEffect } from "react";
import { getCursos } from "../components/servicios/cursos/obtenerCurso";
import { useHistorial } from '../components/useHistorial';

export const MateriasContext = React.createContext({})

export function DataProvider({ children }) {

  const [materias, setMaterias] = useState([])
  const [cargandoMaterias, setCargandoMaterias] = useState(true)
  const [matPreferida, setMatPreferida] = useState("impuestos")

  const [materiasIndices, setMateriasIndices] = useState()
  const historiales = useHistorial(materias)
 

  const cargarMaterias = async () => {
    setCargandoMaterias(true)
    let h = {}
    await getCursos().then(data => {
      setMaterias(data) 
      setMateriasIndices(data?.map(mat => mat.CursoId))
      setCargandoMaterias(false)
    });

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
      historiales,
      materiasIndices,
      cargandoMaterias
    }}>
      {children}
    </MateriasContext.Provider>
  )
}