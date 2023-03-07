import { alertasuccess } from "../../alertas";

// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const modificarDef = async (nombreConcepto, definicion, curso, fuente, id, event) => {
  const url = `${urlserver}/modificarDef/${id}`;
  event.preventDefault();
  let respuesta = {}

  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
        nombreConcepto: nombreConcepto,
        definicion: definicion,
        curso: curso,
        fuente: fuente
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response =>
    (console.log('Definición modificada:', response),
      alertasuccess("Definición modificada"),
      respuesta = response)
    )
  return respuesta
}