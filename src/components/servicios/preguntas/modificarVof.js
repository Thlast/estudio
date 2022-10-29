import { alertasuccess } from "../../alertas";

// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const serverModificarVof = async (user, enunciado, datosPregunta, id, event) => {
  const url = `${urlserver}/preguntas/${id}`;
  event.preventDefault();
  let respuesta = {}
  
    let preguntaModificada = {  
      pregunta: enunciado,
      tipo: "vof",
      arrayPreguntas: datosPregunta,
      user: user
  };
    // console.log(preguntaModificada, typeof id)

    await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(preguntaModificada),
    headers:{
    'Content-Type': 'application/json'
  }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => 
    (console.log('Pregunta modificada:', response), 
    alertasuccess("Pregunta modificada"),
    respuesta = response)
    )
    return respuesta
}
