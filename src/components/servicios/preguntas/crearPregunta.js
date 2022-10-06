
// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL

import { alertasuccess } from "../../alertas";

const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const crearPregunta = (preguntaCrear, event) => {
    const url = `${urlserver}/preguntas`;
    event.preventDefault();

if(preguntaCrear.tipo == "Normal") {
preguntaCrear.a = null;
preguntaCrear.b = null;
preguntaCrear.c = null;
preguntaCrear.d = null;
preguntaCrear.correcta = null
}
    let data = {  
tipo: preguntaCrear.tipo,
pregunta: preguntaCrear.preg,
respuesta: preguntaCrear.resp,
opciones: {
  a: preguntaCrear.a,
  b: preguntaCrear.b,
  c: preguntaCrear.c,
  d: preguntaCrear.d,
},
correcta: preguntaCrear.correcta,
curso: preguntaCrear.curso,
seccion: preguntaCrear.seccion,
titulo: preguntaCrear.titulo,
examen: preguntaCrear.examen,
user: preguntaCrear.user
};
console.log(data)
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => (console.error('Error:', error)))
    .then(response => console.log('Success:', response), alertasuccess("Pregunta agregada"));
}