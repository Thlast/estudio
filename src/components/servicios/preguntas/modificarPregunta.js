import { alertasuccess } from "../../alertas";

// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const modificarPregunta = async (datosPregunta, id, event) => {
  const url = `${urlserver}/preguntas/${id}`;
  event.preventDefault();
  let respuesta = {}
  if(datosPregunta.tipo == "Normal") {
    datosPregunta.a = null;
    datosPregunta.b = null;
    datosPregunta.c = null;
    datosPregunta.d = null;
    datosPregunta.correcta = null
    }
      let preguntaModificada = {  
      tipo: datosPregunta.tipo,
      pregunta: datosPregunta.pregunta,
      respuesta: datosPregunta.respuesta,
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


  export const anexarExamen = async (examenid, id) => {
    const url = `${urlserver}/preguntas/anexarexamen/${id}`;
    // event.preventDefault();
    let respuesta = {}
    
    let preguntaModificada = {  
        examenes: examenid
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
        alertasuccess("Pregunta agregada correctamente al examen"),
        respuesta = response)
        )
        return respuesta
    }
    

    export const desanexarExamen = async (examenid, id) => {
      const url = `${urlserver}/preguntas/exa/desanexarexamen/${id}`;
      // event.preventDefault();
      let respuesta = {}
      
      let preguntaModificada = {  
          examenes: examenid
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
          alertasuccess("Pregunta quitada correctamente del examen"),
          respuesta = response)
          )
          return respuesta
      }