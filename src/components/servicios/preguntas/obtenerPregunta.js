// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

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
  const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');

  const data = await fetch(`${urlserver}/preguntas/${mat}`)
  return data.json()

}

export const filtrarPregunta = async (filtro) => {
  

  const data = await fetch(`${urlserver}/preguntas/buscar/${filtro}`)
  return data.json()

}

export const obtenerExamen = async (examenid) => {
  
  const data = await fetch(`${urlserver}/preguntas/examen/${examenid}`)
  return data.json()

}

export const obtenerUsuario = async (usuarioid) => {
  
  const data = await fetch(`${urlserver}/preguntas/usuario/${usuarioid}`)
  return data.json()

}