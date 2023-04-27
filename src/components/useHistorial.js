import {useState} from "react";

export const useHistorial = (materias) => {

  const [historial, setHistorial] = useState(materias);

  const agregar = (i, indiceMateria) => { 
    if(historial[indiceMateria].indexOf(i) === -1) {
      const historialNuevo = [...historial.slice(0, indiceMateria), historial[indiceMateria].concat(i), ...historial.slice(indiceMateria+1)];
    setHistorial(historialNuevo)}
  }

  const reiniciarh = (current, indiceMateria) => {
    const nuevoHistorial = [...historial]; // crear una copia del arreglo historial
    nuevoHistorial[indiceMateria] = [current]; // actualizar el elemento en el índice indiceMateria
    setHistorial(nuevoHistorial); // actualizar el estado del componente con el nuevo arreglo
  }

  return {
    historial,
    agregar,
    reiniciarh
  }
}