import { useEffect, useRef, useState } from 'react'
import style from './cGanancias.module.css'
import { Liquidador } from './liquidador'
import { guardarLiquidacionEnLocalStorage, obtenerLiquidacionDesdeLocalStorage, borrarLiquidacionEnLocalStorage } from './guardarLiquidacion'
import { liquidacionInicialDefault } from './liquidacionInicial'
import { EscalaValores } from './escalaValores'
export const CalculadoraGanancias = () => {

  const liquidacionInicial = obtenerLiquidacionDesdeLocalStorage();
  const [liquidacion, setLiquidacion] = useState(liquidacionInicial || liquidacionInicialDefault)
  const [liquidando, setLiquidando] = useState(false)
  const [topeDonacion, setTopeDonacion] = useState(0)
  const [enLiquidacion, setEnLiquidacion] = useState()
  const gRef = useRef(null)

  useEffect(() => {
    guardarLiquidacionEnLocalStorage(liquidacion)
  }, [liquidacion])

  const funcionLiquidar = () => {

    const gElement = gRef?.current;
    const elements = gElement?.querySelectorAll('[id]');

    for (let i = 0; i < elements?.length; i++) {
      elements[i].classList.add("remarcarSecciones")
      elements[i].onclick = function () {
        setLiquidando(true)
        setEnLiquidacion(elements[i].id)
        // pasarSeccionId(elements[i].id);
      }
    }
  }
  useEffect(() => {
    funcionLiquidar()
  }, [])

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

  const gnDeduccionesGenerales = absorberGanancia(sumaGananciasFA, (liquidacion?.DeduccionesGenerales?.total || 0))
  const remanenteDeduccionesGenerales = (sumaGananciasFA - (liquidacion?.DeduccionesGenerales?.total || 0)) < 0 ? (sumaGananciasFA - (liquidacion?.DeduccionesGenerales?.total || 0)) : 0 //REMANENTE DE LAS DEDUCCIONES GENERALES VAN PARA FUENTE EXTRANJERA
  const gnDeduccionesGeneralesConLimite = gnDeduccionesGenerales - (liquidacion?.DeduccionesGeneralesConLimite?.total || 0)
  const gnQuebrantos = absorberGanancia(gnDeduccionesGeneralesConLimite, (liquidacion?.QuebrantosAnteriores?.total || 0))
  const articulo30 = (liquidacion?.GananciaNoImponible?.total || 0) + (liquidacion?.Cargasdefamilia?.total || 0) + (liquidacion?.DeducciónEspecial?.total || 0)
  const gnFA = absorberGanancia(gnQuebrantos, articulo30)
  
  const remanenteDeduccionesPersonales = (gnQuebrantos - articulo30 + (liquidacion?.DeducciónEspecial?.total || 0)) < 0 ? -(gnQuebrantos - articulo30 + (liquidacion?.DeducciónEspecial?.total || 0)) : 0 //REMANENTE DE LAS DEDUCCIONES GENERALES VAN PARA FUENTE EXTRANJERA
  //FUENTE EXTRANJERA
  const sumaGananciasFE = (liquidacion?.G1FE?.total || 0) + (liquidacion?.G2FE?.total || 0) + (liquidacion?.G3FE?.total || 0) + (liquidacion?.G4FE?.total || 0)
  const gnDeduccionesGeneralesFE = absorberGanancia(sumaGananciasFE, (liquidacion?.DeduccionesGeneralesFE?.total || 0))
  const remanenteDeduccionesGeneralesFE = (sumaGananciasFE - sumaGananciasFE - (liquidacion?.DeduccionesGeneralesFE?.total || 0)) < 0 ? (sumaGananciasFE - sumaGananciasFE - (liquidacion?.DeduccionesGeneralesFE?.total || 0)) : 0 //REMANENTE DE LAS DEDUCCIONES GENERALES VAN PARA TERCER PARRAFO DEL ARTICUL 94
  const gnQuebrantosFE = absorberGanancia(gnDeduccionesGeneralesFE, (liquidacion?.QuebrantosAnterioresFE?.total || 0))
  const articulo30FE = remanenteDeduccionesPersonales
  const gnFE = absorberGanancia(gnQuebrantosFE, articulo30FE)

  const remanenteDeduccionesPersonalesFE = (gnQuebrantosFE - articulo30FE) < 0 ? -(gnQuebrantosFE - articulo30FE) : 0 //REMANENTE DE LAS DEDUCCIONES GENERALES VAN PARA FUENTE EXTRANJERA
  const remanenteDeduccionesGeneralesTotal = -(remanenteDeduccionesGeneralesFE + remanenteDeduccionesGenerales)

  //ARTICULO 85 CON TOPE VARIABLE

  useEffect(() => {
    setTopeDonacion(gnDeduccionesGenerales * 0.05)
  }, [gnDeduccionesGenerales])

  //FUENTE EXTRANJERA ACCIONES E INMUELBES
  const accionesFE = (liquidacion?.accionesFE?.total || 0)
  const inmueblesFE = (liquidacion?.inmueblesFE?.total || 0)
  const totalFEEspecifico = (accionesFE + inmueblesFE)
  const remanentePersonalesUtilizado = (accionesFE + inmueblesFE) > remanenteDeduccionesPersonalesFE ? remanenteDeduccionesPersonalesFE : (accionesFE + inmueblesFE)
  const gnFEAccionesInmuebles = absorberGanancia((accionesFE + inmueblesFE) , remanenteDeduccionesPersonalesFE)

  return (
    <div style={{ overflow: "scroll" }} className='.menuContenedor'>
      <button
        className='btn btn-danger'
        onClick={() => borrarLiquidacion()}
      >
        Limpiar
      </button>
      <div
        ref={gRef}
        style={{ display: liquidando ? "none" : "grid" }}
        className={style.contenedorGanancias}>
        <div>
          <h1>Impuesto Cedular</h1>
          <h2>Fuente Argentina</h2>
          <div className={style.contenedorCedular}>
            <div>
              <h5>97</h5>
              <h4>Dividendos</h4>
              <h4>2018-2020 <em id="dividendos2018">{liquidacion?.dividendos2018?.total}</em></h4>
              <h6>7%</h6>
              <h4>2021 en adelante <em id="dividendos2021">{liquidacion?.dividendos2021?.total}</em></h4>
              <h6>7%</h6>
              <h4 className={style.impuestoAIngresar}>Impuesto a ingresar<em>{liquidacion?.dividendos2018?.total*0.07 + liquidacion?.dividendos2021?.total*0.07}</em></h4>
            </div>
            <div>
              <h5>98</h5>
              <h4>Enajenación 
                <h5 id="cedularTítulosSinAjuste">a) Títulos S/Ajuste<em>{liquidacion?.cedularTítulosSinAjuste?.total}</em></h5>
                <h5 id="cedularConAjusteyMonedaDigital">b) Títulos C/Ajuste, Moneda Digital<em>{liquidacion?.cedularConAjusteyMonedaDigital?.total}</em></h5>
                <h5 id="cedularAcciones">c) Acciones<em>{liquidacion?.cedularAcciones?.total}</em></h5>
                </h4>
              <span>Menos</span>
              <h6 id="cedularDeduccionEspecial">Deducción especial Inc a) y b) <em>{liquidacion?.cedularDeduccionEspecial?.total}</em></h6>
              <h4>inc a) <em>{liquidacion?.cedularTítulosSinAjuste?.total}</em></h4>
              <h6>5%</h6>
              <h4 className={style.impuestoAIngresar}>Impuesto a ingresar<em>{(liquidacion?.cedularTítulosSinAjuste?.total)*0.05}</em></h4>
              <h4>inc b) y c) <em >{liquidacion?.cedularConAjusteyMonedaDigital?.total + liquidacion?.cedularAcciones?.total}</em></h4>
              <h6>15%</h6>
              <h4 className={style.impuestoAIngresar}>Impuesto a ingresar<em>{(liquidacion?.cedularConAjusteyMonedaDigital?.total + liquidacion?.cedularAcciones?.total)*0.15}</em></h4>
            </div>
            <div>
              <div>
                <h5>99</h5>
                <h4>Venta inmuebles <em id="cedularInmuebles">{liquidacion?.cedularInmuebles?.total}</em></h4>
                <h6>15%</h6>
                <h4 className={style.impuestoAIngresar}>Impuesto a ingresar<em>{liquidacion?.cedularInmuebles?.total*0.15}</em></h4>
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
                  <h6 id="QuebrantosAnteriores">Quebrantos ej anteriores - Artículo 25 <em>({liquidacion?.QuebrantosAnteriores?.total})</em></h6>
                  <h4>Ganancia Neta antes de deducciones personales Artículo 30 <em>{gnQuebrantos}</em></h4>
                  <span>Menos</span>
                  <h6>Articulo 30 <em>{articulo30}</em></h6>
                  <h6 id="GananciaNoImponible">a) Ganancia No Imponible <em>({liquidacion?.GananciaNoImponible?.total})</em></h6>
                  <h6 id="Cargasdefamilia">b) Cargas de familia <em>({liquidacion?.Cargasdefamilia?.total})</em></h6>
                  <h6 id="DeducciónEspecial">c) Deducción Especial <em>({liquidacion?.DeducciónEspecial?.total})</em></h6>
                  <h4>Ganancia Neta sujeta a impuesto de FA <em>{gnFA}</em></h4>
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
                      <h6 id="QuebrantosAnterioresFE">Quebrantos ej anteriores - Artículo 25 <em>{liquidacion?.QuebrantosAnterioresFE?.total}</em></h6>
                      <h4>Ganancia Neta antes de deducciones personales Artículo 30 <em>{gnDeduccionesGeneralesFE - liquidacion?.QuebrantosAnterioresFE?.total}</em></h4>
                      <span>Menos</span>
                      <h6>Articulo 30 <em>Remanente: {remanenteDeduccionesPersonales}</em> <em>Utilizado: {gnDeduccionesGeneralesFE - liquidacion?.QuebrantosAnterioresFE?.total > remanenteDeduccionesPersonales ? remanenteDeduccionesPersonales : gnDeduccionesGeneralesFE - liquidacion?.QuebrantosAnterioresFE?.total}</em></h6>
                      <h6>a) Ganancia No Imponible</h6>
                      <h6>b) Cargas de familia</h6>
                      <h6>-</h6>
                      <h4>Ganancia Neta sujeta a impuesto de FE <em>{gnFE}</em></h4>
                    </div>
                  </div>
                </div>
              </div>
              <h4>Escala del artículo 94 <em>Total: {gnFA + gnFE}</em></h4>
             <EscalaValores baseImponible={gnFA + gnFE} />
            </div>
            <div>
              <h2>Fuente Extranjera</h2>
              <h4>Venta <em id="accionesFE">Acciones: {accionesFE}</em><em id="inmueblesFE">Inmuebles {inmueblesFE}</em></h4>
              <span>Menos</span>
              <h6 id="QuebrantosEspecificosFE">Quebrantos Específico de ej anteriores FE</h6>
              <span>Menos</span>
              <h6>Deducciones generales FE <em>Remanente: {remanenteDeduccionesGeneralesTotal}</em></h6>
              <span>Menos</span>
              <h6>Quebrantos ej anteriores</h6>
              <span>Menos</span>
              <h6>Articulo 30 <em>Remanente: {remanenteDeduccionesPersonalesFE}</em> <em>Utilizado: {remanentePersonalesUtilizado}</em></h6>
              <h6>a) Ganancia No Imponible</h6>
              <h6>b) Cargas de familia</h6>
              <h4>Ganancia Neta Venta de Acciones / Inmuebles <em>Total: {gnFEAccionesInmuebles}</em></h4>
              <h4><em>Alicuota 15%</em></h4>
              <h4 className={style.impuestoAIngresar}>Impuesto a ingresar<em>{gnFEAccionesInmuebles*0.15}</em></h4>
            </div>
          </div>
        </div>
      </div>
      {/* Liquidar */}
      <div
        style={{ display: liquidando ? "block" : "none" }}
      >
        <Liquidador topeDonacion={topeDonacion} id={enLiquidacion} handleImpuestoCalculado={handleImpuestoCalculado} cancelar={cancelar} liquidacion={liquidacion} />
      </div>
    </div>
  )
}