import React, { useState } from 'react';
import { ProyectoComponent } from './proyectoComponente';

export const CompararFlujos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [nombreProyecto, setNombreProyecto] = useState('');

  const handleNombreProyectoChange = (e) => {
    setNombreProyecto(e.target.value);
  };

  const handleAgregarProyecto = (nombre, e) => {
    e.preventDefault()
    const id = proyectos?.length || 0
    setProyectos([...proyectos, { nombre, id, tir: null }]);
    setNombreProyecto('');
  };

  const handleTIRCalculado = (idProyecto, tir, rate, van) => {
    // Actualizar la TIR del proyecto correspondiente
    const proyectosActualizados = proyectos.map((p) =>
      p.id === idProyecto ? { ...p, tir: tir, rate, van } : p
    );
    setProyectos(proyectosActualizados);
    console.log(proyectosActualizados)
  };

  const compararTIR = () => {

    const documentos = document.querySelectorAll(".encontrarSeccion");

    if (documentos.length > 0) {
      Array.from(documentos).map((a) => {
        a.classList.remove("encontrarSeccion");
      });
    }

    let proyectoConMayorTIR = null;
    let mayorTIR = -Infinity;
    let proyectoConMayorVAN = null;
    let mayorVAN = -Infinity;

    proyectos.forEach((proyecto) => {
      if (proyecto.tir !== null && proyecto.tir > mayorTIR) {
        mayorTIR = proyecto.tir;
        proyectoConMayorTIR = proyecto.id;
      }
    });

    proyectos.forEach((proyecto) => {
      if (proyecto.van !== null && proyecto.van > mayorVAN) {
        mayorVAN = proyecto.van;
        proyectoConMayorVAN = proyecto.id;
      }
    });

    console.log(`El proyecto con mayor VAN es: ${proyectoConMayorVAN}`);
    console.log(`El proyecto con mayor TIR es: ${proyectoConMayorTIR}`);
    document.getElementById(`TIR-${proyectoConMayorTIR}`).classList.add("encontrarSeccion")
    document.getElementById(`VAN-${proyectoConMayorVAN}`).classList.add("encontrarSeccion")
  };

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


  return (
    <div style={{ padding: "20px" }} >
      <button
        className="home-boton"
        type='button'
        onClick={compararTIR}>Comparar</button>
        <br/>
      {proyectos.map((p) => (
        <ProyectoComponent
          key={p.id}
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
        <button
          type='submit'
          onClick={(e) => handleAgregarProyecto(nombreProyecto, e)}
          className="btn btn-primary"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};
