import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function Consola(props) {

  const {datos} = props;
  const {dic} = props;
  const {eliminarDelHistorial} = props;
  const {limpiarHistorial} = props;
  const {enconsola} = props;
  const [cargando, setCargando] = useState(true)
  const {clickCode} = props;

  useEffect(() => {
    
  }, [dic, cargando])

  useEffect(() => {

    clickCode()
  }, [dic, cargando])

  clickCode()
  console.log(datos, dic)

return (
  <div>
  <div
          id="consol"
          className="navconsola">
            <p>
              <button
              className="botonhistorial"
              onClick={() => limpiarHistorial()}
              >X
              </button>Visto reciente:{" "}
              {enconsola.map((a, num) => {
                return (       
                  <span>                         
                    <button
                    className="botonhistorial"
                    onClick={() => eliminarDelHistorial(num, a)}
                    >X
                    </button>  
                  <code
                  className="aa">                    
                    {a}
                  </code>        
                  </span>              
                )
              })}  
            </p>  
            <p className="enconsola">
            Consola:
            {" "+dic}
            </p>            
          </div>
  <div
  className="consola">   
  {datos.length == 0 || datos[0].enunciado == undefined ? "no hay datos" :
    
      datos[0].enunciado.map((b, num) => {
            if(typeof b === "string") {
              return (                       
                <ReactMarkdown 
                remarkPlugins={[remarkGfm]}> 
                {b}                       
                </ReactMarkdown>                                                                   
              )
            } else if (b.destacar) {
              return (
                <div class="destacar">
                <ReactMarkdown 
                remarkPlugins={[remarkGfm]}>                          
                  {b.destacar} 
                </ReactMarkdown>    
                </div>
              )
            } else if (b.link){
                  return (
                    <div class="link">
                      <a href={b.link[1]} target="_blank">
                          {b.link[0]}
                      </a>
                      <br></br>
                    </div>    
                  )
                }                        
          })}
            
    
  </div>     
  </div>
  )
}