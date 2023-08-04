import { alertafail, alertainfo, alertasuccess } from "../alertas";
import { useContext } from "react";
import { ResueltasContext } from "../../context/Resueltas";
import { UserConfig } from "../../context/UserConfig";

export function Resultado(props) {

  const { agregarResueltasContext } = useContext(ResueltasContext)
  const { c } = props
  const { id, curso } = props
  const { num } = props
  const { confetti } = useContext(UserConfig)

  const checkResultado = async (c, num, id, e) => {
    e.preventDefault()
    try {
      //const respuesta = document.querySelectorAll(`input[name=resultado${num}-${id}].value`);
      const inputElements = document.querySelectorAll(`input[name=resultado-${id}]`);
      const inputValues = Array.from(inputElements).map(input => parseInt(input.value));

      // Comparamos los valores ingresados con los valores correctos
      const isCorrect = inputValues.every((value, index) => value === c[index]);
      const correctas = inputValues.filter((value, index) => value === c[index]);
      if (isCorrect) {
        alertasuccess("Respuesta correcta", confetti)
        document.getElementById(`respuesta-${id}`).style.display = 'block'
        document.getElementById(`correcto-${id}`).style.display = 'block'
        agregarResueltasContext(10, curso, id)
        // localStorage.setItem("listaResueltas", lista)
      }
      else {
        alertafail(`Respuesta incorrecta ${correctas.length}/${inputValues.length}`)
      }
    } catch (error) {

      console.log(error)
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => checkResultado(c, num, id, e)}>
        <div
          className="resultado">
          <div
            className="pregunta-resultados">
            <span>
              Resultado:
            </span>
            {c.map((c, n) => {
              return (
                <span>
                  {`${n + 1}) `}
                  <input
                    name={`resultado-${id}`}
                    type="number" />
                </span>
              )

            })}
            <button
              className='btn-primary'>
              ok
            </button>
          </div>

        </div>
      </form>
    </div>
  )
}

