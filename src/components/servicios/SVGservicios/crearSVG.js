import { alertasuccess } from "../../alertas";

const urlmongo = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const crearSVG = async (link, linkEditar, capituloId, paraCurso, curso) => {
  const url = `${urlmongo}/crearSVG/${capituloId}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        link: link,
        linkEditar: linkEditar,
        paraCurso: paraCurso,
        curso: curso
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log('SVG agregado:', jsonResponse);
      //alertasuccess('SVG agregado!')
      return jsonResponse;
    } else {
      const errorResponse = await response.json();
      console.error('Error al agregar el SVG:', errorResponse);
      throw new Error(errorResponse.message);
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    throw error;
  }
};
