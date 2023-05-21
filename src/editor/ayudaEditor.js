import { useState } from "react";
import { Previsualizacion } from "./previsualizacion";
import { ejemplosMarkdown } from "./ejemplosMarkdown";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";


export function AyudaEditor(props) {

  const { preview } = props;
  const { curso } = props;
  const [previsualizar, setPrevisualizar] = useState(false);
  const ejemplos = ejemplosMarkdown

  const mostrarEjemplo = (num) => {
    const elemento = document.getElementById(`ayuda${num}`);
    for (let i = 0; i < ejemplos.length; i++) {
      if(i !== num){
        document.getElementById(`boton${i}`).classList.remove("botonmostrar")
      }
    }
    if (!document.getElementById(`boton${num}`).classList.contains("botonmostrar")) {
      document.getElementById(`boton${num}`).classList.add("botonmostrar");
    } else {
      document.getElementById(`boton${num}`).classList.remove("botonmostrar");
    }
    

    if (window.getComputedStyle(elemento).getPropertyValue("display") == "none") {
      for (let i = 0; i < ejemplos.length; i++) {
        if (document.getElementById(`ayuda${i}`)) {
          document.getElementById(`ayuda${i}`).style.display = "none"
        }
      }
      elemento.style.display = "block"
    } else if (window.getComputedStyle(elemento).getPropertyValue("display") == "block") {
      elemento.style.display = "none"
    }

  }
  const señalarResultado = (num, numE) => {
    if (document.querySelector(".RemarcarAyudaEditor")) {
      document.querySelector(".RemarcarAyudaEditor")?.classList.remove("RemarcarAyudaEditor")
      document.querySelector(".RemarcarAyudaEditor")?.classList.remove("RemarcarAyudaEditor")
    }
    document.getElementById(`demostracion-${numE}${num}`).classList.add("RemarcarAyudaEditor")
    document.getElementById(`input-${numE}${num}`).classList.add("RemarcarAyudaEditor")
  }

  return (
    <div className="secciones">
      <div className="ayudaContenedor">
        <button
          onClick={() => setPrevisualizar(true)}
          className={`${previsualizar && "botonmostrar"} cursos-as editarcurso`}>
          Previsualizacion</button>
        <button
          onClick={() => setPrevisualizar(false)}
          className={`${!previsualizar && "botonmostrar"} cursos-as editarcurso`}>
          Ayuda</button>
      </div>
      <hr></hr>
      {previsualizar ?
        <Previsualizacion preview={preview} />
        :
        <>
          {ejemplos?.map((ej, numE) => {
            if (!ej.curso || ej.curso == curso)
              return (
                <div
                  key={"ejemplo-" + numE}>
                  <button
                    id={"boton" + numE}
                    style={{ width: "100%" }}
                    onClick={() => mostrarEjemplo(numE)}
                    className="home-boton">
                    {ej.nombre}{ej.curso ? ` (solo para ${ej.curso})` : null}
                  </button>
                  <section
                    id={"ayuda" + numE}
                    style={{ display: "none" }}
                  >
                    <br></br>
                    <p>
                      {ej.explicacion}
                    </p>
                    <div className="ayudaInput">
                      {ej.texto?.map((a, num) => {
                        return (
                          <div
                            onMouseEnter={() => señalarResultado(num, numE)}
                            id={"input-" + numE + num}
                            key={"input-" + numE + num}>
                            <p>
                              {a}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                    <hr></hr>
                    {ej.texto?.map((a, num) => {
                      return (
                        <div
                          onMouseEnter={() => señalarResultado(num, numE)}
                          id={"demostracion-" + numE + num}
                          key={"demostracion-" + numE + num}>
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                          >
                            {a}
                          </ReactMarkdown>

                        </div>
                      )
                    })}

                    <hr></hr>
                  </section>
                </div>
              )
          })}
          {/* <section>
            Headers
            # H1
            ## H2
            ### H3
            #### H4
            ##### H5
            ###### H6

            Alternatively, for H1 and H2, an underline-ish style:

            Alt-H1
            ======

            Alt-H2
            ------
          </section> */}
        </>
      }
    </div>
  )

}