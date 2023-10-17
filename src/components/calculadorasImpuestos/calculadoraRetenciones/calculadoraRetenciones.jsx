import { useEffect, useState } from 'react';
import style from './retenciones.module.css'
import MontoInput from './inputPesos';

const CalculadoraRetenciones = () => {

  const [retencionesCalculadasTotal, setRetencionesCalculadasTotal] = useState()
  const [retencionesCalculadas, setRetencionesCalculadas] = useState([])
  const [retenciones, setRetenciones] = useState([])
  const [nombre, setNombre] = useState()
  const [alicuota, setAlicuota] = useState()
  const [tipoRetencion, setTipoRetencion] = useState()
  const [minimoNoImponible, setMinimoNoImponible] = useState(224000)
  const [alicuotaIVA, setAlicuotaIVA] = useState(0.21)
  const [iva, setIva] = useState(true)
  const [editarIVA, setEditarIVA] = useState(false)
  const [abonadoAnterior, setAbonadoAnterior] = useState(parseFloat(0))
  const [retenidoAnterior, setRetenidoAnterior] = useState(parseFloat(0))

  const [calculadoAutomatico, setCalculadoAutomatico] = useState(true);

  const [monto, setMonto] = useState()
  const [montoPagar, setMontoPagar] = useState()
  const [ivaCalculado, setIvaCalculado] = useState(monto ? iva ? ((monto / (1 + alicuotaIVA)) * alicuotaIVA) : 0 : 0)
  const montoNetoDeIVA = monto ? iva ? (parseFloat(monto) - ivaCalculado) : parseFloat(monto) : 0
  const montoImponibleGanancias = ((montoNetoDeIVA + (abonadoAnterior || 0)) - (minimoNoImponible || 0)) > 0 ? ((montoNetoDeIVA + (abonadoAnterior || 0)) - (minimoNoImponible || 0)) : 0

  const totalAPagar = (montoPagar + ivaCalculado)

  const agregarRetencion = (e, nombre, alicuota, tipoRetencion) => {
    e.preventDefault()
    const nuevaRetencion = { tipoRetencion, nombre, alicuota: parseFloat(alicuota) };
    setRetenciones([...retenciones, nuevaRetencion]);
  };

  const eliminarRetencion = (index) => {
    const nuevaRetencion = [...retenciones];
    nuevaRetencion.splice(index, 1); // Eliminar el concepto en el índice dado
    setRetenciones(nuevaRetencion);
  }

  //const sumaAlicuotas = retenciones?.reduce((total, retencion) => total + retencion.alicuota, 0) || 0;

  const sumaAlicuotas = retenciones.reduce((total, retencion) => {
    const alicuotaEfectiva = montoImponibleGanancias > 0 ? ((montoImponibleGanancias * retencion.alicuota) / montoNetoDeIVA) : 0
    const alicuotaEfectivaIVA = ((montoNetoDeIVA * retencion.alicuota) / montoNetoDeIVA)
    if (retencion.tipoRetencion == "ganancias") {
      return total + alicuotaEfectiva
    } else if (retencion.tipoRetencion == "IVA") {
      return total + alicuotaEfectivaIVA
    } else {
      return total + retencion.alicuota
    }
  }, 0);

  const handleRadioChange = (event) => {
    setCalculadoAutomatico(event.target.value == "true" ? true : false);
  };

  const handleMontoPagarChange = (event) => {
    if (parseFloat(event.target.value) >= 0) {
      setMontoPagar(parseFloat(event.target.value));
    } else {
      setMontoPagar();
    }
  };
  const handleMontoChange = (event) => {
    if (parseFloat(event.target.value) >= 0) {
      setMonto((event.target.value));
    } else {
      setMonto();
    }
  };

  useEffect(() => {
    if (calculadoAutomatico) {

      const calculado = parseFloat((montoNetoDeIVA - retencionesCalculadasTotal) >= 0 ? (montoNetoDeIVA - retencionesCalculadasTotal) : 0)
      setMontoPagar(calculado)
    }

  }, [calculadoAutomatico, monto, retencionesCalculadasTotal, iva, editarIVA, ivaCalculado])

  useEffect(() => {

    if (editarIVA) {

    } else {
      const calculado = parseFloat(monto ? iva ? ((monto / (1 + alicuotaIVA)) * alicuotaIVA) : 0 : 0)?.toFixed(2)
      setIvaCalculado(parseFloat(calculado))

    }
  }, [calculadoAutomatico, monto, retencionesCalculadasTotal, iva, editarIVA, alicuotaIVA])

  const montoAbonadoTotal = parseFloat(montoPagar + retencionesCalculadasTotal + ivaCalculado)

  const cuentaProveedor = [
    { concepto: "factura", importe: (parseFloat(monto) || 0) },
    { concepto: "pago", importe: (montoAbonadoTotal || 0) },
    { concepto: "saldo", importe: ((monto || 0) - (montoAbonadoTotal || 0)) },
  ]

  const tiposRetenciones = [
    { retencion: "ganancias", alicuota: 0.02 },
    { retencion: "IIBB", alicuota: 0.01 },
    { retencion: "IVA", alicuota: 0.01 },
  ]

  const alicuotasIVA = [
    0.105,
    0.21,
    0.27
  ]


  const handleIVA = (event) => {
    setIva(event.target.value == "true" ? true : false)
  }

  const handleIVACalculado = (event) => {
    if (parseFloat(event.target.value) >= 0) {
      setIvaCalculado(parseFloat(event.target.value))
    } else {
      setIvaCalculado()
    }
  }

  const handleEditarIVA = () => {
    setEditarIVA(!editarIVA)
  }
  const handleAlicuotaIva = (event) => {
    if (parseFloat(event.target.value) >= 0) {
      setAlicuotaIVA(parseFloat(event.target.value))
    } else {
      setAlicuotaIVA()
    }
  }

  useEffect(() => {
    if (!iva) {
      setIvaCalculado(0)
    }
  }, [iva])

  const handleAbonadoAnterior = (event) => {
    if (parseFloat(event.target.value) >= 0) {
      setAbonadoAnterior(parseFloat(event.target.value))
    } else {
      setAbonadoAnterior()
    }
  }
  const handleRetenidoAnterior = (event) => {
    if (parseFloat(event.target.value) >= 0) {
      setRetenidoAnterior(parseFloat(event.target.value))
    } else {
      setRetenidoAnterior()
    }
  }
  const handleMinimoNoImponible = (event) => {
    if (parseFloat(event.target.value) >= 0) {
      setMinimoNoImponible(parseFloat(event.target.value))
    } else {
      setMinimoNoImponible()
    }
  }

  useEffect(() => {

    const retencionCalculada = retenciones?.map(r => {
      if (r.tipoRetencion == "ganancias") {
        return montoImponibleGanancias > 0 ? ((montoImponibleGanancias * r.alicuota) - (retenidoAnterior || 0)) > 0 ? ((montoImponibleGanancias * r.alicuota) - (retenidoAnterior || 0)) : 0 : 0
      }
      else if (r.tipoRetencion == "IVA") {
        return montoNetoDeIVA * r.alicuota
      }
      else {
        return montoNetoDeIVA * r.alicuota
      }
    });
    const retencionCalculadaTotal = retencionCalculada?.reduce((total, valor) => total + valor, 0);

    setRetencionesCalculadas(retencionCalculada);
    setRetencionesCalculadasTotal(parseFloat(retencionCalculadaTotal));

  }, [retenciones, monto, montoPagar, abonadoAnterior, retenidoAnterior, minimoNoImponible, iva, alicuotaIVA, montoImponibleGanancias, montoNetoDeIVA])

  return (
    <div className='menuContenedor'>
      <div className={style.container}>
        <div>
          <div className={style.inputFactura}>
            <label>Monto factura
              <input placeholder='$0,00' type='number' value={monto} onChange={handleMontoChange} />
            </label>
            <label>
              <input
                checked={iva}
                name='IVA'
                type='radio'
                onChange={handleIVA}
                value={true}
              />
              Con IVA
              {!editarIVA ?
                <select onChange={handleAlicuotaIva}>
                  {alicuotasIVA?.map(a => <option selected={a == alicuotaIVA} value={a}>{a}</option>)}
                </select>
                : null}
            </label>
            <label>
              <input
                checked={!iva}
                name='IVA'
                type='radio'
                onChange={handleIVA}
                value={false}
              />
              Sin IVA
            </label>
          </div>
          <div className={style.contenedorDatosFactura}>
            <div className='examen-descripcion-elementos'>
              <span>Monto factura neto de IVA:</span> <input value={iva ? montoNetoDeIVA : monto}></input>
            </div>
            <div className='examen-descripcion-elementos'>
              IVA:
              <div>
                <label>
                  <label>
                    <input type='checkbox' onChange={handleEditarIVA} />
                    editar
                  </label>
                  {editarIVA ?
                    <input type='number' step="any" value={ivaCalculado} onChange={handleIVACalculado} />
                    :
                    <input value={ivaCalculado} />
                  }
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div>
          <h3>Monto a pagar:</h3>
          <label>
            <input
              checked={calculadoAutomatico}
              name='calcularAutomatico'
              type='radio'
              onChange={handleRadioChange}
              value={true}
            />
            Calcular automático
          </label>
          <br></br>
          <label>
            <input
              checked={!calculadoAutomatico}
              name='calcularAutomatico'
              type='radio'
              onChange={handleRadioChange}
              value={false}
            />
            Escribir monto
          </label>
        </div>
        {calculadoAutomatico ? <div> Monto a abonar: $ {totalAPagar?.toLocaleString('de-DE')}</div> :
          <label> Monto a abonar: $
            <input
              value={montoPagar}
              onChange={handleMontoPagarChange}
              type='number'
              step="any"></input>
          </label>
        }
        <hr></hr>
        <div>
          <h3>Retenciones:</h3>
          {
            retenciones?.map((r, index) => {
              return (
                <>
                  <div>
                    <button className="btn-danger" onClick={() => eliminarRetencion(index)}>X</button>
                    {r.tipoRetencion} {r.nombre} : {(r.alicuota * 100)?.toFixed(2)}% =
                    <span> ${retencionesCalculadas[index]?.toLocaleString('de-DE')}</span></div>
                </>
              )
            })
          }
        </div>
        <form onSubmit={(e) => agregarRetencion(e, nombre, alicuota, tipoRetencion)}>
          <select value={tipoRetencion} onChange={(e) => setTipoRetencion(e.target.value)}>
            <option disabled selected>
              Elegir tipo de retencion
            </option>
            {tiposRetenciones?.map(r => <option value={r.retencion}>{r.retencion}</option>)}
          </select>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="descripcion" type='text'></input>
          <input value={alicuota} onChange={(e) => setAlicuota(e.target.value)} placeholder="alicuota" type='numbre' step="any" min={0}></input>
          <button>Agregar</button>
        </form>
        <hr></hr>
        <div>
          Total: $ {montoAbonadoTotal?.toLocaleString('de-DE')}
        </div>
        <div>
          {(monto - montoAbonadoTotal) >= 0 ? <span>Saldo restante: $ {(monto - montoAbonadoTotal)?.toLocaleString('de-DE')}</span> : <span>Saldo a favor: $ {(montoAbonadoTotal - monto)?.toLocaleString('de-DE')}</span>}
        </div>
        <div className={style.tContable}>
          <div className={style.parteSuperior}>
            Cuenta mayor: Proveedores
          </div>
          <div className={style.parteInferior}>
            {cuentaProveedor?.map(p => {
              return (
                <>
                  <div className={style.derecha}>
                    {p.concepto}
                  </div>
                  {p.concepto !== "saldo" ?
                    <>
                      <div className={p.concepto == "factura" ? style.derecha : style.izquierda}>
                        {p.concepto == "factura" ? null : p.importe?.toLocaleString('de-DE')}
                      </div>
                      <div className={p.concepto == "factura" ? style.izquierda : style.derecha}>
                        {p.concepto == "factura" ? p.importe?.toLocaleString('de-DE') : null}
                      </div>
                    </>
                    :
                    <>
                      <div className={style.izquierda}>
                        {p.importe > 0 ? null : (-p.importe)?.toLocaleString('de-DE')}
                      </div>
                      <div className={style.derecha}>
                        {p.importe > 0 ? (p.importe)?.toLocaleString('de-DE') : null}
                      </div>
                    </>
                  }
                </>
              )
            })}

          </div>
        </div>
        <hr></hr>
      <div>
        <h3>Datos para el calculo de retenciones de ganancias:</h3>
        <div className={style.gananciasDatos}>

          <label>
            <input type='number' step="any" value={abonadoAnterior} onChange={handleAbonadoAnterior} />
            Importe abonado durante el mes al contribuyente
          </label>

          <label>
            <input type='number' step="any" value={retenidoAnterior} onChange={handleRetenidoAnterior} />
            Retenciones realizadas durante el mes al contribuyente
          </label>


          <label>
            <input type='number' step="any" value={minimoNoImponible} onChange={handleMinimoNoImponible} />
            Mínimo no imponible
          </label>

        </div>
      </div>
      </div>
    </div>
  )
}

export default CalculadoraRetenciones;