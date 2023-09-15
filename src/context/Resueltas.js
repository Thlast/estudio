import React, { useState, useEffect, useContext } from "react";
import { agregarResuelta, obtenerResueltas, obtenerResueltasUsuario } from "../components/servicios/preguntas/resueltas";
import { useAuth } from "./AuthContext";
import { limpiarHistorial } from "../components/servicios/preguntas/borrarResueltas";
import { MateriasContext } from "./MateriasContext";

export const ResueltasContext = React.createContext({})

export function HistorialProvider({ children }) {

  const { user } = useAuth()
  const { matPreferida } = useContext(MateriasContext)
  //nuevo en MONGODB
  const [resueltas, setResueltas] = useState()
  const [totalResueltas, setTotalResueltas] = useState(0)

  const devolverResueltas = (curso) => {
    let resueltasCurso = resueltas?.filter(r => r.curso == curso)

    return resueltasCurso
  }

  const obtenerProgreso = () => {

    if (matPreferida && resueltas) {
      const total = resueltas?.filter(r => r.curso == matPreferida)[0]?.resueltas?.length
      setTotalResueltas(total)
    }
  }

  useEffect(() => {
    obtenerProgreso()
  }, [matPreferida, user, resueltas])

  const actualizarResueltas = async () => {
    if (user) {
      await obtenerResueltasUsuario(user?.uid).then(data => {
        setResueltas(data)
      })
    }
  }

  useEffect(() => {
    actualizarResueltas()
  }, [user])

  const agregarResueltasContext = async (nota, curso, idPregunta) => {

    const r = await devolverResueltas(curso)
    let resueltasCurso = []
    if (r[0]?.resueltas.length > 0) {
      resueltasCurso = [...r[0]?.resueltas]
    }


    if (nota >= 7) {
      if (resueltasCurso.indexOf(idPregunta) == -1) {
        await agregarResuelta(curso, user.uid, idPregunta).then(data => {
          console.log("Aprobado con nota:", nota);
          actualizarResueltas()
          return data
        })
      }
    }
  }
  const limpiarResueltas = async (curso, user) => {
    await limpiarHistorial(curso, user)
    await actualizarResueltas()
  }
  // //viejo en localStorage
  // const [completadas, setCompletadas] = useState(localStorage.getItem("listaResueltas") || [])

  // useEffect(() => {

  //   setCompletadas(localStorage.getItem("listaResueltas") || [])

  // }, [])

  // const agregarHistorial = async (preguntaid) => {


  //   await localStorage.setItem("listaResueltas", JSON.stringify(completadas.concat(preguntaid)))
  //   // localStorage.setItem("listaResueltas", JSON.stringify(completadas))
  //   setCompletadas(localStorage.getItem("listaResueltas"))
  // }
  // const reiniciarHistorial = async () => {

  //   await localStorage.setItem("listaResueltas", [])
  //   setCompletadas([])
  // }



  return (
    <ResueltasContext.Provider value={{
      totalResueltas,
      limpiarResueltas,
      agregarResueltasContext,
      devolverResueltas,
      resueltas,
      // completadas,
      // agregarHistorial,
      // reiniciarHistorial
    }}>
      {children}
    </ResueltasContext.Provider>
  )
}