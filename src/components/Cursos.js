import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MateriasContext } from '../context/MateriasContext';
import { Spinner } from './Login/Spinner';
import { useAuth } from '../context/AuthContext';

export function Cursos() {

  const { materias } = useContext(MateriasContext)
  const { cargandoMaterias } = useContext(MateriasContext)
  const { editMode } = useAuth()

  const [listado, setListado] = useState(materias)

  function handleDragStart(e, index) {
    // Agregar el índice del elemento arrastrado
    e.dataTransfer.setData('text/plain', index);
  }

  function handleDragOver(e) {
    // Evitar el comportamiento predeterminado
    e.preventDefault();
  }

  function handleDrop(e, index) {
    // Obtener el índice del elemento arrastrado
    const draggedIndex = e.dataTransfer.getData('text/plain');

    // Mover el elemento arrastrado a la nueva posición
    const newOrden = listado.filter((_, i) => i !== Number(draggedIndex));
    newOrden.splice(index, 0, listado[draggedIndex]);
    setListado(newOrden);
  }

  return (
    <div className="App">

      <div className='cursos'>
        <div className="cursos-container">

          <h1>
            Cursos:
          </h1>
          {cargandoMaterias ? <Spinner></Spinner> :
            <div className='cursos-descripcion'>
              {editMode && <>arrasta y suelta para cambiar el orden

                {materias !== listado ?
                  <>
                    <button
                    //onClick={() => }
                      className='btn btn-primary'>
                      Guardar
                    </button>
                    <button
                    onClick={() => setListado(materias)}
                      className='btn btn-danger'>
                      Cancelar
                    </button>
                  </>
                  : null}
              </>
              }

              {
                listado?.map((mat, index) => {
                  return (
                    <>
                      {editMode ?
                        <div
                          draggable
                          key={mat.CursoId}
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index)}
                          className="listado-cursos box">
                          <Link
                            className='home-boton'
                            to={`/cursos/${mat.CursoId}`}>{mat.CursoNombre}</Link>
                        </div>
                        :
                        <div
                          key={mat.CursoId}
                          className="listado-cursos box">
                          <Link
                            className='home-boton'
                            to={`/cursos/${mat.CursoId}`}>{mat.CursoNombre}</Link>
                        </div>
                      }
                    </>
                  )
                })
              }
            </div>
          }



        </div>
      </div>

    </div>
  )
}