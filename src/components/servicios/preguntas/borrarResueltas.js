import { alertasuccess } from "../../alertas";

// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const limpiarHistorial = async (curso, user) => {

  const url = `${urlserver}/limpiarHistorial/${curso}/${user}`;
  let respuesta = {}

  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        //alertasuccess(`Historial de ${curso} limpio`),
        respuesta = response
    }
)
  return respuesta
}