import { useLocation } from 'react-router-dom';

export function Error404() {

  const location = useLocation();
  const mensaje = location.state?.mensaje;
console.log(mensaje)
  return (
    <div style={{textAlign:"center", padding:"40px"}}>
      <h1>Error 404</h1>
      {mensaje && <p>{mensaje}</p>}
      {/* Resto del contenido de la página de error */}
    </div>
  );
}