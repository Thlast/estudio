import React from 'react';
import style from './esqueletoSeccion.module.css'; // Asegúrate de importar el archivo CSS

export const CardSkeleton = () => {
  return (
    <div className={style.cardskeletoncontainer}>
    <div className={style.cardskeleton}>
        <br></br>
        <br></br>
      <div className={style.barracarga}></div>
      <div className={style.barracarga}></div>
      <div className={style.barracarga}></div>
      </div>
    </div>
  );
};

export const CuadroSkeleton = () => {
  return (
      <>
      <div className={`examen ${style.cuadrocarga}`}></div>
      <div className={`examen ${style.cuadrocarga}`}></div>
      <div className={`examen ${style.cuadrocarga}`}></div>
      <div className={`examen ${style.cuadrocarga}`}></div>
    </>
  );
};

