import React from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Spinner } from '../components/Login/Spinner';

export function Consola(props) {

  const {datos} = props;
  const {dic} = props;
  const {eliminarDelHistorial} = props;
  const {limpiarHistorial} = props;
  const {enconsola} = props;
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
                  <span
                  key={`historial-${a}`}>                         
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
  {datos.length == 0 || datos[0].enunciado == undefined || dic === "" ? "no hay datos" :
    
      datos[0].enunciado.map((b, num) => {
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
          })}
            
    
  </div>     
  </div>
  )
}