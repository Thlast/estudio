// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = 'https://serverestudio-fzvt-fc98oe5kq-thlast.vercel.app' || "http://192.168.0.15:4000"

export const obtenerCursos = async (materia) => {
    const data = await fetch(`${urlserver}/app/${materia}`)
    return data.json()
  
}

export const obtenerMaterias = async () => {
    
    const data = await fetch(`${urlserver}/materias`)
    return data.json()
  
}
