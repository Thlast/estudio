// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.SERVER_PRODUCTION_URL || "http://192.168.0.15:4000"

export const obtenerCursos = async (materia) => {
    const data = await fetch(`${urlserver}/app/${materia}`)
    return data.json()
  
}

export const obtenerMaterias = async () => {
    
    const data = await fetch(`${urlserver}/materias`)
    return data.json()
  
}
