import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Spinner } from '../components/Login/Spinner';
import { TextoCurso } from './impuestos/textoCurso';

export function Consola(props) {

  const {datos} = props;
  const {dic} = props;
  const {eliminarDelHistorial} = props;
  const {limpiarHistorial} = props;
  const {enconsola} = props;
  // const {seccion} = props;
  const {cargando} = props;

return (
  <div>
  <div
          id="consol"
          className="navconsola">
            <p>
              {cargando ? 
              <div className='consolacargando'>
                <Spinner></Spinner>
              </div>
              : <div></div>
}
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
  {/* <TextoCurso 
  seccion={seccion} 
  enunciado={datos}
  cargando={cargando} /> */}
  {datos.length == 0 || datos[0].enunciado == undefined || dic === "" ? "no hay datos" :
    
      datos[0].enunciado.map((b, num) => {
            if(typeof b === "string") {
              return (         
                <div
                key={"consola"+dic+num}
                class="show-element">              
                <ReactMarkdown 
                remarkPlugins={[remarkGfm]}> 
                {b}                       
                </ReactMarkdown>
                </div>                                                                   
              )
            } else if (b.destacar) {
              return (
                <div
                key={"consola"+dic+num}
                class="destacar show-element">
                <ReactMarkdown 
                remarkPlugins={[remarkGfm]}>                          
                  {b.destacar} 
                </ReactMarkdown>    
                </div>
              )
            }                   
          })}
            
    
  </div>     
  </div>
  )
}