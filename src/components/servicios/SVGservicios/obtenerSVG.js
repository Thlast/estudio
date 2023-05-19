const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL
const urlmongo = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL


//obtengo el SVG de MONGODB
export const getSVGfromMongo = async (capituloId) => {

    const data = await fetch(`${urlmongo}/diagrams/${capituloId}`)
    return data.json();
}


//con esta funcion obtenemos el diagrama desde Diagrams
export const getSVGfromDiagrams = async (capituloId) => {

    const data = await fetch(`${urlmongo}/elementoG/${capituloId}`)
    return data.text();
}

//obtengo el SVG actualizado
export const actualizarSVG = async (capituloId, diagramsId) => {

    const nuevaData = await getSVGfromDiagrams(capituloId)
    const url = `${urlmongo}/actualizarSVG/${diagramsId}`;

    let resp = {};

    await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            elementoG: nuevaData
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