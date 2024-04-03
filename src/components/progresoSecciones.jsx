import { useEffect, useState } from 'react';
import style from '../modulos-css/progresoSecciones.module.css'
import { progresoCapitulo } from './servicios/cursos/cursosSQL/progreso';
import { Spinner } from './Login/Spinner';
import { BarraSkeleton } from '../modulos-css/esqueletoSeccion';


export function ProgresoSecciones(props) {
  const { currentSection, currentCap } = props
  const [cantidadSecciones, setCantidadSecciones] = useState()
  const [cargando, setCargando] = useState(false)
  const progress = (currentSection / cantidadSecciones) * 100;

  useEffect(() => {
    setCargando(true)
    progresoCapitulo(currentCap).then(data => {
      setCantidadSecciones(data?.cantidadSecciones)
      setCargando(false)
    })
  }, [currentCap])

  return (
    <>
      {cargando ? <BarraSkeleton></BarraSkeleton> :
        <div className={style.progressBarContainer}>
          <div className={style.progressBar} style={{ width: `${progress}%` }} />
        </div>
      }
    </>
  );
};

