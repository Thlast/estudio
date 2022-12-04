import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function ModelosRT9() {



return (
  <>
  <h1>Modelos de estados contables segun RT9</h1>
  <ul>
    <li>
    <Link 
    className='perfil-boton'
    to="/estados-contables/estado-de-resultados">Estado de Resultados
    </Link>
    </li>
  <hr></hr>
  </ul>
  </>

    );
  }

