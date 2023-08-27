import { useEffect, useState } from "react"
import style from './cGanancias.module.css'


export const EscalaValores = ({baseImponible}) => {
  const [impuestoCalculado, setImpuestoCalculado] = useState("-")
  const [verEscala, setVerEscala] = useState(false)
  const [ubicarEscala, setUbicarEscala] = useState()

  //mas de // hasta // pagaran //+%//sobre excedente de
  const escala = [
    [0.00, 234676.72, 0.00, 5, 0.00],
    [234676.72, 469353.46, 11733.84, 9, 234676.72],
    [469353.46, 704030.18, 32854.74, 12, 469353.46],
    [704030.18, 938706.93, 61015.95, 15, 704030.18],
    [938706.93, 1408060.37, 96217.46, 19, 938706.93],
    [1408060.37, 1877413.82, 185394.61, 23, 1408060.37],
    [1877413.82, 2816120.72, 293345.91, 27, 1877413.82],
    [2816120.72, 3754827.70, 546796.77, 31, 2816120.72],
    [3754827.70, "en adelante", 837795.93, 35, 3754827.70]
  ]

  const encontrar = (baseImponible) => {

    return escala.map((v, num) => {
      if (baseImponible >= v[0] && (baseImponible < v[1] || v[1] === "en adelante")) {
        setUbicarEscala(num)
        return (v[2] + ((baseImponible - v[4]) * (v[3] / 100))).toFixed(2)
      }
    })
  }

  useEffect(() => {
    setImpuestoCalculado(encontrar(baseImponible))
  }, [baseImponible])

  return (
    <>
    <h4 className={style.impuestoAIngresar}>Impuesto a ingresar: <em>{impuestoCalculado}</em></h4>
    <div
      style={{display:"flex", flexDirection:"column", gap:"10px", textAlign: "center", justifyContent:"center", alignItems:"center"}}
    >
      <button 
      onClick={() => setVerEscala(!verEscala)}
      className="home-boton">
        ver escala aplicable
      </button>
        <table style={{display: verEscala ? "block" : "none"}}>
          <thead>
            <tr>
              <th>Desde</th>
              <th>Hasta</th>
              <th>pagarán</th>
              <th>Más el %</th>
              <th>sobre excedente de</th>
            </tr>
          </thead>
          <tbody>
        {escala?.map((e, num) => {
          return (
            <tr className={num == ubicarEscala ? "encontrarSeccion" : "escala"} key={"escala-"+num}>
              <td>{e[0]}</td>
              <td>{e[1]}</td>
              <td>{e[2]}</td>
              <td>{e[3]}</td>
              <td>{e[4]}</td>
            </tr>
          )
        })}
        </tbody>
        </table>
        </div>
   
    </>
  )
}