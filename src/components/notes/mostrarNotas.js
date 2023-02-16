import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext";
import { getNotes, getSeccionNotes } from "../servicios/notas/service.obtenerNota";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CrearNota } from "./crearNota";
import { Nota } from "./nota";
import { eliminarNota } from "../servicios/notas/services.eliminarNota";
import { alertainfo } from "../alertas";
import { modificarNota } from "../servicios/notas/service.modificarNota";
import { agregarNota } from "../servicios/notas/service.crearNota";

export function MostrarNotas(props) {

  const { user } = useAuth();
  const [notes, setNotes] = useState();
  const { curso } = props;
  const { seccion } = props;
  const { titulo } = props;
  const { obtenerQnotes } = props;
  const [modificar, setModificar] = useState(false);
  const [notaModificar, setNotaModificar] = useState()

  const notaModificada = async (privateStatus, usuario, curso, notaName, titulo, seccion, contenido, idNotaModificar, indice, e) => {
    try {
      let notaModif = null
      await modificarNota(privateStatus, usuario, curso, notaName, titulo, seccion, contenido, idNotaModificar, e).then(response =>
        notaModif = { ...response, id: idNotaModificar }
      );
      notes.splice(indice, 1, notaModif)
      //document.getElementById(idmodif).scrollIntoView()
    } catch (error) {
      console.log(error)
    }
    setModificar(false)
  }

  const notaEliminada = async (idNota, usuario) => {
    if (usuario === user.uid) {
      try {
        await eliminarNota(idNota);
        setNotes(notes.filter(n => n.id !== idNota))
        //console.log("eliminado")
      } catch (error) {
        console.log(error)
      }
    } else {
      alertainfo("No tienes permiso")
    }
  }

  const notaCreada = async (privateStatus, curso, titulo, seccion, contenido, notaName, usuario, event) => {
    event.preventDefault()
    try {
      agregarNota(privateStatus, curso, titulo, seccion, contenido, notaName, usuario, event)
      .then(response =>
        setNotes(notes.concat(response))
      );

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (seccion) {
      getSeccionNotes(seccion, user.uid).then(data => {
        console.log(data)
        setNotes(data)
        obtenerQnotes(data.length)
      })

    } else {
      getNotes(curso, user.uid).then(data => {
        console.log(data)
        setNotes(data)
        //obtenerQnotes(data.length)
      })

    }

  }, [curso])

  const irModificarNota = (n, i) => {
    setModificar(!modificar)
    setNotaModificar({ ...n, indice: i })

  }

  const cancelarModificar = () => {
    setModificar(false)

  }

  return (
    <>
      <div className="misnotas">
        <h1>Mis anotaciones de: {curso}</h1>
        {modificar ? null :
        <>
        <CrearNota
          notaCreada={notaCreada}
          titulo={titulo}
          curso={curso}
          seccion={seccion}
        />
        </>
}
        {modificar ?
          <CrearNota
            notaCreada={notaCreada}
            notaModificada={notaModificada}
            curso={notaModificar.curso}
            seccion={notaModificar.seccion}
            titulo={notaModificar.capitulo}
            notaModificar={notaModificar}
            cancelarModificar={cancelarModificar}
          />
          :
          <>
            {notes?.map((n, num) => {
              return (
                <>
                  <Nota
                    irModificarNota={irModificarNota}
                    notaEliminada={notaEliminada}
                    seccion={seccion}
                    indice={num}
                    n={n} />
                </>
              )
            }
            )}
          </>
        }
      </div>

    </>
  )
}