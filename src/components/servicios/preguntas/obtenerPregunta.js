// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const obtenerPregunta = async (mat) => {
  
  const data = await fetch(`${urlserver}/preguntas/${mat}`)
  return data.json()

}

export const obtenerSeccion = async (materia, seccion, { signal }) => {
  const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');

  const data = await fetch(`${urlserver}/preguntas/${mat}/${seccion}`, { signal })
  return data.json()

}
export const getPreguntaSeccionId = async (seccionId, { signal }) => {


  const data = await fetch(`${urlserver}/seccionId/preguntas/${seccionId}`, { signal })
  return data.json()

}
  
export const obtenerPreguntaMateria = async (materia) => {
  const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');

 try {
  const data = await fetch(`${urlserver}/preguntas/${mat}`)
  return data.json()
 } catch(error) {
  return "error del servidor"
 }

   
}
//optimizado para home - busca por indice
export const obtenerPreguntaMateriaPorIndice = async (curso, indice, capitulo) => {

 try {

    const data = await fetch(`${urlserver}/preguntasPorIndice/${curso}/${indice}/${capitulo}`)
    return data.json()
  

 } catch(error) {
  return "error del servidor"
 }

   
}
export const obtenerLongitudPreguntas = async (curso, capitulo) => {

  try {
   const data = await fetch(`${urlserver}/longitudPreguntas/${curso}/${capitulo}`)
   return data.json()
  } catch(error) {
   return "error del servidor"
  }
 
 }

export const filtrarPregunta = async (filtro) => {
  
  const data = await fetch(`${urlserver}/preguntas/buscar/${filtro}`)
  return data.json()

}

export const obtenerExamen = async (examenid) => {
  
  const data = await fetch(`${urlserver}/preguntas/examen/${examenid}`)
  return data.json()

}
export const obtenerAnexadas = async (examenid) => {

  const data = await fetch(`${urlserver}/preguntas/anexo/examen/${examenid}`)
  return data.json()

}

export const obtenerUsuario = async (curso, usuarioid, page, perPage) => {
  
  const data = await fetch(`${urlserver}/preguntas/usuario/${curso}/${usuarioid}/${page}/${perPage}`)
  return data.json()

}

