// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL
const urlserverSQL = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const obtenerDatosSeccion = async (materia, seccion, titulo, { signal }) => {
  const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');
  const sec = seccion.toLowerCase().replace(/[-º°`'".,]/g, '');
  const tit = titulo.toLowerCase().replace(/[-º°`'".,]/g, '');

  const data = await fetch(`${urlserver}/app/${mat}/${tit}/desarrollo/${sec}`, { signal })
  return data.json()
  
}

export const obtenerDatosCapitulos = async (materia, titulo) => {
  const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');

  const data = await fetch(`${urlserver}/app/${mat}/titulos/${titulo}`)
  return data.json()
}

export const obtenerDatosTitulos = async (materia) => {
  const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');
  const data = await fetch(`${urlserver}/app/${mat}/titulos/`)
  return data.json()
  
}

export const obtenerDatosConsola = async (materia, seccion, { signal }) => {
  const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');
  const sec = seccion.toLowerCase().replace(/[-º°`'".,]/g, '');
  const data = await fetch(`${urlserver}/app/${mat}/secciones/${sec}`, { signal })
  return data.json()
  
}

export const obtenerResumen = async (materia) => {

  try {
    const data = await fetch(`${urlserver}/app/imprimirResumen/${materia}`)
    return data.json()
  } catch(error) {
    return "error del servidor"
  }
}

export const getSiguienteSeccion = async (curso, seccion) => {

  try {
    const data = await fetch(`${urlserverSQL}/secciones/siguiente/${curso}/${seccion}`)
    return data.json()
  } catch(error) {
    return "error del servidor"
  }
}

export const getSeccionPorId = async (seccionId) => {

  try {
    const data = await fetch(`${urlserverSQL}/seccion/id/${seccionId}`)
    return data.json()
  } catch(error) {
    return "error del servidor"
  }
}