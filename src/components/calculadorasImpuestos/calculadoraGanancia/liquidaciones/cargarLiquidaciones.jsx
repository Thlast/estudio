import { getLiquidacion } from "../../../servicios/liquidacionesServicios/getLiquidaciones"


export const CargarLiquidaciones = ({obtenerLiquidacion}) => {


  return (
    <>
    <button onClick={() => obtenerLiquidacion()}>
      Resolucion Ejercicio 1
      </button>
    </>
  )
}