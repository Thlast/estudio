import { useEffect, useState } from 'react'
import style from './cGanancias.module.css'

export const JPfilas = ({ id, concepto, isColumnI, importe }) => {


  return (
    <>
      <div
        className={style.columnaConcepto}
        id={id !== "ResultadoImpositivo" && id !== "MontoConsumido" ? id : null}
        type="text"
      >{concepto}</div>

      <input
        className={isColumnI ? null : style.columnaDesactivada}
        value={id !== "ResultadoImpositivo" ? isColumnI ? importe : null : importe > 0 ? null : -importe}
        readOnly
        type="number"
        step="any"
      />
      <input
        className={isColumnI ? style.columnaDesactivada : null}
        value={id !== "ResultadoImpositivo" ? isColumnI ? null : importe : importe > 0 ? importe : null}
        readOnly
        type="number"
        step="any"
      />
    </>

  )
}