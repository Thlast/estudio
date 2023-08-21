import React, { useEffect, useState, useContext } from "react";
import { MostrarPregunta } from "./preguntas/mostrarPregunta";
import { obtenerLongitudPreguntas } from "./servicios/preguntas/obtenerPregunta";
import { MateriasContext } from "../context/MateriasContext";

export const MisPreguntas = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [paginasTotales, setPaginasTotales] = useState(0); // Inicializar en 0
  const { matPreferida } = useContext(MateriasContext);

  useEffect(() => {
    obtenerLongitudPreguntas(matPreferida).then(data => {
      setPaginasTotales(Math.ceil(data.total / perPage)); // Usar Math.ceil para asegurarse de redondear hacia arriba
    });
  }, [matPreferida]);

  useEffect(() => {
    setPage(1)
  }, [matPreferida]);

  return (
    <div className="menuContenedor">
      {/* Renderizar botones por cada página */}
      {Array.from({ length: paginasTotales }, (_, index) => (
        <button 
        className={index+1 == page ? "home-boton botonmostrar" : "home-boton"} key={index} onClick={() => setPage(index + 1)}>
          Página {index + 1}
        </button>
      ))}
      <MostrarPregunta
        page={page}
        perPage={perPage}
        perfil={true}
        edit={true}
        mostrarPreguntas={true}
        filtroMaterias={true}
      />
    </div>
  );
};
