// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const modificarPregunta = async (mat, tipo, preg, resp, curso, a,b,c,d, correcta, id, seccion, titulo, event) => {
  const url = `${urlserver}/preguntas/${id}`;
  event.preventDefault();
  if(tipo == "Normal") {
    a = null;
    b = null;
    c = null;
    d = null;
    correcta = null
    }
      let preguntaModificada = {  
      tipo: tipo,
      pregunta: preg,
      respuesta: resp,
      opciones: {
      a: a,
      b: b,
      c: c,
      d: d,
    },
      correcta: correcta,
      seccion: seccion,
      curso: curso,
      materia: mat,
      titulo: titulo
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
    .then(response => console.log('Pregunta modificada:', response), alert("Pregunta modificada correctamente"));
  }
