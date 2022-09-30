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
