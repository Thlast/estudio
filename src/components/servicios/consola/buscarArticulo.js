const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL

export const buscarArticulo = async (ley, articulo) => {
    try {
        const response = await fetch(`${urlserver}/buscarLey/${ley}/${articulo}`);
        const htmlText = await response.text();
        return htmlText;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// export const obtenerLeyCompleta = async (rt) => {
//   const rtEnviar = rt.toLowerCase()
//     try {
//       const response = await fetch(`${urlserver}/obtenerRTCompleta/${rtEnviar}`);
//       const htmlText = await response.text();
//       return htmlText;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   };
