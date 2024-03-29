
const urlserverSQL = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL
  
export const buscarValorSQL = async (curso, valor, page, limit) => {

    const data = await fetch(`${urlserverSQL}/buscarseccion/${curso}/${valor}`)
    return data.json()
  
}

export const buscarConsolaSQL = async (curso, valor) => {

    const data = await fetch(`${urlserverSQL}/buscarseccionConsola/${curso}/${valor}`)
    return data.json()
  
}