const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL
const urlmongo = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL


//con esta funcion obtenemos el diagrama desde Diagrams
export const precargarSVG = async (link) => {

    const data = await fetch(`${urlmongo}/procesarPagina?link=${encodeURIComponent(link)}`)
    return
}
