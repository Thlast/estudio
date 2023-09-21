import { useEffect, useRef, useState } from 'react'
import style from './cGanancias.module.css'
import { Liquidador } from './liquidador'
import { guardarLiquidacionEnLocalStorage, obtenerLiquidacionDesdeLocalStorage, borrarLiquidacionEnLocalStorage } from './guardarLiquidacion'
import { liquidacionInicialDefault } from './liquidacionInicial'
import { EscalaValores } from './escalaValores'
import { Warning } from './warning'
import { MontoConsumido } from './montoConsumido'
import { getLiquidacion } from '../../servicios/liquidacionesServicios/getLiquidaciones'
import { Ejercicios } from './ejercicios/ejercicios'
const CalculadoraGanancias = () => {

  const liquidacionInicial = obtenerLiquidacionDesdeLocalStorage();
  const [liquidacion, setLiquidacion] = useState(liquidacionInicial || liquidacionInicialDefault)
  const [liquidando, setLiquidando] = useState(false)
  const [topeDonacion, setTopeDonacion] = useState(0)
  const [enLiquidacion, setEnLiquidacion] = useState()
  const gRef = useRef(null)

  const obtenerLiquidacion = () => {
    getLiquidacion("650b525f91183df5caa3ba46").then(data => {
      setLiquidacion(data[0])
    })
  }

  useEffect(() => {
    guardarLiquidacionEnLocalStorage(liquidacion)
  }, [liquidacion])

  const funcionLiquidar = (referencia) => {

    const gElement = referencia?.current;
    const elements = gElement?.querySelectorAll('[id]');

    for (let i = 0; i < elements?.length; i++) {
      elements[i].classList.add("remarcarSecciones")
      elements[i].onclick = function () {
        setLiquidando(true)
        setEnLiquidacion(elements[i].id)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // pasarSeccionId(elements[i].id);
      }
    }
  }
  useEffect(() => {
    funcionLiquidar(gRef)
  }, [])

  const cancelar = () => {
    setLiquidando(false)
  }

  const limpiarLiquidacion = () => {
    setLiquidacion(JSON.parse(JSON.stringify(liquidacionInicialDefault)));
  };


  const borrarLiquidacion = () => {
    // console.log(liquidacionInicialDefault)
    borrarLiquidacionEnLocalStorage(limpiarLiquidacion)
  }

  const absorberGanancia = (ganancia, deduccion) => {
    if (ganancia > deduccion) {
      return (ganancia - deduccion)
    } else {
      return 0
    }
  }
  //FUENTE ARGENTINA
  const sumaGananciasFA = (liquidacion?.G1FA?.total || 0) + (liquidacion?.G2FA?.total || 0) + (liquidacion?.G3FA?.total || 0) + (liquidacion?.G4FA?.total || 0)

  const gnDeduccionesGenerales = (sumaGananciasFA - (liquidacion?.DeduccionesGenerales?.total || 0))
  const remanenteDeduccionesGenerales = (sumaGananciasFA - (liquidacion?.DeduccionesGenerales?.total || 0)) < 0 ? (sumaGananciasFA - (liquidacion?.DeduccionesGenerales?.total || 0)) : 0 //REMANENTE DE LAS DEDUCCIONES GENERALES VAN PARA FUENTE EXTRANJERA
  const gnDeduccionesGeneralesConLimite = gnDeduccionesGenerales - (liquidacion?.DeduccionesGeneralesConLimite?.total || 0)

  const gnQuebrantos = absorberGanancia(gnDeduccionesGeneralesConLimite, (liquidacion?.QuebrantosAnteriores?.total || 0))
  const articulo30 = (liquidacion?.GananciaNoImponible?.total || 0) + (liquidacion?.Cargasdefamilia?.total || 0) + (liquidacion?.DeducciónEspecial?.total || 0)
  const utilizadoGNI = gnQuebrantos > liquidacion?.GananciaNoImponible?.total ? liquidacion?.GananciaNoImponible?.total : gnQuebrantos
  const utilizadoFamilia = (gnQuebrantos - utilizadoGNI) >= liquidacion?.Cargasdefamilia?.total ? liquidacion?.Cargasdefamilia?.total : (gnQuebrantos - utilizadoGNI)
  const utilizadoEspecial = (gnQuebrantos - utilizadoGNI - utilizadoFamilia) >= liquidacion?.DeducciónEspecial?.total ? liquidacion?.DeducciónEspecial?.total : (gnQuebrantos - utilizadoGNI - utilizadoFamilia)
  const gnFA = absorberGanancia(gnQuebrantos, articulo30)

  const remanenteDeduccionesPersonales = (gnQuebrantos - articulo30 + (liquidacion?.DeducciónEspecial?.total || 0)) < 0 ? -(gnQuebrantos - articulo30 + (liquidacion?.DeducciónEspecial?.total || 0)) : 0 //REMANENTE DE LAS DEDUCCIONES GENERALES VAN PARA FUENTE EXTRANJERA

  //FUENTE EXTRANJERA ACCIONES E INMUELBES
  const accionesFE = (liquidacion?.accionesFE?.total || 0)
  const inmueblesFE = (liquidacion?.inmueblesFE?.total || 0)
  const totalFEEspecifico = (accionesFE + inmueblesFE)
  const especificoFADespuesdeDG = (totalFEEspecifico - liquidacion?.deduccionesGeneralesFEespecifico?.total)
  const especificoFADespuesdeQuebrantos = absorberGanancia(especificoFADespuesdeDG, liquidacion?.quebrantosEspecificosFE?.total)
  const quebrantoFEespecifico = especificoFADespuesdeDG < 0 ? (-especificoFADespuesdeDG) : null

  /////

  //  QUEBRANTOS
  const quebrantoFA = gnDeduccionesGeneralesConLimite < 0 ? (-gnDeduccionesGeneralesConLimite) : null
  const excedenteQuebrantoFA = quebrantoFA > 0 ? liquidacion?.QuebrantosAnteriores?.total : (liquidacion?.QuebrantosAnteriores?.total > gnDeduccionesGeneralesConLimite) ? (liquidacion?.QuebrantosAnteriores?.total - gnDeduccionesGeneralesConLimite) : null

  ////////

  //FUENTE EXTRANJERA
  const sumaGananciasFE = (liquidacion?.G1FE?.total || 0) + (liquidacion?.G2FE?.total || 0) + (liquidacion?.G3FE?.total || 0) + (liquidacion?.G4FE?.total || 0)
  const gnDeduccionesGeneralesFE = (sumaGananciasFE - (liquidacion?.DeduccionesGeneralesFE?.total || 0))

  // const excedenteQuebrantoFE = gnDeduccionesGeneralesFE < liquidacion?.QuebrantosAnterioresFE?.total ? liquidacion?.QuebrantosAnterioresFE?.total : (gnDeduccionesGeneralesFE - liquidacion?.QuebrantosAnterioresFE?.total)


  const quebrantoFE = gnDeduccionesGeneralesFE < 0 ? (-gnDeduccionesGeneralesFE) : null

  const articulo30FE = remanenteDeduccionesPersonales
  ////UTILIZACION DE QUEBRANTOS
  const quebrantoFAUtilizadoFE = //SI TENGO REMANENTE DE DS PERSONALES NO CONVIENE UTILIZAR EL QUEBRANTO
    (gnDeduccionesGeneralesFE - (liquidacion?.QuebrantosAnterioresFE?.total + remanenteDeduccionesPersonales)) > quebrantoFA ? //SI LA GANANCIA ES MAYOR AL QUEBRANTO USO TODO EL QUEBRANTO
      quebrantoFA : gnDeduccionesGeneralesFE > 0 ? //SI DA MENOR TENGO QUE VER SI HAY QUEBRANTO EN EL EJERCICIO
        absorberGanancia(gnDeduccionesGeneralesFE, (liquidacion?.QuebrantosAnterioresFE?.total + remanenteDeduccionesPersonales)) // SI NO HAY QUEBRANTO CALCULO LO QUE TENGO QUE USAR DEL QUEBRANTO DE FA
        : null //SI HAY QUEBRANTO EN EL EJERCICIO NO USO EL QUEBRANTO DE FA
  //////////////////
  const especificoFEantesQuebrantos = absorberGanancia(totalFEEspecifico, (liquidacion?.deduccionesGeneralesFEespecifico?.total + liquidacion?.quebrantosEspecificosFE?.total))
  const gnQuebrantosFE = absorberGanancia((gnDeduccionesGeneralesFE), (liquidacion?.QuebrantosAnterioresFE?.total + quebrantoFAUtilizadoFE))
  // const gnFEantesDP = absorberGanancia((gnQuebrantosFE), (quebrantoFAUtilizadoFE))

  const utilizadoPersonalesFE = gnQuebrantosFE > remanenteDeduccionesPersonales ? remanenteDeduccionesPersonales : gnQuebrantosFE
  const gnFE = absorberGanancia(gnQuebrantosFE, articulo30FE)

  const utilizadoGNIFE = utilizadoPersonalesFE >= (liquidacion?.GananciaNoImponible?.total - utilizadoGNI) ? (liquidacion?.GananciaNoImponible?.total - utilizadoGNI) : (utilizadoPersonalesFE)
  const utilizadoFamiliaFE = (utilizadoPersonalesFE - utilizadoGNIFE) >= (liquidacion?.Cargasdefamilia?.total - utilizadoFamilia) ? (liquidacion?.Cargasdefamilia?.total - utilizadoFamilia) : (utilizadoPersonalesFE - utilizadoGNIFE)

  const remanenteDeduccionesPersonalesFE = (gnQuebrantosFE - articulo30FE) < 0 ? -(gnQuebrantosFE - articulo30FE) : 0 //REMANENTE DE LAS DEDUCCIONES GENERALES VAN PARA FUENTE EXTRANJERA
  ////UTILIZACION DE QUEBRANTOS
  const quebrantoFAUtilizadoFEespecifico =//SI TENGO REMANENTE DE DS PERSONALES NO CONVIENE UTILIZAR EL QUEBRANTO
    (totalFEEspecifico - (remanenteDeduccionesPersonalesFE + liquidacion?.deduccionesGeneralesFEespecifico?.total + liquidacion?.quebrantosEspecificosFE?.total + liquidacion?.quebrantosAnterioresFEespecifico?.total)) > (quebrantoFA - quebrantoFAUtilizadoFE) ? //SI LA GANANCIA ES MAYOR AL QUEBRANTO USO TODO EL QUEBRANTO
      (quebrantoFA - quebrantoFAUtilizadoFE) : totalFEEspecifico > 0 ? //TENGO QUE VER SI HAY QUEBRANTO EN EL EJERCICIO
        absorberGanancia(totalFEEspecifico, (remanenteDeduccionesPersonalesFE + liquidacion?.deduccionesGeneralesFEespecifico?.total + liquidacion?.quebrantosEspecificosFE?.total + liquidacion?.quebrantosAnterioresFEespecifico?.total)) : //SI HAY QUEBRANTO
        null

  const baseImponibleGlobal = absorberGanancia(gnFA + gnFE, quebrantoFE)


  const quebrantoFENeto = baseImponibleGlobal > 0 ? 0 : (quebrantoFE - gnFA)

  const quebrantoFEUtilizadoFEespecifico =
    (totalFEEspecifico - ((remanenteDeduccionesPersonalesFE + quebrantoFAUtilizadoFEespecifico) + (liquidacion?.deduccionesGeneralesFEespecifico?.total + liquidacion?.quebrantosEspecificosFE?.total + liquidacion?.quebrantosAnterioresFEespecifico?.total))) > (quebrantoFENeto) ? //SI ES MAYOR USO TODO EL QUEBRANTO
      (quebrantoFENeto) : totalFEEspecifico > 0 ? //SI NO TENGO QUE VER SI HAY QUEBRANTO EN EL EJ
        absorberGanancia(totalFEEspecifico, ((remanenteDeduccionesPersonalesFE + quebrantoFAUtilizadoFEespecifico) + (liquidacion?.deduccionesGeneralesFEespecifico?.total + liquidacion?.quebrantosEspecificosFE?.total + liquidacion?.quebrantosAnterioresFEespecifico?.total)))
        : null
  ///////////////////////

  const especificoFEantesDP = absorberGanancia(especificoFEantesQuebrantos, (quebrantoFEUtilizadoFEespecifico + quebrantoFAUtilizadoFEespecifico))
  const remanentePersonalesUtilizadoEspecifico = especificoFEantesDP > remanenteDeduccionesPersonalesFE ? remanenteDeduccionesPersonalesFE : especificoFEantesDP
  const gnFEAccionesInmuebles = absorberGanancia(((accionesFE + inmueblesFE) - quebrantoFAUtilizadoFEespecifico), remanenteDeduccionesPersonalesFE)
  //UTILIZAR QUEBRANTO FUENTE ARGENTINA

  const excedenteQuebrantoFE = quebrantoFE > 0 ? (liquidacion?.QuebrantosAnterioresFE?.total) : (liquidacion?.QuebrantosAnterioresFE?.total > gnDeduccionesGeneralesFE) ? (liquidacion?.QuebrantosAnterioresFE?.total - gnDeduccionesGeneralesFE) : null

  const excedenteQuebrantoFEespecifico = quebrantoFEespecifico > 0 ? (liquidacion?.quebrantosEspecificosFE?.total) : (liquidacion?.quebrantosEspecificosFE?.total > especificoFADespuesdeDG) ? (liquidacion?.quebrantosEspecificosFE?.total - especificoFADespuesdeDG) : null
  const excedenteQuebrantosAnterioresFEespecifico = quebrantoFEespecifico > 0 ? (liquidacion?.quebrantosAnterioresFEespecifico?.total) : (liquidacion?.quebrantosAnterioresFEespecifico?.total > especificoFADespuesdeQuebrantos) ? (liquidacion?.quebrantosAnterioresFEespecifico?.total - especificoFADespuesdeQuebrantos) : null

  //ARTICULO 85 CON TOPE VARIABLE

  useEffect(() => {
    setTopeDonacion(gnDeduccionesGenerales * 0.05)
  }, [gnDeduccionesGenerales])

  //CEDULAR

  const quebrantoDividendos = (liquidacion?.dividendos2018?.total + liquidacion?.dividendos2021?.total) < 0 ? (-(liquidacion?.dividendos2018?.total + liquidacion?.dividendos2021?.total)) : null
  const quebrantoEnajenacionA = liquidacion?.cedularTítulosSinAjuste?.total < 0 ? (-liquidacion?.cedularTítulosSinAjuste?.total) : null
  const quebrantoEnajenacionB = (liquidacion?.cedularConAjusteyMonedaDigital?.total) < 0 ? (-(liquidacion?.cedularConAjusteyMonedaDigital?.total)) : null
  const quebrantoEnajenacionC = (liquidacion?.cedularAcciones?.total) < 0 ? (-(liquidacion?.cedularAcciones?.total)) : null
  const quebrantoInmuebles = liquidacion?.cedularInmuebles?.total < 0 ? (-liquidacion?.cedularInmuebles?.total) : null

  const gnDividendos = absorberGanancia((liquidacion?.dividendos2018?.total + liquidacion?.dividendos2021?.total), liquidacion?.quebrantoDividendos?.total)
  const gnEnajenacionA = absorberGanancia(liquidacion?.cedularTítulosSinAjuste?.total, liquidacion?.quebrantoCedularTítulosSinAjuste?.total)
  const gnEnajenacionB = absorberGanancia((liquidacion?.cedularConAjusteyMonedaDigital?.total), (liquidacion?.quebrantoCedularConAjusteyMonedaDigital?.total))
  const gnEnajenacionC = absorberGanancia((liquidacion?.cedularAcciones?.total), (liquidacion?.quebrantoCedularAcciones?.total))
  const gnInmuebles = absorberGanancia(liquidacion?.cedularInmuebles?.total, liquidacion?.quebrantoCedularInmuebles?.total)

  //const excedenteQuebrantoFA = quebrantoFA > 0 ? liquidacion?.QuebrantosAnteriores?.total : (liquidacion?.QuebrantosAnteriores?.total > gnDeduccionesGeneralesConLimite) ? (liquidacion?.QuebrantosAnteriores?.total - gnDeduccionesGeneralesConLimite) : null
  // Excedente de quebranto para quebrantoDividendos
  const excedenteQuebrantoDividendos = quebrantoDividendos > 0 ? liquidacion?.quebrantoDividendos?.total : (liquidacion?.quebrantoDividendos?.total > (liquidacion?.dividendos2018?.total + liquidacion?.dividendos2021?.total)) ? (liquidacion?.quebrantoDividendos?.total - (liquidacion?.dividendos2018?.total + liquidacion?.dividendos2021?.total)) : null;

  // Excedente de quebranto para quebrantoEnajenacionA
  const excedenteQuebrantoEnajenacionA = quebrantoEnajenacionA > 0 ? liquidacion?.quebrantoCedularTítulosSinAjuste?.total : (liquidacion?.quebrantoCedularTítulosSinAjuste?.total > liquidacion?.cedularTítulosSinAjuste?.total) ? (liquidacion?.quebrantoCedularTítulosSinAjuste?.total - liquidacion?.cedularTítulosSinAjuste?.total) : null;

  // Excedente de quebranto para quebrantoEnajenacionB
  const excedenteQuebrantoEnajenacionB = quebrantoEnajenacionB > 0 ? liquidacion?.quebrantoCedularConAjusteyMonedaDigital?.total : (liquidacion?.quebrantoCedularConAjusteyMonedaDigital?.total > liquidacion?.cedularConAjusteyMonedaDigital?.total) ? (liquidacion?.quebrantoCedularConAjusteyMonedaDigital?.total - liquidacion?.cedularConAjusteyMonedaDigital?.total) : null;

  const excedenteQuebrantoEnajenacionC = quebrantoEnajenacionC > 0 ? liquidacion?.quebrantoCedularAcciones?.total : (liquidacion?.quebrantoCedularAcciones?.total > liquidacion?.cedularAcciones?.total) ? (liquidacion?.quebrantoCedularAcciones?.total - liquidacion?.cedularAcciones?.total) : null;

  // Excedente de quebranto para quebrantoInmuebles
  const excedenteQuebrantoInmuebles = quebrantoInmuebles > 0 ? liquidacion?.quebrantoCedularInmuebles?.total : (liquidacion?.quebrantoCedularInmuebles?.total > liquidacion?.cedularInmuebles?.total) ? (liquidacion?.quebrantoCedularInmuebles?.total - liquidacion?.cedularInmuebles?.total) : null;

  const subtotalCedularA = absorberGanancia(gnEnajenacionA, liquidacion?.cedularDeduccionEspecialA?.total)
  const excedenteDeduccionEnajenacionA = excedenteQuebrantoEnajenacionA > 0 ? liquidacion?.cedularDeduccionEspecialA?.total : (liquidacion?.cedularDeduccionEspecialA?.total > (liquidacion?.cedularTítulosSinAjuste?.total - liquidacion?.quebrantoCedularTítulosSinAjuste?.total)) ? (liquidacion?.cedularDeduccionEspecialA?.total - (liquidacion?.cedularTítulosSinAjuste?.total - liquidacion?.quebrantoCedularTítulosSinAjuste?.total)) : null;
  const subtotalCedularB = absorberGanancia(gnEnajenacionB, liquidacion?.cedularDeduccionEspecialB?.total)
  const subtotalAcciones = gnEnajenacionC

  const utilizadoGNIFEespecifico = remanentePersonalesUtilizadoEspecifico >= (liquidacion?.GananciaNoImponible?.total - utilizadoGNI - utilizadoGNIFE) ? (liquidacion?.GananciaNoImponible?.total - utilizadoGNI - utilizadoGNIFE) : (remanentePersonalesUtilizadoEspecifico)

  const utilizadoFamiliaFEespecifico = (remanentePersonalesUtilizadoEspecifico - utilizadoGNIFEespecifico) >= (liquidacion?.Cargasdefamilia?.total - utilizadoFamilia - utilizadoFamiliaFE) ? (liquidacion?.Cargasdefamilia?.total - utilizadoFamilia - utilizadoFamiliaFE) : (remanentePersonalesUtilizadoEspecifico - utilizadoGNIFEespecifico)

  const totalCedular = (liquidacion?.dividendos2018?.total + liquidacion?.dividendos2021?.total) +
    liquidacion?.cedularTítulosSinAjuste?.total +
    (liquidacion?.cedularConAjusteyMonedaDigital?.total) +
    (liquidacion?.cedularAcciones?.total) +
    liquidacion?.cedularInmuebles?.total
  //PARA MONTOCONSUMIDO GLOBAL + CEDULAR
  const totalGananciasGravadas = (gnDeduccionesGeneralesConLimite + gnDeduccionesGeneralesFE + especificoFADespuesdeDG) + totalCedular

  const handleImpuestoCalculado = (id, total, conceptos, deducciones, deduccionesComunes) => {
    // Verificar si la instancia ya existe en el objeto liquidacion

    // Si existe, actualiza el total
    setLiquidacion(prevLiquidacion => ({
      ...prevLiquidacion,
      [id]: {
        ...prevLiquidacion[id],
        conceptos,
        deducciones,
        deduccionesComunes,
        total: total,
      },
    }));


    setLiquidando(false)
  };

  useEffect(() => {

    setLiquidacion(prevLiquidacion => ({
      ...prevLiquidacion,
      ResultadoImpositivo: {
        total: totalGananciasGravadas,
      },
    }));

  }, [totalGananciasGravadas])

  useEffect(() => {

    setLiquidacion(prevLiquidacion => ({
      ...prevLiquidacion,
      TotalColumnaII: {
        total: (liquidacion?.RentasExentas?.total + liquidacion?.pInicial?.total + liquidacion?.JPBienesRecibidos?.total + liquidacion?.JPGananciasNoImplicanErogaciones?.total + liquidacion?.JPotrosConceptosjustificanErogaciones?.total)
      },
      TotalColumnaI: {
        total: (liquidacion?.JPotrosConceptosNoJustificanErogaciones?.total + liquidacion?.pFinal?.total)
      },
    }));
  }, [liquidacion?.RentasExentas?.total, liquidacion?.pInicial?.total, liquidacion?.JPBienesRecibidos?.total, liquidacion?.JPGananciasNoImplicanErogaciones?.total, liquidacion?.JPotrosConceptosjustificanErogaciones?.total, liquidacion?.JPotrosConceptosNoJustificanErogaciones?.total, liquidacion?.pFinal?.total])

  useEffect(() => {

    const resultado = liquidacion?.ResultadoImpositivo?.total > 0 ? liquidacion?.ResultadoImpositivo?.total : -liquidacion?.ResultadoImpositivo?.total

    setLiquidacion(prevLiquidacion => ({
      ...prevLiquidacion,
      MontoConsumido: {
        total: (resultado + (liquidacion?.TotalColumnaII?.total - liquidacion?.TotalColumnaI?.total)),
      },
    }));
  }, [liquidacion?.TotalColumnaI?.total, liquidacion?.TotalColumnaII?.total, liquidacion?.ResultadoImpositivo?.total])

  const [verEjercicio, setVerEjercicio] = useState(false)
  return (
    <div style={{ overflow: "scroll" }} className='.menuContenedor'>
      <button
        className='btn btn-danger'
        onClick={() => borrarLiquidacion()}
      >
        Reiniciar
      </button>

      <button  className="home-boton" onClick={() => setVerEjercicio(!verEjercicio)}>Ejercicio 1</button>

      <div ref={gRef}>
        <MontoConsumido totalGananciasGravadas={totalGananciasGravadas} liquidacion={liquidacion} />
        <div style={{ display: verEjercicio ? "block" : 'none' }}>
          <Ejercicios obtenerLiquidacion={obtenerLiquidacion} />
        </div>
        <div style={{ display: verEjercicio ? "none" : 'block' }}>
          <div
            style={{ display: liquidando ? "none" : "grid" }}
            className={style.contenedorGanancias}>
            <div>
              <h1>Impuesto Cedular</h1>
              <h2>Fuente Argentina</h2>
              <div className={style.contenedorCedular}>
                <div>
                  <h5>Artículo 97</h5>
                  <h4>Dividendos</h4>
                  <h4>2018-2020 <em id="dividendos2018">{liquidacion?.dividendos2018?.total}</em></h4>
                  <h6>7%</h6>
                  <h4>2021 en adelante <em id="dividendos2021">{liquidacion?.dividendos2021?.total}</em></h4>
                  <h6>7%</h6>
                  <span>Menos</span>
                  <h6 id="quebrantoDividendos">quebrantos ej anteriores<em>({liquidacion?.quebrantoDividendos?.total})</em> </h6>
                  {excedenteQuebrantoDividendos ? <span><Warning />(sobrante: {excedenteQuebrantoDividendos})</span> : null}

                  <h4>Total: <em>{gnDividendos}</em></h4>
                  {quebrantoDividendos ? <h4 className={style.impuestoAIngresar}>Quebranto del ej: <em>{quebrantoDividendos}</em></h4> : null}
                  <h4 className={style.impuestoAIngresar}>Impuesto a ingresar<em>{(gnDividendos * 0.07).toFixed(2)}</em></h4>
                </div>
                <div>
                  <h5>Artículo 98</h5>
                  <h4>Enajenación</h4>
                  <h4 id="cedularTítulosSinAjuste">a) Títulos S/Ajuste<em>{liquidacion?.cedularTítulosSinAjuste?.total}</em></h4>
                  <span>Menos</span>
                  <h6 id="quebrantoCedularTítulosSinAjuste">quebrantos ej anteriores inc a)<em>({liquidacion?.quebrantoCedularTítulosSinAjuste?.total})</em> </h6>
                  {excedenteQuebrantoEnajenacionA ? <span><Warning />(sobrante: {excedenteQuebrantoEnajenacionA})</span> : null}
                  <span>Menos</span>
                  <h6 id="cedularDeduccionEspecialA">Deduccion especial para inc a)<em>({liquidacion?.cedularDeduccionEspecialA?.total})</em> </h6>
                  {excedenteDeduccionEnajenacionA ? <span><Warning />(sobrante: {excedenteDeduccionEnajenacionA})</span> : null}
                  <h5><em>a) subtotal: {subtotalCedularA}</em></h5>
                  <h6><em>Alicuota 5%</em></h6>
                  {quebrantoEnajenacionA ? <h4 className={style.impuestoAIngresar}>Quebranto del ej: <em>{quebrantoEnajenacionA}</em></h4> : null}
                  <h4 className={style.impuestoAIngresar}>Impuesto a ingresar inc a)<em>{((subtotalCedularA) * 0.05).toFixed(2)}</em></h4>
                  <hr></hr>
                  <h4 id="cedularConAjusteyMonedaDigital">b) Títulos C/Ajuste, Moneda Digital<em>{liquidacion?.cedularConAjusteyMonedaDigital?.total}</em></h4>
                  <span>Menos</span>
                  <h6 id="quebrantoCedularConAjusteyMonedaDigital">quebrantos ej anteriores inc b)<em>({liquidacion?.quebrantoCedularConAjusteyMonedaDigital?.total})</em> </h6>
                  {excedenteQuebrantoEnajenacionB ? <span><Warning />(sobrante: {excedenteQuebrantoEnajenacionB})</span> : null}
                  <span>Menos</span>
                  <h6 id="cedularDeduccionEspecialB">Deduccion especial para inc b)<em>({liquidacion?.cedularDeduccionEspecialB?.total})</em> </h6>
                  <h5><em>b) subtotal: {subtotalCedularB}</em></h5>
                  <hr></hr>
                  <h4 id="cedularAcciones">c) Acciones<em>{liquidacion?.cedularAcciones?.total}</em></h4>
                  <span>Menos</span>
                  <h6 id="quebrantoCedularAcciones">quebrantos ej anteriores inc c)<em>({liquidacion?.quebrantoCedularAcciones?.total})</em> </h6>
                  {excedenteQuebrantoEnajenacionC ? <span><Warning />(sobrante: {excedenteQuebrantoEnajenacionC})</span> : null}
                  <h5><em>c) subtotal: {subtotalAcciones}</em></h5>
                  <hr></hr>
                  <h5>Total inc b) y c) <em >{subtotalCedularB + subtotalAcciones}</em></h5>
                  <h6><em>Alicuota 15%</em></h6>
                  {quebrantoEnajenacionB ? <h4 className={style.impuestoAIngresar}>Quebranto del ej: <em>{quebrantoEnajenacionB}</em></h4> : null}
                  <h4 className={style.impuestoAIngresar}>Impuesto a ingresar b)+c)
                    <em>{((subtotalCedularB + subtotalAcciones) * 0.15).toFixed(2)}</em>
                  </h4>
                </div>
                <div>
                  <div>
                    <h5>Artículo 99</h5>
                    <h4>Venta inmuebles <em id="cedularInmuebles">{liquidacion?.cedularInmuebles?.total}</em></h4>
                    <span>Menos</span>
                    <h6 id="quebrantoCedularInmuebles">quebrantos específicos anteriores<em>({liquidacion?.quebrantoCedularInmuebles?.total})</em> </h6>
                    {excedenteQuebrantoInmuebles ? <span><Warning />(sobrante: {excedenteQuebrantoInmuebles})</span> : null}
                    <h4>Total: <em>{gnInmuebles}</em></h4>
                    <h6>15%</h6>
                    {quebrantoInmuebles ? <h4 className={style.impuestoAIngresar}>Quebranto del ej: <em>{quebrantoInmuebles}</em></h4> : null}
                    <h4 className={style.impuestoAIngresar}>Impuesto a ingresar<em>{(gnInmuebles * 0.15).toFixed(2)}</em></h4>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1>Imposición Global</h1>
              <div className={style.contenedorGlobal}>
                <div>
                  <div className={style.contenedorFAFE}>
                    <div>
                      <h2>Fuente Argentina</h2>
                      <div className={style.contenedorGlobalArgentina}>
                        <div>
                          <h5 id="G1FA">G1 <em>{liquidacion?.G1FA?.total}</em></h5>
                        </div>
                        <div>
                          <h5 id="G2FA">G2 <em>{liquidacion?.G2FA?.total}</em></h5>
                        </div>
                        <div>
                          <h5 id="G3FA">G3 <em>{liquidacion?.G3FA?.total}</em></h5>
                        </div>
                        <div>
                          <h5 id="G4FA">G4 <em>{liquidacion?.G4FA?.total}</em></h5>
                        </div>
                      </div>
                      <h4>Ganancia Neta de las 4 categorías FA <em>{sumaGananciasFA}</em></h4>
                      <span>Menos</span>
                      <h6 id='DeduccionesGenerales'>Deducciones generales Artículo 85 y 29 <em>({liquidacion?.DeduccionesGenerales?.total})</em></h6>
                      <h4>Ganancia Neta antes de donaciones, cobertura médica asistencial y gastos médicos <em>{gnDeduccionesGenerales}</em></h4>
                      <span>Menos</span>
                      <h6 id="DeduccionesGeneralesConLimite">Artículo 85 c), f) y g) <em>({liquidacion?.DeduccionesGeneralesConLimite?.total})</em></h6>
                      <h4>Ganancia Neta antes de quebrantos <em>{gnDeduccionesGeneralesConLimite}</em></h4>
                      <span>Menos</span>
                      <h6 id="QuebrantosAnteriores">Quebrantos ej anteriores - Artículo 25
                        <em>({liquidacion?.QuebrantosAnteriores?.total})</em>
                        {excedenteQuebrantoFA ? <span><Warning />(sobrante: {excedenteQuebrantoFA})</span> : null}
                      </h6>
                      <h4>Ganancia Neta antes de deducciones personales Artículo 30 <em>{gnQuebrantos}</em></h4>
                      <span>Menos</span>
                      <h6>Articulo 30 <em>Total: {articulo30}</em></h6>
                      <h6 id="GananciaNoImponible">a) Ganancia No Imponible <em>({liquidacion?.GananciaNoImponible?.total})</em>
                        <div className={style.utilizadoPersonales}>Usado: {utilizadoGNI}</div>
                      </h6>
                      <h6 id="Cargasdefamilia">b) Cargas de familia <em>({liquidacion?.Cargasdefamilia?.total})</em>
                        <div className={style.utilizadoPersonales}>Usado: {utilizadoFamilia}</div>
                      </h6>
                      <h6 id="DeducciónEspecial">c) Deducción Especial <em>({liquidacion?.DeducciónEspecial?.total})</em>
                        <div className={style.utilizadoPersonales}>Usado: {utilizadoEspecial}</div>
                      </h6>
                      <h4>Ganancia Neta sujeta a impuesto de FA <em>{gnFA}</em></h4>
                      {quebrantoFA ? <h4 className={style.impuestoAIngresar}>Quebranto del ejercicio FA
                        <em>Total: {quebrantoFA}</em>
                        <em>Utilizado: {quebrantoFAUtilizadoFE + quebrantoFAUtilizadoFEespecifico}</em>
                        <em>Restante: {quebrantoFA - (quebrantoFAUtilizadoFE + quebrantoFAUtilizadoFEespecifico)}</em>
                      </h4> : null}
                    </div>
                    <div>
                      <h2>Fuente Extranjera</h2>
                      <div className={style.contenedorGlobalExtranjera}>
                        <div>
                          <div className={style.contenedorGlobalExtranjeraCategorias}>
                            <div>
                              <h5 id="G1FE">G1 <em>{liquidacion?.G1FE?.total}</em></h5>
                            </div>
                            <div>
                              <h5 id="G2FE">G2 <em>{liquidacion?.G2FE?.total}</em></h5>
                            </div>
                            <div>
                              <h5 id="G3FE">G3 <em>{liquidacion?.G3FE?.total}</em></h5>
                            </div>
                            <div>
                              <h5 id="G4FE">G4 <em>{liquidacion?.G4FE?.total}</em></h5>
                            </div>
                          </div>
                          <h4>Ganancia Neta de las 4 categorías FE <em>{sumaGananciasFE}</em></h4>
                          <span>Menos</span>
                          <h6 id="DeduccionesGeneralesFE">Deducciones generales FE <em>({liquidacion?.DeduccionesGeneralesFE?.total})</em></h6>
                          <h4>-<em>-</em></h4>
                          <h6>-</h6>
                          <span>Menos</span>
                          <h4>Ganancia Neta antes de quebrantos <em>{gnDeduccionesGeneralesFE}</em></h4>
                          <span>Menos</span>
                          <h6 id="QuebrantosAnterioresFE">Quebrantos ej anteriores - Artículo 25
                            <em>{liquidacion?.QuebrantosAnterioresFE?.total}</em>
                            {excedenteQuebrantoFE ? <span><Warning />(sobrante: {excedenteQuebrantoFE})</span> : null}
                            {quebrantoFAUtilizadoFE ? <em className={style.impuestoAIngresar}>Utilizado de FA: {quebrantoFAUtilizadoFE}</em> : null}
                          </h6>
                          <h4>Ganancia Neta antes de deducciones personales Artículo 30 <em>{gnQuebrantosFE}</em></h4>
                          <span>Menos</span>
                          <h6>Articulo 30 <em>Remanente: {remanenteDeduccionesPersonales}</em> <em>Utilizado: {utilizadoPersonalesFE}</em></h6>
                          <h6>a) Ganancia No Imponible <em className={style.utilizadoPersonales}>{utilizadoGNIFE}</em></h6>
                          <h6>b) Cargas de familia <em className={style.utilizadoPersonales}>{utilizadoFamiliaFE}</em> </h6>
                          <h6>-</h6>
                          <h4>Ganancia Neta sujeta a impuesto de FE <em>{gnFE}</em></h4>
                          {quebrantoFE ? <h4 className={style.impuestoAIngresar}>Quebranto del ejercicio FE
                            <em>Total: {quebrantoFENeto}</em>
                            <em>Utilizado: {quebrantoFEUtilizadoFEespecifico}</em>
                            <em>Restante: {quebrantoFENeto - quebrantoFEUtilizadoFEespecifico}</em>
                          </h4> : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4>Escala del artículo 94 <em>Total: {baseImponibleGlobal}</em></h4>
                  <EscalaValores baseImponible={baseImponibleGlobal} />
                </div>
                <div>
                  <h2>Fuente Extranjera</h2>
                  <h4>Venta <em id="accionesFE">Acciones: {accionesFE}</em><em id="inmueblesFE">Inmuebles {inmueblesFE}</em></h4>
                  <span>Menos</span>
                  <h6 id="quebrantosEspecificosFE">Quebrantos Específico de ej anteriores FE <em>{liquidacion?.quebrantosEspecificosFE?.total}</em>
                    {excedenteQuebrantoFEespecifico ? <span><Warning />(sobrante: {excedenteQuebrantoFEespecifico})</span> : null}</h6>
                  <span>Menos</span>
                  <h6 id="deduccionesGeneralesFEespecifico">Deducciones generales FE <em>({liquidacion?.deduccionesGeneralesFEespecifico?.total})</em></h6>
                  <span>Menos</span>
                  <h6 id="quebrantosAnterioresFEespecifico">Quebrantos ej anteriores
                    <em>{liquidacion?.quebrantosAnterioresFEespecifico?.total}</em>
                    {excedenteQuebrantosAnterioresFEespecifico ? <span><Warning />(sobrante: {excedenteQuebrantosAnterioresFEespecifico})</span> : null}
                    {quebrantoFAUtilizadoFEespecifico ? <em className={style.impuestoAIngresar}>Utilizado de FA: {quebrantoFAUtilizadoFEespecifico}</em> : null}
                    {quebrantoFEUtilizadoFEespecifico ? <em className={style.impuestoAIngresar}>Utilizado de FE: {quebrantoFEUtilizadoFEespecifico}</em> : null}
                  </h6>
                  <span>Menos</span>
                  <h6>Articulo 30 <em>Remanente: {remanenteDeduccionesPersonalesFE}</em> <em>Utilizado: {remanentePersonalesUtilizadoEspecifico}</em></h6>
                  <h6>a) Ganancia No Imponible <em className={style.utilizadoPersonales}>{utilizadoGNIFEespecifico}</em></h6>
                  <h6>b) Cargas de familia <em className={style.utilizadoPersonales}>{utilizadoFamiliaFEespecifico}</em></h6>
                  {quebrantoFEespecifico ? <h4 className={style.impuestoAIngresar}>Quebranto del ejercicio FE específico
                    <em>Total: {quebrantoFEespecifico}</em>
                  </h4> : null}
                  <h4>Ganancia Neta Venta de Acciones / Inmuebles <em>Total: {gnFEAccionesInmuebles}</em></h4>
                  <h4><em>Alicuota 15%</em></h4>
                  <h4 className={style.impuestoAIngresar}>Impuesto a ingresar<em>{(gnFEAccionesInmuebles * 0.15).toFixed(2)}</em></h4>
                </div>
              </div>
            </div>
          </div>
          {/* Liquidar */}
          <div
            style={{ display: liquidando ? "block" : "none" }}
          >
            <Liquidador
              funcionLiquidar={funcionLiquidar}
              totalGananciasGravadas={totalGananciasGravadas}
              topeDonacion={topeDonacion} id={enLiquidacion} handleImpuestoCalculado={handleImpuestoCalculado} cancelar={cancelar} liquidacion={liquidacion} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculadoraGanancias;