// export const encontrarSumasPosibles = (array, target) => {
//   const sumasPosibles = [];
//   let num = 0;

//   const arrayFiltrado = array?.filter(a => {if(target < 0 && a.monto < 0) {return a} else if(target > 0 && a.monto > 0) {return a}});
//   console.log("FILTRADO", arrayFiltrado);

//   const encontrarSumas = (currentSum, index, combination) => {
//     if (currentSum === target) {
//       sumasPosibles.push([...combination]);
//       return;
//     }
// num++
// console.log(num)
//     for (let i = index; i < arrayFiltrado?.length; i++) {
//       const newSum = currentSum + arrayFiltrado[i].monto;

//       if (target + newSum !== 0) {
//       //if (target > 0 && currentSum <= target) {
//         console.log("TARGET POSITIVO", target, currentSum, newSum)

//         encontrarSumas(newSum, i + 1, [...combination, arrayFiltrado[i]]);

//       }
//       // else if (target < 0 && currentSum >= target) {

//       //   encontrarSumas(newSum, i + 1, [...combination, array[i]]);
//       // }
//     }
//   };


//   encontrarSumas(0, 0, []);

//   return sumasPosibles;
// };
//---------------------------------------------------------------------------------------------

export const encontrarSumasPosibles = (array, target, buscandoEnMayor = false) => {
  const sumasPosibles = [];
  let num = 0;

  console.log("BUSCANDO EN MAYOR:", buscandoEnMayor)

  const arrayFiltrado = buscandoEnMayor ? array?.filter(a => {
    if (target < 0 && a.monto < 0 && a.monto >= target) {
      return a
    } else if (target > 0 && a.monto > 0 && a.monto <= target) {
      return a
    }
  })
    : array?.filter(a => {
      if (target < 0 && a.monto < 0 && a.monto >= target) {
        return a
      } else if (target > 0 && a.monto > 0 && a.monto <= target) {
        return a
      }
    })
  //console.log("FILTRADO", arrayFiltrado);

  const encontrarSumas = (currentSum, index, combination) => {
    if (currentSum == target) {

      console.log("COMBINATION", combination, currentSum, target)
      sumasPosibles.push([...combination]);
      return sumasPosibles;
    }
    // if (combination?.length > 0) {
    //   return sumasPosibles
    // }
    //num++
    //console.log(num)
    if (sumasPosibles?.length < 1) {

      for (let i = index; i < arrayFiltrado?.length || currentSum == target || sumasPosibles.length < 0; i++) {
        const newSum = currentSum + arrayFiltrado[i].monto;

        //if (target + newSum !== 0) {
        if (sumasPosibles?.length > 0) {
          return
        } else
          if (target > 0 && currentSum <= target) {
            console.log("TARGET POSITIVO", target, currentSum, newSum)

            encontrarSumas(newSum, i + 1, [...combination, arrayFiltrado[i]]);

          }
          else if (target < 0 && currentSum >= target) {
            console.log("TARGET NEGATIVO", target, currentSum, newSum)

            encontrarSumas(newSum, i + 1, [...combination, arrayFiltrado[i]]);
          }
      }
    }
  };

  if (sumasPosibles?.length < 1) {
    console.log("VUELVO A ITERAR", sumasPosibles)
    encontrarSumas(0, 0, []);
  }

  return sumasPosibles;
};


//---------------------------------------------------------------------------------------------
// export const encontrarSumasPosibles = (array, target) => {
//   const sumasPosibles = [];
//   let num = 0
//   const encontrarSumas = (currentSum, index, combination) => {
//     num++
//     if (currentSum === target) {
//       sumasPosibles.push([...combination]);
//       return;
//     }
//     console.log("SE ITERO ESTE NUMERO DE VECES" + num)
//     console.log(array)

//     for (let i = index; i < array.length; i++) {
//       const newSum = currentSum + array[i].monto;

//       if (target + newSum !== 0) {
//       //if (target > 0 && currentSum <= target) {
//         console.log("TARGET POSITIVO", target, currentSum, newSum)

//         encontrarSumas(newSum, i + 1, [...combination, array[i]]);

//       }
//       // else if (target < 0 && currentSum >= target) {

//       //   encontrarSumas(newSum, i + 1, [...combination, array[i]]);
//       // }
//     }
//   };

//   encontrarSumas(0, 0, []);
//   console.log("SUMAS POSIBLES:" + sumasPosibles)
//   return sumasPosibles;
// };


// export const encontrarSumasPosibles = (array, target) => {
//   const sumasPosibles = [];
//   let num = 0
//   const encontrarSumas = (currentSum, index, combination) => {
//     if (currentSum === target) {
//       sumasPosibles.push([...combination]);
//       return;
//     }
//     num++
//     console.log(num)
//     if (index === array.length || currentSum > target) {
//       return;
//     }

//     // Incluir el elemento actual en la combinación
//     encontrarSumas(currentSum + array[index], index + 1, [...combination, array[index]]);

//     // Excluir el elemento actual de la combinación
//     encontrarSumas(currentSum, index + 1, [...combination]);
//   };

//   encontrarSumas(0, 0, []);

//   return sumasPosibles;
// };
