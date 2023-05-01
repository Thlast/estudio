import { useEffect, useState, useContext } from "react"
import { useAuth } from "../../context/AuthContext";
import { getNotes, getSeccionNotes, getSeccionIdNotes } from "../servicios/notas/service.obtenerNota";
import { CrearNota } from "./crearNota";
import { Nota } from "./nota";
import { eliminarNota } from "../servicios/notas/services.eliminarNota";
import { alertainfo } from "../alertas";
import { modificarNota } from "../servicios/notas/service.modificarNota";
import { agregarNota } from "../servicios/notas/service.crearNota";
import { MateriasContext } from '../../context/MateriasContext';

export function MostrarNotas(props) {

  const { user } = useAuth();
  const [notes, setNotes] = useState();
  const { matPreferida } = useContext(MateriasContext);
  const curso = props?.curso || matPreferida;
  const { seccion } = props;
  const { perfil } = props;
  const { seccionId, capituloId } = props;
  const { titulo } = props;
  const { obtenerQnotes } = props;
  const [modificar, setModificar] = useState(false);
  const [notaModificar, setNotaModificar] = useState()

  const notaModificada = async (privateStatus, usuario, curso, notaName, titulo, seccion, seccionId, capituloId, contenido, idNotaModificar, indice, e) => {
    try {
      let notaModif = null
      await modificarNota(privateStatus, usuario, curso, notaName, titulo, seccion, seccionId, capituloId, contenido, idNotaModificar, e).then(response =>
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

  const notaCreada = async (privateStatus, curso, titulo, seccion, seccionId, capituloId, contenido, notaName, usuario, event) => {
    event.preventDefault()
    //console.log(privateStatus, curso, titulo, seccion, seccionId, contenido, capituloId, notaName, usuario)
    try {

      agregarNota(privateStatus, curso, titulo, seccion, seccionId, capituloId, contenido, notaName, usuario, event)
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
        //console.log(data)
        setNotes(data)
        obtenerQnotes(data.length)
        obtenerContenidoNotas(data)
      })

    } else if (seccionId) {
      getSeccionIdNotes(seccionId, user.uid).then(data => {
        //console.log(data)
        setNotes(data)
        obtenerQnotes(data.length)
        obtenerContenidoNotas(data)
      })
    }
    else {
      getNotes(curso, user.uid).then(data => {
        //console.log(data)
        setNotes(data)
        //obtenerQnotes(data.length)
      })

    }

  }, [curso, seccion])

  const irModificarNota = (n, i) => {
    setModificar(!modificar)
    setNotaModificar({ ...n, indice: i })

  }

  const cancelarModificar = () => {
    setModificar(false)

  }
  const { obtenerContenidoNotas } = props;


  return (
    <>
      <div className={perfil ? 'menuContenedor' : ""}>
        <div className="misnotas">
          <h1>Anotaciones de: {curso}</h1>
          {notes?.length > 0 ?
            notes?.map((n, num) => {
              return (
                <>
                  <Nota
                    irModificarNota={irModificarNota}
                    notaEliminada={notaEliminada}
                    seccion={seccion}
                    seccionId={seccionId}
                    indice={num}
                    n={n} />
                </>
              )
            }
            )
            :
            "No hay notas en esta sección"
          }
          {modificar ? null :
            <>
              <CrearNota
                notaCreada={notaCreada}
                titulo={titulo}
                curso={curso}
                seccion={seccion}
                seccionId={seccionId}
                capituloId={capituloId}
              />
            </>
          }
          {modificar ?
            <CrearNota
              notaCreada={notaCreada}
              notaModificada={notaModificada}
              curso={notaModificar.curso}
              seccion={notaModificar.seccion}
              seccionId={notaModificar.seccionId}
              capituloId={notaModificar.capituloId}
              titulo={notaModificar.capitulo}
              notaModificar={notaModificar}
              cancelarModificar={cancelarModificar}
            />
            :
            <>
            </>
          }
        </div>
      </div>
    </>
  )
}