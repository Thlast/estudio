import { useEffect, useRef, useState } from "react"
import { Check, Warning } from "../warning"
import { alertainfo } from "../../../alertas"


export const ControlarEjercicio = ({ controlarEjercicio, funcionLiquidar }) => {

  const [resultados, setResultados] = useState({})
  const [correctas, setCorrectas] = useState(0)
  const [tests, setTests] = useState(0)

  const ejRef = useRef()

  const obtenerResultados = async () => {
    try {
      const data = await controlarEjercicio(); // Espera la promesa directamente
      if (data) {
        setResultados(data?.resultados);
        setCorrectas(data?.correctas);
        setTests(data?.tests);
      }
    } catch (error) {
      // console.error("Error en la solicitud:", error);
      alertainfo("Error en el servidor"); // Puedes personalizar el mensaje de error
    }
  };


  useEffect(() => {
    funcionLiquidar(ejRef)
  }, [resultados])

  return (
    <>
      <div ref={ejRef}>
        <button className="home-boton" onClick={() => obtenerResultados()}>Enviar solución</button>
        <div>
          <h2>Resultados de Verificación: {correctas + "/" + tests}</h2>
          <ul>
            {Object.entries(resultados)?.map(([categoria, estado]) => (
              <li key={categoria}>
                <strong><span id={categoria}>{categoria}: </span>{estado === 'Correcto' ? <span style={{ color: 'green' }}><Check />{estado}</span> : <span style={{ color: 'red' }}><Warning />{estado}</span>}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}