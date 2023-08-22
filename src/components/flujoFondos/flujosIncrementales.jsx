import { FlujosFondos } from "./flujosFondos"

export const FlujosIncrementales = ({ flujosIncrementales, proyectoConMayorTIR, proyectoConMayorVAN }) => {



  return (
    <>

      <FlujosFondos incremental={true} nombre={`Flujos Incrementales: Proyecto ${proyectoConMayorTIR.id}: ${proyectoConMayorTIR.nombre} - Proyecto ${proyectoConMayorVAN.id}:  ${proyectoConMayorVAN.nombre}`} defaultValues={{flujos: flujosIncrementales}} />

    </>
  )
}