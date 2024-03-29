// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL
const urlserverSQL = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const obtenerDatosSeccion = async (materia, seccion, titulo, { signal }) => {
  const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');
  const sec = seccion.toLowerCase().replace(/[-º°`'".,]/g, '');
  const tit = titulo.toLowerCase().replace(/[-º°`'".,]/g, '');

  try {
    const data = await fetch(`${urlserver}/app/${mat}/${tit}/desarrollo/${sec}`, { signal })

    if (!data.ok) {
      throw new Error(`Seccion no encontrada: ${data.status}`);
    }
    
    return data.json()
  } catch (error) {
    throw error;
  }

}

export const obtenerDatosCapitulos = async (materia, titulo) => {
  const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');

  try {
    const data = await fetch(`${urlserver}/app/${mat}/titulos/${titulo}`)

    if (!data.ok) {
      throw new Error(`Curso no encontrado: ${data.status}`);
    }

    return data.json()
  } catch (error) {
    throw error;
  }

}


export const obtenerDatosTitulos = async (materia) => {
  const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');
  try {
    const data = await fetch(`${urlserver}/app/${mat}/titulos/`)
    if (!data.ok) {
      throw new Error(`Curso no encontrado: ${data.status}`);
    }

    return data.json()
  }
  catch (error) {
    throw error
  }
}

export const obtenerDatosConsola = async (materia, seccion, { signal }) => {
  const mat = materia.toLowerCase().replace(/[-º°`'".,]/g, '');
  const sec = seccion.toLowerCase().replace(/[-º°`'".,]/g, '');
  try {
    const data = await fetch(`${urlserver}/app/${mat}/secciones/${sec}`, { signal })

    if (!data.ok) {
      throw new Error(`Curso no encontrado: ${data.status}`);
    }

    return data.json()
  } catch (error) {
    throw error
  }
}


export const obtenerResumen = async (materia) => {

  try {
    const data = await fetch(`${urlserver}/app/imprimirResumen/${materia}`)
    return data.json()
  } catch (error) {
    return "error del servidor"
  }
}

export const getSiguienteSeccion = async (curso, seccion) => {

  try {
    const data = await fetch(`${urlserverSQL}/secciones/siguiente/${curso}/${seccion}`)
    return data.json()
  } catch (error) {
    return "error del servidor"
  }
}

export const getSeccionPorId = async (seccionId, capituloId) => {

  try {
    const data = await fetch(`${urlserverSQL}/seccion/id/${capituloId}/${seccionId}`)
    return data.json()
  } catch (error) {
    return "error del servidor"
  }
}
export const getSeccionConsola = async (seccionId) => {

  try {
    const data = await fetch(`${urlserverSQL}/seccionConsola/id/${seccionId}`)
    return data.json()
  } catch (error) {
    return "error del servidor"
  }
}