import { useState } from "react";
import { crearSeccion } from "../components/servicios/cursos/cursosSQL/crearSeccion";


export function EditorSeccion(props) {

  //const {curso} = props;
  const { capituloId } = props;
  const [nombreSeccion, setNombreSeccion] = useState();
  const [contenido, setContenido] = useState();

  return (
    <>

      <form
        className="form-vof"
        onSubmit={(event) => crearSeccion(capituloId, nombreSeccion, contenido, event)}
      >
        <h3>Añadir secciones al capitulo:</h3>
        Nombre
        <input
          min={3}
          onChange={(e) => setNombreSeccion(e.target.value)}
        >

        </input>
        Contenido
        <textarea
          onChange={(e) => setContenido(e.target.value)}
        >

        </textarea>
        <button className="home-boton">
          Añadir Sección
        </button>
      </form>
    </>
  )
}