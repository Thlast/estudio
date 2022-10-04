import { useState } from "react"

const initialValues = {
  preg: "",
  resp: "",
  tipo: "Normal",
  // id: "",
  curso: "",
  //opciones:
    a: "",
    b: "",
    c: "",
    d: "",
  correcta: "a",
  titulo: "",
  seccion: "",
}


export const usePreguntaForm = (inicial) => {

  const [datosPregunta, setDatosPregunta] = useState(inicial)
  const [habilitarMultiple, setHabilitarMultiple] = useState(false)

  const handleChange = ({ target }) => {
    setDatosPregunta({
      ...datosPregunta,
      [target.name]: target.value
    })
  }
  
  const handleChangeTipo = ({target}) => {
    setDatosPregunta({
      ...datosPregunta,
      [target.name]: target.value
    })
    if (target.value == "Multiple") {
      setHabilitarMultiple(true)
      // console.log(target.value)
    } else {
      setHabilitarMultiple(false)
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setDatosPregunta(initialValues)
    console.log(datosPregunta, initialValues)
  }
  
  return {
      datosPregunta,
      habilitarMultiple,
      handleChangeTipo,
      handleChange,
      handleSubmit
  }
}