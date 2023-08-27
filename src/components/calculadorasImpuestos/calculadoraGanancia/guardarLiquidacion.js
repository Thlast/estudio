import { alertaLimpiarLiquidacion } from "../../alertas";

export const guardarLiquidacionEnLocalStorage = (liquidacion) => {
  try {
    const liquidacionJSON = JSON.stringify(liquidacion);
    localStorage.setItem("liquidacion", liquidacionJSON);
    console.log("Liquidación guardada en localStorage");
  } catch (error) {
    console.error("Error al guardar la liquidación en localStorage:", error);
  }
};

export const obtenerLiquidacionDesdeLocalStorage = () => {
  try {
    const liquidacionJSON = localStorage.getItem("liquidacion");
    if (liquidacionJSON !== null) {
      return JSON.parse(liquidacionJSON);
    }
  } catch (error) {
    console.error("Error al obtener la liquidación desde localStorage:", error);
  }
  return null;
};

export const borrarLiquidacionEnLocalStorage = (limpiarLiquidacion) => {
  try {
    alertaLimpiarLiquidacion(limpiarLiquidacion)

  } catch (error) {
    console.error("Error al borrar los datos de liquidación del localStorage:", error);
  }
};
