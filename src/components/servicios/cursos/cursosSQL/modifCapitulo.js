import { alertasuccess } from "../../../alertas";

const urlserverSQL = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL
  
export const modificarCapitulo = async (nombreCapitulo, descripcion, capituloId, event) => {

  const url = `${urlserverSQL}/modificarCapitulo/${capituloId}`;
  event.preventDefault();

  let respuesta = {};

  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      CapituloNombre: nombreCapitulo,
      CapituloDescripcion: descripcion
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => (console.error('Error:', error)))
    .then(response => (
      console.log('Capitulo modificado:', response),
      alertasuccess("Capitulo modificado"),
      respuesta = response)
    )
  return respuesta
}