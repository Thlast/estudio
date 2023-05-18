const urlmongo = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const crearSVG = async (link, linkEditar, capituloId) => {

  const url = `${urlmongo}/crearSVG/${capituloId}`;

  let respuesta = {};

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
        link: link,
        linkEditar: linkEditar
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => (console.error('Error:', error)))
    .then(response => (
      console.log('SVG agregado:', response),
      respuesta = response)
    )
  return respuesta
}