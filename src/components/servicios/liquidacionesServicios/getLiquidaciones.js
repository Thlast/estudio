const urlmongo = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const getLiquidacion = async (idLiquidacion) => {

    const data = await fetch(`${urlmongo}/liquidaciones/${idLiquidacion}`)
    return data.json();
}