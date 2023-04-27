import { alertasuccess } from "../../../alertas";

const urlserverSQL = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL
  
export const cambiarOrdenCapitulo = async (modificarOrden, event) => {

  const url = `${urlserverSQL}/cambiarOrdenCapitulo`;
  event.preventDefault();

  let respuesta = {};

  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({modificarOrden}),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => (console.error('Error:', error)))
    .then(response => (
      console.log('Guardado!:', response),
      alertasuccess("Guardado!"),
      respuesta = response)
    )
  return respuesta
}
export const cambiarOrdenSeccion = async (modificarOrden, event) => {

  const url = `${urlserverSQL}/cambiarOrdenSeccion`;
  event.preventDefault();

  let respuesta = {};

  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({modificarOrden}),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => (console.error('Error:', error)))
    .then(response => (
      console.log('Guardado!:', response),
      alertasuccess("Guardado!"),
      respuesta = response)
    )
  return respuesta
}