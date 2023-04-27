import { alertasuccess } from "../../../alertas";

const urlserverSQL = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL
  
export const crearSeccion = async (capituloId, nombreSeccion, contenido, event) => {

  const url = `${urlserverSQL}/crearSeccion/${capituloId}`;
  event.preventDefault();

  let respuesta = {};

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      SeccionNombre: nombreSeccion,
      SeccionContenido: contenido
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => (console.error('Error:', error)))
    .then(response => (
      console.log('Capitulo agregado:', response),
      alertasuccess("Capitulo agregado"),
      respuesta = response)
    )
  return respuesta
}