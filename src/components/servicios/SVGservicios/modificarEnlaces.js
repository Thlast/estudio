const urlmongo = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const actualizarSVGEnlace = async (link, linkEditar, diagramsId) => {

    //const nuevaData = await getSVGfromDiagrams(capituloId)
    const url = `${urlmongo}/actualizarSVGEnlace/${diagramsId}`;

    let resp = {};

    await fetch(url, {
        method: 'PUT',
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
            console.log('SVG actualizado:', response),
            resp = response)
        )
    return resp
}