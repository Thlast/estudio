import React, {useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function TextoCurso(props) {

  const {seccion} = props;
  const {cargando} = props
  const {enunciado} = props

  return (
    <div>
    <h1>
      {seccion}    
    </h1>
        <div>
      {cargando ? "...Cargando" :
      enunciado[0].enunciado.map(e => {
        if(typeof e === `string`) {
          return (
            <ReactMarkdown 
            remarkPlugins={[remarkGfm]}>  
            {e}   
            </ReactMarkdown>                    
          )
        } else if (e.destacar) {
          return (
            <div class="destacar">
            <ReactMarkdown 
            remarkPlugins={[remarkGfm]}>                          
              {e.destacar} 
            </ReactMarkdown>    
            </div>
          )
        } else if (e.link){
            return (
              <div class="link">
              <a href={e.link[1]} target="_blank">
                  {e.link[0]}
              </a>
              <br></br>
              </div>    
              )
            } else {
              return (
                <div></div>
              )
            } 
      } 
    )
      
      } 
      </div>
    </div>
  )
}