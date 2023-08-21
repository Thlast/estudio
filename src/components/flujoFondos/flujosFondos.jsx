import React, { useState } from 'react';
import { irr, npv } from 'financial';
import style from './modulocss.module.css'

export const FlujosFondos = ({ onTIRCalculado, id }) => {
  const [flujos, setFlujos] = useState([{ año: 0, flujo: 0 }]);
  const [cantidadFlujos, setCantidadFlujos] = useState(0);
  const [irrValue, setIrrValue] = useState();
  const [vanValue, setVanValue] = useState();
  const [rate, setRate] = useState();

  const handleCantidadChange = (e) => {
    const newCantidad = parseInt(e.target.value);
    setCantidadFlujos(newCantidad);

    // Crear un arreglo con los flujos necesarios, eliminando los extras si es necesario
    const newFlujos = flujos.slice(0, newCantidad + 1);
    for (let i = flujos.length; i < newCantidad + 1; i++) {
      newFlujos.push({ año: i, flujo: 0 });
    }

    setFlujos(newFlujos);
  };

  const handleFlujoChange = (index, e) => {
    const newFlujos = [...flujos];
    newFlujos[index].flujo = parseFloat(e.target.value);
    setFlujos(newFlujos);
  };

  const calculateIRR = () => {
    const tasa = parseFloat(rate)

    const flowValues = flujos.map((f) => f.flujo); // Obtener solo los valores de flujo
    setIrrValue(irr(flowValues)); // Calcular la tasa interna de retorno
    setVanValue(npv(tasa, flowValues)); // Calcular la valor actual neto
    onTIRCalculado(irr(flowValues), tasa, npv(tasa, flowValues))
    console.log(rate)
  };

  return (
    <div >
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
            {flujos.map((f, index) => (
              <th key={index}>{f.año}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {flujos.map((f, index) => (
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
      <br/>
      <h3 id={`TIR-${id}`}>
        TIR:{Math.round(irrValue * 100, -2)}%
      </h3>
      <h3 id={`VAN-${id}`}>
        VAN: {vanValue !== null ? vanValue?.toFixed(2) : 'Calculando...'}
      </h3>
      <button
        onClick={() => calculateIRR()}
        className='home-boton'>
        Calcular
      </button>
    </div>
  );
};
