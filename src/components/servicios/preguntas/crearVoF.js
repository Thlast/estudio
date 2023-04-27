
// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL

import { alertasuccess } from "../../alertas";

const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const crearVoF = async (user, enunciado, preguntaCrear, curso, seccion, seccionId, capituloId, titulo, examenid, event) => {
    const url = `${urlserver}/preguntas`;
    event.preventDefault();
let respuesta = {}

let data = {  
pregunta: enunciado,
tipo: "vof",
arrayPreguntas: preguntaCrear,
curso: curso,
seccion: seccion,
seccionId: seccionId,
capituloId: capituloId,
titulo: titulo,
examen: examenid,
user: user
};
console.log(data)
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => (console.error('Error:', error)))
    .then(response => (
        console.log('Pregunta agregada:', response), 
        alertasuccess("Pregunta agregada"),
        respuesta = response)
        )
    return respuesta
}