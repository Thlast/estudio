import { alertasuccess } from "../../../alertas";

const urlserverSQL = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL
  
export const crearCurso = async (CursoId, CursoNombre, CursoDescripcion) => {

  const url = `${urlserverSQL}/crearCurso/${CursoId}`;

  let respuesta = {};

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
        CursoNombre: CursoNombre,
        CursoDescripcion: CursoDescripcion
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => (console.error('Error:', error)))
    .then(response => (
      console.log('Curso agregado:', response),
      alertasuccess("Curso agregado"),
      respuesta = response)
    )
  return respuesta
}