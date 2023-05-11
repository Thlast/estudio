import React, { useEffect, useRef, useState } from 'react';
import { impuestoGanancias, impuestoGananciasLink } from './graf';
import style from './guia.module.css'
import { useParams } from 'react-router-dom';

export function SVGZoom(props) {

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [offsetX, setOffsetX] = useState();
  const [offsetY, setOffsetY] = useState();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialValues, setInitialValues] = useState(translate);
  //const { seccion } = useParams()
  const { seccion } = props;
  //const { esquema } = useParams()
  const { esquema, pasarSeccionId } = props;
  const [render, setRender] = useState()
  const [linkEditar, setLinkEditar] = useState()
  const svgRef = useRef(null);
  const gRef = useRef(null);

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

  const cambiarEsquema = () => {
    switch (esquema) {
      case "Impuesto a las ganancias": { setRender(impuestoGanancias); setLinkEditar(impuestoGananciasLink) }; break;
      default: setRender(); break;
    }
  }

  useEffect(() => {

    cambiarEsquema()

  }, [esquema])

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
  }

  function handleMouseLeave(event) {
    setIsPanning(false);
  }

  return (
    <>

      <div className={style.contenedorSVG}>
        {/* <button onClick={() => handleZoomIn()}>Zoom In</button>
        <button onClick={() => handleZoomOut()}>Zoom Out</button> */}
        {render ?
          <a
          className='btn btn-primary'
          style={{width:"fit-content"}}
            target='_blank'
            href={linkEditar}
          >
            Editar
          </a>
          :
          <a
          className='btn btn-primary'
          style={{width:"fit-content"}}
            target='_blank'
            href="https://app.diagrams.net"
          >
            Crear
          </a>
        }
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
          onMouseLeave={(event) => handleMouseLeave(event)}
        >
          <g
            ref={gRef}
            transform={`translate(${translate.x},${translate.y}) scale(${scale})`}
            dangerouslySetInnerHTML={{ __html: `${render}` }}
          />



        </svg>
      </div>
    </>
  );
}
