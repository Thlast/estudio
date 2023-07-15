import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './guia.module.css'
import { getSVGfromMongo, actualizarSVG, getSVGfromDiagrams, getSVGfromMongoArchivoFijo } from '../servicios/SVGservicios/obtenerSVG';
import { useAuth } from '../../context/AuthContext';
import { SVGForm } from './formularioNuevoSVG';
import { ComoCrearSVG } from './comoCrearSVG';
import { CambiarSVG } from './cambiarSVG';
import { alertainfo, alertasuccess } from '../alertas';
import { UserConfig } from '../../context/UserConfig';
import { SVGZoomMobile } from './guiaMobile';
import { Spinner } from '../Login/Spinner';
import { precargarSVG } from '../servicios/SVGservicios/precargarSVG';

export function SVGZoom(props) {

  
  const [mostrarCurso, setMostrarCurso] = useState(true)
  const { mobile } = useContext(UserConfig)
  const [fullScreen, setFullScreen] = useState(!mobile) //si es mobile arranca en false y no se puede modificar
  const { datosUser } = useAuth()
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [offsetX, setOffsetX] = useState();
  const [offsetY, setOffsetY] = useState();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialValues, setInitialValues] = useState(translate);
  const { seccion, isZooming, curso, nombreCapitulo } = props;
  //si viene de archivo fijo impCaps
  const { capituloNombre } = props;
  //si viene de SQL
  const { capituloId, pasarSeccionId, recargarFuncionClickcode, obtenerCantidadDiagramas } = props;
  const [render, setRender] = useState()
  const [idDiagrama, setIdDiagrama] = useState()
  const [linkEditar, setLinkEditar] = useState()
  const [linkDiagram, setLinkDiagram] = useState()
  const [renderCurso, setRenderCurso] = useState()
  const [renderCapitulo, setRenderCapitulo] = useState()
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const [cargando, setCargando] = useState(false)
  const [modificar, setModificar] = useState(false)

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (svgRef.current.requestFullscreen) {
        svgRef.current.requestFullscreen();
      } else if (svgRef.current.mozRequestFullScreen) { // Firefox
        svgRef.current.mozRequestFullScreen();
      } else if (svgRef.current.webkitRequestFullscreen) { // Chrome, Safari y Opera
        svgRef.current.webkitRequestFullscreen();
      } else if (svgRef.current.msRequestFullscreen) { // Internet Explorer/Edge
        svgRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari y Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // Internet Explorer/Edge
        document.msExitFullscreen();
      }
    }
  };


  //funcion que da funcionalidad a las id de las secciones
  const funcionSeccionId = () => {
    if (render) {

      const gElement = gRef?.current;
      const elements = gElement?.querySelectorAll('[id]');

      for (let i = 0; i < elements?.length; i++) {
        elements[i].classList.add("remarcarSecciones")
        elements[i].onclick = function () {
          pasarSeccionId(elements[i].id);
        }
      }
      recargarFuncionClickcode()
    }
  }
  useEffect(() => {
    funcionSeccionId()

  }, [mostrarCurso, capituloId, renderCurso, renderCapitulo])


  const actualizarEsquema = async (idDiagram, linkEdit, link) => {
    //pedimos el ultimo
    setCargando(true)
    //PRECARGO LA PAGINA
    try {
      await precargarSVG(linkDiagram);
    } catch (error) {
      //alertainfo("Tiempo de espera agotado. Intente nuevamente.");
      console.error("Error al precargar el SVG:", error);
      //setCargando(false);
      // Realizar acciones adicionales en caso de error, si es necesario
    }

    try {
      const elemento = await getSVGfromDiagrams(idDiagram);
      try {
        const data = await actualizarSVG(idDiagram, elemento);
        if (data.paraCurso) {
          setRenderCurso(data);
          setRender(data?.elementoG)
          setMostrarCurso(true)
          alertasuccess("SVG cargando correctamente!")
          setCargando(false)
        } else {
          setRenderCapitulo(data);
          setRender(data?.elementoG)
          setMostrarCurso(false)
          alertasuccess("SVG cargando correctamente!")
          setCargando(false)
        }
        setCargando(false);
      } catch (error) {
        // Manejar el error en la segunda función
        console.error("Error al actualizar el SVG:", error);
        // Detener la ejecución o realizar acciones adicionales en caso de error
      }
    } catch (error) {
      // Manejar el error en la primera función
      alertainfo("Tiempo de espera agotado. Intente nuevamente.")
      console.error("Error al obtener el SVG del diagrama:", error);
      setCargando(false)
      // Detener la ejecución o realizar acciones adicionales en caso de error
    }

    if (linkEdit) {
      setIdDiagrama(idDiagram)
      setLinkEditar(linkEdit)
      setLinkDiagram(link)
    }

  }

  const limpiarDatos = () => {
    setRenderCapitulo()
    setIdDiagrama()
    setLinkEditar()
    setLinkDiagram()
    setRenderCurso()
    setRender()
  }
  //para enviar cuando diagramas hay para ver en secciones
  useEffect(() => {
    let i = 0
    if (renderCurso) {
      console.log(renderCurso)
      i += 1
    }
    if (renderCapitulo) {
      i += 1
    }
    obtenerCantidadDiagramas(i)
  }, [renderCurso, renderCapitulo])

  useEffect(() => {

    if (capituloNombre) {
      getSVGfromMongoArchivoFijo(capituloNombre, curso).then(data => {

        //console.log(data)
        if (!data[0] && !data[1]) {
          limpiarDatos()
        } else {
          if (data[0]) {
            //diagrama de curso
            setRenderCurso(data[0])
            setIdDiagrama(data[0].id)
            setLinkEditar(data[0].linkEditar)
            setLinkDiagram(data[0].link)
            setRender(data[0].elementoG)
          } else {
            if (data[1]) {
              setRenderCapitulo(data[1])
              setIdDiagrama(data[1].id)
              setLinkEditar(data[1].linkEditar)
              setLinkDiagram(data[1].link)
              setRender(data[1].elementoG)
              setMostrarCurso(false)
            } else {
              setRenderCurso()
              setRenderCapitulo()

            }
          }
        }
      })
    } else
      getSVGfromMongo(capituloId, curso).then(data => {
        console.log(data)

        if (!data[0] && !data[1]) {
          limpiarDatos()
        } else {
          if (data[0]) {
            //diagrama de curso
            setRenderCurso(data[0])
            setIdDiagrama(data[0].id)
            setLinkEditar(data[0].linkEditar)
            setLinkDiagram(data[0].link)
            setRender(data[0].elementoG)
          } else {
            if (data[1]) {
              setRenderCapitulo(data[1])
              setIdDiagrama(data[1].id)
              setLinkEditar(data[1].linkEditar)
              setLinkDiagram(data[1].link)
              setRender(data[1].elementoG)
              setMostrarCurso(false)
            } else {
              setRenderCurso()
              setRenderCapitulo()
            }
          }
        }

      })

  }, [capituloId])

  const centrarEnSeccion = () => {

    if (document.getElementById(seccion)) {
      setTranslate({ x: -document.getElementById(seccion)?.offsetLeft * scale + 300, y: -document.getElementById(seccion)?.offsetTop * scale + 200 })
      //document.getElementById(seccion).classList.add("encontrarSeccion")
    }
    encontrarSeccion()
  }

  const encontrarSeccion = () => {
    // setTimeout(() => {
    const elementToCenter = document.getElementById(seccion)

    //quito las clases anteriores secciones
    if (document.querySelector(".encontrarSeccion")) {
      document.querySelector(".encontrarSeccion")?.classList.remove("encontrarSeccion")
    }
    //agrego clase a la nueva y centro la vista
    if (document.getElementById(seccion)) {
      elementToCenter?.classList.add("encontrarSeccion")

    }

    // }, 100)
  }


  useEffect(() => {
    // if (seccion) {
    //   encontrarSeccion()
    // }
    centrarEnSeccion()
  }, [seccion])

  useEffect(() => {
    recargarFuncionClickcode()
  }, [render])

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

    if (isPanning) {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
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

  }
  function handleMouseEnter(event) {

  }

  function handleMouseLeave(event) {
    setIsPanning(false);
  }

  useEffect(() => {
    if (mostrarCurso) {
      //console.log(renderCurso?.elementoG)
      setRender(renderCurso?.elementoG)
      setIdDiagrama(renderCurso?.id)
      setLinkEditar(renderCurso?.linkEditar)
      setLinkDiagram(renderCurso?.link)
    } else {
      setIdDiagrama(renderCapitulo?.id)
      setLinkEditar(renderCapitulo?.linkEditar)
      setLinkDiagram(renderCapitulo?.link)
      setRender(renderCapitulo?.elementoG)
    }
  }, [mostrarCurso])

  const cambiarRender = () => {
    setMostrarCurso(prevState => !prevState)
  }

  function handleZoomIn() {
    setScale(scale * 1.2);
  }

  function handleZoomOut() {
    setScale(scale / 1.2);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <hr></hr>
      <button
        className="boton home-boton"
        onClick={() => cambiarRender()}
      >
        Esquema: {mostrarCurso ? curso : nombreCapitulo}
      </button>
      <hr></hr>
      {render ?
        <div
        >
          <div
            className={fullScreen ? style.contenedorSVGFull : style.contenedorSVG}>
            {!mobile ?
              <div
                onMouseEnter={() => isZooming(true)}
                onMouseLeave={() => isZooming(false)}
              >
                <div className={style.contenedorZoom}>

                  <button
                    className={style.zoom}
                    onClick={() => handleZoomIn()}>+</button>
                  <button
                    className={style.zoom}
                    onClick={() => handleZoomOut()}>-</button>
                </div>
                <button
                  className={style.centericon}
                  onClick={() => centrarEnSeccion()}
                ></button>
                <button
                  className={fullScreen ? style.fullscreenLeftButtonActivo : style.fullscreenLeftButton}
                  onClick={() => setFullScreen(!fullScreen)}
                >
                  {/* {fullScreen ? <>&#129047;&#129045;</> : <>&#129045;&#129047;</>} */}
                </button>
                <button
                  className={style.fullscreenButton}
                  onClick={toggleFullScreen}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>

                </button>

                <svg
                  ref={svgRef}
                  dragable="false"
                  viewBox="0 0 1000 1000"
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
              :
              <SVGZoomMobile seccion={seccion} render={render} funcionSeccionId={funcionSeccionId} />
            }
          </div>
        </div>
        : <p>{`No hay diagrama para el ${mostrarCurso ? "curso" : "capítulo"}`}</p>}
      {modificar ?
        <CambiarSVG actualizarEsquema={actualizarEsquema} idDiagrama={idDiagrama} />
        :
        null
      }
      <hr></hr>

      {cargando ? <Spinner></Spinner> :
        idDiagrama ?
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
            <SVGForm capituloNombre={capituloNombre} nombreCapitulo={nombreCapitulo} curso={curso} actualizarEsquema={actualizarEsquema} capituloId={capituloId} />
            <ComoCrearSVG />
          </>
      }
    </div>
  );
}
