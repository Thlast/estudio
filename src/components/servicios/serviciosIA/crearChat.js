const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const agregarChat = async (nombreChat, idUser, event) => {
  event.preventDefault();
  const url = `${urlserver}/crearChat/${idUser}`;

  let respuesta = {};

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
     nombreChat: nombreChat
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => (console.error('Error:', error)))
    .then(response => (
      console.log('Chat agregado:', response),
      respuesta = response)
    )
  return respuesta
}
export const modificarChat = async (nombreChat, idChat, event) => {
  event.preventDefault();
  const url = `${urlserver}/modificarChat/${idChat}`;

  let respuesta = {};

  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
     nombreChat: nombreChat
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => (console.error('Error:', error)))
    .then(response => (
      console.log('Chat modificado:', response),
      respuesta = response)
    )
  return respuesta
}