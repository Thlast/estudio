const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const guardarMessages = async (idChat, pregunta, respuesta, event) => {
  event.preventDefault();
  const url = `${urlserver}/crearMessages/${idChat}`;

  let resp = {};

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      pregunta: pregunta,
      respuesta: respuesta
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => (console.error('Error:', error)))
    .then(response => (
      console.log('Conversación guardada:', response),
      resp = response)
    )
  return resp
}