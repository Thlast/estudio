import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { obtenerDatosCapitulos, obtenerDatosTitulos } from "../../components/servicios/cursos/obtenerSeccion"
import style from './navegacion.module.css'

export function NavegacionCursos(props) {

  const { curso } = props;
  const [indiceSeccion, setIndiceSeccion] = useState()
  const [secciones, setSecciones] = useState([])
  const [cargando, setCargando] = useState(false)
  const { ingresar } = props
  const { seccion } = props
  const { titulo } = props
  const { ingresarSeccion } = props
  const [proximo, setProximo] = useState("")
  const [anterior, setAnterior] = useState("")
  const [anteriorSeccion, setAnteriorSeccion] = useState("")
  const [siguienteSeccion, setSiguienteSeccion] = useState("")
  const navigate = useNavigate()

  useEffect(() => {

    setIndiceSeccion(secciones.indexOf(seccion))
  }, [seccion])


  useEffect(() => {
    setCargando(true)
    obtenerDatosCapitulos(curso, titulo)
      .then(data => {
        //console.log(data)
        if (data) {
          setIndiceSeccion(data.caps.indexOf(seccion))
          setSecciones(data.caps)
        }
      }
      ).catch(error => {
        navigate("/Error404", { state: { mensaje: `El curso: ${curso}, no se encontro en la base de datos` } })
      }
      )
    obtenerDatosTitulos(curso)
      .then(data => (
        data.map((t, num) => {
          switch (t.titulo) {
            case titulo: if (data.length !== num + 1) {
              setProximo(data[num + 1].titulo)
              setSiguienteSeccion(data[num + 1].secciones[0]);
            } else if (data.length === num + 1) {
              setProximo(null)
              setSiguienteSeccion(null);
            }
              if (num !== 0) {
                setAnterior(data[num - 1].titulo)
                setAnteriorSeccion(data[num - 1].secciones[data[num - 1].secciones.length - 1])
              } else if (num === 0) {
                setAnterior(undefined)
              }; break
          }
        }),
        setCargando(false)

      ))
      .catch(error => {
        navigate("/Error404", { state: { mensaje: `El curso: ${curso}, no se encontro en la base de datos` } })
      }
      )
  }, [titulo])

  return (
    <>
      {
        cargando ? null :
          <div class="cursos-botones">
            {
              indiceSeccion === 0 ?
                anterior ?
                  <Link
                    to={"/cursos/" + curso + "/" + anterior + "/" + anteriorSeccion?.nombre}
                    onClick={() => ingresarSeccion(anterior, anteriorSeccion?.nombre, true)}
                    className={style.cambioseccion}>
                    <p
                      className={style.anterior}>{"< "}Anterior Capitulo </p>
                    <p
                      className={style.blockellipsis}>
                      {anterior}
                    </p>
                  </Link>
                  : <div></div>
                :
                <Link
                  to={"/cursos/" + curso + "/" + titulo + "/" + secciones[indiceSeccion - 1]}
                  onClick={() => ingresar(secciones[indiceSeccion - 1])}
                  className={style.contenedorSeccion}>
                  <p
                    className={style.anterior}>{"< "} Anterior</p>
                  <p
                    className={style.blockellipsis}>
                    {secciones[indiceSeccion - 1]}
                  </p>
                </Link>
            }
            {secciones.length === indiceSeccion + 1 ?
              proximo ?
                <Link
                  to={"/cursos/" + curso + "/" + proximo + "/" + siguienteSeccion?.nombre}
                  onClick={() => ingresarSeccion(proximo, siguienteSeccion?.nombre, false)}
                  className={style.cambioseccion}>
                  <p
                    className={style.siguiente}>Siguiente Capitulo {" >"}</p>
                  <p
                    className={style.blockellipsis}>
                    {proximo}
                  </p>
                </Link>
                : <div>

                </div>
              :
              <Link
                to={"/cursos/" + curso + "/" + titulo + "/" + secciones[indiceSeccion + 1]}
                onClick={(e) => ingresar(secciones[indiceSeccion + 1])}
                className={style.contenedorSeccion}>
                <p
                  className={style.siguiente}>Siguiente {" >"}</p>
                <p
                  className={style.blockellipsis}>
                  {secciones[indiceSeccion + 1]}
                </p>
              </Link>

            }
          </div>

      }</>
  )

}