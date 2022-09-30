// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const eliminarPregunta = async (id) => {
  const url = `${urlserver}/preguntas/${id}`;

fetch(url, {
    method: 'DELETE', 
  })
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Pregunta eliminada', response), alert("Pregunta eliminada correctamente")
);
}