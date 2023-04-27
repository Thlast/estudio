import { alertasuccess } from "../../../alertas";

const urlserverSQL = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL
  
export const crearCapitulo = async (curso, capituloNombre, capituloDescripcion, event) => {

  const url = `${urlserverSQL}/crearCapitulo/${curso}`;
  event.preventDefault();

  let respuesta = {};

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      CapituloNombre: capituloNombre,
      CapituloDescripcion: capituloDescripcion
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