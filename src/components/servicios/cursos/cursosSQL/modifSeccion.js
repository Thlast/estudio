import { alertasuccess } from "../../../alertas";

const urlserverSQL = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL
  
export const modificarSeccion = async (nombreSeccion, contenido, seccionId, event) => {
  const url = `${urlserverSQL}/modificarSeccion/${seccionId}`;
  event.preventDefault();

  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        SeccionNombre: nombreSeccion,
        SeccionContenido: contenido
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorMessage = `Error en la solicitud de modificación: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Sección modificada:', data);
    alertasuccess("Sección modificada con éxito.");
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-lanza el error para que se maneje en la función que llama a modificarSeccion.
  }
};


//para el editor rapido
export const modificarSeccionNombre = async (nombreSeccion, seccionId, event) => {

  const url = `${urlserverSQL}/modificarSeccionNombre/${seccionId}`;
  event.preventDefault();

  let respuesta = {};

  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      SeccionNombre: nombreSeccion
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => (console.error('Error:', error)))
    .then(response => (
      console.log('Seccion modificada:', response),
      alertasuccess("Seccion modificada"),
      respuesta = response)
    )
  return respuesta
}