const urlserverSQL = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL
  
export const progresoCapitulo = async (capituloId) => {

    const data = await fetch(`${urlserverSQL}/progresoSecciones/${capituloId}`)
    return data.json()
}
