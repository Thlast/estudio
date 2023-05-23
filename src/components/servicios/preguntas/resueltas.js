const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const obtenerResueltasUsuario = async (userId) => {

  const data = await fetch(`${urlserver}/resueltasUsuario/${userId}`)
  return data.json()

}
export const obtenerResueltasCurso = async (curso, userId) => {

  const data = await fetch(`${urlserver}/resueltas/${curso}/${userId}`)
  return data.json()

}

export const agregarResuelta = async (curso, userId, idPregunta) => {
  const url = `${urlserver}/AgregarResueltas/${curso}/${userId}`;

  let respuesta = {}

  // console.log(preguntaModificada, typeof id)

  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({ idPregunta: idPregunta }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response =>
    (console.log('Pregunta modificada:', response),
      respuesta = response)
    )
  return respuesta
}
