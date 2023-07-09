import React, { useEffect, useRef, useState } from 'react';
import style from './guia.module.css'
import { getSVGfromMongo } from '../servicios/SVGservicios/obtenerSVG';

export function SVGZoomMobile(props) {

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  // const { seccion } = props;
  // const { capituloId, pasarSeccionId, recargarFuncionClickcode } = props;
  // const [render, setRender] = useState()
  const { render, funcionSeccionId, seccion } = props;
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const [initialValues, setInitialValues] = useState(translate);

  useEffect(() => {
    funcionSeccionId(gRef)
  }, [])

  //NO ANDA BIEN EN MOBILE EL TEMA DE AMPLIAR PANTALLA
  // const toggleFullScreen = () => {
  //   if (!document.fullscreenElement) {
  //     if (svgRef.current.requestFullscreen) {
  //       svgRef.current.requestFullscreen();
  //     } else if (svgRef.current.mozRequestFullScreen) { // Firefox
  //       svgRef.current.mozRequestFullScreen();
  //     } else if (svgRef.current.webkitRequestFullscreen) { // Chrome, Safari y Opera
  //       svgRef.current.webkitRequestFullscreen();
  //     } else if (svgRef.current.msRequestFullscreen) { // Internet Explorer/Edge
  //       svgRef.current.msRequestFullscreen();
  //     }
  //   } else {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     } else if (document.mozCancelFullScreen) { // Firefox
  //       document.mozCancelFullScreen();
  //     } else if (document.webkitExitFullscreen) { // Chrome, Safari y Opera
  //       document.webkitExitFullscreen();
  //     } else if (document.msExitFullscreen) { // Internet Explorer/Edge
  //       document.msExitFullscreen();
  //     }
  //   }
  // };


  const centrarEnSeccion = () => {

    if (document.getElementById(seccion)) {
      setTranslate({ x: -document.getElementById(seccion)?.offsetLeft * scale + 300, y: -document.getElementById(seccion)?.offsetTop * scale + 200 })
    }
  }


  useEffect(() => {

    centrarEnSeccion()
  }, [])

  const [startPos, setStartPos] = useState(null);

  function handleTouchStart(e) {
    //e.target.addEventListener('touchmove', handleTouchMove, { passive: false, capture: false  });
    //svgRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
    //svgRef.current.addEventListener('touchend', handleTouchEnd);
    setInitialValues(translate)
    //console.log(translate)
    if (e.touches.length === 1) {
      // Guardamos la posición inicial del toque.
      setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else if (e.touches.length === 2) {
      // Se han tocado dos puntos de contacto, guardamos la distancia inicial entre ellos.
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      gRef.current = { distance };
    }
  }

  function handleTouchMove(e) {
    //e.preventDefault()
    if (e.touches.length === 1 && startPos) {
      // Calculamos la distancia que se ha movido el toque y actualizamos la posición del contenido.
      const deltaX = initialValues.x + (e.touches[0].clientX - startPos.x);
      const deltaY = initialValues.y + (e.touches[0].clientY - startPos.y);
      //console.log(e.touches[0].clientX, startPos.x, initialValues)
      setTranslate({
        x: deltaX,
        y: deltaY,
      });
      //e.preventDefault(); // Evitamos que la página se desplace durante el gesto táctil.
    } else if (e.touches.length === 2 && gRef.current) {
      // Se han tocado dos puntos de contacto, calculamos la distancia actual entre ellos
      // y ajustamos el zoom de la aplicación en consecuencia.
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      const delta = distance / gRef.current.distance;
      setScale((prevScale) => prevScale * delta);
      gRef.current.distance = distance;
      //e.preventDefault(); // Evitamos que la página se desplace durante el gesto táctil.
    }
  }

  function handleTouchEnd(e) {
    //e.target.removeEventListener('touchmove', handleTouchMove);
    // Terminamos el gesto táctil, reseteamos el estado del componente.
    setStartPos(null);
    setInitialValues()
    //console.log("end")
  }
  function handleZoomIn() {
    setScale(scale * 1.2);
  }

  function handleZoomOut() {
    setScale(scale / 1.2);
  }

  return (
    <>
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
      {/* <button
        className={style.fullscreenButton}
        onClick={toggleFullScreen}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

      </button> */}
      <svg
        style={{ touchAction: "none" }}
        ref={svgRef}
        dragable={false}
        viewBox="0 0 700 700"
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchEnd={() => handleTouchEnd()}
      >
        <g
          ref={gRef}
          transform={`translate(${translate.x},${translate.y}) scale(${scale})`}
          dangerouslySetInnerHTML={{ __html: `${render?.replaceAll("rgb(0, 0, 0)", "var(--text-color)")?.replaceAll("rgb(255, 255, 255)", "var(--secundario)")?.replaceAll("<a ", "<a target='_blank' ")}` }}
        />



      </svg>
    </>
  );
}
