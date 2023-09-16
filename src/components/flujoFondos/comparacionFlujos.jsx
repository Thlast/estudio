import React, { useEffect, useState } from 'react';
import { ProyectoComponent } from './proyectoComponente';
import style from './modulocss.module.css'
import { FlujosFondos } from './flujosFondos';
import { FlujosIncrementales } from './flujosIncrementales';

const CompararFlujos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [proyectoConMayorTIR, setProyectoConMayorTIR] = useState();
  const [proyectoConMayorVAN, setProyectoConMayorVAN] = useState();
  const [flujosIncrementales, setFlujosIncrementales] = useState();
  const [mostrarIncrementales, setMostrarIncrementales] = useState(false);
  const [bono, setBono] = useState(false);

  const handleNombreProyectoChange = (e) => {
    setNombreProyecto(e.target.value);
  };

  const handleAgregarProyecto = (nombre, bono, e) => {
    e.preventDefault()
    const id = proyectos?.length || 0
    if (bono) {
      setProyectos([...proyectos, { nombre, id, tir: null, rate: 0.1, Nflujos: 2, flujos: [{ año: 0, flujo: -100 }, { año: 1, flujo: 110 }] }]);
    } else {
      setProyectos([...proyectos, { nombre, id, tir: null, flujos: [{ año: 0, flujo: null }] }]);
    }
    setNombreProyecto('');
  };

  const handleTIRCalculado = (idProyecto, tir, rate, van, Nflujos, inicial, flujos) => {
    // Actualizar la TIR del proyecto correspondiente
    const proyectosActualizados = proyectos.map((p) =>
      p.id === idProyecto ? { ...p, tir: tir, rate, van, Nflujos, inicial, flujos } : p
    );
    setProyectos(proyectosActualizados);
  };

  const compararTIR = () => {

    let mayorTIR = -Infinity;
    let mayorVAN = -Infinity;

    proyectos.forEach((proyecto) => {
      if (proyecto.tir !== null && proyecto.tir > mayorTIR) {
        mayorTIR = proyecto.tir;
        setProyectoConMayorTIR(proyecto);

      }
    });

    proyectos.forEach((proyecto) => {
      if (proyecto.van !== null && proyecto.van > mayorVAN) {
        mayorVAN = proyecto.van;
        setProyectoConMayorVAN(proyecto);

      }
    });

  };

  useEffect(() => {

    const documentos = document.querySelectorAll(".encontrarSeccion");

    if (documentos.length > 0) {
      Array.from(documentos).map((a) => {
        a.classList.remove("encontrarSeccion");
      });
    }

    document.getElementById(`TIR-${proyectoConMayorTIR?.id}`)?.classList.add("encontrarSeccion")
    document.getElementById(`VAN-${proyectoConMayorVAN?.id}`)?.classList.add("encontrarSeccion")
  }, [proyectoConMayorTIR, proyectoConMayorVAN])

  const handleEliminarProyecto = (id) => {
    const proyectosActualizados = proyectos.filter((p) => p.id !== id);
    setProyectos(proyectosActualizados);
  };

  const handleCambiarNombre = (id, nuevoNombre) => {
    const proyectosActualizados = proyectos.map((p) =>
      p.id === id ? { ...p, nombre: nuevoNombre } : p
    );
    setProyectos(proyectosActualizados);
  };

  const calculoFlujosIncrementales = (proyecto1, proyecto2) => {
    const flujosIncrementales = [];

    if (
      proyecto1.flujos.length !== proyecto2.flujos.length ||
      proyecto1.inicial === undefined ||
      proyecto2.inicial === undefined
    ) {
      // Manejar casos donde los flujos no tienen la misma longitud
      // o los valores iniciales no están definidos
      return flujosIncrementales;
    }

    const mayorInicial = Math.max(proyecto1.inicial, proyecto2.inicial);
    const menorInicial = Math.min(proyecto1.inicial, proyecto2.inicial);

    for (let i = 0; i < proyecto1.flujos.length; i++) {
      const flujoIncremental = {
        año: proyecto1.flujos[i].año,
        flujo: menorInicial === proyecto1.inicial
          ? proyecto1.flujos[i].flujo - proyecto2.flujos[i].flujo
          : proyecto2.flujos[i].flujo - proyecto1.flujos[i].flujo,
      };
      flujosIncrementales.push(flujoIncremental);
    }

    return flujosIncrementales;
  };

  const calcularFlujosIncrementales = () => {
    setMostrarIncrementales(true)
    setFlujosIncrementales(calculoFlujosIncrementales(proyectoConMayorTIR, proyectoConMayorVAN))
    if (document.getElementById("flujosIncrementales")) {
      document.getElementById("flujosIncrementales").scrollIntoView()
    }
  }

  return (
    <div className='menuContenedor' >
      <div style={{ padding: "20px" }}>
        <div>
          <button
            className="home-boton"
            type='button'
            onClick={compararTIR}>Comparar</button>
          <p>
            {proyectoConMayorTIR ?
              proyectoConMayorTIR?.id === proyectoConMayorVAN?.id
                ?
                <div>
                  <strong>El mejor proyecto es: <em>{`Proyecto ${proyectoConMayorVAN?.id}: ${proyectoConMayorVAN?.nombre}`}</em></strong>
                  <p>Tiene la TIR más elevada ({Math.round(proyectoConMayorVAN?.tir * 100, -2)}%) y el VAN más elevado (${proyectoConMayorVAN?.van.toFixed(2)}). Por lo cuál en ambos criterios resulta la mejor opción</p>
                  <h3>De la realización:</h3>
                  <ul>
                    <li>
                      <em>{`Proyecto ${proyectoConMayorTIR?.id}: ${proyectoConMayorTIR?.nombre}:`}</em> {proyectoConMayorTIR?.tir >= proyectoConMayorTIR?.rate ? <span className={style.positivo}>Se recomienda la realización del proyecto</span> : <span className={style.negativo}>No se recomienda realizar el proyecto</span>}
                    </li>
                  </ul>
                </div>
                :
                <div>
                  <strong>El proyecto con mayor VAN es: <em>{`Proyecto ${proyectoConMayorVAN?.id}: ${proyectoConMayorVAN?.nombre}`}</em></strong>
                  <strong>El proyecto con mayor TIR es: <em>{`Proyecto ${proyectoConMayorTIR?.id}: ${proyectoConMayorTIR?.nombre}`}</em></strong>
                  <p>Existe una contradicción entre los criterios de decisión.</p>
                  <h3>De la realización:</h3>
                  <ul>
                    <li>
                      <em>{`Proyecto ${proyectoConMayorTIR?.id}: ${proyectoConMayorTIR?.nombre}:`}</em> {proyectoConMayorTIR?.tir >= proyectoConMayorTIR?.rate ? <span className={style.positivo}>Se recomienda la realización del proyecto, la TIR supera la tasa exigida.</span> : <span className={style.negativo}>No se recomienda realizar el proyecto, no rinde la tasa exigida.</span>}
                    </li>
                    <li>
                      <em>{`Proyecto ${proyectoConMayorVAN?.id}: ${proyectoConMayorVAN?.nombre}:`}</em> {proyectoConMayorVAN?.tir >= proyectoConMayorVAN?.rate ? <span className={style.positivo}>Se recomienda la realización del proyecto, la TIR supera la tasa exigida.</span> : <span className={style.negativo}>No se recomienda realizar el proyecto, no rinde la tasa exigida.</span>}
                    </li>
                  </ul>
                  <p>El proyecto <em>{`Proyecto ${proyectoConMayorTIR?.id}: ${proyectoConMayorTIR?.nombre}`}</em>
                    tiene la TIR más elevada ({Math.round(proyectoConMayorTIR?.tir * 100, -2)}%) y un VAN de (${proyectoConMayorTIR?.van.toFixed(2)})
                    mientras que <em>{`Proyecto ${proyectoConMayorVAN?.id}: ${proyectoConMayorVAN?.nombre}`}</em>
                    tiene el VAN más elevado (${proyectoConMayorVAN?.van.toFixed(2)}) con una TIR de ({Math.round(proyectoConMayorVAN?.tir * 100, -2)}%).
                    Por lo tanto existe una inconsistencia entre los criterios de decisión.</p>
                  <p>En caso de ser mutuamente excluyentes</p>
                  <h3>Diferencias</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Diferencia</th>
                        <th>{`Proyecto ${proyectoConMayorVAN?.id}: ${proyectoConMayorVAN?.nombre}`}</th>
                        <th>{`Proyecto ${proyectoConMayorTIR?.id}: ${proyectoConMayorTIR?.nombre}`}</th>
                        <th>Solución/Recomendación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proyectoConMayorVAN?.inicial !== proyectoConMayorTIR?.inicial ? <tr><td>-de inversión inicial:</td><td>{proyectoConMayorVAN?.inicial}</td><td>{proyectoConMayorTIR?.inicial}</td><td>En caso de ser mutuamente excluyentes, y existe contradicción en los resultados por criterio VAN y TIR, debemos calcular el flujo incremental. Una vez calculado, determinamos la TIR Incremental y la tasa de corte.
                        {proyectoConMayorVAN?.Nflujos == proyectoConMayorTIR?.Nflujos ? <button type="button" onClick={() => calcularFlujosIncrementales()}>Calcular Flujos incrementales</button> : null}
                      </td></tr> : <tr><td>Ambos tienen la misma inversión inicial</td></tr>}
                      {proyectoConMayorVAN?.Nflujos !== proyectoConMayorTIR?.Nflujos ? <tr><td>-vida:</td><td>{proyectoConMayorVAN?.Nflujos}</td><td>{proyectoConMayorTIR?.Nflujos}</td><td>Cuando los proyectos tienen distinta vida, el VAN puende llevar a tomar la decisión equivocada. Se debe determinar el valor actual neto anualizado o utilizar el método de cadena de reemplazo igualando la vida del proyecto al mínimo común múltiplo y calcular el VAN.</td></tr> : <tr><td>Ambos tienen la misma vida</td></tr>}
                      {proyectoConMayorVAN?.rate !== proyectoConMayorTIR?.rate ? <tr><td>-la tasa exigida:</td><td>{proyectoConMayorVAN?.rate * 100}%</td><td>{proyectoConMayorTIR?.rate * 100}% </td><td>Puede estar castigandose con una tasa muy alta a ciertos proyectos, lo cual lleva a rechazarlos.</td></tr> : <tr><td>Ambos tienen la misma tasa exigida</td></tr>}
                    </tbody>
                  </table>
                </div>
              : null
            }

          </p>
        </div>
        <br />
        {proyectos.map((p) => (
          <ProyectoComponent
            key={p.id}
            defaultValues={p}
            id={p.id}
            nombre={p.nombre}
            onTIRCalculado={handleTIRCalculado}
            handleCambiarNombre={handleCambiarNombre}
            handleEliminarProyecto={handleEliminarProyecto}
          />
        ))}
        <form>
          <label>
            Nombre proyecto
            <input
              type="text"
              value={nombreProyecto}
              onChange={handleNombreProyectoChange}
            />
          </label>
          <label>
            <input
              onChange={() => setBono(!bono)}
              type='checkbox'></input>
            Ejemplo{/* Ejemplo POR AHORA LO DEJO EN EJEMPLO */}
          </label>
          <button
            type='submit'
            onClick={(e) => handleAgregarProyecto(nombreProyecto, bono, e)}
            className="btn btn-primary"
          >
            Agregar
          </button>
        </form>
      </div>
      <hr />
      <div id='flujosIncrementales'>
        {mostrarIncrementales ?
          <>
            <FlujosIncrementales proyectoConMayorTIR={proyectoConMayorTIR} proyectoConMayorVAN={proyectoConMayorVAN} flujosIncrementales={flujosIncrementales} />
            <br />
            <button
              className='btn btn-danger'
              onClick={() => setMostrarIncrementales(false)}>
              Eliminar
            </button>
          </>
          : null
        }
      </div>
      <hr></hr>
    </div>
  );
};

export default CompararFlujos;