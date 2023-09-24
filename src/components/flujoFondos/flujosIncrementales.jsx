import { irr, npv } from "financial"
import { FlujosFondos } from "./flujosFondos"
import LineChart from "./grafico"
import { useEffect, useState } from "react"

export const FlujosIncrementales = ({ flujosIncrementales, proyectoConMayorTIR, proyectoConMayorVAN }) => {

  const [valoresVan, setValoresVan] = useState()
  const tasaIncremental = irr(flujosIncrementales.map((f) => f.flujo))

  const porcentajes = [0.25, 0.5, 1, 1.5, 1.75]
  const calcularDiferentesVAN = () => {
    const valoresVAN = [{
      tasa: proyectoConMayorTIR.tir.toFixed(2),
      proyectoConMayorTIR: npv(proyectoConMayorTIR.tir, proyectoConMayorTIR.flujos.map((f) => f.flujo)).toFixed(2),
      proyectoConMayorVAN: npv(proyectoConMayorTIR.tir, proyectoConMayorVAN.flujos.map((f) => f.flujo)).toFixed(2)
    }, {
      tasa: proyectoConMayorVAN.tir.toFixed(2),
      proyectoConMayorTIR: npv(proyectoConMayorVAN.tir, proyectoConMayorTIR.flujos.map((f) => f.flujo)).toFixed(2),
      proyectoConMayorVAN: npv(proyectoConMayorVAN.tir, proyectoConMayorVAN.flujos.map((f) => f.flujo)).toFixed(2)
    }];

    for (const porcentaje of porcentajes) {
      const tasa = tasaIncremental * porcentaje;

      const vanTIR = npv(tasa, proyectoConMayorTIR.flujos.map((f) => f.flujo)).toFixed(2);
      const vanVAN = npv(tasa, proyectoConMayorVAN.flujos.map((f) => f.flujo)).toFixed(2);

      valoresVAN.push({
        tasa: Math.round(tasa * 100) / 100,
        proyectoConMayorTIR: vanTIR,
        proyectoConMayorVAN: vanVAN
      });
    }

    valoresVAN.sort((a, b) => a.tasa - b.tasa);

    return valoresVAN;
  };

  useEffect(() => {
    setValoresVan(calcularDiferentesVAN())
  }, [flujosIncrementales])

  return (
    <>
      <FlujosFondos incremental={true} nombre={`Flujos Incrementales: Proyecto ${proyectoConMayorTIR.id}: ${proyectoConMayorTIR.nombre} - Proyecto ${proyectoConMayorVAN.id}:  ${proyectoConMayorVAN.nombre}`} defaultValues={{ flujos: flujosIncrementales }} />
      <table border="1">
        <thead>
          <tr>
            <th>Tasa Exigida</th>
            <th>VAN Proyecto {proyectoConMayorTIR.id}: {proyectoConMayorTIR.nombre}</th>
            <th>VAN Proyecto {proyectoConMayorVAN.id}: {proyectoConMayorVAN.nombre}</th>
          </tr>
        </thead>
        <tbody>
          {valoresVan?.map(v => {
            return (
              <tr>
                <td className={v.tasa == tasaIncremental.toFixed(2) ? "encontrarSeccion" : null}>{v.tasa}</td>
                <td>{v.proyectoConMayorTIR}</td>
                <td>{v.proyectoConMayorVAN}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <LineChart datos={valoresVan} />
    </>
  )
}