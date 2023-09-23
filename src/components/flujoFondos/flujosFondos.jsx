import React, { useEffect, useState } from 'react';
import { irr, npv } from 'financial';
import style from './modulocss.module.css'

export const FlujosFondos = ({ onTIRCalculado, id, flujosEnviados, incremental, nombre, defaultValues }) => {
  const defaultV = [{ año: 0, flujo: null }]
  const [flujos, setFlujos] = useState(defaultValues?.flujos ? defaultValues?.flujos : defaultV);
  const [cantidadFlujos, setCantidadFlujos] = useState(defaultValues?.flujos ? defaultValues?.flujos?.length - 1 : 0);
  const [irrValue, setIrrValue] = useState();
  const [vanValue, setVanValue] = useState();
  const [rate, setRate] = useState(defaultValues ? defaultValues.rate : 0);
  const [tasaExigida, setTasaExigida] = useState("-");

  useEffect(() => {
    if (defaultValues) {
      setFlujos(defaultValues.flujos)

    }
  }, [defaultValues])

  const handleCantidadChange = (e) => {
    const newCantidad = parseInt(e.target.value);
    setCantidadFlujos(newCantidad);

    // Crear un arreglo con los flujos necesarios, eliminando los extras si es necesario
    const newFlujos = flujos.slice(0, newCantidad + 1);
    for (let i = flujos.length; i < newCantidad + 1; i++) {
      newFlujos.push({ año: i, flujo: null });
    }

    setFlujos(newFlujos);
  };

  const handleFlujoChange = (index, e) => {
    const newFlujos = [...flujos];
    const inputValue = e.target.value;

    if (inputValue === "" || inputValue === "-" || inputValue === "-.") {
      newFlujos[index].flujo = inputValue;
    } else {
      newFlujos[index].flujo = parseFloat(inputValue);
    }

    setFlujos(newFlujos);
  };

  const calculateIRR = (e) => {
    e.preventDefault()
    const tasa = parseFloat(rate)

    const flowValues = flujos.map((f) => f.flujo); // Obtener solo los valores de flujo
    setIrrValue(irr(flowValues)); // Calcular la tasa interna de retorno
    setVanValue(npv(tasa, flowValues)); // Calcular la valor actual neto
    setTasaExigida(tasa)
    if (onTIRCalculado) {
      onTIRCalculado(irr(flowValues), tasa, npv(tasa, flowValues), flujos?.length - 1, flujos[0].flujo, flujos)
    }
  };

  return (
    <form >
      <h3>{nombre}</h3>
      <div className={style.valores}>
        <label>
          <span>
            Cantidad de flujos
          </span>
          <input
            min={0}
            value={cantidadFlujos}
            max={20}
            onChange={handleCantidadChange}
            type='number'
          />
        </label>
        <label>
          <span>
            Tasa exigida (en decimales)
          </span>
          <input
            min={0}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            step="any"
            type='number'
          />
        </label>
      </div>
      <br />
      <div className={style.flujosTabla}>
        <table >
          <thead>
            <tr>
              {flujos?.map((f, index) => (
                <th key={index}>{f.año}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {flujos?.map((f, index) => (
                <td key={index}>
                  <input
                    value={f.flujo}
                    onChange={(e) => handleFlujoChange(index, e)}
                    step="any"
                    type='number'
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <h3 id={`TIR-${id}`} className={irrValue >= tasaExigida ? style.positivo : style.negativo}>
        TIR {incremental ? "incremental" : null}:{irrValue ? Math.round(irrValue * 100, -2) : "-"}%
      </h3>
      <h3 id={`VAN-${id}`} className={vanValue >= 0 ? style.positivo : style.negativo}>
        VAN: {vanValue !== undefined ? vanValue?.toFixed(2) : '-'}
      </h3>
      <h3>
        Tasa exigida: {tasaExigida ? `${tasaExigida * 100}%` : '-'}
      </h3>
      {incremental ? <div>
        <p>La tasa incremental es aquella tasa exigida que iguala el VAN en ambos proyectos.</p>
        <p>De esta forma podemos separar el análisis en dos tramos:</p><ul>
          <li>1) Hasta la tasa exigida {Math.round(irrValue * 100, -2)}% conviene aquel proyecto con mayor VAN.</li>
          <li>2) Desde la tasa {Math.round(irrValue * 100, -2)}% hasta la TIR (exigir una tasa mayor a la TIR implica un VAN en negativo)
            convendrá el otro proyecto ya que en ese tramo tendrá un VAN superior.</li></ul>
      </div> : null}
      <button
        onClick={(e) => calculateIRR(e)}
        className='home-boton'>
        Calcular
      </button>
    </form>
  );
};
