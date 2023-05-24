import { useContext, useState } from "react"
import { crearCurso } from "./servicios/cursos/cursosSQL/crearCurso"
import { MateriasContext } from "../context/MateriasContext"

export function CrearCurso() {

  const {cargarMaterias} = useContext(MateriasContext)
  const [nombre, setNombre] = useState()
  const [id, setId] = useState()
  const [descripcion, setDescripcion] = useState()

  const enviarCrearCurso = async (e) => {
    e.preventDefault()
    await crearCurso(id, nombre, descripcion)
    await cargarMaterias()
  }

  return (
    <>
    
    <form className="form-vof">
      <h2>Agregar Curso:</h2>
      El nombre completo:
      <input
      required
      placeholder="El nombre del curso"
      onChange={(e) => setNombre(e.target.value)}
      value={nombre}
      type="text"
      >
      </input>
      El id es un nombre corto: Ej: "impuestos", "conta7", "finanzas"
      <input
      max={15}
      required
      placeholder="Agrega una id"
      onChange={(e) => setId(e.target.value)}
      value={id}
      type="text"
      >
      </input>
      Una descripción: (opcional)
      <textarea
      placeholder="Agrega una descripción"
      onChange={(e) => setDescripcion(e.target.value)}
      value={descripcion}
      >

      </textarea>
      <button
      className="boton home-boton"
      onClick={(e) => enviarCrearCurso(e)}
      >
        Crear Curso
      </button>
    </form>
    </>
  )
}