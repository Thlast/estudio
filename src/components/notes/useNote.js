import { useState } from "react"


export const useNote = (inicial) => {

  const [datosNota, setDatosNota] = useState(inicial)

  const handleChange = ({ target }) => {
    setDatosNota({
      ...datosNota,
      [target.name]: target.value
    })

    if(target.name == "capitulo") {
      setDatosNota({
        ...datosNota,
        [target.name]: target.value,
        seccion: ""
      })
    }

  }


  const handleSubmit = (e) => {
    e.preventDefault();
    //setDatosPregunta(initialValues)
  }

  return {
    datosNota,
    handleChange,
    handleSubmit
  }
}