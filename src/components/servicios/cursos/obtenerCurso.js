// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL
const urlserverSQL = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const obtenerCursos = async (materia) => {
    const data = await fetch(`${urlserver}/app/${materia}`)
    return data.json()
  
}

export const obtenerMaterias = async () => {
    
    const data = await fetch(`${urlserver}/materias`)
    return data.json()
  
}

export const buscarFiltrado = async (curso) => {
    const data = await fetch(`${urlserver}/filtrar/${curso}`)
    return data.json()
  
}

export const buscarFiltradoNuevo = async (curso, valor, page, limit) => {
    const data = await fetch(`${urlserver}/filtrar/${curso}/${page}/${limit}/${valor}`)
    return data.json()
  
}

export const obtenerDetalleCurso = async (materia) => {
    try {
    const data = await fetch(`${urlserver}/app/${materia}/detalle`)
    if (!data.ok) {
        throw new Error(`Curso no encontrado: ${data.status}`);
      }
  
      return data.json()
    } catch (error) {
      throw error
    }
  
}
//desde la base de datos SQL
export const getCursos = async () => {
    const data = await fetch(`${urlserverSQL}/cursos`)
    return data.json()
  
}

export const getCapitulos = async (curso) => {
    
    const data = await fetch(`${urlserverSQL}/capitulos/${curso}`)
    return data.json()
  
}

export const getSecciones = async (curso) => {
    
    const data = await fetch(`${urlserverSQL}/secciones/${curso}`)
    return data.json()
  
}
