import { alertafail, alertainfo, alertasuccess } from "../alertas";
import { useContext } from "react";
import { ResueltasContext } from "../../context/Resueltas";

export function Resultado(props) {

  const {agregarHistorial} = useContext(ResueltasContext)
  const {c} = props
  const {id} = props
  const {num} = props


  const checkResultado = async (c, num, id, e) => {
    e.preventDefault()
    try {
    const respuesta = parseInt(document.querySelector(`input[name=resultado${num}-${id}]`).value);
    if(respuesta === c) {
      await alertasuccess("Respuesta correcta")
      document.getElementById(`respuesta-${id}`).style.display = 'block'
      document.getElementById(`correcto-${id}`).style.display = 'block'
      agregarHistorial(id)
      console.log(id)
      // localStorage.setItem("listaResueltas", lista)
    } else if (respuesta === null || undefined) {
      alertainfo("debe seleccionar una respuesta") 
    }
    else {
      alertafail("Respuesta incorrecta")
    }
    } catch (error) {
        
        console.log(error)
    }
  }
    
return (
<div>
  <span>
    Resultado:
  </span>
  <form
  onSubmit={(e) => checkResultado(c, num, id, e)}>
    <div
    className="resultado">
<input
name={`resultado${num}-${id}`}
type="number" />
<button
className='btn-primary'>
  ok
</button>
</div>
</form>
</div>
)
}

