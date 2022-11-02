// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

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

export const buscarFiltradoNuevo = async (curso, valor) => {
    const data = await fetch(`${urlserver}/filtrar/${curso}/${valor}`)
    return data.json()
  
}

export const obtenerDetalleCurso = async (materia) => {
    const data = await fetch(`${urlserver}/app/${materia}/detalle`)
    return data.json()
  
}
