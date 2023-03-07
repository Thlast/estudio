import { alertasuccess } from "../../alertas";

const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

  
export const crearDef = async (nombreConcepto, definicion, curso, fuente, event) => {

  const url = `${urlserver}/crearDef`;
  event.preventDefault();

  let respuesta = {};

  await fetch(url, {
    method: 'POST',
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
    .catch(error => (console.error('Error:', error)))
    .then(response => (
      console.log('Definición agregada:', response),
      alertasuccess("Definición agregada"),
      respuesta = response)
    )
  return respuesta
}