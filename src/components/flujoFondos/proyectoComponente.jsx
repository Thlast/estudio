import React, { useState } from 'react';
import { FlujosFondos } from './flujosFondos';
import style from './modulocss.module.css'

export const ProyectoComponent = ({ nombre, id, defaultValues, onTIRCalculado, handleEliminarProyecto, handleCambiarNombre }) => {

  const handleTIRCalculado = (tir, rate, van, Nflujos, inicial, flujos) => {
    // Pasar el TIR calculado al componente padre
    onTIRCalculado(id, tir, rate, van, Nflujos, inicial, flujos);
  };

  const [editar, setEditar] = useState(false)
  const [nuevoNombre, setNuevoNombre] = useState(nombre)

  const cambiarNombre = (e) => {
    e.preventDefault()
    handleCambiarNombre(id, nuevoNombre)
    setEditar(false)
  }

  return (
    <div>
      <div className={style.cambiarNombre}>
      <h1>{`Proyecto ${id}:`}{nombre}</h1>
      <span>
      {editar ?
        <form >
          <input
            placeholder={nombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            value={nuevoNombre}
            type='text'>
          </input>
          <span>
            <button
              onClick={(e) => cambiarNombre(e)}
            >
              ✓
            </button>
            <button
              type='button'
              onClick={() => setEditar(false)}
            >
              ✘
            </button>
          </span>
        </form>
        : 
        <button onClick={() => setEditar(true)}>&#9999;</button>
      }
      </span>
      </div>
      <FlujosFondos defaultValues={defaultValues} id={id} onTIRCalculado={handleTIRCalculado} />
      <br />
      <button className='btn btn-danger' onClick={() => handleEliminarProyecto(id)}>Eliminar</button>
      <hr />
    </div>

  );
};
