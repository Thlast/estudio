
const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const evaluarIA = async (pregunta, respuesta, respuestaUsuario, apiKey) => {

  const messages = [
    {
      role: "system",
      content: "Eres un profesor evaluando a un alumno, hiciste una pregunta y diste una respuesta que es correcta, tienes que evaluar la respuesta que envia el usuario, si coincide en los aspectos fundamentales de la respuesta correcta a tu criterio y dando un feedback sobre lo que esta mal y lo que se puede mejorar. Tienes que dar una nota del 1 al 10 extrictamente en este formato: 'Tu nota es: nota'."
    },
    {
      role: "assistant",
      content: `La pregunta es: ${pregunta}`
    },
    {
      role: "assistant",
      content: `La respuesta correcta es: ${respuesta}`
    }
  ]
  if (apiKey) {

    console.log(messages)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [...messages, { role: "user", content: respuestaUsuario }],
        stream: false, // esto luego lo pondremos en true
        temperature: 0.0,
        stop: null
      })
    })
    console.log(response)
    const data = await response.json();
    console.log(data, data.choices[0])
    //return data.choices[0].message.content;
    return data;
  }
  else {
    alert("necesitas añadir una apiKey")
  }
}
export const getRespuestaIA = async (userId, idPregunta) => {
  const data = await fetch(`${urlserver}/getRespuestaIA/${userId}/${idPregunta}`)
  return data.json()
}

// export const agregarChat = async (nombreChat, idUser, event) => {
//   event.preventDefault();
//   const url = `${urlserver}/crearChat/${idUser}`;

//   let respuesta = {};

//   await fetch(url, {
//     method: 'POST',
//     body: JSON.stringify({
//       nombreChat: nombreChat
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }).then(res => res.json())
//     .catch(error => (console.error('Error:', error)))
//     .then(response => (
//       console.log('Chat agregado:', response),
//       respuesta = response)
//     )
//   return respuesta
// }

export const guardarRespuestaIA = async (id, idPregunta, respuestaIA, respuestaUser, nota, idUser, modificarRespuestaId) => {

  let respuesta = {};
  //si existe modificamos
  if(modificarRespuestaId) {
    const url = `${urlserver}/actualizarRespuestaIA/${modificarRespuestaId}`;
    await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        idPregunta: idPregunta,
        respuestaIA: respuestaIA,
        respuestaUser: respuestaUser,
        nota: nota,
        idUser: idUser
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => (console.error('Error:', error)))
      .then(response => (
        console.log('Respuesta actualizada:', response),
        respuesta = response)
      )
    return respuesta
  } 
  //si no existe lo creamos
  else {
    const url = `${urlserver}/crearRespuestaIA/${idUser}`;
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        idPregunta: idPregunta,
        respuestaIA: respuestaIA,
        respuestaUser: respuestaUser,
        nota: nota
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => (console.error('Error:', error)))
      .then(response => (
        console.log('Respuesta guardada:', response),
        respuesta = response)
      )
    return respuesta
  }
 
}

// export const guardarRespuestaIA = async (id, idPregunta, respuestaIA, respuestaUser, nota, idUser) => {
//   const url = `${urlserver}/crearRespuestaIA/${idUser}`;

//   let respuesta = {};

//   await fetch(url, {
//     method: 'POST',
//     body: JSON.stringify({
//       id: id,
//       idPregunta: idPregunta,
//       respuestaIA: respuestaIA,
//       respuestaUser: respuestaUser,
//       nota: nota
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }).then(res => res.json())
//     .catch(error => console.error('Error:', error))
//     .then(response => {
//       if (response.status === 'existing') {
//         // El registro ya existe, puedes manejar la actualización en el servidor
//         return fetch(`${urlserver}/actualizarRespuestaIA/${idUser}`, {
//           method: 'PUT',
//           body: JSON.stringify({
//             id: id,
//             idPregunta: idPregunta,
//             respuestaIA: respuestaIA,
//             respuestaUser: respuestaUser,
//             nota: nota
//           }),
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }).then(res => res.json())
//           .then(updatedResponse => {
//             console.log('Chat modificado:', updatedResponse);
//             respuesta = updatedResponse;
//           });
//       } else {
//         // El registro ha sido creado
//         console.log('Chat creado:', response);
//         respuesta = response;
//       }
//     });

//   return respuesta;
// }
