
// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL

import { alertafail, alertasuccess } from "../../alertas";

const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const crearPregunta = async (preguntaCrear, event) => {
    const url = `${urlserver}/preguntas`;
    event.preventDefault();
    let respuesta = {}
    if (preguntaCrear.tipo == "Normal") {
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
        resultado: preguntaCrear.resultado,
        opciones: {
            a: preguntaCrear.a,
            b: preguntaCrear.b,
            c: preguntaCrear.c,
            d: preguntaCrear.d,
        },
        correcta: preguntaCrear.correcta,
        curso: preguntaCrear.curso,
        seccion: preguntaCrear.seccion,
        seccionId: preguntaCrear.seccionId,
        capituloId: preguntaCrear.capituloId,
        titulo: preguntaCrear.titulo,
        examen: preguntaCrear.examen,
        user: preguntaCrear.user
    };

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => (console.error('Error:', error)))
        .then(response => {
            if(response) {
                console.log('Pregunta agregada:', response)
                alertasuccess("Pregunta agregada")
                respuesta = response
            } else {
                alertafail("Error del servidor")
                respuesta = null
            }
        }
        )
    return respuesta
}