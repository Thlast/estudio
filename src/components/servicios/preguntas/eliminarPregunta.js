// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || "http://192.168.0.15:4000"

export const eliminarPregunta = async (id) => {
  const url = `${urlserver}/preguntas/${id}`;

fetch(url, {
    method: 'DELETE', 
  })
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => alert("Pregunta eliminada correctamente"), 
  console.log('Pregunta eliminada'),
);
}