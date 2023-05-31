import { alertafail, alertasuccess } from "../../../alertas";

const urlserverSQL = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const crearCurso = async (CursoId, CursoNombre, CursoDescripcion) => {
  const url = `${urlserverSQL}/crearCurso/${CursoId}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        CursoNombre: CursoNombre,
        CursoDescripcion: CursoDescripcion
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.status);
    }

    const data = await response.json();

    console.log('Curso agregado:', data);
    alertasuccess('Curso agregado');

    return data;
  } catch (error) {
    console.error('Error:', error);
    // Puedes lanzar una alerta de error aquí o realizar cualquier otra acción para manejar el error.
    alertafail(`${error}`)
    throw error; // Opcional: puedes relanzar el error para que se maneje más arriba en la cadena de llamadas.
  }
};
