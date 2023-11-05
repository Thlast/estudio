export const evaluarCombinaciones = (combinaciones, seleccionadosMayor, seleccionadosResumen, target) => {
  const seleccionadosSetMayor = (seleccionadosMayor.map((element) => element.debe - element.haber));
  const seleccionadosSetResumen = (seleccionadosResumen.map((element) => element.debe - element.haber));
  const seleccionadosSet = seleccionadosSetMayor.concat(seleccionadosSetResumen)
  const seleccionadosSetTotal = seleccionadosMayor.concat(seleccionadosResumen)
  const factor = 0.1; // 10%
  console.log("LOS SELECCIONADOS", seleccionadosSet)

  return combinaciones.map((combinacion) => {
    let puntuacion = 0.5;
    if (!Number.isInteger(target)) {
      puntuacion = 0.6
    }

    // Recorre los elementos de la combinación y verifica si coinciden con los seleccionados
    for (const elemento of combinacion) {
      //console.log(elemento)
      let coincidencias = 0
      seleccionadosSetTotal?.map(t => {
        if (((t.debe - t.haber) == elemento.monto)) {
          //console.log("Extractos", elemento.extracto, t.extracto, new Date(elemento.fecha) - t.fecha, typeof new Date(elemento.fecha))
          // const diferenciaEnMilisegundos = new Date(elemento.fecha) - new Date(t.fecha);
          // const diferenciaEnDias = (diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
          // console.log("diferecnai", diferenciaEnDias, t.fecha, elemento.fecha)
          coincidencias += 1;
          // if (elemento.extracto == "resumen" && t.extracto == "mayor" && diferenciaEnDias <= 5) {
          //   //console.log("LA FECHA", new Date(new Date(t.fecha)) - new Date(elemento.fecha))
          //   coincidencias += 1;
          // } else if (elemento.extracto == "mayor" && t.extracto == "resumen" && diferenciaEnDias <= 5) {
          //   coincidencias += 1;
          // }
        }
      })
      if (coincidencias > 0) {
        puntuacion *= (1 + factor)
      } else {
        puntuacion *= (1 - factor)
      }
    }
    // for (const elemento of combinacion) {
    //   //console.log(elemento)
    //   if ((seleccionadosSet.includes(elemento.monto))) {
    //     puntuacion += factor; // Suma un 10% si coincide
    //   } else {
    //     puntuacion -= factor; // Resta un 10% si no coincide
    //   }
    // }

    return { combinaciones: [...combinacion], puntuacion };
  });

}