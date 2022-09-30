// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL
export const obtenerDatosSeccion = async (materia, seccion, titulo) => {
  const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');
  const sec = seccion.toLowerCase().replace(/[-º°`'".,]/g, '');
  const tit = titulo.toLowerCase().replace(/[-º°`'".,]/g, '');

  const data = await fetch(`${urlserver}/app/${mat}/${tit}/desarrollo/${sec}`)
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

export const obtenerDatosConsola = async (materia, seccion) => {
  const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');
  const sec = seccion.toLowerCase().replace(/[-º°`'".,]/g, '');
  const data = await fetch(`${urlserver}/app/${mat}/secciones/${sec}`)
  return data.json()
  
}
