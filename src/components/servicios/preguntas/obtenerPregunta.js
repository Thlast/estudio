// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || "http://192.168.0.15:4000"

export const obtenerPregunta = async () => {
  
  const data = await fetch(`${urlserver}/preguntas/`)
  return data.json()

}

export const obtenerSeccion = async (materia, seccion) => {
  const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');

  const data = await fetch(`${urlserver}/preguntas/${mat}/${seccion}`)
  return data.json()

}
  
export const obtenerPreguntaMateria = async (materia) => {
  // const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');

  const data = await fetch(`${urlserver}/preguntas/${materia}`)
  return data.json()

}