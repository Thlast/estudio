import { useEffect, useRef, useState } from 'react'
import { JPfilas } from './JPfilas'
import style from './cGanancias.module.css'

export const JPatrimonial = ({ totalGananciasGravadas, liquidacion, funcionLiquidar }) => {

  const [totalColumnaI, setTotalColumnaI] = useState(liquidacion?.TotalColumnaI?.total + liquidacion?.MontoConsumido?.total)
  const [totalColumnaII, setTotalColumnaII] = useState(liquidacion?.TotalColumnaII?.total)
  const montoConsumido = liquidacion?.MontoConsumido?.total

  const jpRef = useRef()

  useEffect(() => {
    funcionLiquidar(jpRef)
  }, [])

  return (
    <div
      ref={jpRef}
      className={style.justificacionPatrimonial}>
      <h6>Justificación Patrimonial</h6>
      <h6>Columna I (Aplicación de fondos)</h6>
      <h6>Columna II (Origen de fondos)</h6>
      <div
        className={style.columnaConcepto}
        type="text"
      >Monto Consumido</div>

      <input
        value={montoConsumido}
        disabled
        // onChange={handleChangeImporte}
        type="number"
        step="any"
      />
      <input
        className={style.columnaDesactivada}
        disabled
        type="number"
        step="any"
      />

      {liquidacion?.justificacionPatrimonial?.justificacionPatrimonial?.map(jp => {
        return (
          <JPfilas id={jp?.id} concepto={jp?.nombre} isColumnI={jp?.isColumnI} importe={liquidacion?.[jp?.id]?.total} />
        )
      })}
      <div>Totales</div><div>{(totalColumnaI) + (liquidacion?.ResultadoImpositivo?.total < 0 ? liquidacion?.ResultadoImpositivo?.total : 0)}</div><div>{totalColumnaII + (liquidacion?.ResultadoImpositivo?.total > 0 ? liquidacion?.ResultadoImpositivo?.total : 0)}</div>
    </div>
  )
}