const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const getNotes = async (curso, user) => {

  const data = await fetch(`${urlserver}/notes/${curso}/${user}`)
  return data.json();
}
export const getSeccionNotes = async (seccion, user) => {

  const data = await fetch(`${urlserver}/seccion/notes/${seccion}/${user}`)
  return data.json();
}
export const getSeccionIdNotes = async (seccionId, user) => {

  const data = await fetch(`${urlserver}/seccionId/notes/${seccionId}/${user}`)
  return data.json();
}
