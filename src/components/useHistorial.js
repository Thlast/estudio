import {useState} from "react";

export const useHistorial = () => {

  const [historial, setHistorial] = useState([0]);
  const agregar = (i) => { 
    if(historial.indexOf(i) === -1) {
    setHistorial(historial.concat(i))}
  }

const reiniciarh = (current) => setHistorial([current])

  return {
    historial,
    agregar,
    reiniciarh
  }
}