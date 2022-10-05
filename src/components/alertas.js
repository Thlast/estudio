
import React from 'react';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
  
export const alertasuccess = () => {
    MySwal.fire({icon: 'success', 
    title: <p>Respuesta correcta</p>,
    showConfirmButton: false,
    timer: 1500
  });
}

export const alertafail = () => {
    MySwal.fire({icon: 'error', 
      title: <p>Respuesta incorrecta</p>,
      showConfirmButton: false,
      timer: 1500
    });
}

export const alertamodificada = () => {
    MySwal.fire({icon: 'success', 
    title: <p>Pregunta modificada</p>,
    showConfirmButton: false,
    timer: 1500
  });
}

export const alertaagregada = () => {
    MySwal.fire({icon: 'success', 
      title: <p>Pregunta agregada</p>,
      showConfirmButton: false,
      timer: 1500
    });
}

export const alertaeliminada = () => {
    MySwal.fire({icon: 'success', 
      title: <p>Pregunta eliminada</p>,
      showConfirmButton: false,
      timer: 1500
    });
}