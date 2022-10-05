import { alertamodificada } from "../../alertas";

// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const modificarPregunta = async (datosPregunta, id, event) => {
  const url = `${urlserver}/preguntas/${id}`;
  event.preventDefault();
  if(datosPregunta.tipo == "Normal") {
    datosPregunta.a = null;
    datosPregunta.b = null;
    datosPregunta.c = null;
    datosPregunta.d = null;
    datosPregunta.correcta = null
    }
      let preguntaModificada = {  
      tipo: datosPregunta.tipo,
      pregunta: datosPregunta.preg,
      respuesta: datosPregunta.resp,
      opciones: {
      a: datosPregunta.a,
      b: datosPregunta.b,
      c: datosPregunta.c,
      d: datosPregunta.d,
    },
      correcta: datosPregunta.correcta,
      seccion: datosPregunta.seccion,
      curso: datosPregunta.curso,
      materia: datosPregunta.mat,
      titulo: datosPregunta.titulo
    };
      console.log(preguntaModificada, typeof id)
      fetch(url, {
      method: 'PUT',
      body: JSON.stringify(preguntaModificada),
      headers:{
      'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Pregunta modificada:', response), alertamodificada());
  }
