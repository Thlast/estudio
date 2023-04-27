import { useState } from "react";
import { Previsualizacion } from "./previsualizacion";


export function AyudaEditor(props) {

  const { preview } = props;
  const [previsualizar, setPrevisualizar] = useState(false);

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
          <section>
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
          </section>
        </>
      }
    </div>
  )

}