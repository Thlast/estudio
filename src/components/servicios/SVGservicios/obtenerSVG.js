const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL
const urlmongo = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL


//obtengo el SVG de MONGODB
export const getSVGfromMongoArchivoFijo = async (capituloId, curso) => {

    const data = await fetch(`${urlmongo}/diagramsArchivoFijo/${curso}/${capituloId}`)
    return data.json();
}
export const getSVGfromMongo = async (capituloId, curso) => {

    const data = await fetch(`${urlmongo}/diagrams/${curso}/${capituloId}`)
    return data.json();
}
export const getSVGCursofromMongo = async (curso) => {

    const data = await fetch(`${urlmongo}/diagramsCurso/${curso}`)
    return data.json();
}

//con esta funcion obtenemos el diagrama desde Diagrams
export const getSVGfromDiagrams = async (diagramId) => {
    try {
      const response = await fetch(`${urlmongo}/elementoG/${diagramId}`);
  
      if (!response.ok) {
        throw new Error(`Error al obtener el SVG. Código de estado: ${response.status}`);
      }
  
      return response.text();
    } catch (error) {
      // Manejar el error
      console.error("Error al obtener el SVG:", error);
      // Puedes lanzar una excepción para propagar el error si es necesario
      throw error;
    }
  };
  

//obtengo el SVG actualizado
export const actualizarSVG = async (diagramsId, nuevaData) => {
    const url = `${urlmongo}/actualizarSVG/${diagramsId}`;
  
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
          elementoG: nuevaData
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud de actualización del SVG.');
      }
  
      const data = await response.json();
      console.log('SVG actualizado:', data);
      return data;
    } catch (error) {
      console.error('Error al actualizar el SVG:', error);
      // Realizar acciones adicionales en caso de error, si es necesario
      throw error; // Opcionalmente, relanzar el error para que pueda ser manejado en el llamador de la función
    }
  };
  