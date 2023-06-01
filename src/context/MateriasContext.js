import React, { useState, useEffect } from "react";
import { getCursos } from "../components/servicios/cursos/obtenerCurso";
import { useHistorial } from '../components/useHistorial';

export const MateriasContext = React.createContext({})

export function DataProvider({ children }) {

  const [materias, setMaterias] = useState([])
  const [cargandoMaterias, setCargandoMaterias] = useState(true)
  const [matPreferida, setMatPreferida] = useState("impuestos")

  const [materiasIndices, setMateriasIndices] = useState([])

  const identificarCurso = async () => {
    if (materiasIndices?.length > 0) {
      return materiasIndices?.indexOf(matPreferida);
    } else {
      //orden de impuestos
      return 4
    }
  };

  const cargarMaterias = async () => {
    setCargandoMaterias(true)

    await getCursos().then(data => {
      setMaterias(data)
      setMateriasIndices(data?.map(mat => mat.CursoId))
      //crearHistorial(data)
      setCargandoMaterias(false)
    });
    //identificarCurso()
  }

  useEffect(() => {
    cargarMaterias()

  }, [])

  useEffect(() => {
    identificarCurso()

  }, [matPreferida])

  const preferenciaMateria = (mat) => {
    setMatPreferida(mat)
  }

  //const historiales = useHistorial(materias)

  //empiezo con 4 materias e inicio en impuestos en caso de no haber cargado las materias no hay error
  const [historialeshistorial, setHistorialeshistorial] = useState([[0], [0], [0], [0], [0]]);

  const crearHistorial = (data) => {
    const h = [...historialeshistorial]
    if (data.length > 0) {
      data?.map((mat, num) => {
        if (num > (h.length - 1)) {
          h.push([0])
        }
      })
      setHistorialeshistorial(h)
    }
  }
  
  useEffect(() => {
    if (materias) {
      crearHistorial(materias)
    }

  }, [materias])

  const historialesagregar = (i, indiceMateria) => {
    if (historialeshistorial[indiceMateria].indexOf(i) === -1) {
      const historialNuevo = [...historialeshistorial.slice(0, indiceMateria), historialeshistorial[indiceMateria].concat(i), ...historialeshistorial.slice(indiceMateria + 1)];
      setHistorialeshistorial(historialNuevo)
    }
  }

  const historialesreiniciarh = (current, indiceMateria) => {
    const nuevoHistorial = [...historialeshistorial]; // crear una copia del arreglo historial
    nuevoHistorial[indiceMateria] = [current]; // actualizar el elemento en el índice indiceMateria
    setHistorialeshistorial(nuevoHistorial); // actualizar el estado del componente con el nuevo arreglo
  }

  return (
    <MateriasContext.Provider value={{
      identificarCurso,
      historialeshistorial,
      historialesagregar,
      historialesreiniciarh,
      matPreferida,
      cargarMaterias,
      preferenciaMateria,
      materias,
      //historiales,
      materiasIndices,
      cargandoMaterias
    }}>
      {children}
    </MateriasContext.Provider>
  )
}