import React, { useEffect } from 'react';

export const BotonEsc = ({handleClick}) => {
  // Función para manejar el evento de teclado
  const handleKeyDown = (event) => {
    // Comprueba si la tecla presionada es "Esc" (código de tecla 27)
    if (event.keyCode === 27) {
      // Realiza la acción que deseas cuando se presiona "Esc"
      // Por ejemplo, puedes hacer que el botón haga clic
      handleClick();
    }
  };

  // Agrega un escucha de evento de teclado cuando el componente se monta
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    // Elimina el escucha de evento de teclado cuando el componente se desmonta
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <button className='btn btn-danger' onClick={handleClick}>Volver</button>
    </div>
  );
};
