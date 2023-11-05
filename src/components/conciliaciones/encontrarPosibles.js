export const encontrarSumasPosibles = (array, target) => {
    const sumasPosibles = [];
  
    const encontrarSumas = (currentSum, index, combination) => {
      if (currentSum === target) {
        sumasPosibles.push([...combination]);
        return;
      }
  
      for (let i = index; i < array.length; i++) {
        const newSum = currentSum + array[i].monto;
        if (newSum + target !== 0) {
          encontrarSumas(newSum, i + 1, [...combination, array[i]]);
        }
      }
    };
  
    encontrarSumas(0, 0, []);
  
    return sumasPosibles;
  };
  