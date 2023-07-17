import React from 'react';
import style from './Spinner.module.css';

export const Spinner = (props) => {
  const {w} = props;
  return (
    // <div className={style.ldsRing}>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    // </div>
    <div className={style.contenedorLoading}>
      <svg style={{width: w || "80px"}} className={style.svgprueba} viewBox="0 0 80 100">
        <defs>
          <path id="line" d="M-5 75 Q5 50 30 50 Q60 50 60 30 Q60 10 40 10 Q20 10 20 40 L20 60 Q20 90 40 90 Q60 90 70 70" />
        </defs>
        <use className={style.base} xlinkHref="#line" />
        <use className={style.loading} xlinkHref="#line" />
      </svg>
    </div>
  );
};
