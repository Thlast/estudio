// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const crearPregunta = (mat, tipo, preg, resp, curso, a,b,c,d, correcta, seccion, titulo, event) => {
    const url = `${urlserver}/preguntas`;
    event.preventDefault();
if(tipo == "Normal") {
  a = null;
  b = null;
  c = null;
  d = null;
  correcta = null
}
    let data = {  
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
curso: curso,
seccion: seccion,
materia: mat,
titulo: titulo

};
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response), alert("Pregunta agregada correctamente"));
}