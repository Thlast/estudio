export function convertirFecha(fecha) {
    //const fechaActual = new Date();
    const [dia, mes, año] = fecha.split('/');
    //const año = fechaActual.getFullYear(); // Suponiendo que deseas usar el año actual
    
    const fechaConvertida = new Date(`${año}-${mes}-${dia}`);
    //console.log(fechaConvertida)
    return fechaConvertida;
  }