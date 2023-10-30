import React, { useEffect, useState } from "react";
import style from './conciliacion.module.css'
import { v4 as uuidv4 } from 'uuid';
import { alertainfo } from "../alertas";

const MyFileReader = () => {
  const [resumenBancarioSaldoInicial, setResumenBancarioSaldoInicial] = useState(0);
  const [mayorBancoSaldoInicial, setMayorBancoSaldoInicial] = useState(0);
  const [resumenBancario, setResumenBancario] = useState(null);
  const [mayorBanco, setMayorBanco] = useState(null);
  const [resumenBancarioMonto, setResumenBancarioMonto] = useState(0);
  const [mayorBancoMonto, setMayorBancoMonto] = useState(0);
  const [conciliados, setConciliados] = useState([]);
  const [mayorBancoValoresSeleccionados, setMayorBancoValoresSeleccionados] = useState([]);
  const [resumenBancarioValoresSeleccionados, setResumenBancarioValoresSeleccionados] = useState([]);
  const [mayorBancoMontoSeleccionados, setMayorBancoMontoSeleccionados] = useState(0);
  const [resumenBancarioMontoSeleccionados, setResumenBancarioMontoSeleccionados] = useState(0);
  const [mayorBancoMontoConciliado, setMayorBancoMontoConciliado] = useState(0);
  const [resumenBancarioMontoConciliado, setResumenBancarioMontoConciliado] = useState(0);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result.split("\n");
      const registros = [];

      for (let i = 1; i < content.length; i++) {
        const valores = content[i].split("|").map((valor) => valor.trim());

        if (valores.length === 5) {
          const [fecha, concepto, debe, haber, saldo] = valores;
          const id = uuidv4();; // Puedes utilizar el índice como ID o asignar uno específico

          registros.push({ conciliado: false, seleccionado: false, id, fecha, concepto, debe: parseFloat(debe), haber: parseFloat(haber), saldo: parseFloat(saldo) });
        }
      }

      setResumenBancarioSaldoInicial(registros[0].saldo)
      setResumenBancario(registros);
    };

    reader.readAsText(file);
  };

  const handleFileUploadMayor = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result.split("\n");
      const registros = [];

      for (let i = 1; i < content.length; i++) {
        const valores = content[i].split("|").map((valor) => valor.trim());

        if (valores.length === 5) {
          const [fecha, concepto, debe, haber, saldo] = valores;
          const id = uuidv4(); // Puedes utilizar el índice como ID o asignar uno específico

          registros.push({ conciliado: false, seleccionado: false, id, fecha, concepto, debe: parseFloat(debe), haber: parseFloat(haber), saldo: parseFloat(saldo) });
        }
      }

      setMayorBancoSaldoInicial(registros[0].saldo);
      setMayorBanco(registros);
    };

    reader.readAsText(file);
  };

  useEffect(() => {

    const sumaTotal = resumenBancario
      ?.filter(v => v.seleccionado) // Filtrar solo los elementos seleccionados
      ?.reduce((total, v) => total + v.haber - v.debe, 0); // Sumar los valores
    setResumenBancarioMontoSeleccionados(sumaTotal || 0);

  }, [resumenBancarioValoresSeleccionados]);

  useEffect(() => {

    const sumaTotal = mayorBanco
      ?.filter(v => v.seleccionado) // Filtrar solo los elementos seleccionados
      ?.reduce((total, v) => total - v.haber + v.debe, 0); // Sumar los valores
    setMayorBancoMontoSeleccionados(sumaTotal || 0);

  }, [mayorBancoValoresSeleccionados]);

  useEffect(() => {
    //METODO ANTERIOR QUE PUEDO RECORRER LOS ESTADOS ORIGINALES, NO SIRVE PARA LOS AJUSTES QUE NO SE AGREGAN AHI
    //   const sumaTotal = resumenBancario
    //     ?.filter(v => v.conciliado) // Filtrar solo los elementos seleccionados
    //     ?.reduce((total, v) => total + v.haber - v.debe, 0); // Sumar los valores
    //   setResumenBancarioMontoConciliado(sumaTotal);
    // }, [conciliados]);

    // useEffect(() => {
    //   const sumaTotal = mayorBanco
    //     ?.filter(v => v.conciliado) // Filtrar solo los elementos Conciliado
    //     ?.reduce((total, v) => total - v.haber + v.debe, 0); // Sumar los valores
    //   setMayorBancoMontoConciliado(sumaTotal);
    //METODO NUEVO: RECORRER EL ARRAY DE CONCILIADOS
    const sumaTotal = conciliados
      .filter(item => item.resumen) // Filtrar elementos con la propiedad "resumen"
      .reduce((acc, item) => {
        // Sumar los valores de "debe" y restar los valores de "haber" de todos los elementos
        return {
          debe: acc.debe + item.resumen.reduce((total, resumenItem) => total + resumenItem.debe, 0),
          haber: acc.haber + item.resumen.reduce((total, resumenItem) => total + resumenItem.haber, 0),
        };
      }, { debe: 0, haber: 0 });

    setResumenBancarioMontoConciliado(sumaTotal.haber - sumaTotal.debe);


    const sumaTotalMayor = conciliados
      .filter(item => item.mayor) // Filtrar elementos con la propiedad "mayor"
      .reduce((acc, item) => {
        // Sumar los valores de "debe" y restar los valores de "haber" de todos los elementos
        return {
          debe: acc.debe + item.mayor.reduce((total, mayorItem) => total + mayorItem.debe, 0),
          haber: acc.haber + item.mayor.reduce((total, mayorItem) => total + mayorItem.haber, 0),
        };
      }, { debe: 0, haber: 0 });

    setMayorBancoMontoConciliado(sumaTotalMayor.debe - sumaTotalMayor.haber);


  }, [conciliados]);


  useEffect(() => {
    const sumaTotal = resumenBancario
      ?.filter(v => !v.conciliado) // Filtrar solo los elementos seleccionados
      ?.reduce((total, v) => total + v.haber - v.debe, 0); // Sumar los valores
    setResumenBancarioMonto(sumaTotal);

    const sumaTotalMayor = mayorBanco
      ?.filter(v => !v.conciliado) // Filtrar solo los elementos Conciliado
      ?.reduce((total, v) => total - v.haber + v.debe, 0); // Sumar los valores
    setMayorBancoMonto(sumaTotalMayor);

  }, [resumenBancario, mayorBanco, conciliados]);

  // const señalarIguales = (concepto) => {
  //   //console.log(concepto)
  //   if (document.querySelector(".RemarcarAyudaEditor")) {
  //     document.querySelector(".RemarcarAyudaEditor")?.classList.remove("RemarcarAyudaEditor")
  //     document.querySelector(".RemarcarAyudaEditor")?.classList.remove("RemarcarAyudaEditor")
  //   }
  //   document.getElementById(`resumen-${concepto}`)?.classList.add("RemarcarAyudaEditor")
  //   document.getElementById(`mayor-${concepto}`)?.classList.add("RemarcarAyudaEditor")
  // }

  const handleCheckboxChange = (event, registro) => {
    const isChecked = event.target.checked;

    // Encuentra el índice del registro en el array original
    const indice = resumenBancario.findIndex(v => v.id === registro.id);

    if (isChecked) {
      // Si el checkbox está marcado, modifica el registro directamente en 'resumenBancario'
      if (indice !== -1) {
        resumenBancario[indice].seleccionado = true;
      }
      // Agrega el registro a la lista de seleccionados
      setResumenBancarioValoresSeleccionados([...resumenBancarioValoresSeleccionados, registro]);
    } else {
      // Si el checkbox está desmarcado, modifica el registro directamente en 'resumenBancario'
      if (indice !== -1) {
        resumenBancario[indice].seleccionado = false;
      }
      // Elimina el registro de la lista de seleccionados
      setResumenBancarioValoresSeleccionados(resumenBancarioValoresSeleccionados?.filter(v => v.id !== registro.id));
    }
  };

  const handleCheckboxChangeMayor = (event, registro) => {
    const isChecked = event.target.checked;

    // Encuentra el índice del registro en el array original
    const indice = mayorBanco.findIndex(v => v.id === registro.id);

    if (isChecked) {
      // Si el checkbox está marcado, modifica el registro directamente en 'mayorBanco'
      if (indice !== -1) {
        mayorBanco[indice].seleccionado = true;
      }
      // Agrega el registro a la lista de seleccionados
      setMayorBancoValoresSeleccionados([...mayorBancoValoresSeleccionados, registro]);
    } else {
      // Si el checkbox está desmarcado, modifica el registro directamente en 'mayorBanco'
      if (indice !== -1) {
        mayorBanco[indice].seleccionado = false;
      }
      // Elimina el registro de la lista de seleccionados
      setMayorBancoValoresSeleccionados(mayorBancoValoresSeleccionados?.filter(v => v.id !== registro.id));
    }
  };

  const conciliar = () => {
    if (resumenBancarioValoresSeleccionados - mayorBancoValoresSeleccionados.length == 0) {
      alertainfo("Debes seleccionar movimientos para conciliar")
    } else {

      if (resumenBancarioMontoSeleccionados == mayorBancoMontoSeleccionados) {

        const nuevoConciliado = { tratamiento: "coincidencia", resumen: resumenBancarioValoresSeleccionados, mayor: mayorBancoValoresSeleccionados }
        const newConciliados = [...conciliados, nuevoConciliado]
        setConciliados(newConciliados)

        const indicesResumen = resumenBancarioValoresSeleccionados.map(selectedValue => {
          return resumenBancario.findIndex(v => v.id === selectedValue.id);
        });

        const indicesBanco = mayorBancoValoresSeleccionados.map(selectedValue => {
          return mayorBanco.findIndex(v => v.id === selectedValue.id);
        });

        indicesResumen?.map(ir => { return resumenBancario[ir].conciliado = true, resumenBancario[ir].seleccionado = false })
        indicesBanco?.map(ir => { return mayorBanco[ir].conciliado = true, mayorBanco[ir].seleccionado = false })

        setResumenBancarioValoresSeleccionados([])
        setMayorBancoValoresSeleccionados([])
      }
      //SI HAY DIFERENCIA. SE AGREGA EL TRATAMIENTO RESPECTIVO
      else {
        //TENGO QUE AGREGAR UNA CONTRA PARTIDA
        const rBancario = [...resumenBancarioValoresSeleccionados]
        const mBanco = [...mayorBancoValoresSeleccionados]
        if (agregarEn == "Mayor") {//TENGO QUE AGREGAR MOVIMIENTO AL MAYOR 
          mBanco.push({
            conciliado: true,
            seleccionado: false,
            id: uuidv4(),
            fecha: "Ajuste",
            concepto: `Ajuste: ${tratamiendoRealizado}`,
            debe: (mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados < 0 ? -(mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados) : 0),
            haber: (mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados > 0 ? (mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados) : 0),
            saldo: ""
          })
        } else {
          rBancario.push({
            conciliado: true,
            seleccionado: false,
            id: uuidv4(),
            fecha: "Ajuste",
            concepto: `Ajuste: ${tratamiendoRealizado}`,
            debe: (mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados < 0 ? -(mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados) : 0),
            haber: (mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados > 0 ? (mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados) : 0),
            saldo: ""
          })
        }
        const nuevoConciliado = { tratamiento: tratamiendoRealizado, resumen: rBancario, mayor: mBanco }

        const newConciliados = [...conciliados, nuevoConciliado]
        setConciliados(newConciliados)

        const indicesResumen = resumenBancarioValoresSeleccionados.map(selectedValue => {
          return resumenBancario.findIndex(v => v.id === selectedValue.id);
        });

        const indicesBanco = mayorBancoValoresSeleccionados.map(selectedValue => {
          return mayorBanco.findIndex(v => v.id === selectedValue.id);
        });

        indicesResumen?.map(ir => { return resumenBancario[ir].conciliado = true, resumenBancario[ir].seleccionado = false })
        indicesBanco?.map(ir => { return mayorBanco[ir].conciliado = true, mayorBanco[ir].seleccionado = false })

        setResumenBancarioValoresSeleccionados([])
        setMayorBancoValoresSeleccionados([])
      }
    }
  }

  const tratamientos = [
    {
      id: "temporal",
      nombre: "Diferencia temporal"
    },
    {
      id: "permanente",
      nombre: "Diferencia permanente"
    }
  ]
  const [tratamiendoRealizado, setTratamientoRealizado] = useState("temporal")
  const [agregarEn, setAgregarEn] = useState("resumen")
  const handleChangeTratamiento = (e) => {
    setTratamientoRealizado(e.target.value)
  }

  const handleChangeAgregarEn = (e) => {
    setAgregarEn(e.target.value)
  }

  const eliminarConciliacion = (index) => {
    console.log(index);

    const indicesResumen = conciliados[index].resumen.map(selectedValue => {
      return resumenBancario.findIndex(v => v.id === selectedValue.id);
    });

    const indicesBanco = conciliados[index].mayor.map(selectedValue => {
      return mayorBanco.findIndex(v => v.id === selectedValue.id);
    });

    console.log(indicesResumen, indicesBanco);
    indicesResumen.forEach(ir => {
      if (ir !== -1)
        resumenBancario[ir].conciliado = false;
    });

    indicesBanco.forEach(ib => {
      if (ib !== -1)
        mayorBanco[ib].conciliado = false;
    });

    setConciliados(conciliados.filter((a, i) => i !== index));
  }


  // console.log(conciliados)
  // console.log(mayorBanco, resumenBancario)
  // console.log(agregarEn)
  // console.log(tratamiendoRealizado)
  return (
    <div className={style.contenedorGlobal}>
      <div className={style.contenedorDiferencia}>
        <h1>Conciliación bancaria</h1>
        <h3>
          <span style={(mayorBancoMonto - resumenBancarioMonto) !== 0 ? { color: "red" } : { color: "green" }}>
            Diferencia a conciliar: {(mayorBancoMonto - resumenBancarioMonto) || 0}
          </span>
        </h3>
      </div>
      <div className={style.contenedorConciliacion}>
        <div className={style.tablas}>
          Seleccionado: {resumenBancarioMontoSeleccionados || 0}
          <h3>Resumen Bancario</h3>
          <table>
            <tr><td>Saldo Inicial:</td> <td>{(resumenBancarioSaldoInicial || 0)}</td></tr>
            <tr><td>Movimientos a conciliar:</td> <td>{(resumenBancarioMonto || 0)}</td></tr>
            <tr><td>Movimientos conciliados:</td> <td>{(resumenBancarioMontoConciliado || 0)}</td></tr>
            <tr><td>Saldo Final:</td> <td>{(resumenBancarioSaldoInicial || 0) + (resumenBancarioMonto || 0) + (resumenBancarioMontoConciliado || 0)}</td></tr>
          </table>
          <hr></hr>
          <input type="file" accept=".txt" onChange={handleFileUpload} />
          {resumenBancario && resumenBancario.length > 0 && (
            <table>
              <thead>
                {resumenBancario.length > 0 && (
                  <tr>
                    <th></th>
                    <th>Fecha</th>
                    <th>Concepto</th>
                    <th>Debe</th>
                    <th>Haber</th>
                    <th>Saldo</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {resumenBancario.map((registro, index) => {
                  if (registro.conciliado == false) {
                    return (
                      <tr
                        //onMouseEnter={() => señalarIguales(registro.id)}
                        key={registro.id}>
                        <td>
                          <input
                            value={registro.seleccionado}
                            onChange={(event) => handleCheckboxChange(event, registro)}
                            type="checkbox"
                            checked={registro.seleccionado}
                          />
                        </td>
                        <td>{registro.fecha}</td>
                        <td>{registro.concepto}</td>
                        <td>{registro.debe}</td>
                        <td>{registro.haber}</td>
                        <td>{registro.saldo}</td>
                      </tr>
                    )
                  }
                }
                )}
              </tbody>
            </table>
          )}
        </div>
        <div className={style.tablas}>
          Seleccionado: {mayorBancoMontoSeleccionados || 0}
          <h3>Mayor Banco</h3>
          <table>
            <tr><td>Saldo Inicial:</td> <td>{(mayorBancoSaldoInicial || 0)}</td></tr>
            <tr><td>Movimientos a conciliar:</td> <td>{(mayorBancoMonto || 0)}</td></tr>
            <tr><td>Movimientos conciliados:</td> <td>{(mayorBancoMontoConciliado || 0)}</td></tr>
            <tr><td>Saldo Final:</td> <td>{(mayorBancoSaldoInicial || 0) + (mayorBancoMonto || 0) + (mayorBancoMontoConciliado || 0)}</td></tr>
          </table>
          <hr></hr>
          <input type="file" accept=".txt" onChange={handleFileUploadMayor} />
          {mayorBanco && mayorBanco.length > 0 && (
            <table>
              <thead>
                {mayorBanco.length > 0 && (
                  <tr>
                    <th></th>
                    <th>Fecha</th>
                    <th>Concepto</th>
                    <th>Debe</th>
                    <th>Haber</th>
                    <th>Saldo</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {mayorBanco.map((registro, index) => {
                  if (registro.conciliado == false) {
                    return (
                      <tr
                        //onMouseEnter={() => señalarIguales(registro.id)}
                        key={registro.id}>
                        <td>
                          <input
                            value={registro.seleccionado}
                            onChange={(event) => handleCheckboxChangeMayor(event, registro)}
                            type="checkbox"
                            checked={registro.seleccionado}
                          />
                        </td>
                        <td>{registro.fecha}</td>
                        <td>{registro.concepto}</td>
                        <td>{registro.debe}</td>
                        <td>{registro.haber}</td>
                        <td>{registro.saldo}</td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className={style.cuadroMando}>
        <button className="home-boton" onClick={() => conciliar()}>Conciliar</button>
        Diferencia: {mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados}
        {(mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados) !== 0 ?
          <>
            <select value={tratamiendoRealizado} onChange={handleChangeTratamiento}>
              {tratamientos?.map(t =>
                <option value={t.id}>
                  {t.nombre}
                </option>
              )}
            </select>
            <select value={agregarEn} onChange={handleChangeAgregarEn}>
              <option>
                Resumen
              </option>
              <option>
                Mayor
              </option>
            </select>
          </>
          : null
        }

      </div>
      <hr></hr>
      {/* CONCILIADOS */}
      <h3>Conciliados</h3>
      <div >
        <div className={style.contenedorConciliacion}>
          <div>
            <h3>Resumen Bancario Conciliado: {resumenBancarioMontoConciliado}</h3>
            <h3>Saldo Conciliado: {resumenBancarioSaldoInicial + resumenBancarioMontoConciliado}</h3>
          </div>
          <div>
            <h3>Mayor Banco Conciliado: {mayorBancoMontoConciliado}</h3>
            <h3>Saldo Conciliado: {mayorBancoSaldoInicial + mayorBancoMontoConciliado}</h3>
          </div>
        </div>
        {conciliados?.map((c, index) =>
          <div
            style={c.tratamiento == "coincidencia" ? { color: "green" } : c.tratamiento == "permanente" ? { color: "red" } : { color: "orange" }}
            className={style.contenedorConciliacion}>
            <div className={style.tablas}>
              <table>
                <thead>
                  <tr>
                    <th><button onClick={() => eliminarConciliacion(index)} className={`${style.botonEliminar} btn btn-danger`}>X</button></th>
                    <th>Fecha</th>
                    <th>Concepto</th>
                    <th>Debe</th>
                    <th>Haber</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {c?.resumen?.map(r =>
                    <tr>
                      <td></td>
                      <td>{r?.fecha}</td>
                      <td>{r?.concepto}</td>
                      <td>{r?.debe}</td>
                      <td>{r?.haber}</td>
                      <td>{r?.saldo}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className={style.tablas}>
              <table>
                <thead>
                  <tr>
                    <th><button onClick={() => eliminarConciliacion(index)} className={`${style.botonEliminar} btn btn-danger`}>X</button></th>
                    <th>Fecha</th>
                    <th>Concepto</th>
                    <th>Debe</th>
                    <th>Haber</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {c?.mayor?.map(m =>
                    <tr>
                      <td></td>

                      <td>{m?.fecha}</td>
                      <td>{m?.concepto}</td>
                      <td>{m?.debe}</td>
                      <td>{m?.haber}</td>
                      <td>{m?.saldo}</td>

                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyFileReader;
