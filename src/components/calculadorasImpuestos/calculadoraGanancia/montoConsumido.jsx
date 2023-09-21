import style from './cGanancias.module.css'
import { Warning } from './warning'

export const MontoConsumido = ({ liquidacion, totalGananciasGravadas }) => {

  const totalRentas = (totalGananciasGravadas)+ (-(liquidacion?.JPotrosConceptosNoJustificanErogaciones?.total) + (liquidacion?.RentasExentas?.total + liquidacion?.JPBienesRecibidos?.total + liquidacion?.JPGananciasNoImplicanErogaciones?.total + liquidacion?.JPotrosConceptosjustificanErogaciones?.total))
  const montoConsumido = liquidacion?.MontoConsumido?.total
  //const totalRentasGravadas = (liquidacion?.pInicial?.total + liquidacion?.rentas?.total - liquidacion?.pFinal?.total)

  return (
    <div style={{ textAlign: "center" }}>
      <div className={style.contenedorMontoConsumido}>
        <span className={style.contenidoMontoConsumido}
        // id="montoConsumido"
        >
          Monto Consumido
          {montoConsumido <= 0 ? <span style={{ color: "red" }}><Warning />{montoConsumido}</span> : <em>{montoConsumido}</em>}
        </span> =

        <span className={style.contenidoMontoConsumido}
          id="pInicial">
          P. Inicial
          <em>{liquidacion?.pInicial?.total}</em>
        </span> +

        <span className={style.contenidoMontoConsumido}
          id="justificacionPatrimonial">
          JP-Rentas
          <em>{totalRentas}</em>
        </span> -

        <span className={style.contenidoMontoConsumido}
          id="pFinal">
          P. Final
          <em>{liquidacion?.pFinal?.total}</em>
        </span>
      </div>
    </div>
  )
}