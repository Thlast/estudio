import { alertafail } from "../../alertas";

// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const eliminarNota = async (id) => {
  const url = `${urlserver}/eliminarNota/${id}`;

fetch(url, {
    method: 'DELETE', 
    headers:{
      'Content-Type': 'application/json'
  }
  })
  .then(res => res.text())
  .catch(error => {console.error('Error:', error)})
  .then(data => console.log('Nota eliminada', data), alertafail("Pregunta eliminada")
  
  );
}