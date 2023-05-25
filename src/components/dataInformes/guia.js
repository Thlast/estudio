import React, { useEffect, useRef, useState } from 'react';
import style from './guia.module.css'
import { getSVGfromMongo, actualizarSVG, getSVGfromDiagrams } from '../servicios/SVGservicios/obtenerSVG';
import { useAuth } from '../../context/AuthContext';
import { SVGForm } from './formularioNuevoSVG';
import { ComoCrearSVG } from './comoCrearSVG';
import { CambiarSVG } from './cambiarSVG';
import { alertainfo, alertasuccess } from '../alertas';

export function SVGZoom(props) {

  const { datosUser } = useAuth()
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [offsetX, setOffsetX] = useState();
  const [offsetY, setOffsetY] = useState();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialValues, setInitialValues] = useState(translate);
  const { seccion, isZooming, curso, nombreCapitulo } = props;
  const { capituloId, pasarSeccionId } = props;
  const [render, setRender] = useState()
  const [idDiagrama, setIdDiagrama] = useState()
  const [linkEditar, setLinkEditar] = useState()
  const [renderCurso, setRenderCurso] = useState()
  const [renderCapitulo, setRenderCapitulo] = useState()
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const [cargando, setCargando] = useState(false)
  const [modificar, setModificar] = useState(false)

  //funcion que da funcionalidad a las id de las secciones
  useEffect(() => {
    if (render) {

      const gElement = gRef.current;
      const elements = gElement.querySelectorAll('[id]');

      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add("remarcarSecciones")
        elements[i].onclick = function () {
          pasarSeccionId(elements[i].id);
        }
      }

    }
  }, [render])

  const actualizarEsquema = async (idDiagram, linkEdit) => {
    //pedimos el ultimo
    setCargando(true)
    try {
      const elemento = await getSVGfromDiagrams(idDiagram);
      try {
        const data = await actualizarSVG(idDiagram, elemento);
        if (data.paraCurso) {
          setRenderCurso(data);
          setRender(data?.elementoG)
          setMostrarCurso(true)
          alertasuccess("SVG cargando correctamente!")
        } else {
          setRenderCapitulo(data);
          setRender(data?.elementoG)
          setMostrarCurso(false)
          alertasuccess("SVG cargando correctamente!")

        }
        setCargando(false);
      } catch (error) {
        // Manejar el error en la segunda función
        console.error("Error al actualizar el SVG:", error);
        // Detener la ejecución o realizar acciones adicionales en caso de error
      }
    } catch (error) {
      // Manejar el error en la primera función
      alertainfo("No se pudo acceder al enlace")
      console.error("Error al obtener el SVG del diagrama:", error);
      // Detener la ejecución o realizar acciones adicionales en caso de error
    }

    if (linkEdit) {
      setIdDiagrama(idDiagram)
      setLinkEditar(linkEdit)
    }

  }

  useEffect(() => {

    getSVGfromMongo(capituloId, curso).then(data => {
      //console.log(data)
      if (data) {
        //diagrama de curso
        if (data[0]) {
          setRenderCurso(data[0])
          setIdDiagrama(data[0].id)
          setLinkEditar(data[0].linkEditar)
          setRender(data[0].elementoG)
        } else if (data[1]) {
          //diagrama de capitulo
          setRenderCapitulo(data[1])

        }

      } else {
        setIdDiagrama()
        setLinkEditar()
        setRender()
      }
    })
  }, [capituloId])

  const centrarEnSeccion = () => {

    if (document.getElementById(seccion)) {
      setTranslate({ x: -document.getElementById(seccion)?.offsetLeft * scale + 300, y: -document.getElementById(seccion)?.offsetTop * scale + 200 })
    }
  }

  const encontrarSeccion = () => {
    setTimeout(() => {
      const elementToCenter = document.getElementById(seccion)

      //quito las clases anteriores secciones
      if (document.querySelector(".encontrarSeccion")) {
        document.querySelector(".encontrarSeccion")?.classList.remove("encontrarSeccion")
      }
      //agrego clase a la nueva y centro la vista
      if (document.getElementById(seccion)) {
        elementToCenter?.classList.add("encontrarSeccion")

      }

    }, 100)
  }


  useEffect(() => {
    if (seccion) {
      encontrarSeccion()
    }
    centrarEnSeccion()
  }, [seccion])

  const handleWheel = (event) => {
    //event.preventDefault();
    const delta = event.deltaY;
    const scaleFactor = delta > 0 ? 0.9 : 1.1;
    if (scale * scaleFactor > 0.22) {
      setScale(prevScale => prevScale * scaleFactor);
      const gElement = gRef.current;
      const gRect = gElement.getBoundingClientRect();
      if (gRect) {
        const newScale = scale * scaleFactor;
        const newX = (position.x - gRect.left) * (newScale - scale) / scale;
        const newY = (position.y - gRect.top) * (newScale - scale) / scale;
        setTranslate(prevT => (
          {
            x: prevT.x - newX,
            y: prevT.y - newY
          }
        )
        );

      }
    }

  };
  //const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  function handleMouseDown(event) {
    setOffsetX(event.clientX)
    setOffsetY(event.clientY)
    setInitialValues(translate)
    setIsPanning(true);

  }
  function handleMouseMove(event) {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
    if (isPanning) {
      const gElement = gRef.current;
      const gRect = gElement.getBoundingClientRect();
      const dx = initialValues.x + (event.clientX - offsetX);
      const dy = initialValues.y + (event.clientY - offsetY);
      //limite derecha
      const limitX = (-(gRect.width)) * scale
      //limite abajo
      const limitY = (-(gRect.height)) * scale
      //limite izquierda
      const maxX = gRect.width
      //limite arriba
      const maxY = gRect.height


      //console.log(gRect)
      if (dx > limitX && dx < maxX && dy > limitY && dy < maxY) {
        setTranslate({
          x: dx,
          y: dy,
        });
      }
      else {
        //si x toca el limite minimo:
        if (dx <= limitX && dy > limitY && dy < maxY) {
          setTranslate({
            x: limitX,
            y: dy,
          });
          //si y toca el limite minimo:
        }
        if (dy <= limitY && dx > limitX && dx < maxX) {
          setTranslate({
            x: dx,
            y: limitY,
          });
        }
        //si x toca el limite maximo:
        if (dx >= maxX && dy < maxY && dy > limitY) {
          setTranslate({
            x: maxX,
            y: dy,
          });
          //si y toca el limite maximo:
        }
        if (dy >= maxY && dx < maxX && dx > limitX) {
          setTranslate({
            x: dx,
            y: maxY,
          });
        }
      }
      //console.log(event.clientX, event.clientY, maxX, maxY, svgRect, svg)
    }
  }


  function handleMouseUp(event) {
    setIsPanning(false);
    isZooming(true)
  }
  function handleMouseEnter(event) {
    isZooming(true)
  }

  function handleMouseLeave(event) {
    setIsPanning(false);
    isZooming(false)
  }

  const [mostrarCurso, setMostrarCurso] = useState(true)

  useEffect(() => {
    if (mostrarCurso) {
      setIdDiagrama(renderCurso?.id)
      setLinkEditar(renderCurso?.linkEditar)
      setRender(renderCurso?.elementoG)
    } else {
      setIdDiagrama(renderCapitulo?.id)
      setLinkEditar(renderCapitulo?.linkEditar)
      setRender(renderCapitulo?.elementoG)
    }
  }, [mostrarCurso])

  const cambiarRender = () => {
    setMostrarCurso(prevState => !prevState)
  }

  return (
    <>
      <hr></hr>
      <button
        className="boton home-boton"
        onClick={() => cambiarRender()}
      >
        Esquema: {mostrarCurso ? curso : nombreCapitulo}
      </button>
      {render ?
        <div className={style.contenedorSVG}>
          {/* <button onClick={() => handleZoomIn()}>Zoom In</button>
        <button onClick={() => handleZoomOut()}>Zoom Out</button> */}
          <button
            className={style.centericon}
            onClick={() => centrarEnSeccion()}
          ></button>

          <svg
            ref={svgRef}
            dragable={false}

            viewBox="0 0 700 700"

            cursor={isPanning ? "move" : ""}
            onWheel={(event) => handleWheel(event)}
            onMouseDown={(event) => handleMouseDown(event)}
            onMouseMove={(event) => handleMouseMove(event)}
            onMouseUp={(event) => handleMouseUp(event)}
            onMouseEnter={(event) => handleMouseEnter(event)}
            onMouseLeave={(event) => handleMouseLeave(event)}
          >

            <g
              ref={gRef}
              transform={`translate(${translate.x},${translate.y}) scale(${scale})`}
              dangerouslySetInnerHTML={{ __html: `${render?.replaceAll("rgb(0, 0, 0)", "var(--text-color)")?.replaceAll("rgb(255, 255, 255)", "var(--secundario)")?.replaceAll("<a ", "<a target='_blank' ")}` }}
            />
          </svg>
        </div>
        : "No hay diagrama"}
      {modificar ?
        <CambiarSVG actualizarEsquema={actualizarEsquema} idDiagrama={idDiagrama} />
        :
        null
      }
      <hr></hr>
      {idDiagrama ?
        <div className={style.contenedorEditarSVG}>
          <a
            className='btn btn-primary'
            style={{ width: "fit-content" }}
            target='_blank'
            href={linkEditar}
          >
            Editar en diagrams
          </a>
          {datosUser?.rol == "admin" ?
            <>
              <button
                className='btn btn-primary'
                style={{ width: "fit-content" }}
                onClick={() => actualizarEsquema(idDiagrama)}
              >
                Sincronizar
              </button>
              <button
                className={modificar ? 'btn btn-danger' : 'btn btn-primary'}
                style={{ width: "fit-content" }}
                onClick={() => setModificar(!modificar)}
              >
                {modificar ? "Cancelar" : "Modificar enlace"}
              </button>
            </>
            : null
          }
        </div>
        :
        <>
          <SVGForm nombreCapitulo={nombreCapitulo} curso={curso} actualizarEsquema={actualizarEsquema} capituloId={capituloId} />
          <ComoCrearSVG />
        </>
      }
    </>
  );
}
