import { alertaeliminada } from "../../alertas";

// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const eliminarPregunta = async (id) => {
  const url = `${urlserver}/preguntas/${id}`;

fetch(url, {
    method: 'DELETE', 
    headers:{
      'Content-Type': 'application/json'
  }
  })
  .then(res => res.text())
  .catch(error => {console.error('Error:', error)})
  .then(data => console.log('Pregunta eliminada', data), alertaeliminada()
  
  );
}