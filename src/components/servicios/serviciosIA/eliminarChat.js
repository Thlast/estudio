import { alertafail } from "../../alertas";

// const urlserver = process.env.REACT_APP_SERVER_LOCAL_URL
const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const eliminarChat = async (idChat) => {
  const url = `${urlserver}/eliminarChat/${idChat}`;

fetch(url, {
    method: 'DELETE', 
    headers:{
      'Content-Type': 'application/json'
  }
  })
  .then(res => res.text())
  .catch(error => {console.error('Error:', error)})
  .then(data => console.log('Chat eliminado', data), alertafail("Chat eliminado")
  
  );
}
export const eliminarMessages = async (idChat) => {
  const url = `${urlserver}/eliminarMessages/${idChat}`;

fetch(url, {
    method: 'DELETE', 
    headers:{
      'Content-Type': 'application/json'
  }
  })
  .then(res => res.text())
  .catch(error => {console.error('Error:', error)})
  .then(data => console.log('Messages eliminados', data)
  
  );
}