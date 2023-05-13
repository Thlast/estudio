import React, { useEffect, useState } from 'react';
import { preguntarIA } from '../servicios/serviciosIA/consultas'; // asumiendo que tienes un archivo separado para tus funciones
import style from './interaccion.module.css'
import { Spinner } from '../Login/Spinner.js'
import { useAuth } from '../../context/AuthContext';
import { getChats, getMessages } from '../servicios/serviciosIA/obtenerChats';
import { guardarMessages } from '../servicios/serviciosIA/guardarChats';
import { alertainfo } from '../alertas';
import { agregarChat, modificarChat } from '../servicios/serviciosIA/crearChat';
import { eliminarChat, eliminarMessages } from '../servicios/serviciosIA/eliminarChat';

export function InteraccionIA() {
  const [nombreChat, setNombreChat] = useState("Nuevo chat");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState();
  const [cargando, setCargando] = useState(false);
  const { datosUser, user } = useAuth();

  const [confirmarAccion, setConfirmarAccion] = useState()

  const preguntarGuardar = async (chat, pregunta, mensajes, e) => {

    await preguntarIA(pregunta, mensajes, datosUser?.apiKey).then(data => {
      console.log(data)
      guardarMessages(chat, pregunta, data, e)
      if (messages) {
        let nuevas = [...messages]
        nuevas.push({ pregunta: pregunta, respuesta: data })
        setMessages(nuevas)
      } else {

        let nuevas = [{ pregunta: pregunta, respuesta: data }]
        setMessages(nuevas)
      }
      setCargando(false)
    })
  }

  const manejarPregunta = async (e) => {
    e.preventDefault()
    setCargando(true)
    if (!currentChat) {
      await agregarChat("Nuevo chat", user.uid, e).then(data => {
        const nuevos = [...chats]
        nuevos.unshift(data)
        setChats(nuevos)
        abrirChat(data.idChat)
        // Ahora que se ha creado el chat, agregamos la pregunta
        preguntarGuardar(data.idChat, prompt, messages, e)
      })
    } else {
      // Si ya existe un chat, simplemente agregamos la pregunta
      await preguntarGuardar(currentChat, prompt, messages, e)
    }
  };


  useEffect(() => {
    getChats(user.uid).then(data => {
      setChats(data)
    })
  }, [])

  useEffect(() => {
    if (currentChat) {
      getMessages(currentChat).then(data => {
        setMessages(data)
      })
    } else {
      setMessages()
    }

  }, [currentChat])

  //console.log(currentChat)
  const abrirChat = (idChat) => {
    console.log(idChat)
    setCurrentChat(idChat)
    document.querySelector(".selectedChat")?.classList.remove("selectedChat")
    document.getElementById(idChat)?.classList.add("selectedChat");
  }

  const eliminarActualizar = async (id) => {
    try {
      //tenemos que eliminar todos los messages primero:
      await eliminarMessages(id)
      //ahora si eliminamos el chat:
      await eliminarChat(id);
      setChats(chats.filter(n => n.idChat !== id))
      //console.log("eliminado")
    } catch (error) {
      console.log(error)
    }

  }

  const modificarActualizar = async (idChat, indice, event) => {

    try {
      let chatModif = null
      await modificarChat(nombreChat, idChat, event).then(response =>
        chatModif = { ...response, id: idChat }
      );
      // Obtener el estado actual
      const chatsActuales = [...chats];

      // Reemplazar el elemento existente en esa posición con "mango"
      chatsActuales[indice] = chatModif;

      // Actualizar el estado con la nueva lista de frutas
      setChats(chatsActuales);

      // chats.splice(indice, 1, chatModif)

    } catch (error) {
      console.log(error)
    }
    cancelar(idChat)
  }

  const confirmar = (id, nombre, accion) => {
    if (accion == "modificar") {
      setNombreChat(nombre)
      document.getElementById(`modificar-${id}`).style.display = "none"
      document.getElementById(`confirmarModificar-${id}`).style.display = "block"
      document.getElementById(`modificarNombreChat-${id}`).style.display = "block"
      document.getElementById(`nombreChat-${id}`).style.display = "none"
    } else if (accion == "eliminar") {
      document.getElementById(`modificar-${id}`).style.display = "none"
      document.getElementById(`confirmarEliminar-${id}`).style.display = "block"
    }

  }
  const cancelar = (id) => {
    document.getElementById(`modificar-${id}`).style.display = "block"
    document.getElementById(`confirmarModificar-${id}`).style.display = "none"
    document.getElementById(`confirmarEliminar-${id}`).style.display = "none"

    //
    document.getElementById(`modificarNombreChat-${id}`).style.display = "none"
    document.getElementById(`nombreChat-${id}`).style.display = "block"
  }

  return (
    <div className={style.contenedor}>
      <div className={style.contenedorChatsAnteriores}>
        <h1>
          Chats
        </h1>
        <ul

        >
          <li
            className={style.new}
            onClick={() => abrirChat()}
          >
            new
          </li>
          {chats?.map((c, num) => {
            return (
              <li
                className={style.chatAcceder}
                key={"chat" + c.idChat}
                id={c.idChat}

              >
                <div
                  id={"nombreChat-" + c.idChat}
                  style={{ display: "block" }}
                  className={style.chatNombre}
                  onClick={() => abrirChat(c.idChat)}>
                  {c.nombreChat}
                </div>
                <input
                  id={"modificarNombreChat-" + c.idChat}
                  style={{ display: "none" }}
                  onChange={(e) => setNombreChat(e.target.value)}
                  value={nombreChat}
                  type='text'
                  placeholder={c.nombreChat}
                >
                </input>
                <div
                  className={style.modificarChat}
                >

                  {/* //confirmarModificar */}
                  <span
                    className='modificarChat'
                    id={"confirmarModificar-" + c.idChat}
                    style={{ display: "none" }}>
                    <button
                      onClick={(e) => modificarActualizar(c.idChat, num, e)}
                      className={style.botonconfirmar}
                    >
                      ✓
                    </button>
                    <button
                      type='button'
                      onClick={() => cancelar(c.idChat)}
                      className={style.botoncancelar}
                    >
                      ✘
                    </button>
                  </span>

                  {/* //confirmarEliminar */}
                  <span
                    id={"confirmarEliminar-" + c.idChat}
                    style={{ display: "none" }}>
                    <button
                      onClick={(e) => eliminarActualizar(c.idChat)}
                      className={style.botonconfirmar}
                    >
                      ✓
                    </button>
                    <button
                      type='button'
                      onClick={() => cancelar(c.idChat)}
                      className={style.botoncancelar}
                    >
                      ✘
                    </button>
                  </span>

                  {/* Activar para eliminar/modificar */}
                  <span
                    id={"modificar-" + c.idChat}
                    style={{ display: "block" }}>
                    {currentChat == c.idChat ?
                      <button
                        onClick={() => confirmar(c.idChat, c.nombreChat, "modificar")}
                        className={style.botoneditar}
                      >
                        &#9999;
                      </button>
                      :
                      null
                    }
                    <button
                      className={style.botoneditar}
                      onClick={() => confirmar(c.idChat, c.nombreChat, "eliminar")}
                    >
                      X
                    </button>
                  </span>

                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div className={style.contenedorDerecha}>

        <div className={style.contenedorRespuestas}>
          <div className={style.esperandoRespuesta}>
            {cargando && <Spinner></Spinner>}
          </div>
          <div className={style.respuestas}>
            Hola, soy un asistente especialista en impuestos. ¿En que puedo ayudarte?
          </div>
          {messages?.map(m => {
            return (
              <div
                key={"message-" + m.idMessage}>
                <div
                  className={style.preguntasUser}>
                  {m.pregunta}
                </div>
                {m.respuesta ?
                  <div
                    className={style.respuestas}>
                    {m.respuesta}
                  </div>
                  :
                  null
                }
              </div>
            )
          })}

        </div>
        {datosUser?.apiKey ?
          <form
            className={style.contenedorFormulario}
            onSubmit={(e) => manejarPregunta(e)}
          >
            <input
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              placeholder='escribe tu pregunta'
              type='text'>

            </input>
            <button
              className='home-boton'
              type='submit'
            >
              Preguntar

            </button>
          </form>
          :
          <div className={style.contenedorFormulario}>
            <div className={style.nohayapi}>
              No hay apiKey.
              </div>
          </div>
        }
      </div>
    </div>
  );
}

