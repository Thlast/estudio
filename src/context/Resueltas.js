import React, {useState, useEffect} from "react";

export const ResueltasContext = React.createContext({})

export function HistorialProvider ({ children }) {

  const [completadas, setCompletadas] = useState(localStorage.getItem("listaResueltas") || [])

  useEffect(() => {

    setCompletadas(localStorage.getItem("listaResueltas") || [])

  }, [])

  const agregarHistorial = async (preguntaid) => {

    
    await localStorage.setItem("listaResueltas", JSON.stringify(completadas.concat(preguntaid)))
    // localStorage.setItem("listaResueltas", JSON.stringify(completadas))
    setCompletadas(localStorage.getItem("listaResueltas"))
  }
  const reiniciarHistorial = async () => {

    await localStorage.clear()
    setCompletadas([])
  }

 

return (
    <ResueltasContext.Provider value={{
        completadas,
        agregarHistorial,
        reiniciarHistorial
    }}>
      { children }
    </ResueltasContext.Provider>
)
}