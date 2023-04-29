import { alertasuccess } from "../../alertas";

// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const modificarNota = async (privateStatus, user, curso, notaName, titulo, seccion, seccionId, capituloId, contenido, id, event) => {
  event.preventDefault();
  const url = `${urlserver}/modificarNota/${id}`;
  let respuesta = {}

  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      privateStatus: privateStatus,
      user_id: user,
      curso: curso,
      capitulo: titulo,
      seccion: seccion,
      seccionId: seccionId,
      capituloId: capituloId,
      contenido: contenido,
      name: notaName
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response =>
    (console.log('Nota modificada:', response),
      alertasuccess("Nota modificada"),
      respuesta = response)
    )
  return respuesta
}