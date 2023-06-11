const urlserver = process.env.REACT_APP_SERVER_PRODUCTION_URL || process.env.REACT_APP_SERVER_LOCAL_URL
  
export const buscarRT = async (rt, id) => {
    try {
      const response = await fetch(`${urlserver}/buscarRT/${rt}/${id}`);
      const htmlText = await response.text();
      return htmlText;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
export const obtenerRTCompleta = async (rt) => {
  const rtEnviar = rt.toLowerCase()
    try {
      const response = await fetch(`${urlserver}/obtenerRTCompleta/${rtEnviar}`);
      const htmlText = await response.text();
      return htmlText;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
export const obtenerAllRT = async (rt) => {

    try {
      const response = await fetch(`${urlserver}/AllRT/`);
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  