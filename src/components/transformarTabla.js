import React, {useState} from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { alertareiniciarTabla } from "./alertas";
import style from './modulos-css/transformarTabla.module.css'

export function TransformarTabla() {

const [rows, setRows] = useState(["columna 1"])
const [filas, setFilas] = useState(1)
const [resultado1, setResultado1] = useState("")
const [resultado2, setResultado2] = useState("")
const [resultadoTabla, setResultadoTabla] = useState("")
const tabla = (e, datosrow, filas) => {
e.preventDefault()

console.log(datosrow)
let datos = datosrow.map(a => {
 return a[0].split("\n")
})
let columnas = rows.length
let respuesta = []
let x = 0;
while (x < filas) {
  datos.map((a, num) => {
    if((num + 1) % columnas == 0) {
      respuesta.push(a[x])
      respuesta.push(" Salto ")
    } else if ((a[x]) === undefined) {
      respuesta.push(undefined)
    } 
    else {
      respuesta.push(a[x])
    }
}
)     
  x += 1
}
respuesta.splice(columnas, 0, " Salto " +"| --- ".repeat(columnas))
setResultado1(respuesta.join(" | ").replaceAll("Salto", `\\n`))
setResultado2(respuesta.join(" | ").replaceAll("Salto", `\n`))
setResultadoTabla(respuesta.join(" | ").replaceAll("Salto", "\n"))  
}

const handleOnAdd = () => {
  setRows(rows.concat(`columna ${rows.length +1}`));
};

const handleOnChange = (index, value) => {
  const copyRows = [...rows];
  copyRows[index] = [value]
  setRows(copyRows);
};

const handleOnRemove = index => {
    const copyRows = [...rows];
    copyRows.splice(index, 1);
    setRows(copyRows);
  };

  const handleOnReiniciar = () => {
    const reinciar = () => {
        setRows(["columna 1"])
    }
    alertareiniciarTabla(reinciar)
  };
   

return (
  <div className={style.contenedorTabla}>
    <h4>Transformar a tabla:</h4>
  <form
  className={style.contenedorinput}
  onSubmit={(e) => tabla(e, rows, filas)}>
    
    <label>
      Filas:
    <input
    onChange={(e) => setFilas(e.target.value)}
    value={filas}
    type="number"
    max="50"
    min="1"></input>
    </label>
  <button
//   className="btn btn-primary"
  >Transformar</button>
  <button
//   className="btn btn-danger"
  onClick={() => handleOnReiniciar()}
  >Reiniciar</button>
  </form>
  <p>"Enter" (salto de linea) para separar las filas</p>
  <div 
        className={style.contenedorRows}>
  {rows.map(a => {
    return (
        <div
        className={style.contenedorcolumna}>
      <textarea
      name={"columna "+(rows.indexOf(a)+1)}
      onChange={(e) => handleOnChange(rows.indexOf(a), e.target.value)}
      value={a}>
      </textarea>
      <button
        onClick={() => handleOnRemove(rows.indexOf(a))}>
            Eliminar
        </button>
      </div>
    )
  })}

  <button
  className={style.botonagregar}
  onClick={() => handleOnAdd()}
  >
    Agregar columna
  </button>
  </div>
  <table>
  </table>
  <hr></hr>
  <h3>Para String:</h3>
  <p>"{resultado1}"</p>
  <hr></hr>
  <h3>Para texto:</h3>
  <p>Copia y pega el contenido dentro del input</p>
  <ReactMarkdown >{resultado2}</ReactMarkdown >
  <hr></hr>
  <h3>Previsualización:</h3>
  <ReactMarkdown 
   remarkPlugins={[remarkGfm]}>  
   {resultadoTabla}
   </ReactMarkdown>
   <hr></hr>
  </div>
)
}