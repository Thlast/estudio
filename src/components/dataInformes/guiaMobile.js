import React, { useEffect, useRef, useState } from 'react';
import style from './guia.module.css'
import { getSVGfromMongo } from '../servicios/SVGservicios/obtenerSVG';

export function SVGZoomMobile(props) {

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const { seccion } = props;
  const { capituloId, pasarSeccionId } = props;
  const [render, setRender] = useState()
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const [initialValues, setInitialValues] = useState(translate);

  //funcion que da funcionalidad a las id de las secciones
  useEffect(() => {
    const gElement = gRef.current;
    const elements = gElement.querySelectorAll('[id]');

    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("remarcarSecciones")
      elements[i].onclick = function () {
        pasarSeccionId(elements[i].id);
      }
    }

  }, [render])

  useEffect(() => {

    getSVGfromMongo(capituloId).then(data => {
      if (data[0]) {
        // setIdDiagrama(data[0].id)
        // setLinkEditar(data[0].linkEditar)
        setRender(data[0].elementoG)
      } else {
        // setIdDiagrama()
        // setLinkEditar()
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
  }, [render, seccion])

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

      <div className={style.contenedorSVG}>
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
      </div>
    </>
  );
}
