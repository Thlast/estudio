import React from 'react';
import { Link } from 'react-router-dom';

export function ListadoRT() {


return (
  <>
  <h1>Listado Resoluciones Técnicas</h1>
  <ul>
    <li>
    <Link
    className='perfil-boton'
    to="/estados-contables/estado-de-resultados">
      RT 9
    </Link>
    </li>
  <hr></hr>
  </ul>
  </>

    );
  }
