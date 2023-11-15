import React, { useEffect, useRef, useState } from "react";
import style from './conciliacion.module.css'
import { v4 as uuidv4 } from 'uuid';
import { buscarPosiblesTotal } from "./buscarPosibles";
import { mayorEjemplo, resumenEjemplo } from "./ejemplos";
import { evaluarCombinaciones } from "./evaluarCombinaciones";
import { convertirFecha } from "./convertirFecha";
import { botConciliacion } from "./botConciliacion";
import { encontrarSumasPosibles } from "./encontrarPosibles";
import { conciliar } from "./conciliarMovimientos";
import { alertareiniciarTabla } from "../alertas";
import { FlechaAmbas, FlechaDerecha, FlechaIzquierda } from "./svgFlechas";

const MyFileReader = () => {
  const fileInputMayorRef = useRef(null);
  const fileInputRef = useRef(null);

  const [resumenBancario, setResumenBancario] = useState(null);
  const [mayorBanco, setMayorBanco] = useState(null);

  const [resumenBancarioSaldoInicial, setResumenBancarioSaldoInicial] = useState(0);
  const [mayorBancoSaldoInicial, setMayorBancoSaldoInicial] = useState(0);
  const [resumenBancarioSaldoFinal, setResumenBancarioSaldoFinal] = useState(0);
  const [mayorBancoSaldoFinal, setMayorBancoSaldoFinal] = useState(0);
  const [resumenBancarioMonto, setResumenBancarioMonto] = useState(0);
  const [mayorBancoMonto, setMayorBancoMonto] = useState(0);
  const [conciliados, setConciliados] = useState([]);
  const [mayorBancoValoresSeleccionados, setMayorBancoValoresSeleccionados] = useState([]);
  const [resumenBancarioValoresSeleccionados, setResumenBancarioValoresSeleccionados] = useState([]);
  const [mayorBancoMontoSeleccionados, setMayorBancoMontoSeleccionados] = useState(0);
  const [resumenBancarioMontoSeleccionados, setResumenBancarioMontoSeleccionados] = useState(0);
  const [mayorBancoMontoConciliado, setMayorBancoMontoConciliado] = useState(0);
  const [resumenBancarioMontoConciliado, setResumenBancarioMontoConciliado] = useState(0);

  const [verOpciones, setVerOpciones] = useState(false)
  const reiniciar = () => {
    // Restablece todos los valores
    setResumenBancarioSaldoInicial(0)
    setMayorBancoSaldoInicial(0)
    setResumenBancarioSaldoFinal(0)
    setMayorBancoSaldoFinal(0)
    setResumenBancario([])
    setMayorBanco([])
    setResumenBancarioMonto(0)
    setMayorBancoMonto(0)
    setConciliados([])
    setMayorBancoValoresSeleccionados([])
    setResumenBancarioValoresSeleccionados([])
    setMayorBancoMontoSeleccionados(0)
    setResumenBancarioMontoSeleccionados(0)
    setMayorBancoMontoConciliado(0)
    setResumenBancarioMontoConciliado(0)
  }


  const handleCargarEjemplo = () => {
    const registrosResumen = JSON.parse(JSON.stringify(resumenEjemplo));
    const registrosMayor = JSON.parse(JSON.stringify(mayorEjemplo));

    //const registrosResumen = resumenEjemplo // Clona el objeto resumenEjemplo
    setResumenBancarioSaldoInicial(
      registrosResumen[0].saldo - registrosResumen[0].haber + registrosResumen[0].debe
    );
    setResumenBancarioSaldoFinal(registrosResumen[registrosResumen.length - 1].saldo);

    setResumenBancario(registrosResumen);

    //const registrosMayor = mayorEjemplo
    setMayorBancoSaldoInicial((registrosMayor[0].saldo + registrosMayor[0].haber - registrosMayor[0].debe));
    setMayorBancoSaldoFinal((registrosMayor[registrosMayor.length - 1].saldo));

    setMayorBanco(registrosMayor);
  };
  const [opcionesSubida, setOpcionesSubida] = useState({
    separador: "|",
    ubicaciones: [
      0, 1, 2, 3, 4
    ]
  })

  const handleChangeOpcionesSubida = (campo, valor) => {
    if (campo === 'separador') {
      setOpcionesSubida({
        ...opcionesSubida,
        separador: valor
      });
    } else {
      const index = parseInt(campo, 10);
      //console.log(index, campo)
      if (parseInt(valor) >= 0) {

        if (!isNaN(index) && index >= 0 && index < opcionesSubida?.ubicaciones?.length) {
          const nuevasUbicaciones = [...opcionesSubida?.ubicaciones];
          nuevasUbicaciones[index] = parseInt(valor);
          setOpcionesSubida({
            ...opcionesSubida,
            ubicaciones: nuevasUbicaciones
          });
        }
      }
    }
  };
  //console.log(opcionesSubida)
  const handleFileUpload = (event) => {

    const file = event.target.files[0]
    console.log(file)
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result.split("\n");
      const registros = [];

      for (let i = 1; i < content.length; i++) {
        const valores = content[i].split(opcionesSubida?.separador).map((valor) => valor.trim());

        // if (valores.length === 5) {
        //const [fecha, concepto, debe, haber, saldo] = valores;
        const id = uuidv4();; // Puedes utilizar el índice como ID o asignar uno específico

        registros.push({
          extracto: "resumen", conciliado: false, seleccionado: false, id,
          fecha: valores[opcionesSubida.ubicaciones[0]],
          concepto: valores[opcionesSubida.ubicaciones[1]],
          debe: parseFloat(valores[opcionesSubida.ubicaciones[2]]) || 0,
          haber: parseFloat(valores[opcionesSubida.ubicaciones[3]]) || 0,
          saldo: parseFloat(valores[opcionesSubida.ubicaciones[4]]) || 0
        });

      }

      setResumenBancarioSaldoInicial((registros[0].saldo - registros[0].haber + registros[0].debe))
      setResumenBancarioSaldoFinal((registros[registros.length - 1].saldo))
      setResumenBancario(registros);
      fileInputRef.current.value = null;
    };

    reader.readAsText(file);
  };

  const handleFileUploadMayor = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result.split("\n");
      const registros = [];

      for (let i = 1; i < content.length; i++) {
        const valores = content[i].split(opcionesSubida?.separador).map((valor) => valor.trim());

        // if (valores.length === 5) {
        //const [fecha, concepto, debe, haber, saldo] = valores;

        const id = uuidv4(); // Puedes utilizar el índice como ID o asignar uno específico

        registros.push({
          extracto: "mayor", conciliado: false, seleccionado: false, id,
          fecha: valores[opcionesSubida.ubicaciones[0]],
          concepto: valores[opcionesSubida.ubicaciones[1]],
          debe: parseFloat(valores[opcionesSubida.ubicaciones[2]]) || 0,
          haber: parseFloat(valores[opcionesSubida.ubicaciones[3]]) || 0,
          saldo: parseFloat(valores[opcionesSubida.ubicaciones[4]]) || 0
        });
      }

      setMayorBancoSaldoInicial((registros[0].saldo + registros[0].haber - registros[0].debe));
      setMayorBancoSaldoFinal((registros[registros.length - 1].saldo));
      setMayorBanco(registros);
      fileInputMayorRef.current.value = null;
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

  const enviarConciliacion = () => {
    const newC = conciliar(resumenBancarioValoresSeleccionados, mayorBancoValoresSeleccionados, resumenBancarioMontoSeleccionados, mayorBancoMontoSeleccionados, tratamiendoRealizado, conciliados, resumenBancario, mayorBanco, agregarEn)
    const newConciliados = [...conciliados, newC]
    setConciliados(newConciliados)
    setResumenBancarioValoresSeleccionados([])
    setMayorBancoValoresSeleccionados([])
  }
  console.log("CONCILIADOS:", conciliados)
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
  const [agregarEn, setAgregarEn] = useState("Mayor")
  const handleChangeTratamiento = (e) => {
    setTratamientoRealizado(e.target.value)
  }

  const handleChangeAgregarEn = (e) => {
    setAgregarEn(e.target.value)
  }

  const eliminarConciliacion = (index) => {
    //console.log(index);

    const indicesResumen = conciliados[index].resumen.map(selectedValue => {
      return resumenBancario.findIndex(v => v.id === selectedValue.id);
    });

    const indicesBanco = conciliados[index].mayor.map(selectedValue => {
      return mayorBanco.findIndex(v => v.id === selectedValue.id);
    });

    //console.log(indicesResumen, indicesBanco);
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

  //////////////////////////////////////////////////////////////////////BUSCAR ALTERNATIVAS POSIBLES/////////////////////////////////////////////////////////////////////
  const [numbers, setNumbers] = useState()
  const [targetSum, setTargetSum] = useState()
  const [sumasPosibles, setSumasPosibles] = useState([]);
  const [sumasPosiblesEvaluadas, setSumasPosiblesEvaluadas] = useState([]);

  useEffect(() => {

    console.log("PUNTUACIONES", evaluarCombinaciones(sumasPosibles, mayorBancoValoresSeleccionados, resumenBancarioValoresSeleccionados, targetSum))
    const posiblesOrdenadas = evaluarCombinaciones(sumasPosibles, mayorBancoValoresSeleccionados, resumenBancarioValoresSeleccionados, targetSum)?.sort((a, b) => {
      // Comparamos los valores de puntuación, que están en el último elemento de cada sub-array
      const puntuacionA = a.puntuacion;
      const puntuacionB = b.puntuacion;

      // Ordenamos de forma descendente (mayor a menor)
      return puntuacionB - puntuacionA;
    });

    console.log("PUNTUACIONES ORDENADAS", posiblesOrdenadas)
    setSumasPosiblesEvaluadas(posiblesOrdenadas)
  }, [sumasPosibles])

  //console.log(sumasPosibles, targetSum)
  console.log(mayorBancoValoresSeleccionados, resumenBancarioValoresSeleccionados)

  useEffect(() => {
    if ((mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados) !== 0) {
      setTargetSum(mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados);
    }
  }, [mayorBancoMontoSeleccionados, resumenBancarioMontoSeleccionados]);

  const buscarPosibles = async (buscar) => {
    setAlternativa(0)
    setSumasPosibles([])

    const newNumbers = await buscarPosiblesTotal(buscar, mayorBancoMontoSeleccionados, resumenBancarioMontoSeleccionados, resumenBancario, mayorBanco)
    //console.log(newNumbers)
    const posibles = encontrarSumasPosibles(newNumbers, targetSum, 0, 0, []);
    setSumasPosibles(posibles)
  }

  const [alternativa, setAlternativa] = useState()
  console.log("SUMASPOSIBLES", sumasPosibles)
  useEffect(() => {
    // Elimina todas las clases "encontrarSeccion" de elementos
    const elementsToRemove = document.querySelectorAll(".encontrarSeccion");
    elementsToRemove.forEach(element => {
      element.classList.remove("encontrarSeccion");
    });

    const ordenados = sumasPosiblesEvaluadas?.sort((a, b) => {
      // Comparamos los valores de puntuación, que están en el último elemento de cada sub-array
      const puntuacionA = a.puntuacion;
      const puntuacionB = b.puntuacion;

      // Ordenamos de forma descendente (mayor a menor)
      return puntuacionB - puntuacionA;
    })

    ordenados?.map((s, index) => s.combinaciones?.map(i => {
      console.log(alternativa, index, s)
      if (alternativa === index) {
        const element = document.getElementById(i.id);
        if (element) {
          element.classList.add("encontrarSeccion");
        }
      }
    }
    ));

  }, [sumasPosiblesEvaluadas, alternativa])

  const botConciliacionActualizar = async () => {
    const nuevaConciliacion = await botConciliacion(resumenBancario, mayorBanco, conciliados)
    setConciliados(nuevaConciliacion)

  }

  console.log(mayorBanco, resumenBancario, numbers)
  return (
    <div className={style.contenedorGlobal}>
      <div className={style.contenedorDiferencia}>
        <button className="btn btn-danger" onClick={() => alertareiniciarTabla(reiniciar)}>Reiniciar</button>
        <h1>Conciliación bancaria</h1>
        <button className="btn btn-primary" onClick={() => botConciliacionActualizar(resumenBancario, mayorBanco, conciliados)}>Conciliación automatica</button>
        <h3>
          <span style={(mayorBancoMonto - resumenBancarioMonto) !== 0 ? { color: "red" } : { color: "green" }}>
            Diferencia a conciliar: {(mayorBancoMonto - resumenBancarioMonto) || 0}
          </span>
        </h3>
        <button className="home-boton" onClick={() => handleCargarEjemplo()}>Cargar ejemplo práctico</button>
      </div>
      <div className={style.contenedorConciliacionPrincipal}>
        <div className={style.tablas}>
          Seleccionado: {resumenBancarioMontoSeleccionados || 0}
          <h3>Resumen Bancario</h3>
          <table>
            <tr><td>Saldo Inicial:</td> <td>{(resumenBancarioSaldoInicial || 0)}</td></tr>
            <tr><td>Movimientos a conciliar:</td> <td>{(resumenBancarioMonto || 0)}</td></tr>
            <tr><td>Movimientos conciliados:</td> <td>{(resumenBancarioMontoConciliado || 0)}</td></tr>
            <tr><td>Saldo Final Conciliado:</td> <td>{(resumenBancarioSaldoInicial || 0) + (resumenBancarioMonto || 0) + (resumenBancarioMontoConciliado || 0)}</td></tr>
            <tr><td>Saldo Final Original:</td> <td>{(resumenBancarioSaldoFinal || 0)}</td></tr>
          </table>
          <hr></hr>
          <input type="file" accept=".txt" onChange={handleFileUpload} ref={fileInputRef} />

          <button className="home-boton" onClick={() => setVerOpciones(!verOpciones)}>opciones de subida</button>
          <div className={style.opciones} style={{ display: verOpciones ? "flex" : "none" }}>
            Separador de columnas:<input placeholder="separador" value={opcionesSubida?.separador} type="text" onChange={(e) => handleChangeOpcionesSubida('separador', e.target.value)} />
            Nº columna fecha:<input placeholder="fecha" value={opcionesSubida?.ubicaciones[0]} type="number" onChange={(e) => handleChangeOpcionesSubida(0, e.target.value)} />
            Nº columna concepto:<input placeholder="concepto" value={opcionesSubida?.ubicaciones[1]} type="number" onChange={(e) => handleChangeOpcionesSubida(1, e.target.value)} />
            Nº columna debe:<input placeholder="debe" value={opcionesSubida?.ubicaciones[2]} type="number" onChange={(e) => handleChangeOpcionesSubida(2, e.target.value)} />
            Nº columna haber:<input placeholder="haber" value={opcionesSubida?.ubicaciones[3]} type="number" onChange={(e) => handleChangeOpcionesSubida(3, e.target.value)} />
            Nº columna saldo:<input placeholder="saldo" value={opcionesSubida?.ubicaciones[4]} type="number" onChange={(e) => handleChangeOpcionesSubida(4, e.target.value)} />
          </div>

        </div>
        <div></div>
        <div className={style.tablas}>
          Seleccionado: {mayorBancoMontoSeleccionados || 0}
          <h3>Mayor Banco</h3>
          <table>
            <tr><td>Saldo Inicial:</td> <td>{(mayorBancoSaldoInicial || 0)}</td></tr>
            <tr><td>Movimientos a conciliar:</td> <td>{(mayorBancoMonto || 0)}</td></tr>
            <tr><td>Movimientos conciliados:</td> <td>{(mayorBancoMontoConciliado || 0)}</td></tr>
            <tr><td>Saldo Final Conciliado:</td> <td>{(mayorBancoSaldoInicial || 0) + (mayorBancoMonto || 0) + (mayorBancoMontoConciliado || 0)}</td></tr>
            <tr><td>Saldo Final Original:</td> <td>{(mayorBancoSaldoFinal || 0)}</td></tr>
          </table>
          <hr></hr>
          {/* <button onClick={() => handleCargarEjemplo()}>Cargar ejemplo práctico</button> */}
          <input type="file" accept=".txt" onChange={handleFileUploadMayor} ref={fileInputMayorRef} />
        </div>
      </div>
      <div className={style.contenedorConciliacionPrincipal}>
        <div className={style.tablas}>
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
                        id={registro.id}
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
        <div className={style.botonBuscarPosibles}>
          <button className={style.botonBuscar} onClick={() => buscarPosibles()}><FlechaAmbas /></button>
          <button className={style.botonBuscar} onClick={() => buscarPosibles("mayor")}><FlechaDerecha /></button>
          <button className={style.botonBuscar} onClick={() => buscarPosibles("resumen")}><FlechaIzquierda /></button>
        </div>
        <div className={style.tablas}>
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
                        id={registro.id}
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
        <button className="home-boton" onClick={() => enviarConciliacion()}>Conciliar</button>

        Diferencia: {mayorBancoMontoSeleccionados - resumenBancarioMontoSeleccionados}
        <div>
          <div>
            <span>Sumas Posibles: </span>
            {sumasPosiblesEvaluadas?.map((combinacion, index) => {
              return (
                <button
                  style={combinacion?.puntuacion > 0.5 ? { color: "green", borderColor: "green" } : { color: "red", borderColor: "red" }}
                  className={alternativa == index ? `${style.botonAlternativa} home-boton` : "home-boton"}
                  onClick={() => setAlternativa(index)}>
                  {index + 1}
                </button>
              )
            }
            )}
          </div>
        </div>
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
