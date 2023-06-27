import React, { useState, useEffect, useRef } from 'react';
import { getSecciones, getCapitulos } from './servicios/cursos/obtenerCurso';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams, useNavigate } from "react-router-dom";
import { Spinner } from './Login/Spinner';
import style from '../modulos-css/listarSecciones.module.css'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { EditorCapitulo } from '../editor/crearCapitulo';
import { EditorRapidoSeccion } from '../editor/editorRapido';
import { useAuth } from '../context/AuthContext';
import { cambiarOrdenCapitulo, cambiarOrdenSeccion } from './servicios/cursos/cursosSQL/cambiarOrden';
import { crearCapitulo } from './servicios/cursos/cursosSQL/crearCapitulo';
import { modificarCapitulo } from "../components/servicios/cursos/cursosSQL/modifCapitulo";
import { crearSeccion } from './servicios/cursos/cursosSQL/crearSeccion';
import { modificarSeccion, modificarSeccionNombre } from './servicios/cursos/cursosSQL/modifSeccion';
import { alertainfo } from './alertas';
import { CardSkeleton } from '../modulos-css/esqueletoSeccion';


export function Secciones() {
  const [capitulos, setCapitulos] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const { curso } = useParams();
  const { editMode } = useAuth();
  const ordenOriginal = useRef()
  const ordenOriginalSecciones = useRef()
  const navigate = useNavigate();
  //para editar el orden
  const [editarSeccion, setEditarSeccion] = useState(false)
  const [editarCapitulo, setEditarCapitulo] = useState(false)

  //para editar el contenido y nombre del cap
  const [modifCapitulo, setModifCapitulo] = useState()
  const [modifSeccion, setModifSeccion] = useState()

  //para editar las secciones
  //const [seccionesModificadas, setSeccionesModificadas] = useState([])


  useEffect(() => {

    setCargando(true)
    getCapitulos(curso)
      .then(data => {
        setCapitulos(data)
        ordenOriginal.current = data
        setCargando(false)
      });
    getSecciones(curso)
      .then(data => {
        setSecciones(data)
        ordenOriginalSecciones.current = data
      }
      )

  }, [])

  //expandir ocultar secciones
  const most = (e) => {
    document.getElementById("capituloSQL" + e).style.display = 'block';
    document.getElementById("mostrarSQL" + e).style.display = 'none';
    document.getElementById("ocultarSQL" + e).style.display = 'block';
  }
  const ocultar = (e) => {
    document.getElementById("capituloSQL" + e).style.display = 'none';
    document.getElementById("mostrarSQL" + e).style.display = 'block';
    document.getElementById("ocultarSQL" + e).style.display = 'none';
  }
  //mostrar ocultar agregar secciones
  const mostrarAgregar = (e) => {
    //cancelo los datos para modificar
    setModifSeccion()
    //oculto todos menos en el que se hizo click
    for (let i = 0; i < capitulos?.length; i++) {
      if (i !== e) {
        ocultarAgregar(i)
      }
    }
    document.getElementById("agregarSeccion" + e).style.display = 'block';
    document.getElementById("mostrarAgregar" + e).style.display = 'none';
    document.getElementById("ocultarAgregar" + e).style.display = 'block';
  }
  const ocultarAgregar = (e) => {

    document.getElementById("agregarSeccion" + e).style.display = 'none';
    document.getElementById("mostrarAgregar" + e).style.display = 'block';
    document.getElementById("ocultarAgregar" + e).style.display = 'none';
  }


  function handleDragStart(e, index) {
    if (editMode && editarCapitulo) {
      // Agregar el índice del elemento arrastrado
      e.dataTransfer.setData('text/plain', index);
      console.log(index)
    }
  }

  function handleDragOver(e) {
    // Evitar el comportamiento predeterminado
    e.preventDefault();
  }

  function handleDrop(e, index) {
    if (editMode && editarCapitulo) {
      // Obtener el índice del elemento arrastrado
      const draggedIndex = e.dataTransfer.getData('text/plain');

      // Mover el elemento arrastrado a la nueva posición
      const newOrden = capitulos?.filter((_, i) => i !== Number(draggedIndex));
      newOrden.splice(index, 0, capitulos[draggedIndex]);
      setCapitulos(newOrden);

    }

  }

  //PARA LAS SECCIONES ORDENAMIENTO
  function handleDragStartSecciones(e, s, index) {
    if (editarSeccion) {
      // Crear un objeto que contenga el índice y la sección
      let data = {
        i: index,
        section: s
      };

      // Serializar el objeto en una cadena de texto
      let dataString = JSON.stringify(data);
      // Agregar el índice del elemento arrastrado
      e.dataTransfer.setData('text/plain', dataString);
    }

  }

  function handleDragOverSecciones(e) {
    // Evitar el comportamiento predeterminado
    e.preventDefault();
  }

  function handleDropSecciones(e, s, cap, index) {
    if (editarSeccion) {
      //const draggedIndex = e.dataTransfer.getData('text/plain');
      let dataString = e.dataTransfer.getData('text/plain');

      // Convertir la cadena en un objeto
      let draggedSection = JSON.parse(dataString);
      if (s.CapituloId == draggedSection.section.CapituloId) {

        // Mover el elemento arrastrado a la nueva posición
        const newOrdenSeccion = secciones?.filter((_, i) => i !== Number(draggedSection.i));
        newOrdenSeccion.splice(index, 0, secciones[draggedSection.i]);

        setSecciones(newOrdenSeccion);
      }
    }
  }


  const cancelar = () => {
    setEditarCapitulo(false)
    //setCapitulos(ordenOriginal.current)

  }
  const cancelarEditarSeccion = () => {
    setEditarSeccion(false)
    //setSecciones(ordenOriginalSecciones.current)

  }

  const guardar = async (event) => {
    setGuardando(true)
    let enviarNewOrden = []
    capitulos?.map((cap, num) => {
      if (num + 1 !== cap.orden) {
        const cambioCap = { ...capitulos[num], orden: num + 1 }
        setCapitulos(prevCaps => prevCaps.map((capi, index) =>
          index === num ? cambioCap : capi
        ))
        enviarNewOrden.push(cambioCap)
        //console.log(cambioCap)
      }

    })

    if (enviarNewOrden?.length !== 0) {
      try {
        await cambiarOrdenCapitulo(enviarNewOrden, event)
        setGuardando(false)
        setEditarCapitulo(false)
      } catch (error) {
        alertainfo(error)
        setGuardando(false)
        setEditarCapitulo(false)
      }
      //console.log(enviarNewOrden)
    }
    return
  }

  const guardarSeccion = async (capituloId, event) => {
    setGuardando(true)
    let seccionesModificadas = []
    let filtrarSeccion = secciones
      ?.map((sec, i) => ({ ...sec, index: i })) // Agregar el índice original a cada elemento
      .filter((sec) => sec.CapituloId == capituloId) // Filtrar las secciones que cumplan la condición
      .map((sec) => ({ ...sec, index: sec.index })); // Mantener el índice original en el nuevo array resultante

    filtrarSeccion.map((s, num) => {
      if (num + 1 !== s.orden) {
        const cambioSec = { ...filtrarSeccion[num], orden: num + 1 }
        setSecciones(prevSecs => prevSecs.map((sect, i) =>
          s.index === i ? cambioSec : sect
        ))
        seccionesModificadas.push(cambioSec)
      }

    })

    if (seccionesModificadas?.length !== 0) {
      try {
        await cambiarOrdenSeccion(seccionesModificadas, event)
        setEditarSeccion(false)
        setGuardando(false)
      } catch (error) {
        alertainfo(error)
        setEditarSeccion(false)
        setGuardando(false)
      }
      //console.log(seccionesModificadas)
    }

  }
  //console.log(secciones)
  //para ir a modificar secciones y capitulos
  const irModificarCapitulo = (cap, num) => {
    if (!editarCapitulo) {
      setModifCapitulo({ ...cap, indice: num })
      document.getElementById("editorCapitulo").scrollIntoView()
    }
  }
  const irModificarSeccion = (s, i, num) => {
    if (!editarSeccion) {
      setModifSeccion({ ...s, indice: i })
      document.getElementById("agregarSeccion" + num).style.display = 'block';
      document.getElementById("mostrarAgregar" + num).style.display = 'none';
      document.getElementById("ocultarAgregar" + num).style.display = 'block';
    }
  }

  const cancelarModfCapitulo = () => {
    setModifCapitulo()
  }
  const cancelarModfSeccion = (indice) => {
    setModifSeccion()
    document.getElementById("agregarSeccion" + indice).style.display = 'none';
    document.getElementById("mostrarAgregar" + indice).style.display = 'block';
    document.getElementById("ocultarAgregar" + indice).style.display = 'none';
  }

  const modificarActualizar = async (nombreCapitulo, descripcion, CapituloId, indice, event) => {

    try {
      let capituloModificado = null
      await modificarCapitulo(nombreCapitulo, descripcion, CapituloId, event).then(response =>
        capituloModificado = { ...response }
      );
      // Obtener el estado actual
      const capsActuales = [...capitulos];

      // Reemplazar el elemento existente en esa posición con "mango"
      capsActuales[indice] = capituloModificado;

      // Actualizar el estado con la nueva lista de frutas
      setCapitulos(capsActuales);
      //document.getElementById(idmodif).scrollIntoView()
    } catch (error) {
      console.log(error)
    }

  }

  //NO MODIFICO EL CONTENIDO DESDE EL EDITOR RAPIDO
  const modificarSeccionActualizar = async (nombreSeccion, SeccionId, indice, e) => {
    e.preventDefault()
    if (nombreSeccion.length >= 3) {
      try {
        let seccionModificada = null
        await modificarSeccionNombre(nombreSeccion, SeccionId, e).then(response =>
          seccionModificada = { ...response }
        );
        // Obtener el estado actual
        const secActuales = [...secciones];

        // Reemplazar el elemento existente en esa posición con "mango"
        secActuales[indice] = seccionModificada;

        // Actualizar el estado con la nueva lista de frutas
        setSecciones(secActuales);
        //document.getElementById(idmodif).scrollIntoView()
      } catch (error) {
        console.log(error)
      }
    } else {
      alertainfo("El nombre debe contener al menos 3 caracteres")
    }
  }

  const crearActualizar = async (curso, nombreCapitulo, descripcion, event) => {

    try {
      await crearCapitulo(curso, nombreCapitulo, descripcion, event).then(response =>
        setCapitulos(capitulos?.concat(response)))
    } catch (error) {
      console.log(error)
    }
  }
  //console.log(secciones)
  const crearSeccionActualizar = async (capituloId, nombreSeccion, contenido, event) => {
    event.preventDefault()
    if (nombreSeccion.length >= 3) {
      let filtrarSeccion = secciones
        ?.map((sec, i) => ({ ...sec, index: i })) // Agregar el índice original a cada elemento
        .filter((sec) => sec.CapituloId == capituloId) // Filtrar las secciones que cumplan la condición
        .map((sec) => ({ ...sec, index: sec.index })); // Mantener el índice original en el nuevo array resultante

      let indice = (filtrarSeccion[filtrarSeccion.length - 1]?.index + 1)
      console.log(indice)
      try {
        const response = await crearSeccion(capituloId, nombreSeccion, contenido, event);
        const nuevasSecciones = [...secciones.slice(0, indice), response, ...secciones.slice(indice)];
        setSecciones(nuevasSecciones);
      } catch (error) {
        console.log(error);
      }
    }
    else {
      alertainfo("El nombre debe contener al menos 3 caracteres")
    }

  }
  const crearSeccionNavegar = async (capituloId, nombreSeccion, contenido, event) => {
    event.preventDefault()
    if (nombreSeccion.length >= 3) {
      try {
        const response = await crearSeccion(capituloId, nombreSeccion, contenido, event);
        navigate(`/cursosSQL/${curso}/${capituloId}/crear/${response.SeccionId}`)
      } catch (error) {
        console.log(error);
      }
    } else {
      alertainfo("El nombre debe contener al menos 3 caracteres")
    }

  }
  //console.log(secciones)
  useEffect(() => {
    if (editarCapitulo) {
      setModifCapitulo()
    }
  }, [editarCapitulo])

  return (
    <div >
        <div >
          De la base de datos:
          <div>
            {editMode && <>
              {editarCapitulo ?
                <>
                  <p>arrasta y suelta para cambiar de lugar los capitulos</p>

                  {guardando ? <Spinner></Spinner>
                    :
                    <>
                      <button
                        onClick={(event) => guardar(event)}
                        className='btn btn-primary'>Guardar</button>

                      <button
                        onClick={() => cancelar()}
                        className='btn btn-danger'>Cancelar</button>
                    </>
                  }
                </>
                :
                <>
                  {!editarSeccion &&
                    <button
                      className='btn btn-primary'
                      onClick={() => setEditarCapitulo(true)}>
                      Modificar orden
                    </button>
                  }
                </>
              }

            </>}
          </div>
          <div className={style.contenedorCapitulos}>
          {cargando ? <CardSkeleton /> :
            capitulos?.map((t, num) => {
              return (
                <div
                  className={style.contenedorCapitulo}
                  id={t.CapituloNombre}
                  draggable={editarCapitulo}
                  onDragStart={(e) => handleDragStart(e, num)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, num)}
                  key={"contenedor" + t.CapituloId}>
                  {
                    editMode && !editarCapitulo &&
                    <button
                      onClick={() => irModificarCapitulo(t, num)}
                      className={style.capituloEditar}
                    >
                      &#9999;
                    </button>
                  }

                  {/* <div
                key={"curso-descripcion-" + t.CapituloNombre + num}>

                <h1>
                  {t.CapituloNombre}
                </h1>

                <div class="bloque-descripcion">
                  {t.CapituloDescripcion}

                </div>
              </div> */}

                  <div class="bloque-curso">
                    <h3>
                      {t.CapituloNombre}
                    </h3>
                  </div>
                  <div class="bloque-descripcion">
                    <ReactMarkdown>{t.CapituloDescripcion}</ReactMarkdown>
                    <p>Bibliografia:</p>
                    <ul>
                      {/* {s.bibliografia.map((b, i) => {
                                return <li
                                  key={i + "-" + s.titulo + "-bib"}>
                                  {b}
                                </li>
                              })} */}
                    </ul>
                    {editarSeccion ?
                      <>
                        {guardando ? <Spinner></Spinner>
                          :
                          <>
                            <button
                              onClick={(event) => guardarSeccion(t.CapituloId, event)}
                              className='btn btn-primary'>Guardar Seccion</button>
                            <button
                              className='btn btn-danger'
                              onClick={() => cancelarEditarSeccion()}>
                              cancelar
                            </button>
                          </>
                        }
                      </>
                      :
                      <>
                        {
                          editMode && !editarCapitulo &&
                          <button
                            className='btn btn-primary'
                            onClick={() => setEditarSeccion(true)}>
                            Modificar orden
                          </button>
                        }
                      </>
                    }
                  </div>
                  <div class="boton-curso">
                    <button
                      class="show boton-curso"
                      id={"mostrarSQL" + num}
                      onClick={() => most(num)}>
                      Expandir
                    </button>
                    <button
                      class="hide boton-curso"
                      id={"ocultarSQL" + num}
                      onClick={() => ocultar(num)}>
                      Ocultar
                    </button>
                  </div>

                  <ul
                    className={style.contenedor}
                    id={"capituloSQL" + num}>
                    {
                      secciones?.map((s, index) => {
                        if (s.CapituloId == t.CapituloId)
                          return (
                            <div
                              draggable={editarSeccion}
                              onDragStart={(e) => handleDragStartSecciones(e, s, index)}
                              onDragOver={handleDragOverSecciones}
                              onDrop={(e) => handleDropSecciones(e, s, t.CapituloId, index)}
                              key={'seccion-' + s.SeccionId}
                              className={style.contenedorLink}>
                              <Link

                                className={style.seccion}
                                to={`/cursosSQL/${curso}/${t.CapituloId}/${t.CapituloNombre}/${s.SeccionId}`}>
                                {s.SeccionNombre}
                              </Link>
                              {
                                editMode &&
                                <button
                                  onClick={() => irModificarSeccion(s, index, num)}
                                  className={style.seccionEditar}
                                >
                                  &#9999;
                                </button>
                              }
                            </div>
                          )
                      }
                      )
                    }
                    <div class="boton-curso">
                      <button
                        class="show boton-curso"
                        id={"mostrarAgregar" + num}
                        onClick={() => mostrarAgregar(num)}>
                        Añadir nueva seccion
                      </button>
                      <button
                        class="hide boton-curso"
                        id={"ocultarAgregar" + num}
                        onClick={() => ocultarAgregar(num)}>
                        Ocultar añadir seccion
                      </button>
                    </div>
                    {editMode &&
                      <div
                        className={style.contenedor}
                        id={"agregarSeccion" + num}>
                        <hr></hr>
                        <EditorRapidoSeccion
                          indiceCapitulo={num}
                          cancelarModfSeccion={cancelarModfSeccion}
                          modificarSeccionActualizar={modificarSeccionActualizar}
                          seccionModificar={modifSeccion}
                          crearSeccionNavegar={crearSeccionNavegar}
                          crearSeccionActualizar={crearSeccionActualizar}
                          capituloId={t.CapituloId} />
                      </div>
                    }
                  </ul>
                </div>

              )
            })}
            {editMode &&
              <div id='editorCapitulo'>
                <EditorCapitulo
                  modificarActualizar={modificarActualizar}
                  crearActualizar={crearActualizar}
                  cancelarModfCapitulo={cancelarModfCapitulo} curso={curso} modifCapitulo={modifCapitulo} />
              </div>
            }
          </div>

        </div>
    </div>
  )
}