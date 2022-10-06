
import React from 'react';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
  
export const alertasuccess = (mensaje) => {
    MySwal.fire({icon: 'success', 
    title: <p>{mensaje}</p>,
    showConfirmButton: false,
    timer: 1500
  });
}

export const alertafail = (mensaje) => {
    MySwal.fire({icon: 'error', 
      title: <p>{mensaje}</p>,
      showConfirmButton: false,
      timer: 1500
    });
}
