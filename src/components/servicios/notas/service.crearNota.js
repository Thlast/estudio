import { alertasuccess } from "../../alertas";

const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const agregarNota = async (privateStatus, curso, titulo, seccion, seccionId, capituloId, contenido, notaName, usuario, event) => {
  event.preventDefault();
  const url = `${urlserver}/crearNota`;

  let respuesta = {};

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      privateStatus: privateStatus,
      user_id: usuario,
      curso: curso,
      capitulo: titulo,
      seccion: seccion,
      SeccionId: seccionId,
      CapituloId: capituloId,
      contenido: contenido,
      name: notaName
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => (console.error('Error:', error)))
    .then(response => (
      console.log('Nota agregada:', response),
      alertasuccess("Nota agregada"),
      respuesta = response)
    )
  return respuesta
}