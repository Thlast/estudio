import style from '../modulos-css/calcPrestamos.module.css'
import React, {useState} from 'react';
import { irr } from 'financial'

export const Prestamos = () => {

    const [qcuotas, setQcuotas] = useState()
    const [monto, setMonto] = useState(0)
    const [interes, setInteres] = useState()
    const [iva, setIva] = useState("si")
    const columns = []
    const [cuadro, setCuadro] = useState()
    let iTotal = 0
    let aTotal = 0
    const [interesTotal, setInteresTotal] = useState(iTotal)
    const [abonadoTotal, setAbonadoTotal] = useState(aTotal)
    const flujos = [parseInt(-monto)]
    const [costoFinanciero, setCostoFinanciero] = useState(0)
    let ivaAcumulado = 0
    const [ivaTotal, setIvaTotal] = useState(iTotal)
    const [sistema, setSistema] = useState("frances")
  
    const calcularCuadro = async (inicial, interes, cuotas, iva, e) => {
      e.preventDefault()
      let montoCalcular = inicial
      let interesCalcular = interes
  
      for (let i = 1; i <= cuotas; i++) {
        await calcularValorCuota(montoCalcular, interesCalcular, iva, i ).then(res => montoCalcular = res)
    
      }
      setCuadro(columns)
      setAbonadoTotal(aTotal)
      setInteresTotal(iTotal)
      setIvaTotal(ivaAcumulado)
      setCostoFinanciero(irr(flujos))

    }
  
    const calcularValorCuota = async (inicial, interes, iva, cuota) => {
      const tasainteres = (interes/100)/12
      const interescalculado = inicial * tasainteres
      const r1 = (tasainteres/(Math.pow((1+tasainteres), qcuotas) -1))*monto
      let amortizacioncalculada = 0
      let ivacalculado = 0
      switch(sistema) {
        case "frances": if(cuota == 1) {
          amortizacioncalculada = r1
        } else {
          amortizacioncalculada = r1 *Math.pow((1+tasainteres), cuota-1)
        }; break;
        case "aleman": amortizacioncalculada = monto/qcuotas
      }
      
  
      if(iva === "si") {
        ivacalculado = interescalculado * 0.21
      } else if(iva === "no") {
        ivacalculado = 0
      }
  
      const totalcuota = amortizacioncalculada + interescalculado + ivacalculado
      const resultado = inicial - amortizacioncalculada
      columns.push({cuota: cuota, inicial: inicial, interes: interescalculado, ivacalculado: ivacalculado, amortizacion: amortizacioncalculada, totalcuota: totalcuota, deudafinal: resultado})
      aTotal += totalcuota
      iTotal += interescalculado
      ivaAcumulado += ivacalculado
      flujos.push(totalcuota)
      return resultado
    }
  
    return (
      <div className='menuContenedor'>
      <div className={style.contenedorprestamos}>
        <header>
          <div className={style.prestamoshead}>
            <form
            className={style.contenedorinput}
            onSubmit={(e) => calcularCuadro(monto, interes, qcuotas, iva, e)}>
              <label>
              <span>Sistema: </span>
              <select
              onChange={(e) => setSistema(e.target.value)}
              value={sistema}>
                <option
                value="frances"
                selected>
                  Francés
                </option>
                <option
                value="aleman">
                  Alemán
                </option>
              </select>
              </label>
              <label>
             
                Monto inicial:  
                <span className={style.inputprestamo}>
              <input required onChange={(e) => setMonto(e.target.value)} min={0} value={monto} type="number" />
              $</span>
              </label>
              <label>
                
                  Tasa (TNA): 
                  <span className={style.inputprestamo}>
              <input required onChange={(e) => setInteres(e.target.value)} min={0} value={interes} type="number" step="any" />
              %</span>
              </label>
              <label>
              <span>Cuotas: </span>
              <span className={style.inputprestamo}>
              <input required max={600} onChange={(e) => setQcuotas(e.target.value)} min={0} value={qcuotas} type="number" />
              </span>
              </label>
              <label>
              <span>IVA: </span>
              <select onChange={(e) => setIva(e.target.value)} value={iva} type="" >
                <option
                value={"si"}>
                  Si
                </option>
                <option
                value={"no"}>
                  No
                </option>
                </select>
              </label>
              <button>
                Enviar
              </button>
            </form>
            
            <div className={style.contenedorinput}>
            <span>Tasas equivalentes:</span>
            {interes ?
            <div className={style.equivalencias}>
              <span>TNA: {(interes).toLocaleString('de-DE')}%</span>
              <span>TEA: {((Math.pow((1+ interes/100/12), 12)-1)*100).toLocaleString('de-DE')}%</span>
              <span>TEM: {(interes/100/12*100).toLocaleString('de-DE')}%</span>
              </div>
            : null
            }
            </div>
          </div>
          <div className={style.cuadroamortizacion}>
          <table>
          <td
          style={{width: "40px"}}>
            Nº cuotas</td>
          <td>Deuda</td>
          <td>Amortizacion</td>
          <td>Interes</td>
          <td>IVA</td>
          <td>Total Cuota</td>
          <td>Saldo de la Deuda</td>
          {cuadro ? cuadro.map((a, num) => {
            return (
              <tr key={num}>
              <td>{Math.round(a.cuota, -2).toLocaleString('de-DE')}</td>
              <td>{Math.round(a.inicial, -2).toLocaleString('de-DE')}</td>
              <td>{Math.round(a.amortizacion, -2).toLocaleString('de-DE')}</td>
              <td>{Math.round(a.interes, 2).toLocaleString('de-DE')}</td>
              <td>{Math.round(a.ivacalculado, -2).toLocaleString('de-DE')}</td>
              <td>{Math.round(a.totalcuota, -2).toLocaleString('de-DE')}</td>
              <td>{Math.round(a.deudafinal, -2).toLocaleString('de-DE')}</td>
              </tr>
            )
          })
       : null
        }
        <tr>
        <td>Totales</td>
        <td></td>
        <td>{(monto *1).toLocaleString('de-DE')}</td>
        <td>{Math.round(interesTotal).toLocaleString('de-DE')}</td>
        <td>{Math.round(ivaTotal).toLocaleString('de-DE')}</td>
        <td>{Math.round(abonadoTotal).toLocaleString('de-DE')}</td>
        <td></td>
        </tr>
        </table>
        </div>
        <div className={style.resumencontainer}>
          <p>Resumen:</p>
          <p>Monto solicitado: ${Math.round(monto).toLocaleString('de-DE')} a una TNA de {interes}% a cancelar en {qcuotas} meses con un sistema de amortización {sistema}:</p>
          <div
          className={style.cuadroresumen}>
          <p className={style.cuadroresumenelementos}>Saldo total a abonar:<span>${Math.round(abonadoTotal).toLocaleString('de-DE')}</span></p>
          <hr></hr>
          <p className={style.cuadroresumenelementos}>Total intereses: <span>${Math.round(interesTotal).toLocaleString('de-DE')}</span></p>
          <hr></hr>
          <p className={style.cuadroresumenelementos}>Total IVA: <span>${Math.round(ivaTotal).toLocaleString('de-DE')}</span></p>
          <hr></hr>
        <p className={style.cuadroresumenelementos}>
        El costo financiero total mensual es:<span> {(costoFinanciero * 100).toLocaleString('de-DE')} %</span>
        </p>
        <hr></hr>
        <p className={style.cuadroresumenelementos}>
        El costo financiero total anual es:<span> {((Math.pow(1 + costoFinanciero, 12)-1)*100).toLocaleString('de-DE')} %</span>
        </p>
        </div>
        </div>
        </header>
      </div>
      </div>
    );
  }