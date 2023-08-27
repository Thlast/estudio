import React, { useState, useEffect } from "react";
import style from './cGanancias.module.css'
import { Articulos } from "../../dataInformes/articulos";

export const Liquidador = (props) => {

  const { id, handleImpuestoCalculado, cancelar, liquidacion, topeDonacion } = props;

  const liquidacionActual = liquidacion[id] || [{ conceptos: [], total: 0 }];

  const [decreto, setDecreto] = useState(false);
  const [articulo, setArticulo] = useState(liquidacionActual?.articulos?.[0] || "Artículo 1");

  // const cambiarDecreto = () => {
  //   if (decreto) {
  //     // Si ya tiene "DR", lo eliminamos
  //     setArticulo(articulo?.replace(" DR", ""));
  //   } else {
  //     // Si no tiene "DR", lo agregamos
  //     setArticulo(articulo + " DR");
  //   }
  //   // Cambiamos el estado de decreto
  //   setDecreto(!decreto);
  // };

  useEffect(() => {
    setArticulo(liquidacionActual?.articulos?.[0] || "Artículo 1");
  }, [id])

  const funcionalidadCodes = () => {
    const codes = document.querySelectorAll("code")
    for (let i = 0; i < codes.length; i++) {
      codes[i].onclick = function (e) {
        setArticulo(e.target.innerHTML.toLowerCase().replace(/[-º°`'".,]/g, '').trim());
        console.log(e.target.innerHTML.toLowerCase().replace(/[-º°`'".,]/g, '').trim())
      }
    }
  }

  useEffect(() => {
    //funcion que da funcionalidad a los codes
    funcionalidadCodes()
  }, [id])

  const [total, setTotal] = useState(liquidacionActual?.total);
  const [conceptos, setConceptos] = useState(liquidacionActual?.conceptos);
  const [deducciones, setDeducciones] = useState(liquidacionActual?.deducciones);
  const [deduccionesComunes, setDeduccionesComunes] = useState(liquidacionActual?.deduccionesComunes);

  const agregarConcepto = (nombre, importe) => {
    const nuevoConcepto = { nombre, importe };
    setConceptos([...conceptos, nuevoConcepto]);
  };
  const agregarDeduccion = (nombre, importe) => {
    const nuevasDeducciones = { nombre, importe };
    setDeducciones([...deducciones, nuevasDeducciones]);
  };

  const quitarConcepto = (index) => {
    const nuevosConceptos = [...conceptos];
    nuevosConceptos.splice(index, 1); // Eliminar el concepto en el índice dado
    setConceptos(nuevosConceptos);
  };
  const quitarDeduccion = (index) => {
    const nuevasDeducciones = [...deducciones];
    nuevasDeducciones.splice(index, 1); // Eliminar el concepto en el índice dado
    setDeducciones(nuevasDeducciones);
  };

  const handleChangeConcepto = (index, field, value) => {
    const nuevosConceptos = [...conceptos];
    nuevosConceptos[index][field] = value;
    setConceptos(nuevosConceptos);
  };
  const handleChangeDeducciones = (index, field, value) => {
    const nuevasDeducciones = [...deducciones];
    nuevasDeducciones[index][field] = value;
    setDeducciones(nuevasDeducciones);
  };
  const handleChangeDeduccionesComunes = (index, field, value) => {
    const nuevasDeduccionesComunes = [...deduccionesComunes];
    nuevasDeduccionesComunes[index][field] = value;
    setDeduccionesComunes(nuevasDeduccionesComunes);
  };

  const calcularTotal = () => {
    let totalGanancias = 0;
    let totalDeducciones = 0;
    conceptos?.forEach(concepto => {
      totalGanancias += parseFloat(concepto.importe);
    });
    deducciones?.forEach(d => {
      totalDeducciones += parseFloat(d.importe);
    });
    deduccionesComunes?.forEach(d => {
      totalDeducciones += parseFloat(d.importe);
    });
    return totalGanancias - totalDeducciones;
  };

  const enviarLiquidacion = (e) => {
    e.preventDefault();
    const totalCalculado = calcularTotal();
    handleImpuestoCalculado(id, totalCalculado, conceptos, deducciones, deduccionesComunes);
  };

  useEffect(() => {

    setConceptos(liquidacionActual?.conceptos || [{ nombre: "concepto", importe: 0 }]);
    setDeducciones(liquidacionActual?.deducciones);
    setDeduccionesComunes(liquidacionActual?.deduccionesComunes);


  }, [id]);

  useEffect(() => {
    const totalCalculado = calcularTotal();
    setTotal(totalCalculado);

  }, [conceptos, deducciones]);

  return (
    <>
      <div className={style.contenedorLiquidacion}>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => cancelar()}>
          Volver
        </button>
        <h1>Liquidando: {id}</h1>
        <form>
          {id == "DeduccionesGeneralesConLimite" ? <p>Tope de donaciones: {topeDonacion}</p> : null}
          {conceptos?.map((c, index) => (
            <div
              className={style.liquidacionContenido}
              key={"ganancias-" + index}>
              <input
                className={style.liquidacionNombreConcepto}
                value={c.nombre}
                onChange={(e) => handleChangeConcepto(index, "nombre", e.target.value)}
                type="text"
              />
              <input
                className={style.liquidacionImporteConcepto}
                value={c.importe}
                onChange={(e) => handleChangeConcepto(index, "importe", e.target.value)}
                type="number"
                step="any"
              />
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => quitarConcepto(index)}>
                X
              </button>
            </div>
          ))}
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => agregarConcepto("nombre", 0)}>
            +
          </button>
          {/* DEDUCCIONES: */}
          {deducciones ?
            <>
              <h1>Deducciones Especiales</h1>
              {
                deducciones?.map((c, index) => (
                  <div
                    className={style.liquidacionContenido}
                    key={"deducciones-" + index}>
                    <input
                      className={style.liquidacionNombreConcepto}
                      value={c.nombre}
                      onChange={(e) => handleChangeDeducciones(index, "nombre", e.target.value)}
                      type="text"
                    />
                    <input
                      className={style.liquidacionImporteConcepto}
                      value={c.importe}
                      onChange={(e) => handleChangeDeducciones(index, "importe", e.target.value)}
                      type="number"
                      step="any"
                    />
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => quitarDeduccion(index)}>
                      X
                    </button>
                  </div>
                ))
              }
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => agregarDeduccion("nombre", 0)}>
                +
              </button>
            </>
            : null
          }
          {deduccionesComunes ?
            <>
              <h1>Deducciones Especiales comunes a las cuatro categorías</h1>
              {
                deduccionesComunes?.map((c, index) => (
                  <div
                    className={style.liquidacionContenido}
                    key={"deducciones-" + index}>
                    <input
                      className={style.liquidacionNombreConcepto}
                      value={c.nombre}
                      onChange={(e) => handleChangeDeduccionesComunes(index, "nombre", e.target.value)}
                      type="text"
                    />
                    <input
                      className={style.liquidacionImporteConcepto}
                      value={c.importe}
                      onChange={(e) => handleChangeDeduccionesComunes(index, "importe", e.target.value)}
                      type="number"
                      step="any"
                    />
                  </div>
                ))
              }
            </>
            : null
          }

          <h3>Total: {total}</h3>
          <button
            className="home-boton"
            onClick={(e) => enviarLiquidacion(e)}
          >
            Enviar
          </button>
        </form>
      </div>
      {liquidacionActual?.articulos?.length > 0 ?
        <div className={style.articulos}>
          <h3>Articulos vinculados:</h3>
          <div className={style.articulosListado}>
            {
              liquidacionActual?.articulos?.map((a, num) => {
                return (
                  <code key={"Articulo-" + num}>{a}</code>
                )
              })
            }
          </div>
          {/* <button className="home-boton" onClick={() => cambiarDecreto()}>
          {decreto ? "Decreto Reglamentario" : "Texto ordenado"}
        </button> */}
          <Articulos recargarFuncionClickcode={funcionalidadCodes} articulo={articulo} capituloId={1} />
        </div>
        : null}
    </>
  )
};
